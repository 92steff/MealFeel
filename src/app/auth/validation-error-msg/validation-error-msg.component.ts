import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-error-msg',
  templateUrl: './validation-error-msg.component.html',
  styleUrls: ['./validation-error-msg.component.css']
})
export class ValidationErrorMsgComponent implements OnInit {
  @Input() displayErrorField:boolean;
  @Input() displayErrorMsg:boolean;
  @Input() errorMsg:string;

  constructor() { }

  ngOnInit() {
  }

}
