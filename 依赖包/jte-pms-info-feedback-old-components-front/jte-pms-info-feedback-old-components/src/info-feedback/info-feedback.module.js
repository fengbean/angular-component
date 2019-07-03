"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var info_feedback_component_1 = require("./info-feedback.component");
var work_order_module_1 = require("../work-order/work-order.module");
var feedback_bug_module_1 = require("../feedback-bug/feedback-bug.module");
var ng_zorro_antd_1 = require("ng-zorro-antd");
var InfoFeedbackModule = (function () {
    function InfoFeedbackModule() {
    }
    return InfoFeedbackModule;
}());
InfoFeedbackModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            work_order_module_1.WorkOrderModule,
            feedback_bug_module_1.FeedbackBugModule,
            ng_zorro_antd_1.NgZorroAntdModule
        ],
        declarations: [
            info_feedback_component_1.InfoFeedbackComponent
        ],
        providers: [],
        exports: [info_feedback_component_1.InfoFeedbackComponent]
    })
], InfoFeedbackModule);
exports.InfoFeedbackModule = InfoFeedbackModule;
//# sourceMappingURL=info-feedback.module.js.map