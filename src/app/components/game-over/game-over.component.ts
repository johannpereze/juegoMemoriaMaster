import { Component } from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styles: [],
})
export class GameOverComponent {
  constructor(private gameService: GameService) {}

  get gameStart() {
    return this.gameService.gameStart;
  }

  get gameOutcomeImg() {
    return this.gameService.score.gameOutcomeImg;
  }

  mainButton: MainButton = {
    text: 'Play again',
    iconClass: 'main-button__icon--play-again',
    action: () => {
      this.gameStart();
    },
  };
}
