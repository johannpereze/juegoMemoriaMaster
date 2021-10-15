import { Component } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private gameService: GameService){}

  get views(){
    return this.gameService.views
  }

  title = 'Masters: Memory Game';
}
