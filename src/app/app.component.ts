import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loginRegisterJWT';

  constructor(private apollo: Apollo, private api: ApiService) {

  }

  ngOnInit() {
    this.api.getUsers().subscribe((result) => {
      console.log(result);
    });

    this.api.login('bikcodeh@gmail.com', '1234').subscribe((result) => {
      console.log(result);
    });
  }
}
