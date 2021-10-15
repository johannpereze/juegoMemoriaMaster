import { Component, OnInit } from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [
  ]
})
export class WelcomeComponent{

  constructor(private gameService: GameService) { }

  mainButton: MainButton = {
    text: 'Game Start',
    iconClass: 'main-button__icon--arrow-right-circle'
  }

}
