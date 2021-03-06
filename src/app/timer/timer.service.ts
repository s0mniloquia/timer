import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  public init: number = 20;
  public pause: boolean = true;
  private countdownTimerRef:any = null;
  public countdown:number = 0;
  public isEnd = new Subject<void>();
  public isEnd$ = this.isEnd.asObservable();

  constructor() { }

  public startCountdown(init?){
    this.countdown = init || this.init;
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
      if(this.countdown && this.countdown>0){
        this.clearTimeout();
        this.doCountdown();
      }
    
  }



  private doCountdown(){
    this.countdownTimerRef = setTimeout(()=>{
      this.countdown = this.countdown -1;
      this.processCountdown();
    }, 1000);
  }



  private processCountdown(){
    if(this.countdown == 0){
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
