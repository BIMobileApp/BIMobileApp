import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

declare var dateDisplayAll:any;

@IonicPage()
@Component({
  selector: 'page-inc-data-mth',
  templateUrl: 'inc-data-mth.html',
})
export class IncDataMthPage {

  offcode: any;
  responseData: any;
  responseArea: any;
  responseProvince: any;
  responseGroupName: any;
  repondProductSura:any;
  repondProductSica:any;
  responseTypeSura:any;
  responseTypeSica:any;
  responseTypeCard:any;
  repondProductCard:any;
  repondProduct:any;
  dateDisplay:any;
  dateAsOff:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public webapi:RestProvider) {
      this.offcode = localStorage.offcode;
      this.dateDisplay = localStorage.last_update_date;
      this.dateAsOff =  dateDisplayAll;
  }

  ionViewDidLoad() {
    this.loadData();
    this.selectionArea();
    this.selectionProvince();
    this.selectionTypeNameSura(); 
    this.IncProductAllSura();
    this.IncProductAllSica();
    this.IncProductAllCard();
    this.selectionTypeNameSica();
    this.selectionTypeNameCard();

  }

  loadData(){
    this.webapi.getData('IncDataMonth?offcode='+this.offcode).then((data)=>{
      this.responseData = data;
      this.getNumSURA();
      this.getNumTOBBACO();
      this.getNumCARD();
      this.getAmtSURA();
      this.getAmtTOBBACO();
      this.getAmtCARD();
    });
  }

  selectionArea(){
    this.webapi.getData('SelectionMthArea?offcode='+this.offcode).then((data) => {
      this.responseArea = data;
    });
  }

 selectionProvince(){
    this.webapi.getData('SelectionMthProvince?offcode='+this.offcode).then((data) => {
      this.responseProvince = data;
    });
  }

  /////สุรา//////

  selectionTypeNameSura(){
    this.webapi.getData('SelectionMthGroupName?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
      this.responseTypeSura = data;
    });
  }

  IncProductAllSura(){
    this.webapi.getData('IncProductByMthAll?offcode='+this.offcode+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.loadData();
      this.getAmtSura();
      this.getCountSura();
    });
  }

  getitemsTypeNameSura(area,province,type_name){
      this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.loadData();
      this.getAmtSura();
      this.getCountSura();
    });
  }

  getitemsRegionSura(area,province,type_name){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=สุรา' ).then((data) => {
      this.repondProductSura = data;
      this.loadData();
      this.getAmtSura();
      this.getCountSura();
    });
  }

  getitemsProvinceSura(area,province,type_name){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=สุรา').then((data) => {
      this.repondProductSura = data;
      this.loadData();
      this.getAmtSura();
      this.getCountSura();
    });
  }

    getAmtSura(){
      let val;
      for (var i = 0; i < this.repondProductSura.length; i++) {
        val = this.repondProductSura[i].AMT;
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.repondProductSura[i].AMT = val;
      }
    }
  
    getCountSura(){
      let val;
      for (var i = 0; i < this.repondProductSura.length; i++) {
        val = this.repondProductSura[i].COUNT;
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.repondProductSura[i].COUNT = val;
      }
    }

    /////end สุรา//////


 /////ยาสูบ//////

 selectionTypeNameSica(){
  this.webapi.getData('SelectionMthGroupName?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
    this.responseTypeSica = data;
  });
}

  IncProductAllSica(){
    this.webapi.getData('IncProductByMthAll?offcode='+this.offcode+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.loadData();
      this.getAmtSica();
      this.getCountSica();
    });
  }

  getitemsTypeNameSica(area,province,type_name){
      this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.loadData();
      this.getAmtSica();
      this.getCountSica();
    });
  }

  getitemsRegionSica(area,province,type_name){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ยาสูบ' ).then((data) => {
      this.repondProductSica = data;
      this.loadData();
      this.getAmtSica();
      this.getCountSica();
    });
  }

  getitemsProvinceSica(area,province,type_name){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ยาสูบ').then((data) => {
      this.repondProductSica = data;
      this.loadData();
      this.getAmtSica();
      this.getCountSica();
    });
  }

  getAmtSica(){
      let val;
      for (var i = 0; i < this.repondProductSica.length; i++) {
        val = this.repondProductSica[i].AMT;
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.repondProductSica[i].AMT = val;
      }
    }
  
    getCountSica(){
      let val;
      for (var i = 0; i < this.repondProductSica.length; i++) {
        val = this.repondProductSica[i].COUNT;
        val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.repondProductSica[i].COUNT = val;
      }
    }
    
    /////end ยาสูบ//////

 /* getitemMonth(area,province,group_name,month){
    this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&group_desc='+group_name+'&mth='+month ).then((data) => {
      this.repondProduct = data;
      this.loadData();
      this.getAmt();
      this.getCount();
    });
  }*/

   /////ไพ่//////

   selectionTypeNameCard(){
    this.webapi.getData('SelectionMthGroupName?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
      this.responseTypeCard = data;
    });
   }

    IncProductAllCard(){
      this.webapi.getData('IncProductByMthAll?offcode='+this.offcode+'&group_name=ไพ่').then((data) => {
        this.repondProductCard = data;
        this.loadData();
        this.getAmtCard();
        this.getCountCard();
      });
    }
  
    getitemsTypeNameCard(area,province,type_name){
        this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ไพ่').then((data) => {
        this.repondProductCard = data;
        this.loadData();
       this.getAmtCard();
       this.getCountCard();
      });
    }
  
    getitemsRegionCard(area,province,type_name){
      this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ไพ่' ).then((data) => {
        this.repondProductCard = data;
        this.loadData();
       this.getAmtCard();
       this.getCountCard();
      });
    }
  
    getitemsProvinceCard(area,province,type_name){
      this.webapi.getData('IncProductByMth?offcode='+this.offcode+'&region='+area+'&province='+province+'&type_name='+type_name+'&group_name=ไพ่').then((data) => {
        this.repondProductCard = data;
        this.loadData();
       this.getAmtCard();
       this.getCountCard();
      });
    }
  
   getAmtCard(){
        let val;
        for (var i = 0; i < this.repondProductCard.length; i++) {
          val = this.repondProductCard[i].AMT;
          val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.repondProductCard[i].AMT = val;
        }
      }
    
      getCountCard(){
        let val;
        for (var i = 0; i < this.repondProductCard.length; i++) {
          val = this.repondProductCard[i].COUNT;
          val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.repondProductCard[i].COUNT = val;
        }
  }


    /////end ไพ่//////

  

  getNumSURA() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_SURA;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_SURA = val;
    }
  }

  getNumTOBBACO() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_TOBBACO;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_TOBBACO = val;
    }
  }

  getNumCARD() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].NUM_OF_LIC_CARD;
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].NUM_OF_LIC_CARD = val;
    }
  }

  getAmtSURA() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_SURA/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_SURA = val;
    }
  }

  getAmtTOBBACO() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_TOBBACO/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_TOBBACO = val;
    }
  }

  getAmtCARD() {
    let val;
    for (var i = 0; i < this.responseData.length; i++) {
      val = this.responseData[i].AMT_OF_LIC_CARD/1000000;
      val = val.toFixed(2);
      val = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.responseData[i].AMT_OF_LIC_CARD = val;
    }
  }

}
