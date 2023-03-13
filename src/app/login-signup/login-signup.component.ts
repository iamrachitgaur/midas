import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../service/auth.service'

import {RouteDeactiveGuard} from '../guard/route-deactive.guard'

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,private authService:AuthService) { }

  params:any
  signupForm:FormGroup
  loginForm:FormGroup



  loginSignupForm(){
   if(this.params == "login"){
     console.log('login')
    this.authService.userSignin(this.loginForm.value).subscribe((user:any)=>{
        localStorage.setItem('token',`Bearer ${user.token}`)
        this.router.navigate(['/'])
      },(error)=>{
        console.log(error)
      })
    }
    
    
    else{

      this.authService.userSignup(this.signupForm.value).subscribe((user:any)=>{
        localStorage.setItem('token',`Bearer ${user.token}`) 
        this.router.navigate(['/'])
      },(error)=>{
        console.log(error)
      })
    }
  }
  ngOnInit(): void {

    this.route.url.subscribe((url)=>{
       url.forEach((url)=>{
        if(url.path == "login"){
          return this.params = url.path
        }
        else{
          return this.params = "signup"
        }
      }) 
    })

    this.signupForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      email:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(6)]]
    })

    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required]],
      password:[null,[Validators.required,Validators.minLength(6)]]
    })

  }



}
