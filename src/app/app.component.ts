import {Component} from '@angular/core';
import {QuizService} from "./core/service/QuizService";
import {Question} from "./core/types/question";
import {QuizSettings} from "./core/types/settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inGame = false
  question: null | Question = null
  score = 0
  looseScreen = false
  settings: QuizSettings = {topic: "", model: "gpt-3.5-turbo", apiSecret: ""}

  constructor(private quizService: QuizService) {}

  onQuestion(question: Question) {
    console.log(question)
    this.question = question
  }

  onStart(settings: any) {
    this.settings = settings
    this.startGame()
  }

  startGame() {
    this.looseScreen = false
    this.inGame = true
    this.score = 0

    this.quizService.subscribe(this.onQuestion.bind(this))

    document.getElementById("ask-main")?.classList.add("top")

    this.triggerNewQuestion()
  }

  triggerNewQuestion() {
    this.quizService.triggerNewQuestion(this.settings.topic, this.settings.model, this.settings.apiSecret)
  }

  validateAnswer(answer: boolean) {
    this.question = null

    if (answer) {
      this.score++
      this.triggerNewQuestion()

      return
    }

    this.inGame = false
    this.looseScreen = true
  }

  restart() {
    this.startGame()
  }

  reset() {
    this.looseScreen = false
    this.score = 0

    this.quizService.clearAlreadyAskedQuestions()

    document.getElementById("ask-main")?.classList.remove("top")
  }
}
