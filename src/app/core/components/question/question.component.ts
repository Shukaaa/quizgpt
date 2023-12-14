import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from "../../types/question";
import {format} from "prettier";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question: Question = {
    question: "",
    answerOptions: [],
    correctAnswer: "",
    code: null,
    codeLanguage: null
  }

  @Output() answerIsCorrect = new EventEmitter<boolean>()

  checkAnswer(answer: string) {
    this.answerIsCorrect.emit(answer === this.question.correctAnswer)
  }

}
