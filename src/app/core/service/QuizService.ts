import {Injectable} from "@angular/core";
import OpenAI from "openai";
import {Question} from "../types/question";
import {environment} from "../../../environments/environment";
import {AllowedModels} from "../types/allowed-models";

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  openai: OpenAI;
  subscribedFunctions: ((question: Question) => void)[] = []
  alreadyAskedQuestions: Question[] = []

  constructor() {
    this.openai = new OpenAI({
      apiKey: environment.apiKey, dangerouslyAllowBrowser: true
    })
  }

  triggerNewQuestion(topic: string, model: AllowedModels) {
    this.openai.chat.completions.create({
      model: model,
      messages: [{
        role: 'user', content: this.generateQuestionPrompt(topic) }],
      }).then(r => {
      let question = r.choices[0].message.content
      if (question != null) {
        let questionObject = JSON.parse(question) as Question
        this.alreadyAskedQuestions.push(questionObject)
        this.subscribedFunctions.forEach(f => f(questionObject))
      }
    })
  }

  generateQuestionPrompt(topic: string): string {
    return 'Give me a random quiz question about the topic: ' + topic + '.' +
      'Your response should ONLY be a json object with the string question,' +
      'and an array string with 4 answer options with the name "answerOptions"' +
      'and the last string with the correct answer (Every quiz can only have 1 answer!) with the name "correctAnswer".' +
      'Make sure to not ask following questions: ' + this.alreadyAskedQuestions.map(q => q.question).join(', ') + '.'
  }

  subscribe(callback: (question: Question) => void) {
    this.subscribedFunctions.push(callback)
  }
}
