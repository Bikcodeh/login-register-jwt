import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MeData } from './me.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user: any;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    // hay token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        console.log(result);
        if (result.status){
          console.log(result.user);
          this.user = result.user;
        } else {
          console.log('token no valido');
          localStorage.removeItem('tokenJWT');
          this.logout();
        }
      });
    } else { // no hay token
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('tokenJWT');
    this.auth.updateStateSesion(false);
    this.router.navigate(['/login']);
  }

}
