import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService]

})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  subscription: Subscription = null;

  constructor(public timerService: TimerService) { }


  ngOnInit(): void {
    this.timerService.startCountdown(this.init);

    this.subscription = this.timerService.isEnd$.subscribe(()=> {
      this.onComplete.next();
    });
  }

  ngOnDestroy(): void {
    this.timerService.destroy();
    this.subscription.unsubscribe();
  }

}
