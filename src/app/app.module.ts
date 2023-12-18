import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {QuizService} from "./core/service/QuizService";
import { LoaderComponent } from './core/components/loader/loader.component';
import { QuestionComponent } from './core/components/question/question.component';
import {Highlight, HIGHLIGHT_OPTIONS} from "ngx-highlightjs";
import { LooseScreenComponent } from './core/components/loose-screen/loose-screen.component';
import { GameInputsComponent } from './core/components/game-inputs/game-inputs.component';
import { InformationListComponent } from './core/components/information-list/information-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    QuestionComponent,
    LooseScreenComponent,
    GameInputsComponent,
    InformationListComponent
  ],
  imports: [
    BrowserModule,
    Highlight
  ],
  providers: [
    QuizService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
