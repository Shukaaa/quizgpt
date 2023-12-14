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

  getQuestion(question: Question) {
    console.log(question)
  }

  triggerNewQuestion(topic: string, model: AllowedModels) {
    this.openai.chat.completions.create({
      model: model,
      messages: [{
        role: 'user', content: this.generateQuestionPrompt(topic)
      }]
      }).then(r => {
      let question = r.choices[0].message.content
      if (question != null) {
        let questionObject: Question
        try {
          questionObject = JSON.parse(question) as Question

          if (questionObject.code !== null && questionObject.codeLanguage !== null) {
            questionObject.question = questionObject.question.replace(questionObject.code, '')
            questionObject.codeLanguage = questionObject.codeLanguage.toLowerCase()
          }

          this.alreadyAskedQuestions.push(questionObject)
          this.subscribedFunctions.forEach(f => f(questionObject))
        } catch (e) {
          this.triggerNewQuestion(topic, model)
        }
      }
    })
  }

  generateQuestionPrompt(topic: string): string {
    return 'Give me a random quiz question about the topic: ' + topic + '.' +
      'Your response should ONLY be a json object with the key question from type string which contains the question,' +
      'an array string with 4 answer options with the name "answerOptions" (Make sure each option only exists once)' +
      'and the correct answer with the key-name "correctAnswer" (Every quiz can only have 1 correct answer!).' +
      //'The current date is: ' + new Date().toLocaleDateString() + '. So make sure to add additional information to your questions if they are time sensitive.' +
      'If your question contains code add the code to a different json key called "code" and remove the code out of the question.' +
      'If your question contains code also add the language of the code to "codeLanguage". If NO code is provided, the "codeLanguage" and "code" must be "null"!' +
      'Make sure to not ask following questions: ' + this.alreadyAskedQuestions.map(q => q.question).join(', ') + '.'
  }

  subscribe(callback: (question: Question) => void) {
    this.subscribedFunctions.push(callback)
  }
}
