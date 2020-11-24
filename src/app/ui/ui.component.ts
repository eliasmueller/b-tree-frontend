import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {plainToClass} from 'class-transformer';
import {Tree} from '../tree';

import ExampleTree from '../../assets/example_tree.json';
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

  private url = 'https://localhost:80/api';
  private timeoutInterval = 6000;
  @ViewChild('csvReader') csvReader: any;

  numberListInput = '';
  minRandomInput = '';
  maxRandomInput = '';
  numberRandomInput = '';
  orderInput = '';
  consoleOutput = '';
  private csvValues = [];

  public load = false;
  public currentTree: Tree;
  // TODO initalzie array correctly
  private treeArray = [JSON, JSON];
  private arrayIterator = 0;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // TODO REMOVE
    this.currentTree = plainToClass(Tree, ExampleTree);
    this.initUi();
  }



  /**
   * The following methods create the http-calls against the REST-Api and will be getting
   * called by the UI-Elements in the UI-Component-HTML-File.
   */

  public async addElements(): Promise<void> {
    this.consoleOutput = '';

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1) {
      return;
    }

    const answer = this.httpClient.post(this.url + '', numberArray);

    this.resolveAddDeleteHttpRequest(answer);
  }

  public deleteElements(): void {
    this.consoleOutput = '';

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1) {
      return;
    }

    const answer = this.httpClient.request('delete', this.url + '', {body: numberArray});
    this.resolveAddDeleteHttpRequest(answer);
  }

  private resolveAddDeleteHttpRequest(answer: Observable<any>): void {
    this.load = true;
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen';
      this.load = false;
      return answer;
    })).subscribe((data) => {
      this.load = false;

      // TODO Check in which way the incoming json files are stored
      // this.articles = data['articles'];
      // console.log(this.articles);
      // TODO extract the Trees from the answer
      if (this.treeArray.length > 1) {
        this.currentTree = plainToClass(Tree, this.treeArray[0]);
        if (this.currentTree.Nodes.length < 1) {
          this.initUi();
        }
        this.disableAllButtonsButNextStep();
      }
    });
  }

  public searchElement(): void {
    this.consoleOutput = '';

    const numberArray = this.getNumberListInput();
    if (numberArray.length < 1 || numberArray.length > 1) {
      if (numberArray.length > 1) {
        this.consoleOutput = 'Es kann nur nach einer Zahl gesucht werden.';
      }
      return;
    }

    const answer = this.httpClient.post(this.url + '/search', numberArray);

    this.load = true;
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen.';
      this.load = false;
      return answer;
    })).subscribe((data) => {
      this.load = false;
      this.consoleOutput = 'found';

      // TODO Check in which way the incoming json files are stored
      // this.articles = data['articles'];
      // console.log(this.articles);
      // TODO extract the SearchResponse from the answer
      // Filter the tree and highlight the node matching with uuid
      // this.currentTree.nodes.filter = extract new data
      // this.consoleOutput = costs & found/not found

    });
  }

  public addRandomElements(): void {
    this.consoleOutput = '';

    const randomValues = this.getRandomInputs();

    console.log(randomValues);
    if (randomValues.length < 3) {
      return;
    }

    if (randomValues[0] == null || randomValues[1] == null || randomValues[2] == null) {
      return;
    }

    const answer = this.httpClient.post(this.url + '/random', randomValues);

    this.resolveAddDeleteHttpRequest(answer);
  }

  public changeOrder(): void {
    this.consoleOutput = '';

    this.orderInput = this.orderInput.replace(/ /g, '');
    const temp = this.orderInput.match(/\d+/g);
    const orderValue = this.matchInput(temp);

    if (orderValue == null) {
      return;
    }

    const answer = this.httpClient.post(this.url + '/changeOrder', orderValue);

    this.load = true;
    answer.pipe(timeout(this.timeoutInterval), catchError(() => {
      this.consoleOutput = 'Verbindung fehlgeschlagen.';
      this.load = false;
      return answer;
    })).subscribe((data) => {
      this.load = false;

      // TODO Check in which way the incoming json files are stored
      // this.articles = data['articles'];
      // console.log(this.articles);
      // TODO extract the Trees from the answer

      // this.currentTree = extract new data

    });
  }

  public nextStep(): void {
    this.arrayIterator++;
    this.currentTree = plainToClass(Tree, this.treeArray[this.arrayIterator]);
    if (this.arrayIterator === this.treeArray.length) {
      this.enableAllButtonsButNextStep();
    }
  }

  public readCSV(): void {
    if ( this.csvValues[0] == null ) {
      this.consoleOutput = 'Keine korrekten Daten aus einer CSV eingelesen.';
      return;
    }
    const answer = this.httpClient.post(this.url + '', this.csvValues);
    this.resolveAddDeleteHttpRequest(answer);
  }

  uploadListener($event: any): void {
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
        console.log(this.csvValues);
      };

    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  private isValidCSVFile(file: any): boolean {
    return file.name.endsWith('.csv');
  }

  private fileReset(): void {
    this.csvReader.nativeElement.value = '';
  }

  /**
   * Changes the currentTree Attribute.
   * @param tree: The new Tree.
   */
  changeTree(tree: Tree): void {
    this.currentTree = tree;
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

  private getRandomInputs(): number[] {
    const inputValues = [];

    this.minRandomInput = this.minRandomInput.replace(/ /g, '');
    let temp = this.minRandomInput.match(/\d+/g);
    inputValues[0] = this.matchInput(temp);

    this.maxRandomInput = this.maxRandomInput.replace(/ /g, '');
    temp = this.maxRandomInput.match(/\d+/g);
    inputValues[1] = this.matchInput(temp);

    this.numberRandomInput = this.numberRandomInput.replace(/ /g, '');
    temp = this.numberRandomInput.match(/\d+/g);
    inputValues[2] = this.matchInput(temp);

    this.numberRandomInput = '';
    this.minRandomInput = '';
    this.maxRandomInput = '';

    return inputValues;
  }

  private matchInput(temp: RegExpMatchArray): number {
    if (temp != null) {
      return temp.map(Number)[0];
    } else {
      this.consoleOutput = 'Die Eingabe enthält keine gültigen Zahlen.';
      return null;
    }
  }

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
  }

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
  }

  private initUi(): void {
    const button = document.querySelectorAll('button');
    button[1].disabled = true;
    button[2].disabled = true;

  }
}
