import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agenda } from './../models/agenda.model';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private url="http://localhost:3000/agenda"

  constructor(private http:HttpClient) { }

  getAgenda():Observable<Agenda[]>{
    return this.http.get<Agenda[]>(this.url).pipe(map(resp=>resp))
  }
  addAgenda(task:Agenda){
    return this.http.post(this.url,task).pipe(map(resp=>resp))
  }
  
  updateAgenda(agenda:Agenda){
    return this.http.put(this.url+"/"+agenda.id,agenda).pipe(map(resp=>resp))
  }
  
  deleteAgenda(id){
    return this.http.delete(this.url+"/"+id).pipe(map(resp=>resp))
  }
  
  
}
