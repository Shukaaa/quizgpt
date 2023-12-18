import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {QuizService} from "./core/service/QuizService";
import { LoaderComponent } from './core/components/loader/loader.component';
import { QuestionComponent } from './core/components/question/question.component';
import {Highlight} from "ngx-highlightjs";
import { LooseScreenComponent } from './core/components/loose-screen/loose-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    QuestionComponent,
    LooseScreenComponent
  ],
  imports: [
    BrowserModule,
    Highlight
  ],
  providers: [
    QuizService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
