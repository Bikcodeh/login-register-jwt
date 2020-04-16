import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from 'src/app/components/me/me.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  access: boolean;
  constructor(private auth: AuthService) {
    this.auth.accessVar$.subscribe( (data: boolean) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('tokenJWT') !== null) {
      this.auth.getMe().subscribe((result: MeData) => {
        if (result.status){
          this.access = true;
        } else {
          this.access = false;
        }
        console.log('get me' + this.access);
      });
    } else {
      this.access = false;
      console.log(this.access);
    }
  }

}
