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
  apiSecret = ""

  constructor(private quizService: QuizService) {}

  onQuestion(question: Question) {
    console.log(question)
    this.question = question
  }

  startGame() {
    this.looseScreen = false
    this.inGame = true
    this.score = 0

    this.quizService.subscribe(this.onQuestion.bind(this))

    let topicInput = document.getElementById("input-topic")
    if (topicInput && topicInput.tagName == "INPUT") {
      this.topic = (topicInput as HTMLInputElement).value
    }

    let modelSelect = document.getElementById("select-model")
    if (modelSelect && modelSelect.tagName == "SELECT") {
      this.model = (modelSelect as HTMLSelectElement).value as AllowedModels
    }

    let apiSecretInput = document.getElementById("input-api-secret")
    if (apiSecretInput && apiSecretInput.tagName == "INPUT") {
      this.apiSecret = (apiSecretInput as HTMLInputElement).value
    }

    this.displayInputs("none")
    this.displayInformation("block")

    document.getElementById("ask-main")?.classList.add("top")

    this.triggerNewQuestion()
  }

  triggerNewQuestion() {
    this.quizService.triggerNewQuestion(this.topic, this.model, this.apiSecret)
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
    this.topic = ""
    this.question = null

    this.quizService.clearAlreadyAskedQuestions()

    this.displayInputs("block")
    this.displayInformation("none")

    document.getElementById("ask-main")?.classList.remove("top")
  }

  displayInputs(type: string) {
    let inputs = document.getElementById("inputs")
    if (inputs) {
      inputs.style.display = type
    }
  }

  displayInformation(type: string) {
    let information = document.getElementById("information")
    if (information) {
      information.style.display = type
    }
  }
}
