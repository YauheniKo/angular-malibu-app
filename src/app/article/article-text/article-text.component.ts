import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../models/article.model";
import {ArticleService} from "../../_services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-article-text',
  templateUrl: './article-text.component.html',
  styleUrls: ['./article-text.component.css']
})
export class ArticleTextComponent implements OnInit {
  private roles?: string[];
  isOwnerArticle = false;
  isAdmin = false;
  isModerator = false;
  currentUserId?: any

  @Input() currentArticle: Article = {
    title: '',
    description: '',
    text: '',
    tags: [],
    username: '',

  };

  message = '';

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getArticle(this.route.snapshot.params["id"]);
    const user = this.tokenStorageService.getUser();
    this.roles = user.roles;
    this.currentUserId = user.id;
    // @ts-ignore
    this.isAdmin = this.roles.includes('ROLE_ADMIN');
    // @ts-ignore
    this.isModerator = this.roles.includes('ROLE_MODERATOR');
    if (this.currentArticle.userId == this.currentUserId) {
      this.isOwnerArticle = true;

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

  editArticle(id: any): void {
    this.router.navigate(['/articles/' + id]);
  }
}
