import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileService } from '../Services/file.service';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-single-input-modal',
  templateUrl: './single-input-modal.component.html',
  styleUrls: ['./single-input-modal.component.css']
})
export class SingleInputModalComponent {
  modalData: string = "";
  @Input() heading: string = "";
  @Input() placeholder: string = "";

  @Output()
  modalDataEvent: EventEmitter<{
    userName: string;
    profileImageUrl: string
  }> = new EventEmitter<{
    userName: string;
    profileImageUrl: string
  }>();// created custom event

  userImageSrc: string = "../../assets/default-user.png";
  userImage: any;

  private fileService: FileService;
  public themeService: ThemeService;

  constructor(fileService: FileService, themeService: ThemeService){
    this.fileService = fileService;
    this.themeService = themeService;
  }

  handleContinue(): void {

    let fileService: FileService = this.fileService;

    let modalDataEvent: EventEmitter<{
      userName: string;
      profileImageUrl: string
    }> = this.modalDataEvent;

    let result: {
      userName: string;
      profileImageUrl: string
    } = {
      userName: this.modalData,
      profileImageUrl: ""
    }

    if(this.userImage){
      //create form data and append file in it
      const formData = new FormData();
      formData.append("myfile", this.userImage);

      //upload file
      fileService.uploadFile(formData)
      .subscribe({
        next(res: any) {
          console.log('File uploaded : ' + res);
          //get file information
          fileService.getFileInformation(res.file)
          .subscribe({
            next(res: any) {
              console.log('got file information ' + res);
              result.profileImageUrl = res.downloadLink;
              modalDataEvent.emit(result);
            },
            error(err) {
              console.error('something wrong occurred while getting file information: ' + err);
              modalDataEvent.emit(result);
            },
            complete() {
              console.log('done getting file information');
            }
          });
        },
        error(err) {
          console.error('something wrong occurred while uploading file: ' + err);
          modalDataEvent.emit(result);
        },
        complete() {
          console.log('done uploading file');
        }
      });
    }else{
      this.modalDataEvent.emit(result);
    }

    // this.modalDataEvent.emit(this.modalData);
  }

  handlUserImage(event: any): void {    
    if (event.target.files && event.target.files[0]) {
      this.userImage = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.userImageSrc = reader.result as string;

      reader.readAsDataURL(this.userImage);
    }
  }
}
