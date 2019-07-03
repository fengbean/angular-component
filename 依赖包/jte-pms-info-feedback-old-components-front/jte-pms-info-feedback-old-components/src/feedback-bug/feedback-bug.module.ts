import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedbackBugComponent} from './feedback-bug.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FeedbackBugComponent
  ],
  providers: [NzMessageService],
  exports: [FeedbackBugComponent]
})
export class FeedbackBugModule {
}
