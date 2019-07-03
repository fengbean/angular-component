import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { WorkOrderComponent } from './work-order.component';
import {WorkOrderService} from './work-order.service';

@NgModule({
    imports: [
      CommonModule,
      NgZorroAntdModule,
      ReactiveFormsModule,
      FormsModule
    ],
    declarations: [
        WorkOrderComponent
    ],
    providers: [WorkOrderService],
    exports: [WorkOrderComponent]
})
export class WorkOrderModule{

}
