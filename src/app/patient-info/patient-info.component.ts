import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service'

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css'],
  inputs:['selectedPatient']
})
export class PatientInfoComponent implements OnInit {

  patient:any = []
  selectedPatient:any
  display:Number = 0
  cardDisplay:Number = 0
  updatePatientForm:FormGroup
  constructor(private authService:AuthService,private formBuilder:FormBuilder) { }

  editPatient(){
    this.display = 1
  }

  displayCard(){
    this.display = 0
    this.cardDisplay = 0
  }

  casePicture(){
    this.cardDisplay = 5
  }

  updatePatient(){
    console.log(this.updatePatientForm)
  }

  closePatientForm(){
    this.display = 0
  }

  gridView(){
    var casePictureView:any = document.querySelector('.case-picture-view');
    casePictureView.style.flexDirection='row'
    var casePictureTitle:any = document.querySelectorAll('.case-picture-text')
    for(var i=0;i<casePictureTitle.length;i++){
      casePictureTitle[i].style.display='none'
    }
    console.log('grid')
  }
  listView(){
    var casePictureView:any = document.querySelector('.case-picture-view');
    casePictureView.style.flexDirection='column'
    var casePictureTitle:any = document.querySelectorAll('.case-picture-text')
    for(var i=0;i<casePictureTitle.length;i++){
      casePictureTitle[i].style.display='block'
    }
    console.log('list')
  }

  ngOnInit(): void {
    console.log(this.display)
    this.authService.getPatientById(this.selectedPatient.patientId).subscribe(
      (patient:any)=>{
        this.patient = patient
        console.log(patient)
      }
    )

      this.updatePatientForm = this.formBuilder.group({
        firstName:[null,Validators.required],
        middleName:[null],
        lastName:[null,Validators.required],
        age:[null,Validators.required],
        gender:[null,Validators.required],
        mobileNumber:[null,Validators.required],
        apartment:[null,Validators.required],
        street:[null,Validators.required],
        city:[null,Validators.required],
        state:[null,Validators.required],
        pincode:[null,Validators.required],
        nationality:[null,Validators.required],
        profilepic:[null,Validators.required],
        })

  }

}
