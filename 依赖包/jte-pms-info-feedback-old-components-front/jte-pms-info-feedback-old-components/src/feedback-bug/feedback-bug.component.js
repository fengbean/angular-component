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
var html2canvas = require("html2canvas");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var FeedbackBugComponent = (function () {
    function FeedbackBugComponent(_message, http) {
        this._message = _message;
        this.http = http;
        this._modalVisible = false;
        this.votedFalse = new core_1.EventEmitter();
        this.feedBackVisible = false;
        this.feedbackInputText = '';
        this.customerQQ = '';
        this.customerPhone = '';
        this.isWorkOrder = false;
    }
    FeedbackBugComponent.prototype.ngOnInit = function () {
        this.currentClasses = {
            'wrapScreenCanvas': !this.activeClass,
            'headClass': this.activeClass,
        };
    };
    Object.defineProperty(FeedbackBugComponent.prototype, "modalVisible", {
        get: function () { return this._modalVisible; },
        set: function (modalVisible) {
            this._modalVisible = modalVisible;
            console.log("}}}}}}}}}}}}}}}", this._modalVisible);
            if (this._modalVisible) {
                this.openFeedbackModal();
            }
            else {
                this.feedBackVisible = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    FeedbackBugComponent.prototype.openFeedbackModal = function () {
        var _this = this;
        this.feedbackInputText = '';
        var screenDom = document.querySelector('.wrapScreenCanvas');
        if (this.activeClass) {
            screenDom = document.querySelector('.headClass');
        }
        screenDom.innerHTML = '';
        console.log("screenDom", screenDom);
        var option = {
            logging: false,
            ignoreElements: function (ele) {
                return false;
            }
        };
        html2canvas(document.querySelector('body'), option).then(function (canvas) {
            canvas.setAttribute('style', 'max-width: 100%;');
            canvas.setAttribute('id', 'canvasScreenss');
            var ctx = canvas.getContext('2d');
            var draw = function (x, y) {
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#FF0000';
                ctx.lineCap = 'round';
                ctx.moveTo(x, y);
                ctx.lineTo(canvas.oldPoint.x, canvas.oldPoint.y);
                ctx.stroke();
                ctx.closePath();
            };
            var move = function (e) {
                var x = e.offsetX / (canvas.scrollWidth) * canvas.width;
                var y = e.offsetY * x / e.offsetX;
                if (canvas.isDraw) {
                    draw(x, y);
                }
                canvas.oldPoint = {
                    x: x,
                    y: y
                };
            };
            canvas.addEventListener('mousedown', function (e) {
                canvas.isDraw = true;
                var x = e.offsetX / (canvas.scrollWidth) * canvas.width;
                var y = e.offsetY * x / e.offsetX;
                canvas.oldPoint = {
                    x: x,
                    y: y
                };
            });
            canvas.addEventListener('mousemove', move);
            canvas.addEventListener('mouseup', function () { return canvas.isDraw = false; });
            screenDom.appendChild(canvas);
            console.log("screenDomqqqqqqqqqq", screenDom, document.querySelector('.screenssssaa'));
            _this.feedBackVisible = true;
        });
    };
    FeedbackBugComponent.prototype.submitIssue = function () {
        var _this = this;
        if (!this.customerPhone) {
            this._message.warning('请输入手机号');
            return;
        }
        else {
            var TEL_REGEXP = new RegExp(/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/);
            if (!TEL_REGEXP.test(this.customerPhone)) {
                this._message.warning('请输入正确的电话');
                return;
            }
        }
        if (this.customerQQ && this.customerQQ.length > 32) {
            this._message.warning('QQ号最大不能超过32个字');
            return;
        }
        if (!this.feedbackInputText) {
            this._message.warning('请输入备注');
            return;
        }
        if (this.isWorkOrder) {
            this._message.warning('请勿重复提交工单！');
            return;
        }
        this.isWorkOrder = true;
        var canvas = document.querySelector('#canvasScreenss');
        var imgData = canvas.toDataURL('image/jpeg').toString();
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        var params = new http_1.HttpParams()
            .append('feedbackDescribe', this.feedbackInputText)
            .append('customerQQ', this.customerQQ)
            .append('customerPhone', this.customerPhone)
            .append('operator', this.userName)
            .append('hotelCode', this.hotelCodeInput);
        var body = new http_1.HttpParams()
            .append('imgData', imgData);
        this.http.post(this.baseUrl
            + '/feedback/submit-issue', body, { params: params, headers: headers }).subscribe(function (it) {
            if (it.code == 0) {
                _this._message.success('工单发送成功');
                _this._modalVisible = false;
                _this.feedBackVisible = false;
                _this.votedFalse.emit(false);
            }
            _this.isWorkOrder = false;
        });
    };
    FeedbackBugComponent.prototype.close = function () {
        this._modalVisible = false;
        this.feedBackVisible = false;
        this.votedFalse.emit(false);
    };
    return FeedbackBugComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FeedbackBugComponent.prototype, "baseUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FeedbackBugComponent.prototype, "userName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FeedbackBugComponent.prototype, "hotelCodeInput", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], FeedbackBugComponent.prototype, "activeClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], FeedbackBugComponent.prototype, "modalVisible", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FeedbackBugComponent.prototype, "votedFalse", void 0);
FeedbackBugComponent = __decorate([
    core_1.Component({
        selector: 'app-feedback-bug',
        templateUrl: './feedback-bug.component.html'
    }),
    __metadata("design:paramtypes", [ng_zorro_antd_1.NzMessageService, http_1.HttpClient])
], FeedbackBugComponent);
exports.FeedbackBugComponent = FeedbackBugComponent;
//# sourceMappingURL=feedback-bug.component.js.map