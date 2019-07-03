import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpClientJsonpModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkOrderService {

     constructor(private http: HttpClient) { }

    public baseUrl:string;
    setUrl(url:string){
      console.log(url)
        this.baseUrl=url;
    }

    getWorkOrderList(hotelCode: string, beginTime: string, endTime: string, keywords: string, pageSize: number, pageNo: number): Observable<any> {
        const param = new HttpParams().append('pageNo', pageNo + "")
            .append('pageSize', pageSize + "")
            .append('hotelCode', hotelCode)
            .append('beginTime', beginTime)
            .append('endTime', endTime)
            .append('keywords', keywords);
        return this.http.get(this.baseUrl + '/feedback/workorder-list', { params: param });
    }

    getWorkOrderDetail(serviceCode: string): Observable<any> {
        const param = new HttpParams().append('serviceCode', serviceCode);
        return this.http.get(this.baseUrl + '/feedback/workorder-detail', { params: param });
    }

    getCommentList(workorderNo: string): Observable<any> {
        const param = new HttpParams().append('workorderNo', workorderNo);
        return this.http.get(this.baseUrl + '/feedback/comment-list', { params: param });
    }
    getAppraiseList(workorderNo: string): Observable<any> {
        const param = new HttpParams().append('workorderNo', workorderNo);
        return this.http.get(this.baseUrl + '/feedback/appraise-list', { params: param });
    }

    addAppraise(warningCode: string,loginName:string,result:string,remark:string): Observable<any> {
        const param = new HttpParams().append('warningCode', warningCode)
        .append('loginName',loginName)
        .append('result',result)
        .append('remark',remark);
        return this.http.get(this.baseUrl + '/feedback/appraise-add', { params: param });
    }

    addComment(warningCode: string,loginName:string,content:string):Observable<any>{
        const param = new HttpParams().append('warningCode', warningCode)
        .append('loginName',loginName)
        .append('content',content);
        return this.http.get(this.baseUrl + '/feedback/comment-add', { params: param });
    }
}
