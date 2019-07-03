import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-info-feedback',
  templateUrl: './info-feedback.component.html'
})
export class InfoFeedbackComponent {


  @Input() baseUrl:string;
  @Input() userName:any;
  @Input() hotelCodeInput:any;
  modalVisible = false;

  ngOnInit() {
    console.log("--------------------------",this.baseUrl,this.userName,this.hotelCodeInput)
  }
  isVisible=false;
  showModal(){
    this.isVisible = true;
  }
  showConenct=false;
  hideConect(){
    setTimeout(()=>this.showConenct=false,100);
  }
  showC(){
    this.showConenct=true;
  }
  closeisVisible() {
    this.isVisible = false;
  }

  addWorkOrder(e){
    console.log("=======",e)
    this.isVisible = false;
        //打开反馈弹窗
    setTimeout(e=>this.modalVisible=true,300)
  }
  closeFeedback(e){
    this.modalVisible=false;
  }
  // @Output() voted = new EventEmitter<boolean>();






}
