import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { getUsers, login, meData } from './operations/query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    this.apollo
      .watchQuery(
        {
          query: getUsers,
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(map((result: any) => {
        return result.data.users;
      })).subscribe((result) => {
        console.log(result);
      });

    this.apollo
      .watchQuery(
        {
          query: login,
          variables: {
            email: 'bikcodeh@gmail.com',
            password: '1234'
          },
          fetchPolicy: 'network-only'
        }
      ).valueChanges.pipe(map((result: any) => {
        return result.data.login;
      })).subscribe((result) => {
        console.log(result);
      });

    this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              authorization: ''
            })
          }
        }
      ).valueChanges.pipe(map((result: any) => {
        return result.data.me;
      })).subscribe((result) => {
        console.log(result);
      });
  }
}
