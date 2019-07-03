import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import { Utils } from './../../../shared/utils';//全部用外部传值
import {Page} from './page';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkOrderService} from './work-order.service';
import * as moment from 'moment';
import {Workorder} from './workOrder';
import {Appraise} from '../appraise';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ResultInfo} from '../result-info';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent extends Page implements OnInit {

  // 发射关闭
  @Output()
  onClose = new EventEmitter<any>();
  @Output()
  onAddWorkOrder= new EventEmitter<any>();
  @Input() baseUrl:string;
  @Input() userName:any;
  @Input() hotelCodeInput:any;
  //  @Input() public prodList = [];
  protected init() {

    this.ngOnInit();
  }
  ngOnInit() {
    console.log("++++++++++++++++++++++++++++++",this.baseUrl,this.userName,this.hotelCodeInput)
    // this.getProductsList(this.products);
    this.workOrderService.setUrl(this.baseUrl);
    this.getWorkOrderList();
  }
  private url:string="111";
  public workOrderFlag = true;
  constructor(
    public workOrderService: WorkOrderService,
    private _message: NzMessageService,
    private modalService: NzModalService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) {
      super();
  }


  select() {
    if (this.beginTime) {
      this.beginTime = moment(this.beginTime).format("YYYY-MM-DD HH:mm:ss");
    } else {
      this.beginTime = "";
    }
    if (this.endTime) {
      this.endTime = moment(this.endTime).format("YYYY-MM-DD HH:mm:ss");
    } else {
      this.endTime = "";
    }

    this.getWorkOrderList();
  }

  public totalItems: number = 0;
  // public hotelCode: string =this.hotelCodeInput;
  public beginTime: string = "";
  public endTime: string = "";
  public keywords: string = "";
  public workOrderList = [];
  public commentList = [];
  public workOrder: Workorder = new Workorder();
  public appraise: Appraise = new Appraise();
  public isAppraised: boolean = false;
  public newCommentContent:string;
  getWorkOrderList() {
    console.log(this.hotelCodeInput, this.beginTime, this.endTime, this.keywords, this._pageSize, this._currentPage)
    this.workOrderService.getWorkOrderList(this.hotelCodeInput, this.beginTime, this.endTime, this.keywords, this._pageSize, this._currentPage).subscribe(result => {

      if (result.code == 0) {
        this.workOrderList = result.data.data.datalItems;
        this.totalItems = result.data.data.totalItems;
      } else {
        this._message.error("获取工单失败!");
      }
    });
  }

  getWorkOrderDetail(serviceCode:any) {
    this.workOrderService.getWorkOrderDetail(serviceCode).subscribe(result => {
      if (result.code == 0) {
        console.log(result.data.data);
        this.workOrder = result.data.data
        if (this.workOrder.servicecode != null) {
          //获取评论列表
          this.workOrderService.getCommentList(this.workOrder.servicecode).subscribe(commentResult => {
            if (commentResult.data.data != null) {
              this.commentList = commentResult.data.data;
            }

          })
          //获取评价
          this.workOrderService.getAppraiseList(this.workOrder.servicecode).subscribe(appraiseResult => {
            if (appraiseResult.data.data != null) {
              this.appraise = appraiseResult.data.data;
              this.isAppraised = true;
            }
          })
        }
      } else {
        this._message.error("获取工单详情失败!");
      }
    });
  }
  orderInfo(servicecode:any) {
    this.workOrderFlag = false;
    this.getWorkOrderDetail(servicecode);
  }

  closeOrderInfo() {
    this.workOrderFlag = true;
  }
  //   save() {

  //     this.setUp.emit(this.prodList);
  //     this.onClose.emit();
  //   }

  close() {
    this.onClose.emit();
  }

  addAppraise() {
    console.log(this.workOrder.servicecode,this.userName, this.appraise.result, this.appraise.remark);
    this.workOrderService.addAppraise(this.workOrder.servicecode, this.userName, this.appraise.result, this.appraise.remark).subscribe(result => {
        this.isAppraised = true;
        if(result.code!=0){
          this._message.error("评论失败!");
        }
      }
      );
  }

  //新增评论
  addComment(){
    if(this.newCommentContent==null||this.newCommentContent==""){
      this._message.error("请输入追问内容!");
    }else{
      this.workOrderService.addComment(this.workOrder.servicecode,this.userName,this.newCommentContent).subscribe(result=>{
        if(result.code==0){
          this.workOrderService.getCommentList(this.workOrder.servicecode).subscribe(commentResult => {
            if (commentResult.data.data != null) {
              this.commentList = commentResult.data.data;
            }
          })
        }else{
          this._message.error("追问失败!");
        }
        this.newCommentContent="";

        }
    );
    }
  }

  processClass(params: any) {
    if (this.workOrder == null)
      return false;
    else
      return params.includes(this.workOrder.servicestate);
  }

  public feedbackInputText = '';
  public modalVisible = false;
  submitIssue() {

    if (!this.feedbackInputText) {
      return
    }

    const canvas = <HTMLCanvasElement>document.querySelector('#canvasScreen');
    const imgData = canvas.toDataURL('image/jpeg').toString();
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
      .append('feedbackDescribe', this.feedbackInputText)
      .append('operator',this.userName)
      .append('hotelCode', this.hotelCodeInput);
    const body = new HttpParams()
      .append('imgData', imgData);
    this.http.post<ResultInfo>(
      this.baseUrl
      + '/feedback/submit-issue', body, {params, headers}).subscribe(it => {
      if (it.code == 0) {
        this._message.success('工单发送成功');
        this.modalVisible = false;
      }
    })
  }

  addWorkOrder() {
    this.onAddWorkOrder.emit(true);
  }


}
