import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { EventService } from "./event.service";
import { Event } from './event';
import { Agenda } from "./agenda";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    //eId: any;
    tobeupdated: number;
    public userForm: FormGroup;
    statusCode: number;
    events: Event[];
    agendas1:Object={};
    // eId: null;
    // eid:null;

    constructor(private _fb: FormBuilder,
    private eventservice: EventService) {} 

    ngOnInit() {
        
        this.userForm = this._fb.group({
            agenda: this._fb.array([
                this.initAddress(),
            ]),
            eId: [''],
            email: [''],
            name: ['']
        });
      this.getEvents();
    }

    initAddress() {
        return this._fb.group({
            city: [''],
            id: [''],
            postalcode: [''],
            street: ['']
        });
    }

    addAddress() {
        const control = <FormArray>this.userForm.controls['agenda'];
        control.push(this.initAddress());
    }

    removeAddress(i: number) {
        const control = <FormArray>this.userForm.controls['agenda'];
        control.removeAt(i);
    }



    getEvents() {
        //alert("submit alert")
             //console.log("getevents");
         this.eventservice.getEventService()
            .subscribe(
            data => this.events = data);
            // errorCode => this.statusCode = errorCode 
            //console.log("getEvents"+JSON.stringify(this.events));
    }
    onSubmit() {
        this.eventservice.addEvent(this.userForm.value)
            .subscribe(successCode => {
                //this.statusCode = successCode;
                
             });
          //  errorCode => this.statusCode = errorCode
             this.getEvents();
            // this.toClear();
    }

    forDelete(eId: number) {
        this.eventservice.deleteEvent(eId)
            .subscribe(successCode => {
                this.getEvents();

            },
            errorCode => this.statusCode = errorCode);

    }

    toClear() {
  //      alert("clear");
//        this.eId = null;
        this.userForm.reset();
    }

    toEdit(eId: number) {
        this.tobeupdated=eId;
        this.eventservice.getEvent(eId)
            .subscribe(data => {
                this.agendas1 = data;
                this.patchForm();
                console.log('data ??????????' + this.agendas1);
            });
    }
forupdate()
{
this.userForm = this._fb.group({
    agenda: this._fb.array([
 //this.initAddress(),
]),
eId: [this.tobeupdated],
name: [''],
email:['']

});
}

// console.log(this.myForm.controls['book']);
// console.log("*******" + JSON.stringify(this.myForm.value));
// this.bookCategoryService.updateBookCategory(this.tobeupdated, this.myForm.value)
// .subscribe(successCode => {
// //this.statusCode = successCode;
// this.getall();
// },
// errorCode => this.statusCode = errorCode);

// }

    toUpdate() {
        let user = JSON.stringify(this.userForm.value);
        // console.log(this.userForm.controls['agenda']);
        // console.log(user);
    
         this.eventservice.updateEvent(this.tobeupdated,this.userForm.value)
            .subscribe(sucesscode => {
             this.getEvents();
             this.toClear();
            },
            errorCode => this.statusCode = errorCode);
             

    }


    patchForm() {
        console.log("events...." + JSON.stringify(this.agendas1));

        this.forupdate();
        this.userForm.patchValue({
            eId: this.agendas1['eId'],
            name: this.agendas1['name'],
            email: this.agendas1['email'],
            agenda: this.agendas1['agenda'],

        })

        this.setExpenseCategories();
    }

    setExpenseCategories() {
       //this.clearArray();
        let control = <FormArray>this.userForm.controls['agenda'];
        this.agendas1['agenda'].forEach(x => {
            control.push(this._fb.group({ id: x.id, street: x.street, city: x.city, postalcode: x.postalcode }));


        })
    }
    public clearArray() {
        this.userForm.controls['agenda'] = this._fb.array([]);
    }

}

//    alert(this.agenda);
        //    let user=JSON.stringify(this.events.find(v => v.eId === v.eId).agenda.find(e=>e.id===e.id).street);
        //    alert(user);
        //    this.manipulateData();
        // manipulateData() {
//     this.events.forEach((x:any)=> { 
//       x.agenda.forEach((y:any) => { 
//         console.log(y.street)
//         //alert("test"+y.street);

//       })
//     })
// }
//  toEdit(eId: number) {

//       this.eventservice.getEvent(eId)
// 	      .subscribe(event => {
// 		            this.eId = event.eId;   
// 		            this.userForm.setValue({ eId:event.eId, name: event.name,email:event.email,agenda:event.agenda }); 
// 		    },
// 		    errorCode =>  this.statusCode = errorCode);   

//    }
