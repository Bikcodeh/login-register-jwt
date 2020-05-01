import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterData, RegisterResult } from './register.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  operation: number;
  message: string;
  register: RegisterData = {
    name: '',
    lastname: '',
    password: '',
    email: ''
  };
  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.auth.start();
  }

  save() {
    this.api.register(this.register).subscribe( ( { data })  => {
      const userResult: RegisterResult = data.register;
      if (userResult.status) {
        this.operation = 1;
      } else {
        this.operation = 2;
      }
      this.message = userResult.message;
    }, ( error ) => {
      console.log('Error enviando el query', error);
      this.operation = 3;
      this.message = 'Error inesperado';
    });
  }

}
