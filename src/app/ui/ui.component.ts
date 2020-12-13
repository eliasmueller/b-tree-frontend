import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Tree} from '../tree';
import * as uuid from 'uuid';

import {catchError, timeout} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  private port = '8080';
  private url = 'http://localhost:' + this.port + '/api';
  private timeoutInterval = 6000;

  @ViewChild('csvReader') csvReader: any;

  numberListInput = '';
  minRandomInput = '';
  maxRandomInput = '';
  numberRandomInput = '';
  sleepTimeInput = '';
  orderInput = '';
  consoleOutput = '';

  private verbString = '';
  private csvValues = [];
  private values = [];

  public highlighted: uuid;
  public load = false;

  public currentTree = new Tree();

  private treeArray = [];
  private arrayIterator = 0;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.resetTreeInBackend();
    this.initUi();
    this.currentTree.Order = 5;
  }

  /**
   * The following methods create the http-calls against the REST-Api and will be getting
   * called by the UI-Elements in the ui.component.html-file.
   */

  /**
   * This method gets called when new Elements should be added. It consumes them from the getNumberListInput()-method and resolves
   * the http-request with calling resolveAddDeleteHttpRequest() method.
   */
  public async addElements(): Promise<void> {
    this.consoleOutput = '';
    this.highlighted = null;

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1) {
      return;
    }

    const answer = this.httpClient.post(this.url + '', numberArray);

    this.resolveAddDeleteHttpRequest(answer);
  }

  /**
   * This method gets called when Elements should be removed. It consumes them from the getNumberListInput()-method and resolves
   * the http-request with calling resolveAddDeleteHttpRequest() method.
   */
  public deleteElements(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1) {
      return;
    }

    const answer = this.httpClient.request('delete', this.url + '', {body: numberArray});
    this.resolveAddDeleteHttpRequest(answer, true);
  }

  /**
   * This method gets called when a httpRequest for adding or deleting elements to/from the tree is pending.
   * It either times out or saves the array of trees which represent the single adding / removing steps.
   * After that it replaces this.currentTree with the first element of the treeArray, which triggers a UI reload
   * in tree-display.component.ts class that will draw the tree.
   * If the treeArray contains more than one element, this method calls the disableAllButtonsButNextStep()-method,
   * which disables all UI-Elements but the next step button to iterate over the single adding / removing steps.
   *
   * @param answer: The Observable<any> observing the http request.
   * @param deleted: Boolean, whether delete or add method calls this method.
   * @param changedOrder: Boolean, wheter changeOrder called this method.
   */
  private resolveAddDeleteHttpRequest(answer: Observable<any>, deleted: boolean = false, changedOrder = false): void {
    this.load = true;
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen';
      this.load = false;
      return answer;
    })).subscribe(data => {

      this.load = false;
      this.enableAllButtonsButNextStep();
      this.treeArray = JSON.parse(data.Trees);
      this.values = JSON.parse(data.Values);
      this.verbString = deleted ? 'gelöscht.' : 'eingefügt.';

      /* true, when more than one element got added/removed */
      if (this.treeArray.length > 1) {
        if (this.consoleOutput !== '') {
          this.consoleOutput = this.consoleOutput + '\n' + this.values[this.arrayIterator] + ' wird ' + this.verbString;
        } else {
          this.consoleOutput = this.values[this.arrayIterator] + ' wird ' + this.verbString;
        }
        this.disableAllButtonsButNextStep();
      }

      /* true when one element gets added/removed */
      else if (this.treeArray.length === 1 && !changedOrder) {
        this.currentTree = this.treeArray[0] as Tree;
        if (this.currentTree.Nodes.length < 1) {
          this.initUi();
        }
      }

      /* true when changeOrder called this method */
      else if (changedOrder) {
        this.currentTree = this.treeArray[0] as Tree;
        if (this.currentTree.Nodes.length < 1) {
          this.initUi();
        }
        this.consoleOutput = this.consoleOutput + 'Die Ordnung wurde zu ' + this.currentTree.Order + ' verändert.';
      }

      /* true when no element could be added/removed */
      else {
        this.consoleOutput = this.consoleOutput + 'Es wurden keine Elemente ' + this.verbString;
      }
    });
  }

  /**
   * This method gets called when an element is searched. It consumes them from the getNumberListInput()-method to get the element
   * to search after. This cannot be more than one element. It resolves the http-Request itself and prints out if the element has
   * been found, or not and at which search cost. Further, it changes the highlighted-attribute, which is injected in the
   * tree-display-component.ts class. This will trigger a UI-Reload in this class and highlights the node containing the searched element.
   */
  public searchElement(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1 || numberArray.length > 1) {
      if (numberArray.length > 1) {
        this.consoleOutput = 'Es kann nur nach einer Zahl gesucht werden.';
      }
      return;
    }

    const answer = this.httpClient.post(this.url + '/search', numberArray[0]);

    this.load = true;
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen.';
      this.load = false;
      return answer;
    })).subscribe((data) => {
      this.load = false;
      // @ts-ignore
      if (data.Highlighted === null) {
        // @ts-ignore
        this.consoleOutput = 'Nicht gefunden.\nKosten:' + data.Costs;
      } else {
        // @ts-ignore
        this.consoleOutput = 'Gefunden.\nKosten:' + data.Costs;
        // @ts-ignore
        this.highlighted = data.Highlighted;
      }
    });
  }

  /**
   * This method gets called when Elements should be added randomly. It consumes min, max and number of random values from
   * the getRandomInputs()-method. The http-request will be resolved with calling resolveAddDeleteHttpRequest() method.
   */
  public addRandomElements(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    const randomValues = this.getRandomInputs();

    if (randomValues.length < 3) {
      return;
    }

    if (randomValues[0] == null || randomValues[1] == null || randomValues[2] == null) {
      return;
    }

    if (randomValues[2] < randomValues[0]) {
      this.consoleOutput = 'Das Maximum muss größer als das Minimum sein';
      return;
    }

    if (randomValues[2] - randomValues[0] + 1 < randomValues[1]) {
      this.consoleOutput = 'Da Duplikate verboten sind, können für diese Min-Max-Range nur '
        + (randomValues[2] - randomValues[0] + 1) + ' Zufallswerte generiert werden.\n';
    }

    const answer = this.httpClient.post(this.url + '/random', randomValues);

    this.resolveAddDeleteHttpRequest(answer);
  }

  /**
   * This method gets called when the order of the b-tree should be changed. It consumes the order-value and trims it itself.
   * The http-request will be resolved with calling resolveAddDeleteHttpRequest() method.
   */
  public changeOrder(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    this.orderInput = this.orderInput.replace(/ /g, '');
    const temp = this.orderInput.match(/\d+/g);
    const orderValue = this.matchInput(temp);

    if (orderValue === null) {
      return;
    } else if (orderValue < 3) {
      this.consoleOutput = 'Die Ordnung muss mindestens 3 betragen!';
    } else {
      const answer = this.httpClient.post(this.url + '/changeOrder', orderValue);
      this.resolveAddDeleteHttpRequest(answer, false, true);
    }
  }

  /**
   * This method gets called when the nextStep-UI-Button is pressed or through the nextStepAutomation-Function.
   * It iterates over the treeArray and sets the currentTree-Attribute
   * to the value of the treeArray, the iterator is on, what calls a refresh of the visual tree-representation in the
   * tree-display.component.ts-class, where the currentTree is injected into.
   * This method has to be called as many times as the treeArrays length, to call the
   * enableAllButtonsButNextStep()-method and enable the UI-Elements again.
   *
   * @param calledFromAuto: Boolean that represents if method was called manually or from automation
   */
  public nextStep(calledFromAuto = false): void {
    this.consoleOutput = '';
    this.highlighted = null;

    this.currentTree = this.treeArray[this.arrayIterator];
    this.arrayIterator++;
    if (this.arrayIterator >= this.treeArray.length) {
      this.enableAllButtonsButNextStep();
      this.consoleOutput = this.treeArray.length + ' Werte wurden ' + this.verbString;
      if (!calledFromAuto) {
        this.arrayIterator = 0;
      }
      if (this.currentTree.Nodes.length < 1) {
        this.initUi();
      }
      return;
    }
    this.consoleOutput = this.values[this.arrayIterator] + ' wird ' + this.verbString;
  }

  /**
   * This method calls the nextStep()-Method automatically and periodically to add all new elements automated.
   * Global sleepTimeInput-Variable defines how long the UI waits between adding a new element.
   * If sleepTimeInput is 0, it just skips the iterative adding and sets the currentTree to the last element of the treeArray.
   */
  public async nextStepAutomation(): Promise<void> {

    let sleepTime;
    if (this.sleepTimeInput !== '') {
      this.sleepTimeInput = this.sleepTimeInput.replace(/ /g, '');
      const temp = this.sleepTimeInput.match(/\d+/g);
      sleepTime = this.matchInput(temp);
    } else {
      sleepTime = 0;
    }

    if (sleepTime > 0) {
      while (this.arrayIterator < this.treeArray.length) {
        this.nextStep(true);
        await this.delay(sleepTime);
      }
      this.arrayIterator = 0;
    } else {
      this.currentTree = this.treeArray[this.treeArray.length - 1];
      this.consoleOutput = this.treeArray.length + ' Werte wurden ' + this.verbString;
      this.enableAllButtonsButNextStep();
      this.arrayIterator = 0;
    }
  }

  /**
   * Works as a asynchronous wait method
   * @param ms: the time to wait
   */
  public async delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  /**
   * This method gets called when CSV already has been read and creates the http-request to add the csv-files values to the tree.
   * The http-request will be resolved by calling resolveAddDeleteHttpRequest()-method.
   */
  public readCSV(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    if (this.csvValues[0] == null) {
      this.consoleOutput = 'Keine korrekten Daten aus einer CSV eingelesen.';
      return;
    }
    const answer = this.httpClient.post(this.url + '', this.csvValues);
    this.resolveAddDeleteHttpRequest(answer);
  }

  /**
   * This method gets called when the user uploads a CSV-file. It calls isValidCSVFile() to validate the file is a CSV file.
   * If it's a valid file, the method trims the elements of the CSV-file into an Array of numbers, called this.csvValues.
   * If it's not a valid file, it calls fileReset to reset the input-buffer for CSV-Files.
   *
   * @param $event: the UI-event triggering this method.
   */
  uploadListener($event: any): void {
    this.consoleOutput = '';
    this.highlighted = null;

    const files = $event.target.files;
    if (this.isValidCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
        const tempString = csvRecordsArray[0].replace(/ /g, '');
        const temp = tempString.match(/\d+/g);
        if (temp != null) {
          this.csvValues = temp.map(Number);
        } else {
          this.consoleOutput = 'Die CSV enthält keine gültigen Zahlen.';
          return;
        }
        this.consoleOutput = 'Die Werte der CSV lauten: \n' + tempString + '\nBestätige mit CSV Bestätigen.';
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  /**
   * Validates it the file is a CSV-File.
   *
   * @param file: The file to validate.
   */
  private isValidCSVFile(file: any): boolean {
    return file.name.endsWith('.csv');
  }

  /**
   * Resets the CSV-Readers buffer.
   */
  private fileReset(): void {
    this.csvReader.nativeElement.value = '';
  }

  private resetTreeInBackend(): void {
    this.consoleOutput = '';
    this.highlighted = null;

    const answer = this.httpClient.get(this.url + '/reset');
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen.';
      this.load = false;
      return answer;
    })).subscribe((data) => {
        this.load = false;
        this.consoleOutput = 'Verbindung hergestellt.';
      });
  }

  /**
   * Reads the input field for adding, removing or searching numbers and converts to number-array.
   * @return An array of input numbers.
   */
  private getNumberListInput(): number[] {
    this.numberListInput = this.numberListInput.replace(/ /g, '');
    const temp = this.numberListInput.match(/\d+/g);
    this.numberListInput = '';
    if (temp != null) {
      return temp.map(Number);
    } else {
      this.consoleOutput = 'Die Eingabe enthält kein gültigen Zahlen.';
      return [] as number[];
    }
  }

  /**
   * Transforms the random input parameters (min, max, number) and trims them to numbers.
   * @return: The array containing the trimmed input parameters.
   */
  private getRandomInputs(): number[] {
    const inputValues = [];

    this.minRandomInput = this.minRandomInput.replace(/ /g, '');
    let temp = this.minRandomInput.match(/\d+/g);
    inputValues[0] = this.matchInput(temp);

    this.maxRandomInput = this.maxRandomInput.replace(/ /g, '');
    temp = this.maxRandomInput.match(/\d+/g);
    inputValues[2] = this.matchInput(temp);

    this.numberRandomInput = this.numberRandomInput.replace(/ /g, '');
    temp = this.numberRandomInput.match(/\d+/g);
    inputValues[1] = this.matchInput(temp);

    this.numberRandomInput = '';
    this.minRandomInput = '';
    this.maxRandomInput = '';

    return inputValues;
  }

  /**
   * Matches the RegularExpression against a number value, if possible maps it to a number.
   * @param temp: The RegExpMatchArray to get the first number value from.
   */
  private matchInput(temp: RegExpMatchArray): number {
    if (temp != null) {
      return temp.map(Number)[0];
    } else {
      this.consoleOutput = 'Die Eingabe enthält keine gültigen Zahlen.';
      return null;
    }
  }

  /**
   * Disables all UI-Elements but the NextStepButton, The Auto-Step-Button and the sleepTimeInputButton.
   */
  private disableAllButtonsButNextStep(): void {
    const button = document.querySelectorAll('button');
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;
    }
    const input = document.querySelectorAll('input');
    for (let i = 0; i < input.length; i++) {
      input[i].disabled = true;
    }
    button[button.length - 2].disabled = false;
    button[button.length - 3].disabled = false;
    input[input.length - 2].disabled = false;
  }

  /**
   * Enables all UI-Element but the NextStepButton, The Auto-Step-Button and the sleepTimeInputButton.
   */
  private enableAllButtonsButNextStep(): void {
    const button = document.querySelectorAll('button');
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = false;
    }
    const input = document.querySelectorAll('input');
    for (let i = 0; i < input.length; i++) {
      input[i].disabled = false;
    }
    button[button.length - 2].disabled = true;
    button[button.length - 3].disabled = true;
    input[input.length - 2].disabled = true;
  }

  /**
   * Disables Search and Remove button, called on init or if the tree is empty.
   */
  private initUi(): void {
    const button = document.querySelectorAll('button');
    button[1].disabled = true;
    button[2].disabled = true;

  }


}
