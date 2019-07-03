"use strict";
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
var http_1 = require("@angular/common/http");
var WorkOrderService = (function () {
    function WorkOrderService(http) {
        this.http = http;
    }
    WorkOrderService.prototype.setUrl = function (url) {
        console.log(url);
        this.baseUrl = url;
    };
    WorkOrderService.prototype.getWorkOrderList = function (hotelCode, beginTime, endTime, keywords, pageSize, pageNo) {
        var param = new http_1.HttpParams().append('pageNo', pageNo + "")
            .append('pageSize', pageSize + "")
            .append('hotelCode', hotelCode)
            .append('beginTime', beginTime)
            .append('endTime', endTime)
            .append('keywords', keywords);
        return this.http.get(this.baseUrl + '/feedback/workorder-list', { params: param });
    };
    WorkOrderService.prototype.getWorkOrderDetail = function (serviceCode) {
        var param = new http_1.HttpParams().append('serviceCode', serviceCode);
        return this.http.get(this.baseUrl + '/feedback/workorder-detail', { params: param });
    };
    WorkOrderService.prototype.getCommentList = function (workorderNo) {
        var param = new http_1.HttpParams().append('workorderNo', workorderNo);
        return this.http.get(this.baseUrl + '/feedback/comment-list', { params: param });
    };
    WorkOrderService.prototype.getAppraiseList = function (workorderNo) {
        var param = new http_1.HttpParams().append('workorderNo', workorderNo);
        return this.http.get(this.baseUrl + '/feedback/appraise-list', { params: param });
    };
    WorkOrderService.prototype.addAppraise = function (warningCode, loginName, result, remark) {
        var param = new http_1.HttpParams().append('warningCode', warningCode)
            .append('loginName', loginName)
            .append('result', result)
            .append('remark', remark);
        return this.http.get(this.baseUrl + '/feedback/appraise-add', { params: param });
    };
    WorkOrderService.prototype.addComment = function (warningCode, loginName, content) {
        var param = new http_1.HttpParams().append('warningCode', warningCode)
            .append('loginName', loginName)
            .append('content', content);
        return this.http.get(this.baseUrl + '/feedback/comment-add', { params: param });
    };
    return WorkOrderService;
}());
WorkOrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], WorkOrderService);
exports.WorkOrderService = WorkOrderService;
//# sourceMappingURL=work-order.service.js.map