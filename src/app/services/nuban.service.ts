import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Nuban } from '../models/nuban';

@Injectable({
  providedIn: 'root'
})
export class NubanService {

  constructor(private http: HttpClient, private router: Router) {}
  BASE_URL = 'http://localhost:8080/aggregate-solution/nuban/api';
  serialNumber!: string;

  nuban = new BehaviorSubject<Nuban | null>(null);
  nubanList?: Nuban[];

  generateSerialNumber():Observable<string> {

    return this.http.get<string>(`${this.BASE_URL}/serial-number`).pipe(
      map((reponse) =>{
        return this.serialNumber = reponse;
      }),catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  createNuban(bankCode: String, serialNumber: String): Observable<Nuban>{
    let url = `${this.BASE_URL}/create-nuban?bankCode=${bankCode}&serialNumber=${serialNumber}`
    return this.http
    .post(url,null)
    .pipe(
      map((response) => {
        var nubanCreated = response as Nuban;
        this.nuban.next(nubanCreated);
        return nubanCreated;

      }),
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  getAllNubans():Observable<Nuban[]> {

    return this.http.get<Nuban[]>(`${this.BASE_URL}/nuban-list`).pipe(
      map((reponse) =>{
        return this.nubanList = reponse;
      }),catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
