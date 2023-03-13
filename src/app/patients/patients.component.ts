import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service'
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  outputs:['selectedPatient']
})
export class PatientsComponent implements OnInit {

  display:number=0
  patients:Array<any> = []
  selectedPatient = new EventEmitter()

  addPatientForm:FormGroup
  constructor(private authService:AuthService,private formBuilder:FormBuilder) { }

  openPatientForm(){
    this.display = 1
  }

  closePatientForm(){
    this.display = 0
  }
  choosePatient(patient:any){
    this.selectedPatient.emit(patient)
  }

  addPatient(){
    console.log(this.addPatientForm)
    this.addPatientForm.reset()
  }

  ngOnInit(): void {
    this.authService.getPatient().subscribe(
      (patient:any)=>{
        this.patients = patient
      }
    )

    this.addPatientForm = this.formBuilder.group({

      name:[null,[Validators.required]]

    })

  }

}
