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

  levelUp() {
    this.gameService.score.wordLevel++;
    this.gameService.score.playerLevel++;
    this.gameService.score.strikes = 0;
    this.gameService.score.hits = 0;
  }

  checkWordParity(): boolean {
    return this.currentWord.typedWord.toLowerCase().trim() ===
      this.currentWord.randomWord
      ? true
      : false;
  }

  hit(){
    console.log('ganas punto');
    this.gameService.score.wordLevel = this.gameService.score.playerLevel;
    this.gameService.score.hits++; //Quisiera hacer un getter para no escribir tan largo pero me dice read only
  }

  // set currentWord(word) {
  //   this.gameService.currentWord = word;
  // } //No lo necesito (creo)

  mainButton: MainButton = {
    text: 'Check',
    iconClass: 'main-button__icon--check-circle',
    action: () => {
      console.log(this.currentWord.typedWord);
      if (this.checkWordParity()) {
        this.hit()
        if (this.gameService.score.hits === 3) {
          this.levelUp;
        }
      } else {
        console.log('Pierdes');
        this.gameService.score.strikes++;
      }
    },
  };

  // checkWord(event: any) {
  //   console.log(event);
  //   console.log(this.currentWord.typedWord);
  // }
}
