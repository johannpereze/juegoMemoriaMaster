import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
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
      'bakes',
      'width',
      'copra',
      'naval',
      'flees',
      'chief',
      'locks',
      'flour',
      'cored',
      'image',
      'solar',
      'bided',
      'adzes',
      'loops',
      'quick',
      'masks',
      'ankle',
      'heard',
      'cabal',
      'dotty',
      'fitly',
      'dizzy',
      'lying',
      'dados',
      'agony',
      'peaks',
      'cower',
      'snake',
      'trend',
      'bitsy',
      'egret',
      'cabby',
      'fable',
      'ounce',
      'cargo',
      'fauna',
      'verse',
      'pouch',
      'blitz',
      'axion',
      'faves',
      'dowse',
      'piles',
      'borer',
      'widow',
      'house',
      'stiff',
      'spray',
      'blast',
      'slate',
      'blues',
      'cause',
      'doors',
      'earns',
      'rates',
      'flask',
      'guilt',
      'write',
      'rises',
      'brisk',
      'rules',
      'agile',
      'cowls',
      'state',
      'tanks',
      'ethic',
      'fonts',
      'often',
      'fakir',
      'axiom',
      'drone',
      'bases',
      'limbs',
      'right',
      'caddy',
      'tasks',
      'drink',
      'apply',
      'coded',
      'drank',
      'bagel',
      'funny',
      'clear',
      'aside',
      'braid',
      'bulls',
      'dwarf',
    ],
    [
      'aboard',
      'tagged',
      'baffle',
      'comprise',
      'anions',
      'always',
      'hardly',
      'interest',
      'chickenpox',
      'hoping',
      'science',
      'blacks',
      'kindly',
      'cutter',
      'border',
      'worker',
      'canyon',
      'calves',
      'injury',
      'seconds',
      'bready',
      'bedroom',
      'blares',
      'violin',
      'medals',
      'intense',
      'saving',
      'barred',
      'opening',
      'thousand',
      'variant',
      'poison',
      'saints',
      'bangle',
      'highjacked',
      'balked',
      'worked',
      'interval',
      'license',
      'security',
      'probably',
      'beater',
      'cashes',
      'resident',
      'inspect',
      'teamed',
      'columns',
      'calmly',
      'bouncy',
      'spread',
      'almond',
      'carina',
      'agency',
      'vessel',
      'location',
      'orange',
      'handed',
      'settle',
      'cereal',
      'victoria',
      'scales',
      'stakes',
      'building',
      'honored',
      'custom',
      'arrived',
      'approval',
      'avenge',
      'drives',
      'versus',
      'criminal',
      'funnel',
      'margin',
      'buzzer',
      'system',
      'include',
      'bowmen',
      'couple',
      'series',
      'bawled',
      'complex',
      'origin',
      'forecast',
      'updated',
      'arisen',
      'enjoys',
      'fights',
      'beside',
      'knight',
      'basalt',
      'knowing',
      'ceiling',
      'upwards',
      'cheats',
      'astray',
      'broths',
      'median',
      'bunked',
      'beamed',
      'amoral',
    ],
    [
      'gut instinct',
      'crowd overflow',
      'mass transit',
      'makeup bag',
      'bird food',
      'strong odor',
      'lush ecosystem',
      'frightening monster',
      'brief overview',
      'immediate difference',
      'local newspaper',
      'chest bump',
      'colorful headbands',
      'new hairstyle',
      'riding pants',
      'dinner recipes',
      'balancing act',
      'diamond tiara',
      'designer luggage',
      'new friendship',
      'elegant attire',
      'docking station',
      'marvelous tricks',
      'handwritten manuscripts',
      'polar bear',
      'emmy nominations',
      'head nurse',
      'glittering crystals',
      'remarkable images',
      'flowing dresses',
      'ivory carvings',
      'passport wallet',
      'championship standing',
      'door prizes',
      'expired passports',
      'extinct volcanoes',
      'blood test',
      'funny caption',
      'animated emojis',
      'dyed wool',
      'huge reward',
      "cat's meow",
      'oil gauge',
      'medical research',
      'aerial ropeslides',
      'electronic billboard',
      'new concepts',
      'gold bullion',
      'samurai sword',
      'bumping heads',
      'crossword clues',
      'official report',
      'patriotic pride',
      'aerial acts',
      'scintillating conversation',
      'glamorous gown',
      'experimental aircraft',
      'lounge chair',
      'blurry lines',
      'copper tools',
      'eye makeup',
      'household chores',
      'black eyeliner',
      "fireman's axe",
      "children's books",
      'incredible view',
      'dial tone',
      'angle grinder',
      'military jeep',
      'secret identity',
      'stylish wardrobe',
      'asteroid belt',
      'beaded bracelet',
      'brush sets',
      'spark plug',
      'elastic waistband',
      'subject matter',
      'beach blanket',
      'fashionable attire',
      'active lifestyle',
      'favorite colors',
      'steady drumroll',
      'offbeat approach',
      'cheerful friendliness',
      'annual traditions',
      'archived publications',
      'edinburgh castle',
      'oversized umbrella',
      'bayberry candles',
      'irresistible smile',
      'bureau drawers',
      'family heirloom',
      'popular beliefs',
      'night hike',
      'dimensional art',
      'piping hot',
      'hybrid vehicle',
      'modest amount',
      'handmade leather',
      'bakers dozen',
    ],
  ];
  // //fake params to debug and write CSS
  // views: Views = {
  //   appHeader: true,
  //   appScore: true,
  //   appWelcome: false,
  //   appCountdown: false,
  //   appRandomWord: false,
  //   appWordInput: false,
  //   appHitStrike: false,
  //   appGameOver: true,
  // };

  //real params
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
    const random = Math.floor(Math.random() * this.words[level].length); //numero random del 0 al 9. No debería ser por 10 sino por el length del array
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
    this.sub$ = this.countdownTimer$.subscribe({
      next: (value) => {
        console.log(value);
        this.countDownTime = value;
        if (value === 0) {
          this.sub$!.unsubscribe();
          this.views.appCountdown = false;
          this.views.appRandomWord = true;
          this.sub2$ = this.countdownWord$.subscribe({
            next: (value) => {
              console.log('Mostramos palabra: ', value);
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
