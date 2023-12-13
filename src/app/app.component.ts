import { Component } from '@angular/core';
import {QuizService} from "./core/service/QuizService";
import {Question} from "./core/types/question";

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

  constructor(private quizService: QuizService) {}

  onQuestion(question: Question) {
    console.log(question)
    this.question = question
  }

  submitTopic(event: string) {
    this.quizService.subscribe(this.onQuestion.bind(this))
    this.topic = event
    this.looseScreen = false

    let topicDialog = document.getElementById("topic-dialog")

    if (topicDialog) {
      topicDialog.style.display = "none"
    }

    this.setTopicTextWithScore()

    document.getElementById("ask-main")?.classList.add("top")

    this.inGame = true
    this.triggerNewQuestion()
  }

  setTopicTextWithScore() {
    let topicText = document.getElementById("topic-text")

    if (topicText) {
      topicText.innerHTML = this.topic + " - Score: " + this.score
    }
  }

  triggerNewQuestion() {
    this.quizService.triggerNewQuestion(this.topic)
  }

  openTopicDialog() {
    if (!this.inGame) {
      let topicDialog = document.getElementById("topic-dialog")

      if (topicDialog) {
        topicDialog.style.display = "block"
      }
    }
  }

  validateAnswer(answer: boolean) {
    this.question = null

    if (answer) {
      this.score++
      this.triggerNewQuestion()
      this.setTopicTextWithScore()

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
    this.submitTopic(this.topic)
  }
}
