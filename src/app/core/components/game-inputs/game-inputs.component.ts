import {Component, EventEmitter, Output} from '@angular/core';
import {quizTopics} from "../../static/topics";
import {AllowedModels} from "../../types/allowed-models";
import {QuizSettings} from "../../types/settings";

@Component({
  selector: 'app-game-inputs',
  templateUrl: './game-inputs.component.html',
  styleUrls: ['./game-inputs.component.scss']
})
export class GameInputsComponent {
  @Output() onStart: EventEmitter<QuizSettings> = new EventEmitter<QuizSettings>()

  randomTopicPlaceholder() {
    return quizTopics[Math.floor(Math.random() * quizTopics.length)].toLowerCase()
  }

  startGame() {
    let topic = ""
    let model: AllowedModels = "gpt-3.5-turbo"
    let apiSecret = ""

    let topicInput = document.getElementById("input-topic")
    if (topicInput && topicInput.tagName == "INPUT") {
      topic = (topicInput as HTMLInputElement).value
    }

    let modelSelect = document.getElementById("select-model")
    if (modelSelect && modelSelect.tagName == "SELECT") {
      model = (modelSelect as HTMLSelectElement).value as AllowedModels
    }

    let apiSecretInput = document.getElementById("input-api-secret")
    if (apiSecretInput && apiSecretInput.tagName == "INPUT") {
      apiSecret = (apiSecretInput as HTMLInputElement).value
    }

    this.onStart.emit({topic, model, apiSecret})
  }
}
