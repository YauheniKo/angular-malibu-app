import {Component, OnInit} from '@angular/core';
import {Article} from 'src/app/models/article.model';
import {ArticleService} from "../../_services/article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles?: Article[];
  currentArticle: Article = {};
  currentIndex = -1;
  title = '';
  published = '';

  constructor(private articleService: ArticleService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.retrieveArticle();
  }

  retrieveArticle(): void {
    this.articleService.getAll()
      .subscribe({
        next: (data) => {
          this.articles = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveArticle();
    this.currentArticle = {};
    this.currentIndex = -1;
  }

  getTextInfo(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;

    this.router.navigate(['/articles/text/' + this.currentArticle.id]);
  }

  gradeLike(articleId: number): void {
    this.articleService.gradeLike(articleId)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentArticle = {};
    this.currentIndex = -1;

    this.articleService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.articles = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
