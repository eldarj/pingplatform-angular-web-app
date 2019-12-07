import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBaseHelper} from '../../component-base-helpers/form.base.helper';

@Component({
  selector: 'app-mat-form',
  templateUrl: './mat-form.component.html',
  styleUrls: ['./mat-form.component.scss']
})
export class MatFormComponent implements OnInit {
  @Input() baseFormHelper: FormBaseHelper;

  @Input() title: string;

  @Input() submitLabel = 'Go';
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();

  @Input() actionLabel = 'Action';
  @Output() actionEvent: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
