import { Component, Input, OnInit } from '@angular/core';
import { MainButton } from '../../interface/interfaces';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styles: [],
})
export class MainButtonComponent {
  constructor(private gameService: GameService) {}

  @Input() mainButton: MainButton = {
    text: '',
    iconClass: '',
    action: () => {},
  };

  buttonAction(){
    this.mainButton.action()
  }
}
