import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {NzModalService} from 'ng-zorro-antd';

@Injectable()
export class CheckVersionService {
  constructor(private http: HttpClient,private modalService: NzModalService) {
  }


  checkNewVersion(isProd,localVersion){
    if(!isProd){
      console.log("测试环境不进行版本更新");
      return;
    }
    console.log("检查版本更新");
    let projectName=document.location.href.split("/")[3];
    let randomNumber=Math.random()*10000000000000000;
    const param: HttpParams = new HttpParams()
      .append('RandomNum', randomNumber.toString());
    this.http.get(location.protocol + '//' + location.host+'/pms/assets/json/version.json',{ params: param }).subscribe((e:any)=>{
      if(e.code==0){
        let isEqualOk=e.data.mode=="equal"&&e.data.version!=localVersion;
        let isRangeOk=e.data.mode=="range"&&parseInt(e.data.version.substr(4))>parseInt(localVersion.substr(4));
        if(isEqualOk||isRangeOk){
          const modal = this.modalService.create({
            nzTitle: '版本更新',
            nzContent: '检测到有新版本的系统可以供您使用，是否需要更新（更新需要重新登录）？',
            nzClosable: true,
            nzOnOk: () =>{
              localStorage.clear();
              window.location.href = location.protocol + '//' + location.host +'/'+ projectName;
            },
            nzOnCancel:()=> console.log("退出")
          });
        }
        else{
          console.log("已经是最新版本！");
        }
      }
    });
  }
}
