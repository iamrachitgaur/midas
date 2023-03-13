import { Component, OnInit } from '@angular/core';
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
  constructor(private authService:AuthService) { }

  displayCard(){
    this.display = 0
  }

  casePicture(){
    this.display = 1
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
    this.authService.getPatientById(this.selectedPatient.patientId).subscribe(
      (patient:any)=>{
        this.patient = patient
        console.log(patient)
      }
    )

  }

}
