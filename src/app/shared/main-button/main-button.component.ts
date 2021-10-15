import { Component, Input, OnInit } from '@angular/core';
import { MainButton } from '../../interface/interfaces';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styles: [],
})
export class MainButtonComponent implements OnInit {
  @Input() mainButton: MainButton = {
    text: '',
    icon: '',
  };
  constructor() {}

  ngOnInit(): void {}
}
