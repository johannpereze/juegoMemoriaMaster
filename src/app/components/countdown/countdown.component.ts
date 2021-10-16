import { Component } from '@angular/core';
import { MainButton } from 'src/app/interface/interfaces';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styles: [
  ]
})
export class CountdownComponent {

  constructor(private gameService: GameService) { }

  get countDownTime(){
    return this.gameService.countDownTime
  }

  mainButton: MainButton = {
    text: 'Game Start',
    iconClass: 'main-button__icon--arrow-right-circle',
    action: ()=>{
      this.gameService.views.appWelcome = false
      this.gameService.views.appCountdown = true
    }
  }



}
