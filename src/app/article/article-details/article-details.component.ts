import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from 'src/app/models/article.model';
import {ArticleService} from "../../_services/article.service";
import {TokenStorageService} from "../../_services/token-storage.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../models/tag.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

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

  @Input() viewMode = false;

  @Input() currentArticle: Article = {
    title: '',
    description: '',
    text: '',
    tags: [],
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

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      // @ts-ignore
      currentArticle.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    // @ts-ignore
    const index = currentArticle.tags.indexOf(tag);

    if (index >= 0) {
      // @ts-ignore
      currentArticle.tags.splice(index, 1);
    }
  }

}
