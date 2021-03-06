import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public init: number = 20;
  public pause: boolean = true;
  private countdownTimerRef:any = null;
  public countdown$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isEnd = new Subject<void>();
  public isEnd$ = this.isEnd.asObservable();

  constructor() { }

  public startCountdown(init?){
    this.countdown$.next(init || this.init);
  }

  public toggleCountdown(){
    this.pause = !this.pause;

    if(this.pause){
      this.clearTimeout();
    }else{
      this.reStartCountdown();
    }
  }

  public reStartCountdown(){
      if(this.countdown$.getValue()>0){
        this.clearTimeout();
        this.doCountdown();
      }
    
  }



  private doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.countdown$.next(this.countdown$.getValue()-1);
      this.processCountdown();
    }, 1000);
  }



  private processCountdown(){
    if(this.countdown$.getValue() == 0){
      console.log("--countdown end--");
      this.isEnd.next();
    }
    else{
      this.doCountdown();
    }
  }

  private clearTimeout(){
    if(this.countdownTimerRef){
      clearTimeout(this.countdownTimerRef);
      this.countdownTimerRef = null;
    }
  }

  destroy():void{
    this.clearTimeout();
    this.isEnd.complete();
  }

}
