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

  gameStart() {
    this.gameService.views.appWelcome = false;
    this.gameService.views.appCountdown = true;
    this.gameService.views.appHeader = true;
    this.gameService.views.appScore = true;
    this.getWord(this.wordLevel);
    this.countdown();
  }

  getWord(level: number) {
    const random = Math.floor(Math.random() * 10); //numero random del 0 al 9. No debería ser por 10 sino por el length del array
    console.log('Random number: ', random);
    this.gameService.currentWord.randomWord =
      this.gameService.words[level][random];
  }

  // countdown() { //Tengo que refactorizar esta función tan fea
  //   const sub$ = this.gameService.countdownTimer$.subscribe({
  //     next: (value) => {
  //       console.log(value);
  //       this.gameService.countDownTime = value;
  //       if (value === 0) {
  //         sub$.unsubscribe();
  //         this.gameService.views.appCountdown = false;
  //         this.gameService.views.appRandomWord = true;
  //         const sub2$ = this.gameService.countdownWord$.subscribe({
  //           next: (value) => {
  //             console.log('Mostramos palabra: ', value);
  //             if (
  //               value === this.gameService.wordLevel[this.wordLevel].timeForWord
  //             ) {
  //               sub2$.unsubscribe();
  //               this.gameService.views.appRandomWord = false;
  //               this.gameService.views.appWordInput = true;
  //             }
  //           },
  //           complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
  //         });
  //       }
  //     },
  //     complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
  //   });
  // }

  mainButton: MainButton = {
    text: 'Game Start',
    iconClass: 'main-button__icon--arrow-right-circle',
    action: () => {
      this.gameStart();
    },
  };
}
