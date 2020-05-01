import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { meData } from '../operations/query';
import { Subject } from 'rxjs';
import { MeData } from '../components/me/me.interface';
import { Router } from '@angular/router';

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
  constructor(private apollo: Apollo, private router: Router) { }

  public updateStateSesion(newValue: boolean){
    this.accessVar.next(newValue);
  }

  public updateUser(newValue: MeData){
    this.userVar.next(newValue);
  }

  logout() {
    this.updateStateSesion(false);
    localStorage.removeItem('tokenJWT');
    const currentRouter = this.router.url;
    if (currentRouter !== '/register' && currentRouter !== '/users'){
      this.router.navigate(['/login']);
    }
  }

  private sincroValues(result: MeData, state: boolean) {
    this.updateStateSesion(state);
    this.updateUser(result);
  }

  start() {
    if (localStorage.getItem('tokenJWT') !== null) {
      this.getMe().subscribe((result: MeData) => {
        console.log(result);
        if (result.status) {
          if (this.router.url === '/login') {
            this.sincroValues(result, true);
            this.router.navigate(['/me']);
          }
        }
        this.sincroValues(result, result.status);
      });
    } else { // no hay token
      this.sincroValues(null, false);
    }
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
