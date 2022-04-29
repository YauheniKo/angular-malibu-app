import {Component, Input, OnInit} from '@angular/core';
import {Article} from 'src/app/models/article.model';
import {Tag} from "../../models/tag.model";
import {ArticleService} from "../../_services/article.service";
import {ArticleRequest} from "../../models/artcile.request.model";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  userId:any;

  @Input()currentUserFromArticle: any;

  articleRequest: ArticleRequest = {
    userId: '',
    title: '',
    description: '',
    text: '',
    tagName: ''
  };
  submitted = false;

  constructor(private articleService: ArticleService,
              private token: TokenStorageService) {
    this.userId  =this.token.getUser().id;
  }

  ngOnInit(): void {
  }


  saveArticle(): void {
    const data = {
      title: this.articleRequest.title,
      description: this.articleRequest.description,
      text: this.articleRequest.text,
      tagName: this.articleRequest.tagName,
      userId:this.userId
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
