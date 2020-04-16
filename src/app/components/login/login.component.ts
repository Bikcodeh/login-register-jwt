import { Component, OnInit } from '@angular/core';
import { LoginData, LoginResult } from './login.interface';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { MeData } from '../me/me.interface';

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
  error: boolean;
  show: boolean;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // hay token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.api.getMe().subscribe((result: MeData) => {
        console.log(result);
        if (result.status){
          console.log(result.user);
          this.router.navigate(['/me']);
        }
      });
    } else {
      this.show = true;
    }
  }

  save(){
    console.log(this.user);
    this.api.login(this.user.email, this.user.password).subscribe( (result: LoginResult) => {
      this.show = true;
      if (result.status){
        this.error = false;
        localStorage.setItem('tokenJWT', result.token);
        console.log('Login correcto');
        this.router.navigate(['/me']);
      }else{
        this.error = true;
        localStorage.removeItem('tokenJWT');
        console.log('Login incorrecto');
      }
    });
  }

}
