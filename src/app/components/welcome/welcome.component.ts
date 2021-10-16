import { Component} from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styles: [],
})
export class WelcomeComponent {
  constructor(private gameService: GameService) {}

  getWord(level:number){
    const random = Math.round(Math.random()*10)
    this.gameService.currentWord.randomWord = this.gameService.words[level][random]
  }

  level: number = this.gameService.score.wordLevel; //esto lo debo traer desde el servicio

  mainButton: MainButton = {
    text: 'Game Start',
    iconClass: 'main-button__icon--arrow-right-circle',
    action: () => {
      this.gameService.views.appWelcome = false;
      this.gameService.views.appCountdown = true;
      this.gameService.views.appHeader = true;
      this.gameService.views.appScore = true;
      this.getWord(this.level)
      const sub$ = this.gameService.countdownTimer$.subscribe({
        next: (value) => {
          console.log(value);
          this.gameService.countDownTime = value;
          if (value === 0) {
            sub$.unsubscribe();
            this.gameService.views.appCountdown = false;
            this.gameService.views.appRandomWord = true;
            const sub2$ = this.gameService.countdownWord$.subscribe({
              next: (value) => {
                console.log('Mostramos palabra: ', value);
                if (
                  value === this.gameService.wordLevel[this.level].timeForWord
                ) {
                  sub2$.unsubscribe();
                  this.gameService.views.appRandomWord = false;
                  this.gameService.views.appWordInput = true;
                }
              },
              complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
            });
          }
        },
        complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
      });
    },
  };
}
