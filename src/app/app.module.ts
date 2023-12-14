import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {QuizService} from "./core/service/QuizService";
import { LoaderComponent } from './core/components/loader/loader.component';
import { QuestionComponent } from './core/components/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    QuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
