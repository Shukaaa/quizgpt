import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent {
  @Output() submitEvent = new EventEmitter<string>()

  submitTopic(event: any) {
    this.submitEvent.emit(event.target.value as string)
  }
}
