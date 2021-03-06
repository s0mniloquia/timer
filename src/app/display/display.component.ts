import { Component, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: 'display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent{

  public minutes: string = '00';
  public seconds: string = '00';

  @Input() set time(val){
    this.minutes = ('0'+Math.trunc(val / 60)).substr(-2);
    this.seconds = ('0'+(val - (+this.minutes*60))).substr(-2);
  }
  constructor() { }

}
