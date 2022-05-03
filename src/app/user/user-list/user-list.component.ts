import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import {User} from "../../models/user.model";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users?: User[];
  currentUser: User = {};
  currentIndex = -1;
  email = '';

  constructor(private userService:  UserService) { }

  ngOnInit(): void {
    this.retrieveUser();
  }

  retrieveUser(): void {
    this.userService.getUserList()
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveUser();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  setActiveUser(user: User, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }

  searchEmail(): void {
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByEmail(this.email)
      .subscribe({
        next: (data) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
