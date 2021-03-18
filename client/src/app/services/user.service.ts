import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment} from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

	apiUrl:string = `${environment.apiUrl}/users`;

  constructor(
  	private http: HttpClient
  ) { }


	saveUser(data) {
	  return this.http.post(`${this.apiUrl}`,data);
	}

	login(data) {
	  return this.http.post(`${this.apiUrl}/login`,data);
	}
}
