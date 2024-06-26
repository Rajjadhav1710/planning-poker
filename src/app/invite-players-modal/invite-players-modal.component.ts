import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmailService } from '../Services/email.service';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-invite-players-modal',
  templateUrl: './invite-players-modal.component.html',
  styleUrls: ['./invite-players-modal.component.css']
})
export class InvitePlayersModalComponent {
  @Input() inviteLink: string = "";
  @Input() inviteCode: string = "";

  @Output()
  closeInvitePlayersModalEvent: EventEmitter<any> = new EventEmitter<any>();// created custom event

  sendEmailBtnText: string = "Send";

  private emailService: EmailService;

  public themeService: ThemeService;

  constructor(emailService: EmailService,themeService: ThemeService){
    this.emailService = emailService;
    this.themeService = themeService;
  }

  copyContentToClipboard(htmlElement: any): void {
    // Select the text field
    htmlElement.select();
    htmlElement.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(htmlElement.value);

    // Alert the copied text
    // alert("Copied the text: " + htmlElement.value);
  }

  sendMail(emailForm: any){
    console.log(emailForm);

    this.sendEmailBtnText = "Sent";

    let mailInfo = {
      roomPageLink: this.inviteLink,
      emailTo: emailForm.value.receiverEmail,
      emailFrom: emailForm.value.senderEmail
    }
    
    this.emailService.sendMail(mailInfo)
    .subscribe({
      next(res) {
        console.log('got response ' + res);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      }
    });
  }

  closeInvitePlayersModal(){
    this.closeInvitePlayersModalEvent.emit();
  }
}
