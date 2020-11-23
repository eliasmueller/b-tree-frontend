import {Component, Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import ExampleTree from '../../assets/example_tree.json';
import {plainToClass} from 'class-transformer';
import {Tree} from '../tree';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.css']
})
export class UiComponent implements OnInit {

  public currentTree: Tree;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // TODO REMOVE
    this.currentTree = plainToClass(Tree, ExampleTree);
  }

  public addElements(): Observable<any> {
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    answer.subscribe((data) => {
      // this.articles = data['articles'];
      // console.log(this.articles);
    });
    return answer;
  }

  public deleteElements(): Observable<any> {
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    return answer;
  }

  public searchElement(): Observable<any> {
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    return answer;
  }

  public addRandomElements(): Observable<any> {
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    return answer;
  }

  public changeOrder(): Observable<any> {
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    return answer;
  }

  /**
   * Changes the currentTree Attribute.
   * @param tree: The new Tree.
   */
  changeTree(tree: Tree): void {
    this.currentTree = tree;
  }
}
