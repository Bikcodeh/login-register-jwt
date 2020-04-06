import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

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
    const getUsers = gql`
      query{
        users{
          id
          name
          lastname
          email
          registerDate
        }
      }
    `;
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

    const login = gql`
        query login($email: String!, $password: String!){
          login(email: $email, password: $password){
            status
            message
            token
          }
        }
      `;
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

    const meData = gql`
    query{
        me{
          status
          message
          user{
            id
            name
            lastname
            email
          }
        }
      }
      `;

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
