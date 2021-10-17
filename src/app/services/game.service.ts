import { Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CurrentWord,
  HitStrikeParams,
  Score,
  Views,
  Words,
  WorldLevel,
} from '../interface/interfaces';

import data from '../../db/db.json';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  words: Words = data;

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
    gameOutcomeImg: '',
  };

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

  hitStrikeParams: HitStrikeParams = {
    message: '',
    iconClass: '',
    textClass: '',
  };

  currentWord: CurrentWord = {
    randomWord: '',
    typedWord: '',
  };

  sub$: Subscription | undefined;
  sub2$: Subscription | undefined;

  countDownTime: number = 3;
  countdownTimer$ = interval(1000).pipe(map((value) => 2 - value));
  countdownWord$ = interval(100);

  getWord = (level: number) => {
    const random = Math.floor(Math.random() * this.words.data[level].length);
    // console.log('Random number: ', random);
    this.currentWord.randomWord = this.words.data[level][random];
  };

  gameStart = () => {
    this.score.wordLevel = 1;
    this.score.playerLevel = 1;
    this.score.hits = 0;
    this.score.strikes = 0;
    this.views.appWelcome = false;
    this.views.appCountdown = true;
    this.views.appHeader = true;
    this.views.appScore = true;
    this.views.appGameOver = false;
    this.getWord(this.score.wordLevel);
    this.countdown();
  };

  //Tengo que refactorizar esta función tan fea
  countdown = () => {
    //Tiene que ser arrowFunction para mantener el contexto de gameservice así lo llame en otro componente. ¿Es mala práctica?
    this.sub$ = this.countdownTimer$.subscribe({
      next: (value) => {
        console.log('Countdown time: ', value);
        this.countDownTime = value;
        if (value === 0) {
          this.sub$!.unsubscribe();
          this.views.appCountdown = false;
          this.views.appRandomWord = true;
          this.sub2$ = this.countdownWord$.subscribe({
            next: (value) => {
              console.log('Waiting time: ', value);
              if (value === this.wordLevel[this.score.wordLevel].timeForWord) {
                this.sub2$!.unsubscribe();
                this.views.appRandomWord = false;

                this.views.appWordInput = true;
              }
            },
            complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
          });
        }
      },
      complete: () => console.log('complete'), //OJO, NO SE ESTÁ COMPLETANDO ESTE OBSERVABLE
    });
  };
}
