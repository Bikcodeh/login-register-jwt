import { Component, OnInit } from '@angular/core';
import { LoginData, LoginResult } from './login.interface';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: LoginData = {
    email: '',
    password: ''
  };

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      console.log(result);
    });
  }

}
