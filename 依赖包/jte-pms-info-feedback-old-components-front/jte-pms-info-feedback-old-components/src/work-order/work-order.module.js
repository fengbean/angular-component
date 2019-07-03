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
var ng_zorro_antd_1 = require("ng-zorro-antd");
var forms_1 = require("@angular/forms");
var work_order_component_1 = require("./work-order.component");
var work_order_service_1 = require("./work-order.service");
var WorkOrderModule = (function () {
    function WorkOrderModule() {
    }
    return WorkOrderModule;
}());
WorkOrderModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            ng_zorro_antd_1.NgZorroAntdModule,
            forms_1.ReactiveFormsModule,
            forms_1.FormsModule
        ],
        declarations: [
            work_order_component_1.WorkOrderComponent
        ],
        providers: [work_order_service_1.WorkOrderService],
        exports: [work_order_component_1.WorkOrderComponent]
    })
], WorkOrderModule);
exports.WorkOrderModule = WorkOrderModule;
//# sourceMappingURL=work-order.module.js.map