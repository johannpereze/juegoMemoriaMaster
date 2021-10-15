import { Injectable } from '@angular/core';
import { Views } from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  views: Views = {
    appHeader: false,
    appScore: false,
    appWelcome: true,
    appCountdown: false,
    appRandomWord: false,
    appWordInput: false,
    appHitStrike: false,
    appGameOver: false,
  };
}
