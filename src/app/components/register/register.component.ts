import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterData } from './register.interface';
import { ApiService } from 'src/app/services/api.service';

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
  constructor(private auth: AuthService, private api: ApiService) { }

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
    this.api.register(this.register).subscribe( ( { data } ) => {
      console.log(data);
    }, ( error ) => {
      console.log('Error enviando el query', error);
    });
  }

}
