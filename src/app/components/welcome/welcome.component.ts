import { Component } from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [],
})
export class WelcomeComponent {
  constructor(private gameService: GameService) {}

  get wordLevel() {
    return this.gameService.score.wordLevel;
  }
  get countdown() {
    return this.gameService.countdown;
  }
  get getWord() {
    return this.gameService.getWord;
  }
  get gameStart() {
    return this.gameService.gameStart;
  }

  mainButton: MainButton = {
    text: 'Game Start',
    iconClass: 'main-button__icon--arrow-right-circle',
    action: () => {
      this.gameStart();
    },
  };
}
