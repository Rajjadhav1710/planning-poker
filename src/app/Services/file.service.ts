import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { 

  }

  //upload file
  uploadFile(formData: any){
    console.log(formData);
    return this.http.post('https://incredible-file-sharing-webapp.onrender.com/api/files',formData)
  }

  //get file information
  getFileInformation(fileInfoURL: string){
    console.log(fileInfoURL);
    return this.http.get(fileInfoURL);        
  }
}
