import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {ArticleListComponent} from "./article/article-list/article-list.component";
import {ArticleDetailsComponent} from "./article/article-details/article-details.component";
import {AddArticleComponent} from "./article/add-article/add-article.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserDetailsComponent} from "./user/user-details/user-details.component";
import { ArticleTextComponent } from './article/article-text/article-text.component';
import {FileUploadComponent} from "./file-upload/file-upload.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
//Article components
    ArticleListComponent,
    ArticleDetailsComponent,
    AddArticleComponent,

    //User components
    UserListComponent,
    UserDetailsComponent,
    ArticleTextComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
