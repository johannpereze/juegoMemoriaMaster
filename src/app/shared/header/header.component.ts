import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private gameService: GameService) {}

  get isWelcomeVisible(){
    return this.gameService.views.appWelcome
  }

  exit() {
    this.gameService.score.wordLevel = 1;
    this.gameService.score.playerLevel = 1;
    this.gameService.score.hits = 0;
    this.gameService.score.strikes = 0;
    this.gameService.countDownTime = 3;
    this.gameService.views.appHeader = false;
    this.gameService.views.appScore = false;
    this.gameService.views.appWelcome = true;
    this.gameService.views.appCountdown = false;
    this.gameService.views.appRandomWord = false;
    this.gameService.views.appWordInput = false;
    this.gameService.views.appHitStrike = false;
    this.gameService.views.appGameOver = false;
    this.gameService.sub$?.unsubscribe();
    this.gameService.sub2$?.unsubscribe();
  }
}
