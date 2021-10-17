import { Component } from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-word-input',
  templateUrl: './word-input.component.html',
  styles: [],
})
export class WordInputComponent {
  constructor(private gameService: GameService) {}

  get currentWord() {
    return this.gameService.currentWord;
  }
  get countdown() {
    return this.gameService.countdown;
  }
  get getWord() {
    return this.gameService.getWord;
  }
  get wordLevel() {
    return this.gameService.score.wordLevel;
  }

  levelUp() {
    console.log('LEVEL UP!');
    this.gameService.score.wordLevel++;
    this.gameService.score.playerLevel++;
    this.gameService.score.strikes = 0;
    this.gameService.score.hits = 0;
  }

  winner() {
    console.log('WINNER!');
    this.gameService.views.appHitStrike = false
    this.gameService.views.appGameOver = true
    this.gameService.score.finalResult = "!YOU WIN!"
  }

  gameOver() {
    console.log('LOSER!');
    this.gameService.views.appHitStrike = false
    this.gameService.views.appGameOver = true
    this.gameService.score.finalResult = "!GAME OVER!"
  }

  wordsAreEqual(): boolean {
    return this.currentWord.typedWord.toLowerCase().trim() ===
      this.currentWord.randomWord
      ? true
      : false;
  }

  showResult() {
    this.gameService.views.appWordInput = false;
  }

  hit() {
    console.log('HIT!');
    this.gameService.score.wordLevel = this.gameService.score.playerLevel;
    this.gameService.score.hits++; //Quisiera hacer un getter para no escribir tan largo pero me dice read only
    this.gameService.views.appHitStrike = true;
    this.gameService.hitStrikeParams.message = 'HIT!';
    this.gameService.hitStrikeParams.iconClass = 'hitStrike__icon--hit';
    this.gameService.hitStrikeParams.textClass = 'box-1--hit';
    this.showResult();
  }

  strike() {
    console.log('STRIKE!');
    this.gameService.score.strikes++;
    if (this.gameService.score.wordLevel !== 1) {
      this.gameService.score.wordLevel--;
    }
    this.gameService.views.appHitStrike = true;
    this.gameService.hitStrikeParams.message = 'STRIKE!';
    this.gameService.hitStrikeParams.iconClass = 'hitStrike__icon--strike';
    this.gameService.hitStrikeParams.textClass = 'box-1--strike';
    this.showResult();
  }

  check() {
    console.log(this.currentWord.typedWord);
    if (this.wordsAreEqual()) {
      this.hit();
      if (this.gameService.score.hits === 3) {
        this.levelUp();
        if (this.gameService.score.playerLevel > 3) {
          this.gameService.score.playerLevel = 3
          this.winner();
        }
      }
    } else {
      this.strike();
      if (this.gameService.score.strikes > 2){
        this.gameOver()
      }
    }
  }

  mainButton: MainButton = {
    text: 'Check',
    iconClass: 'main-button__icon--check-circle',
    action: () => {
      this.check();
    },
  };

  // checkWord(event: any) {
  //   console.log(event);
  //   console.log(this.currentWord.typedWord);
  // }
}
