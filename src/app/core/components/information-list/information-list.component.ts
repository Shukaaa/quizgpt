import {Component, Input} from '@angular/core';
import {AllowedModels} from "../../types/allowed-models";

@Component({
  selector: 'app-information-list',
  templateUrl: './information-list.component.html',
  styleUrls: ['./information-list.component.scss']
})
export class InformationListComponent {
  @Input() topic: string = ""
  @Input() model: AllowedModels = "gpt-3.5-turbo"
  @Input() score: number = 0
}
