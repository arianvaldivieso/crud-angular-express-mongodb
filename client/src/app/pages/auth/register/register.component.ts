import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

import { UserService } from './../../../services/user.service';
import { MessageValidationService } from './../../../services/message-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm:FormGroup;
	loading:boolean = false;
	success:boolean = false;


  constructor(
  	public _formBuilder:FormBuilder,
  	public _router:Router,
  	private _user:UserService,
  	public _messageValidation:MessageValidationService
  ) { }

  ngOnInit(): void {
  	this.generateForm();
  }

  generateForm(){
  	this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  store(){

  	this.loading = true;

  	this._user.saveUser(this.registerForm.value).subscribe((res:any) => {
  		console.log(res);

  		this.loading = false;

  		if (res.data) {
  			this.success = true
  		}
  		
  		this.registerForm.reset();

  		this._router.navigateByUrl('/login');
  	})
  }

  

}
