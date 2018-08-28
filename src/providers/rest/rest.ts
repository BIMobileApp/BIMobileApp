import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class RestProvider {

  baseUrl:any;

  constructor(public http: HttpClient,
    public toast:ToastController) {
   //this.baseUrl = "http://192.168.188.236:8090/api/";
    this.baseUrl = "http://localhost:62657/api/";
   // console.log('Hello RestProvider Provider');
  } 

   // GET Method
 getData(segment){
  return new Promise((resolve, reject) => {
    // Header
    let headers = new HttpHeaders();
    //headers.append('Authorization','Basic bm9wYWRvbF9wOjEyMzQ1Ng==');
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
    //headers.append('Authorization','Basic bm9wYWRvbF9wOjEyMzQ1Ng==');
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
