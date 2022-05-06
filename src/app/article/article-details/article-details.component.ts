import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from 'src/app/models/article.model';
import {ArticleService} from "../../_services/article.service";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  private roles?: string[];
  isAdmin = false;
  isModerator = false;

  @Input() viewMode = false;

  @Input() currentArticle: Article = {
    title: '',
    description: '',
    text: '',
    tag: [],
    username:''
  };

  message = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getArticle(this.route.snapshot.params["id"]);
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      // @ts-ignore
      this.isAdmin = this.roles.includes('ROLE_ADMIN');
      // @ts-ignore
      this.isModerator = this.roles.includes('ROLE_MODERATOR');
    }
  }

  getArticle(id: string): void {
    this.articleService.get(id)
      .subscribe({
        next: (data) => {
          this.currentArticle = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateArticle(): void {
    this.message = '';

    this.articleService.update(this.currentArticle.id, this.currentArticle)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This article was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteArticle(): void {
    this.articleService.delete(this.currentArticle.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/articles']);
        },
        error: (e) => console.error(e)
      });
  }

}
