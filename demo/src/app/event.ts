import { Agenda } from "./agenda";

export class Event {
    constructor(public eId:number,public name: string, public email:string,public agenda: Agenda[]){}
    
}
