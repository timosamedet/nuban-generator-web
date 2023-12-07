import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient, private router: Router) {}
  BASE_URL = 'http://localhost:8080/aggregate-solution/nuban/api';
  bankCodes!: string[];
  banks!: Bank[];

  getBankCodes():Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/bank-codes`).pipe(
      map((reponse) =>{
         this.bankCodes = reponse;
         return this.bankCodes;
       
      }),catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  getBanks():Observable<Bank[]> {
    return this.http.get<Bank[]>(`${this.BASE_URL}/banks`).pipe(
      map((reponse) =>{
        return this.banks = reponse;
      }),catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
