export interface Views {
  appHeader: boolean;
  appScore: boolean;
  appWelcome: boolean;
  appCountdown: boolean;
  appRandomWord: boolean;
  appWordInput: boolean;
  appHitStrike: boolean;
  appGameOver: boolean;
}

export interface MainButton {
  text: string;
  iconClass: string;
  action: (event?: Event) => void;
}

export interface WorldLevel {
  numberOfWords: number;
  minNumberOfLeters: number;
  maxNumberOfLeters: number;
  timeForWord: number;
}

export interface Score {
  wordLevel: number;
  playerLevel: number;
  hits: number;
  strikes: number;
  finalResult: string;
}

export interface CurrentWord {
  randomWord: string;
  typedWord: string;
}

export interface HitStrikeParams {
  message: string;
  iconClass: string;
}
