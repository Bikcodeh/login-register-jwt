import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MeData } from './me.interface';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  user: any;
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // hay token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.api.getMe().subscribe((result: MeData) => {
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
    this.router.navigate(['/login']);
  }

}
