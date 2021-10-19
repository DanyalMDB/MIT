import { International, CreateInternational } from './../interfaces/international.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InternationalService {

  constructor(private http: HttpClient) { }

  getInternational(){
    return this.http.get("/api/international");
  }

  getInternationalById(id: string){
    return this.http.get("/api/international/" + id);
  }

  createInternational(international: CreateInternational) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.post<International>("/api/international", international, httpOptions)
  }
}
