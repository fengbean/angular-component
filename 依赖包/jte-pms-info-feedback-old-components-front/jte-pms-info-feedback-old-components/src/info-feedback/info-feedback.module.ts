import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoFeedbackComponent} from './info-feedback.component';
import { WorkOrderModule } from '../work-order/work-order.module'
import {FeedbackBugModule} from '../feedback-bug/feedback-bug.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    WorkOrderModule,
    FeedbackBugModule,
    NgZorroAntdModule
  ],
  declarations: [
    InfoFeedbackComponent
  ],
  providers: [],
  exports: [InfoFeedbackComponent]
})
export class InfoFeedbackModule {
}
