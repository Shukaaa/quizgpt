import {Component} from '@angular/core';
import {QuizService} from "./core/service/QuizService";
import {Question} from "./core/types/question";
import {AllowedModels} from "./core/types/allowed-models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  topic = ""
  inGame = false
  question: null | Question = null
  score = 0
  looseScreen = false
  model: AllowedModels = "gpt-3.5-turbo"

  constructor(private quizService: QuizService) {}

  onQuestion(question: Question) {
    console.log(question)
    this.question = question
  }

  startGame() {
    this.quizService.subscribe(this.onQuestion.bind(this))
    this.looseScreen = false
    this.score = 0

    let topicInput = document.getElementById("input-topic")
    if (topicInput && topicInput.tagName == "INPUT") {
      this.topic = (topicInput as HTMLInputElement).value
    }

    let modelSelect = document.getElementById("select-model")
    if (modelSelect && modelSelect.tagName == "SELECT") {
      this.model = (modelSelect as HTMLSelectElement).value as AllowedModels
    }

    let inputs = document.getElementById("inputs")
    if (inputs) {
      inputs.style.display = "none"
    }

    let information = document.getElementById("information")
    if (information) {
      information.style.display = "block"
    }

    document.getElementById("ask-main")?.classList.add("top")

    this.inGame = true
    this.triggerNewQuestion()
  }

  triggerNewQuestion() {
    this.quizService.triggerNewQuestion(this.topic, this.model)
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

    let topicText = document.getElementById("topic-text")

    if (topicText) {
      topicText.innerHTML = "change topic"
    }
  }

  restart() {
    this.startGame()
  }

  reset() {
    this.inGame = false
    this.looseScreen = false
    this.score = 0
    this.topic = ""
    this.question = null

    let inputs = document.getElementById("inputs")
    if (inputs) {
      inputs.style.display = "block"
    }

    let information = document.getElementById("information")
    if (information) {
      information.style.display = "none"
    }

    document.getElementById("ask-main")?.classList.remove("top")
  }
}
