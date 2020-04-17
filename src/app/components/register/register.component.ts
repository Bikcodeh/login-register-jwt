import { Component, OnInit } from '@angular/core';
import { MeData } from '../me/me.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

}
