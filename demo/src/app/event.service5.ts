import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import {Agenda} from './agenda';
import { Event } from './event';

@Injectable()
export class EventService {
    
    allEventsUrl = "http://localhost:8080/api/events";
   
    constructor(private http:Http) { 
    }
    
    getAllEvents(): Observable<Event[]> {
        return this.http.get(this.allEventsUrl)
	       .map(this.extractData)
	       .catch(this.handleError);

    }
    
    createEvent(event: Event):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.allEventsUrl,event, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
  
  
     private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
}