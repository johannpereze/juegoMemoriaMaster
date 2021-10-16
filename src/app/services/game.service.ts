import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Score, Views, WorldLevel } from '../interface/interfaces';

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

  score: Score = {
    wordLevel: 1,
    playerLevel: 1,
    hits: 0,
    strikes: 0,
  };

  currentWord:string = 'platzi';

  countDownTime: number = 3;

  countdownTimer$ = interval(1000).pipe(map((value) => 2 - value));
  countdownWord$ = interval(100);

  wordLevel: WorldLevel[] = [
    {
      //This object takes index 0, so the other indexes match the wordLevel
      numberOfWords: 0,
      minNumberOfLeters: 0,
      maxNumberOfLeters: 0,
      timeForWord: 0,
    },
    {
      numberOfWords: 1,
      minNumberOfLeters: 3,
      maxNumberOfLeters: 5,
      timeForWord: 15, //hundredths of a second
    },
    {
      numberOfWords: 1,
      minNumberOfLeters: 5,
      maxNumberOfLeters: 10,
      timeForWord: 10, //hundredths of a second
    },
    {
      numberOfWords: 2,
      minNumberOfLeters: 3,
      maxNumberOfLeters: 10,
      timeForWord: 9, //hundredths of a second
    },
  ];
}
