import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { CommonFunctionsService } from '../../sheared/index';
import { AppService } from '../../app.component.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({  selector: 'app-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
submitted = false;
result;
loginForm:FormGroup;
constructor(
  private appService:AppService,
  private commonFunctions: CommonFunctionsService,
  private router: Router,
  private toastr: ToastrService
){}
ngOnInit(){
	this.initForm();
}
initForm(){
	this.loginForm = new FormGroup({
      email:new FormControl('', [
        Validators.required,
        Validators.pattern(this.commonFunctions.emailRegex)
      ]),
      password: new FormControl('',[
        Validators.required
        ])
    })
}
login():void{
  this.submitted = true;
  if(this.loginForm.valid){
    let control = this.loginForm.controls;
    var user={
      'email_id':control.email.value,
      'password':control.password.value
    }
	this.appService.adminLoginForm(user).subscribe((data)=>{
		console.log(data);
    console.log(user)
		this.result = data;
		if(this.result.responseCode != 200){  
   	 	this.toastr.warning(data.responseMessage);
		}else{
    localStorage.setItem('token', JSON.stringify(this.result.token));
    this.toastr.success("Login Successfully");
		this.router.navigate(['/admin-home/overview']);
		}
	},(error)=>{
    console.log(error);
		this.toastr.warning("Invalid Email or Password");
	})
   	}
  }
}
