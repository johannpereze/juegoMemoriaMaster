import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styles: [],
})
export class ScoreComponent {
  constructor(private gameService: GameService) {}

  get score(){
    return this.gameService.score
  }
}
