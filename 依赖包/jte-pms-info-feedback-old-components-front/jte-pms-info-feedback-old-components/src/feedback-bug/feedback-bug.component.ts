import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ResultInfo} from '../result-info';
import * as html2canvas from 'html2canvas';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-feedback-bug',
  templateUrl: './feedback-bug.component.html',
  styles:[`
    .arriveT{
      font-weight:normal;
    }
    .arrive{
      margin-bottom: 10px;
    }
    .f-width{
      width:300px;
      line-height:28px;
    }
  `]
})
export class FeedbackBugComponent {

  constructor(private _message: NzMessageService,private http: HttpClient) { }
  currentClasses: {};
  ngOnInit() {
    this.currentClasses =  {
      'wrapScreenCanvas': !this.activeClass,
      'headClass': this.activeClass,
    };
  }

  @Input() baseUrl:string;
  @Input() userName:any;
  @Input() hotelCodeInput:any;
  @Input() activeClass:boolean;
  _modalVisible=false;
  @Input()
  set modalVisible(modalVisible: boolean) {
    this._modalVisible =modalVisible;
    console.log("}}}}}}}}}}}}}}}",this._modalVisible)
    if(this._modalVisible){
      this.openFeedbackModal();
    }else{
      this.feedBackVisible = false;
    }
  }
  @Output() votedFalse=new EventEmitter<boolean>();

  get modalVisible(): boolean { return this._modalVisible; }


  feedBackVisible = false;

  openFeedbackModal() {
    this.feedbackInputText = '';
    let screenDom = document.querySelector('.wrapScreenCanvas');
    if(this.activeClass){
      screenDom = document.querySelector('.headClass');
    }
    screenDom.innerHTML = '';
    console.log("screenDom",screenDom)
    const option = {
      logging: false,
      ignoreElements: ele => {
        return false
      }
    };
    html2canvas(document.querySelector('body'), option).then(canvas => {
      canvas.setAttribute('style', 'max-width: 100%;');
      canvas.setAttribute('id', 'canvasScreenss');
      const ctx = canvas.getContext('2d');
      const draw = (x, y) => {
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FF0000';
        ctx.lineCap = 'round';
        ctx.moveTo(x, y);
        ctx.lineTo(canvas.oldPoint.x, canvas.oldPoint.y);
        ctx.stroke();
        ctx.closePath();
      };

      const move = (e) => {
        const x = e.offsetX / (canvas.scrollWidth) * canvas.width;
        const y = e.offsetY * x / e.offsetX;
        if (canvas.isDraw) {
          draw(x, y);
        }
        canvas.oldPoint = {
          x: x,
          y: y
        }
      };

      canvas.addEventListener('mousedown', e => {
        canvas.isDraw = true;
        const x = e.offsetX / (canvas.scrollWidth) * canvas.width;
        const y = e.offsetY * x / e.offsetX;

        canvas.oldPoint = {
          x: x,
          y: y
        };
      });
      canvas.addEventListener('mousemove', move);
      canvas.addEventListener('mouseup', () => canvas.isDraw = false);
      screenDom.appendChild(canvas);
      console.log("screenDomqqqqqqqqqq",screenDom,document.querySelector('.screenssssaa'))
      this.feedBackVisible = true;
    });
  }


  feedbackInputText = '';
  customerQQ = '';
  customerPhone = '';
  isWorkOrder = false;
  submitIssue() {
    if (!this.customerPhone) {
      this._message.warning('请输入手机号');
      return
    }else{
      const TEL_REGEXP = new RegExp(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/);
      if (!TEL_REGEXP.test(this.customerPhone)) {
        this._message.warning('请输入正确的电话');
        return
      }
    }
    if (this.customerQQ && this.customerQQ.length>32) {
      this._message.warning('QQ号最大不能超过32个字');
      return
    }
    if (!this.feedbackInputText) {
      this._message.warning('请输入备注');
      return
    }
    if(this.isWorkOrder){
      this._message.warning('请勿重复提交工单！');
      return
    }
    this.isWorkOrder = true;

    const canvas = <HTMLCanvasElement>document.querySelector('#canvasScreenss');
    const imgData = canvas.toDataURL('image/jpeg').toString();
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
      .append('feedbackDescribe', this.feedbackInputText)
      .append('customerQQ', this.customerQQ)
      .append('customerPhone', this.customerPhone)
      .append('operator',this.userName)
      .append('hotelCode', this.hotelCodeInput);
    const body = new HttpParams()
      .append('imgData', imgData);
    this.http.post<ResultInfo>(
      this.baseUrl
      + '/feedback/submit-issue', body, {params, headers}).subscribe(it => {
      if (it.code == 0) {
        this._message.success('工单发送成功');
        this._modalVisible=false;
        this.feedBackVisible = false;
        this.votedFalse.emit(false);
      }
      this.isWorkOrder = false;
    })
  }
  close(){
    this._modalVisible=false;
    this.feedBackVisible = false;
    this.votedFalse.emit(false);
  }
}
