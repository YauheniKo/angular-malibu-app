import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from "../../_services/article.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../models/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ArticleRequest} from "../../models/artcile.request.model";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  private roles?: string[];
  isAdmin = false;
  isModerator = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  articleId?: any;

  @Input() viewMode = false;

  currentArticleRequest: ArticleRequest = {
    userId: '',
    title: '',
    description: '',
    text: '',
    tags: []
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
    this.articleId = id;
    this.articleService.get(id)
      .subscribe({
        next: (data) => {
          this.currentArticleRequest = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateArticle(): void {
    this.message = '';

    this.articleService.update(this.articleId, this.currentArticleRequest)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This article was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteArticle(): void {
    this.articleService.delete(this.articleId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/articles']);
        },
        error: (e) => console.error(e)
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tag
    if (value) {
      // @ts-ignore
      this.currentArticleRequest.tags.push({name: value});
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    // @ts-ignore
    const index = this.currentArticleRequest.tags.indexOf(tag);

    if (index >= 0) {
      // @ts-ignore
      this.currentArticleRequest.tags.splice(index, 1);
    }
  }

}
