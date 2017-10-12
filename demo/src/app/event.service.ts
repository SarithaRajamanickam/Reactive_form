import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class EventService {

  constructor( private http:Http) { }
   
  getEventService(){
    return this.http.get("http://localhost:8080/api/events/get")
        .map(res => res.json());
        }


   addEvent(info){
       //alert("addEvent"+info);
    return this.http.post("http://localhost:8080/api/events/post",info)
        .map(res => res.json());
  }
  deleteEvent(eId){
    return this.http.delete("http://localhost:8080/api/events/delete/"+eId)
        //.map(res => res.json());
  }
  getEvent(eId){
    return this.http.get("http://localhost:8080/api/events/get/"+eId)
        .map(res => res.json());
  }

  updateEvent(eId, info){
      console.log(eId+""+JSON.stringify(info));
    return this.http.put("http://localhost:8080/api/events/put/"+eId,info)
        .map(res => res.json());
  }
  
}