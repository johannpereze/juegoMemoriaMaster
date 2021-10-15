import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RandomWordComponent } from './components/random-word/random-word.component';
import { WordInputComponent } from './components/word-input/word-input.component';
import { HitStrikeComponent } from './components/hit-strike/hit-strike.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { HeaderComponent } from './shared/header/header.component';
import { ScoreComponent } from './shared/score/score.component';
import { MainButtonComponent } from './shared/main-button/main-button.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CountdownComponent,
    RandomWordComponent,
    WordInputComponent,
    HitStrikeComponent,
    GameOverComponent,
    HeaderComponent,
    ScoreComponent,
    MainButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
