import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import {Tag} from "../../models/tag.model";
import {ArticleService} from "../../_services/article.service";
import {ArticleRequest} from "../../models/artcile.request.model";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  id?: any;

  articleRequest: ArticleRequest = {
    title: '',
    description: '',
    text: '',
    tagName:''
  };
  submitted = false;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
  }

  saveArticle(): void {
    const data = {
      title: this.articleRequest.title,
      description: this.articleRequest.description,
      text: this.articleRequest.text,
      tagName: this.articleRequest.tagName
    };

    this.articleService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newArticle(): void {
    this.submitted = false;
    this.articleRequest = {
      title: '',
      description: '',
      text: '',
      tagName: ''
    };
  }
}
