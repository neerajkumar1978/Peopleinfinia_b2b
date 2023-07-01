import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { AppService } from '../../app.component.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
changePasswordForm: FormGroup;
changeSubmitted= false;
activeHead;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.initChangePassword();

  }
onChangePassword() {
    //this.changeSubmitted = true;
    var control = this.changePasswordForm.controls;
    if (this.changePasswordForm.valid && control.password.value == control.confirmPassword.value) {
      var form = {
        "oldPassword": control.oldPassword.value,
        "newPassword": control.password.value,
      }
      console.log(form);
      // this.appService.changePassword(JSON.parse(this.userID),form).subscribe((data)=>{
      //  this.toastr.success("Change Password Successfully");
      //   console.log(data);
      // },(err)=>{
      // this.toastr.success("Invalid Password");
      //   console.log(err);
      // })
    }
  }
initChangePassword(){
  this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('',Validators.required),
       });
}
logout(){
  localStorage.removeItem('loginSessId');
  localStorage.removeItem('token');
  window.location.href = 'https://peopleinfinia.com';
  // this.router.navigate(['/login']);

}
}
