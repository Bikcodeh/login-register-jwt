import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from './user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MeData } from '../me/me.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  constructor(private api: ApiService, private auth: AuthService) { }

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


    this.api.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }

}
