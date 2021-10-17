import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CurrentWord,
  HitStrikeParams,
  Score,
  Views,
  WorldLevel,
} from '../interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  //Voy a poner las palabras temporalmente
  words: string[][] = [
    [''],
    [
      'aged',
      'away',
      'desk',
      'gain',
      'acing',
      'famed',
      'alibi',
      'grief',
      'imply',
      'wrist',
    ],
    [
      'acnestis',
      'grommet',
      'meldrop',
      'octothorpe',
      'nauseant',
      'addend',
      'obelus',
      'agelast',
      'apricate',
      'behoove',
    ],
    [
      'wrest pin',
      'screwdriver set',
      'bike pump',
      'gaffer tape',
      'blu tack',
      'bulldog clip',
      'wrapping paper',
      'camping chair',
      'scratching post',
      'clothes pegs',
    ],
  ];

  views: Views = {
    appHeader: true,
    appScore: true,
    appWelcome: false,
    appCountdown: false,
    appRandomWord: true,
    appWordInput: false,
    appHitStrike: false,
    appGameOver: false,
  };
// //real params
//   views: Views = {
//     appHeader: false,
//     appScore: false,
//     appWelcome: true,
//     appCountdown: false,
//     appRandomWord: false,
//     appWordInput: false,
//     appHitStrike: false,
//     appGameOver: false,
//   };

  score: Score = {
    wordLevel: 1,
    playerLevel: 1,
    hits: 0,
    strikes: 0,
    finalResult:'',
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
  };

  currentWord: CurrentWord = {
    randomWord: 'Platzi',
    typedWord: '',
  };

  countDownTime: number = 3;

  countdownTimer$ = interval(1000).pipe(map((value) => 2 - value));

  countdownWord$ = interval(100);

  getWord = (level: number) => {
    const random = Math.floor(Math.random() * 10); //numero random del 0 al 9. No debería ser por 10 sino por el length del array
    console.log('Random number: ', random);
    this.currentWord.randomWord = this.words[level][random];
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
    const sub$ = this.countdownTimer$.subscribe({
      next: (value) => {
        console.log(value);
        this.countDownTime = value;
        if (value === 0) {
          sub$.unsubscribe();
          this.views.appCountdown = false;
          this.views.appRandomWord = true;
          const sub2$ = this.countdownWord$.subscribe({
            next: (value) => {
              console.log('Mostramos palabra: ', value);
              if (value === this.wordLevel[this.score.wordLevel].timeForWord) {
                sub2$.unsubscribe();
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
