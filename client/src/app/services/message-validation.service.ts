import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageValidationService {

  constructor() { }

  getError(controlName: string,form,key:any = false): string {
	  let error:any = false;
	  const control = form.get(controlName);
	  if (control.touched && control.errors != null) {
	    error = (control.errors);
	  }

	  key = (!key) ? controlName : key;


	  if (error.required) {
	  	error =  `${key} es un campo requerido`
	  }

	  if (error.email) {
	  	error =  `${key} tiene que ser un email valido`
	  }

	  if (error.minlength) {
	  	error = `${key} debe tener almenos ${error.minlength.requiredLength} caracteres`
	  }

	  return error;

	}
}
