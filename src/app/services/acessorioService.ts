import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio';

@Injectable({
  providedIn: 'root',
})
export class AcessorioService {
   http = inject(HttpClient);

  API = "http://localhost:9090/api/acessorio";

  constructor(){

  }

  findAll(): Observable<Acessorio[]>{
    return this.http.get<Acessorio[]>(this.API+"/findAll");
  }

  delete(id: number): Observable<string>{
    return this.http.delete<string>(this.API+"/delete/"+id, {responseType: 'text' as 'json'});
  }

  save(acessorio: Acessorio): Observable<string>{
    return this.http.post<string>(this.API+"/save", acessorio, {responseType: 'text' as 'json'});
  }

  update(acessorio: Acessorio, id: number): Observable<string>{
    return this.http.put<string>(this.API+"/update/"+id, acessorio, {responseType: 'text' as 'json'});
  }

  findById(id: number): Observable<Acessorio>{
    return this.http.get<Acessorio>(this.API+"/findById/"+id);
  }

}
