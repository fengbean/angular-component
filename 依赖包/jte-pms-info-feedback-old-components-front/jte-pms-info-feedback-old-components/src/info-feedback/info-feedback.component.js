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
var InfoFeedbackComponent = (function () {
    function InfoFeedbackComponent() {
        this.modalVisible = false;
        this.isVisible = false;
        this.showConenct = false;
        // @Output() voted = new EventEmitter<boolean>();
    }
    InfoFeedbackComponent.prototype.ngOnInit = function () {
        console.log("--------------------------", this.baseUrl, this.userName, this.hotelCodeInput);
    };
    InfoFeedbackComponent.prototype.showModal = function () {
        this.isVisible = true;
    };
    InfoFeedbackComponent.prototype.hideConect = function () {
        var _this = this;
        setTimeout(function () { return _this.showConenct = false; }, 100);
    };
    InfoFeedbackComponent.prototype.showC = function () {
        this.showConenct = true;
    };
    InfoFeedbackComponent.prototype.closeisVisible = function () {
        this.isVisible = false;
    };
    InfoFeedbackComponent.prototype.addWorkOrder = function (e) {
        var _this = this;
        console.log("=======", e);
        this.isVisible = false;
        //打开反馈弹窗
        setTimeout(function (e) { return _this.modalVisible = true; }, 300);
    };
    InfoFeedbackComponent.prototype.closeFeedback = function (e) {
        this.modalVisible = false;
    };
    return InfoFeedbackComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InfoFeedbackComponent.prototype, "baseUrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InfoFeedbackComponent.prototype, "userName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InfoFeedbackComponent.prototype, "hotelCodeInput", void 0);
InfoFeedbackComponent = __decorate([
    core_1.Component({
        selector: 'app-info-feedback',
        templateUrl: './info-feedback.component.html'
    })
], InfoFeedbackComponent);
exports.InfoFeedbackComponent = InfoFeedbackComponent;
//# sourceMappingURL=info-feedback.component.js.map