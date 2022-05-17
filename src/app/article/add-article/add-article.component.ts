import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from "../../_services/article.service";
import {ArticleRequest} from "../../models/artcile.request.model";
import {TokenStorageService} from "../../_services/token-storage.service";
import {Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../models/tag.model";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  userId: any;
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  formData: FormData = new FormData();
  @Input() currentUserFromArticle: any;

  articleRequest: ArticleRequest = {
    userId: '',
    title: '',
    description: '',
    text: '',
    tags: []
  };
  submitted = false;

  constructor(private articleService: ArticleService,
              private token: TokenStorageService) {
    this.userId = this.token.getUser().id;
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      // @ts-ignore
      this.articleRequest.tags.push({name: value.toLowerCase()});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    // @ts-ignore
    const index = this.articleRequest.tags.indexOf(tag);

    if (index >= 0) {
      // @ts-ignore
      this.articleRequest.tags.splice(index, 1);
    }
  }

  saveArticle(): void {

    this.formData.append('article', new Blob([JSON.stringify({
      "title": this.articleRequest.title,
      "description": this.articleRequest.description,
      "text": this.articleRequest.text,
      "userId": this.userId,
      "tags": this.articleRequest.tags
    })], {
      type: "application/json"
    }));

    this.articleService.create(this.formData)
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
      tags: [],
    };
    this.selectedFiles = new FileList
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];

    // @ts-ignore
    if (event.target.files) {
      for (const file of event.target.files) {
        this.formData.append('file', file);
      }
    }

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }
}
