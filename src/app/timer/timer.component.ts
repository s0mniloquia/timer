import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  providers: [TimerService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TimerComponent implements OnInit, OnDestroy {

  @Output() onComplete = new EventEmitter<void>();
  @Input() init:number = 20;
  subscription: Subscription = null;
  subscriptionCountdown: Subscription = null;

  countdown: any = { value: 0};

  constructor(public timerService: TimerService, public changeDetectorRef: ChangeDetectorRef ) { }


  ngOnInit(): void {
    this.timerService.startCountdown(this.init);

    this.subscription = this.timerService.isEnd$.subscribe(()=> {
      this.onComplete.next();
    });

    this.subscriptionCountdown = this.timerService.countdown$.subscribe( value => { 
      this.countdown = value;
      this.changeDetectorRef.markForCheck();
    });

  }

  get progress(){
    return (this.init-this.countdown.value )/this.init*100
  }

  ngOnDestroy(): void {
    this.timerService.destroy();
    this.subscription.unsubscribe();
    this.subscriptionCountdown.unsubscribe();
  }

}
