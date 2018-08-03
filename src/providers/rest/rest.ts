import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  baseUrl:any;

  constructor(public http: HttpClient,
    public toast:ToastController) {
    this.baseUrl = "http://localhost:62657/api/";
   // console.log('Hello RestProvider Provider');
  }

   // GET Method
 getData(segment){
  return new Promise((resolve, reject) => {
    // Header
    let headers = new HttpHeaders();
    //headers.append('Authorization','Basic YWRtaW46MTIzNDU2');
    headers.append('Content-Type','application/json');

    this.http.get(this.baseUrl+segment,{headers:headers})
    .subscribe(res=>{resolve(res);
    },(err)=>{
      if(err.status==0){
          this.toast.create({
            message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
            duration: 3000
          }).present();
      }
      reject(err);
    });
  });
} 

// Post Method
postData(objdata, segment){
  return new Promise((resolve, reject) => {
    // Header
    let headers = new HttpHeaders();
    //headers.append('Authorization','Basic YWRtaW46MTIzNDU2');
    headers.append('Content-Type','application/json');

    this.http.post(this.baseUrl+segment,JSON.stringify(objdata),{headers:headers})
    .subscribe(res=>{
      resolve(res);
    },(err)=>{
      if(err.status==0){
          this.toast.create({
            message: 'มีข้อผิดพลาดติดต่อ API ไม่ได้',
            duration: 3000
          }).present();
      }
      reject(err);
    });
  });
}


}
