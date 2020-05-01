import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterData } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: RegisterData = {
    name: '',
    lastname: '',
    password: '',
    email: ''
  };
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if (localStorage.getItem('tokenJWT') !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        console.log(result);
        if (result.status){
          this.auth.updateStateSesion(true);
        } else {
          this.auth.updateStateSesion(false);
        }
      });
    } else {
      this.auth.updateStateSesion(false);
    }
  }

  save() {
    console.log(this.register);
  }

}
