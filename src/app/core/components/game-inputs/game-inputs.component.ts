import {Component, EventEmitter, Output} from '@angular/core';
import {quizTopics} from "../../static/topics";
import {QuizSettings} from "../../types/settings";

@Component({
  selector: 'app-game-inputs',
  templateUrl: './game-inputs.component.html',
  styleUrls: ['./game-inputs.component.scss']
})
export class GameInputsComponent {
  @Output() onStart: EventEmitter<QuizSettings> = new EventEmitter<QuizSettings>()

  placeholder = this.randomTopicPlaceholder()

  randomTopicPlaceholder() {
    return quizTopics[Math.floor(Math.random() * quizTopics.length)].toLowerCase()
  }

  startGame() {
    let topic = ""
    let model: string = "gpt-3.5-turbo"
    let apiSecret = ""

    let topicInput = document.getElementById("input-topic")
    if (topicInput && topicInput.tagName == "INPUT") {
      topic = (topicInput as HTMLInputElement).value
    }

    let modelInput = document.getElementById("input-model")
    if (modelInput && modelInput.tagName == "INPUT") {
      model = (modelInput as HTMLInputElement).value
    }

    let apiSecretInput = document.getElementById("input-api-secret")
    if (apiSecretInput && apiSecretInput.tagName == "INPUT") {
      apiSecret = (apiSecretInput as HTMLInputElement).value
    }

    this.onStart.emit({topic, model, apiSecret})
  }
}
