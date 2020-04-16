import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { meData } from '../operations/query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) { }

  // obtener nuestro usuario y datos con el token
  // Nuestra info con el token
  getMe() {
    return this.apollo
      .watchQuery(
        {
          query: meData,
          fetchPolicy: 'network-only',
          context: {
            headers: new HttpHeaders({
              authorization: localStorage.getItem('tokenJWT')
            })
          }
        }
      ).valueChanges.pipe(map((result: any) => {
        return result.data.me;
      }));
  }
}
