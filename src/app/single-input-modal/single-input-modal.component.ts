import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  modalDataEvent: EventEmitter<string> = new EventEmitter<string>();// created custom event

  handleContinue(): void {
    this.modalDataEvent.emit(this.modalData);
  }
}
