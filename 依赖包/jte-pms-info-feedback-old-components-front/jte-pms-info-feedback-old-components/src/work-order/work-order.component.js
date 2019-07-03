"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { Utils } from './../../../shared/utils';//全部用外部传值
var page_1 = require("./page");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var router_1 = require("@angular/router");
var work_order_service_1 = require("./work-order.service");
var moment = require("moment");
var workOrder_1 = require("./workOrder");
var appraise_1 = require("../appraise");
var http_1 = require("@angular/common/http");
var WorkOrderComponent = (function (_super) {
    __extends(WorkOrderComponent, _super);
    function WorkOrderComponent(workOrderService, _message, modalService, router, route, http) {
        var _this = _super.call(this) || this;
        _this.workOrderService = workOrderService;
        _this._message = _message;
        _this.modalService = modalService;
        _this.router = router;
        _this.route = route;
        _this.http = http;
        // 发射关闭
        _this.onClose = new core_1.EventEmitter();
        _this.onAddWorkOrder = new core_1.EventEmitter();
        _this.url = "111";
        _this.workOrderFlag = true;
        _this.totalItems = 0;
        // public hotelCode: string =this.hotelCodeInput;
        _this.beginTime = "";
        _this.endTime = "";
        _this.keywords = "";
        _this.workOrderList = [];
        _this.commentList = [];
        _this.workOrder = new workOrder_1.Workorder();
        _this.appraise = new appraise_1.Appraise();
        _this.isAppraised = false;
        _this.feedbackInputText = '';
        _this.modalVisible = false;
        return _this;
    }
    //  @Input() public prodList = [];
    WorkOrderComponent.prototype.init = function () {
        this.ngOnInit();
    };
    WorkOrderComponent.prototype.ngOnInit = function () {
        console.log("++++++++++++++++++++++++++++++", this.baseUrl, this.userName, this.hotelCodeInput);
        // this.getProductsList(this.products);
        this.workOrderService.setUrl(this.baseUrl);
        this.getWorkOrderList();
    };
    WorkOrderComponent.prototype.select = function () {
        if (this.beginTime) {
            this.beginTime = moment(this.beginTime).format("YYYY-MM-DD HH:mm:ss");
        }
        else {
            this.beginTime = "";
        }
        if (this.endTime) {
            this.endTime = moment(this.endTime).format("YYYY-MM-DD HH:mm:ss");
        }
        else {
            this.endTime = "";
        }
        this.getWorkOrderList();
    };
    WorkOrderComponent.prototype.getWorkOrderList = function () {
        var _this = this;
        console.log(this.hotelCodeInput, this.beginTime, this.endTime, this.keywords, this._pageSize, this._currentPage);
        this.workOrderService.getWorkOrderList(this.hotelCodeInput, this.beginTime, this.endTime, this.keywords, this._pageSize, this._currentPage).subscribe(function (result) {
            if (result.code == 0) {
                _this.workOrderList = result.data.data.datalItems;
                _this.totalItems = result.data.data.totalItems;
            }
            else {
                _this._message.error("获取工单失败!");
            }
        });
    };
    WorkOrderComponent.prototype.getWorkOrderDetail = function (serviceCode) {
        var _this = this;
        this.workOrderService.getWorkOrderDetail(serviceCode).subscribe(function (result) {
            if (result.code == 0) {
                console.log(result.data.data);
                _this.workOrder = result.data.data;
                if (_this.workOrder.servicecode != null) {
                    //获取评论列表
                    _this.workOrderService.getCommentList(_this.workOrder.servicecode).subscribe(function (commentResult) {
                        if (commentResult.data.data != null) {
                            _this.commentList = commentResult.data.data;
                        }
                    });
                    //获取评价
                    _this.workOrderService.getAppraiseList(_this.workOrder.servicecode).subscribe(function (appraiseResult) {
                        if (appraiseResult.data.data != null) {
                            _this.appraise = appraiseResult.data.data;
                            _this.isAppraised = true;
                        }
                    });
                }
            }
            else {
                _this._message.error("获取工单详情失败!");
            }
        });
    };
    WorkOrderComponent.prototype.orderInfo = function (servicecode) {
        this.workOrderFlag = false;
        this.getWorkOrderDetail(servicecode);
    };
    WorkOrderComponent.prototype.closeOrderInfo = function () {
        this.workOrderFlag = true;
    };
    //   save() {
    //     this.setUp.emit(this.prodList);
    //     this.onClose.emit();
    //   }
    WorkOrderComponent.prototype.close = function () {
        this.onClose.emit();
    };
    WorkOrderComponent.prototype.addAppraise = function () {
        var _this = this;
        console.log(this.workOrder.servicecode, this.userName, this.appraise.result, this.appraise.remark);
        this.workOrderService.addAppraise(this.workOrder.servicecode, this.userName, this.appraise.result, this.appraise.remark).subscribe(function (result) {
            _this.isAppraised = true;
            if (result.code != 0) {
                _this._message.error("评论失败!");
            }
        });
    };
    //新增评论
    WorkOrderComponent.prototype.addComment = function () {
        var _this = this;
        if (this.newCommentContent == null || this.newCommentContent == "") {
            this._message.error("请输入追问内容!");
        }
        else {
            this.workOrderService.addComment(this.workOrder.servicecode, this.userName, this.newCommentContent).subscribe(function (result) {
                if (result.code == 0) {
                    _this.workOrderService.getCommentList(_this.workOrder.servicecode).subscribe(function (commentResult) {
                        if (commentResult.data.data != null) {
                            _this.commentList = commentResult.data.data;
                        }
                    });
                }
                else {
                    _this._message.error("追问失败!");
                }
                _this.newCommentContent = "";
            });
        }
    };
    WorkOrderComponent.prototype.processClass = function (params) {
        if (this.workOrder == null)
            return false;
        else
            return params.includes(this.workOrder.servicestate);
    };
    WorkOrderComponent.prototype.submitIssue = function () {
        var _this = this;
        if (!this.feedbackInputText) {
            return;
        }
        var canvas = document.querySelector('#canvasScreen');
        var imgData = canvas.toDataURL('image/jpeg').toString();
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        var params = new http_1.HttpParams()
            .append('feedbackDescribe', this.feedbackInputText)
            .append('operator', this.userName)
            .append('hotelCode', this.hotelCodeInput);
        var body = new http_1.HttpParams()
            .append('imgData', imgData);
        this.http.post(this.baseUrl
            + '/feedback/submit-issue', body, { params: params, headers: headers }).subscribe(function (it) {
            if (it.code == 0) {
                _this._message.success('工单发送成功');
                _this.modalVisible = false;
            }
        });
    };
    WorkOrderComponent.prototype.addWorkOrder = function () {
        this.onAddWorkOrder.emit(true);
    };
    return WorkOrderComponent;
}(page_1.Page));
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], WorkOrderComponent.prototype, "onClose", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], WorkOrderComponent.prototype, "onAddWorkOrder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], WorkOrderComponent.prototype, "baseUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WorkOrderComponent.prototype, "userName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], WorkOrderComponent.prototype, "hotelCodeInput", void 0);
WorkOrderComponent = __decorate([
    core_1.Component({
        selector: 'app-work-order',
        templateUrl: './work-order.component.html',
        styleUrls: ['./work-order.component.css']
    }),
    __metadata("design:paramtypes", [work_order_service_1.WorkOrderService,
        ng_zorro_antd_1.NzMessageService,
        ng_zorro_antd_1.NzModalService,
        router_1.Router,
        router_1.ActivatedRoute,
        http_1.HttpClient])
], WorkOrderComponent);
exports.WorkOrderComponent = WorkOrderComponent;
//# sourceMappingURL=work-order.component.js.map