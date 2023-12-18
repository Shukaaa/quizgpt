import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-loose-screen',
  templateUrl: './loose-screen.component.html',
  styleUrls: ['./loose-screen.component.scss']
})
export class LooseScreenComponent {
  @Input() score: number = 0

  @Output() onRestart = new EventEmitter<void>()
  @Output() onReset = new EventEmitter<void>()

  restart() {
    this.onRestart.emit()
  }

  reset() {
    this.onReset.emit()
  }
}
