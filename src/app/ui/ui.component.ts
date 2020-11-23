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

  currentTree: Tree;

  public addElements(): Observable<any>{
    const answer = this.httpClient.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=""`);
    answer.subscribe((data) => {
      // this.articles = data['articles'];
      // console.log(this.articles);
    });
    return answer;
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.currentTree = plainToClass(Tree, ExampleTree);

  }

  changeTree(tree: Tree): void {
    this.currentTree = tree;
  }
}
