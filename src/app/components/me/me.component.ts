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

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    // hay token
    if (localStorage.getItem('tokenJWT') !== null) {
      this.api.getMe().subscribe((result: MeData) => {
        console.log(result);
        if (result.status){
          console.log(result.user);
        } else {
          console.log('token no valido');
          localStorage.removeItem('tokenJWT');
          this.router.navigate(['/login']);
        }
      });
    } else { // no hay token
      this.router.navigate(['/login']);
    }
  }

}
