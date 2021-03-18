import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';

import { UserService } from './../../../services/user.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MessageValidationService } from './../../../services/message-validation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
	loading:boolean = false;
	success:boolean = false;
	error:boolean = false;

	last_login:string;

	user = false;


  constructor(
  	public _formBuilder:FormBuilder,
  	public _router:Router,

  	private _storage:StorageMap,


  	private _user:UserService,
  	public _messageValidation:MessageValidationService
  ) { }

  ngOnInit(): void {
  	this.generateForm();
  }

  generateForm(){
  	this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  login(){
  	this.loading = true;

  	this._user.login(this.loginForm.value).subscribe((res:any) => {
  		console.log(res);

  		this.loading = false;

  		if (res.data) {
  			this.success = true;
  			this.user = res.data;
  			this.last_login = res.last_login;
  		}

  		
  	},(error) => {
  		this.error = true;
  		this.loading = false;
  	})
  }

}
