import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { meData } from '../operations/query';
import { Subject } from 'rxjs';
import { MeData } from '../components/me/me.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar = new Subject<boolean>();
  // simbolo de dolar, hace referencia a que sera un observable
  public accessVar$ = this.accessVar.asObservable();
  public userVar = new Subject<MeData>();
  // simbolo de dolar, hace referencia a que sera un observable
  public userVar$ = this.userVar.asObservable();
  constructor(private apollo: Apollo) { }

  public updateStateSesion(newValue: boolean){
    this.accessVar.next(newValue);
  }

  public updateUser(newValue: MeData){
    this.userVar.next(newValue);
  }

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
