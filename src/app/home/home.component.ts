import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  display:Number = 0
  Patient:any
  constructor() { }

  selectedPatient(patient:any){
    console.log('work')
    this.display = 1
    console.log(this.display)
    this.Patient = patient
  }

  ngOnInit(): void {
  }

}
