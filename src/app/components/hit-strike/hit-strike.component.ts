import { Component } from '@angular/core';
import { HitStrikeParams, MainButton } from 'src/app/interface/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-hit-strike',
  templateUrl: './hit-strike.component.html',
  styles: [],
})
export class HitStrikeComponent {
  constructor(private gameService: GameService) {}

  get countdown() {
    return this.gameService.countdown;
  }
  get getWord() {
    return this.gameService.getWord;
  }
  get hitStrikeParams() {
    return this.gameService.hitStrikeParams;
  }
  get wordLevel() {
    return this.gameService.score.wordLevel;
  }

  gameResume() {
    this.gameService.views.appCountdown = true;
    this.gameService.views.appHitStrike = false;
    this.getWord(this.wordLevel);
    this.countdown();
    this.gameService.currentWord.typedWord = '';
  }



  mainButton: MainButton = {
    text: 'Continue',
    iconClass: 'main-button__icon--arrow-right-circle',
    action: () => {
      this.gameResume();
    },
  };
}
