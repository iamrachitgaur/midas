import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  userSignup(user:any){
    return this.http.post('/userApi/userSignup',user)
  }

  userSignin(user:any){
    return this.http.post('/userApi/userSignin',user)
  }

  verifyUser():boolean{ 
    return !!localStorage.getItem('token')
  }

  getPatient(){
    return this.http.get('/patientApi/patient')
  }

  getPatientById(id:Number){
    return this.http.get('/patientApi/patient/'+id)
  }

}
