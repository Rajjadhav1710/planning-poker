import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { 

  }

  //send mail
  sendMail( mailInfo : {
    roomPageLink: string,
    emailTo: string,
    emailFrom: string
  }){
    console.log(mailInfo);
    return this.http.post('http://localhost:3000/api/email', mailInfo);
  }
}
