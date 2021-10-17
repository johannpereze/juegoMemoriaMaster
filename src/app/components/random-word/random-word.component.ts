import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-random-word',
  templateUrl: './random-word.component.html',
  styles: [],
})
export class RandomWordComponent {
  constructor(private gameService: GameService) {}

  get currentWord() {
    return this.gameService.currentWord;
  }
}
