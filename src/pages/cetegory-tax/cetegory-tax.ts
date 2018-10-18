import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Chart } from 'chart.js';
import { RestProvider } from '../../providers/rest/rest';
import { TaxCoutrySection1Page } from '../tax-coutry-section1/tax-coutry-section1';
import { TaxCoutrySection2Page } from '../tax-coutry-section2/tax-coutry-section2';
import { TaxCoutrySection3Page } from '../tax-coutry-section3/tax-coutry-section3';
import { TaxCoutrySection4Page } from '../tax-coutry-section4/tax-coutry-section4';
import { TaxCoutrySection5Page } from '../tax-coutry-section5/tax-coutry-section5';
import { TaxCoutrySection6Page } from '../tax-coutry-section6/tax-coutry-section6';
import { TaxCoutrySection7Page } from '../tax-coutry-section7/tax-coutry-section7';
import { TaxCoutrySection8Page } from '../tax-coutry-section8/tax-coutry-section8';
import { TaxCoutrySection9Page } from '../tax-coutry-section9/tax-coutry-section9';
import { TaxCoutrySection10Page } from '../tax-coutry-section10/tax-coutry-section10';
declare var notRound: any;
declare var changeCurrency: any;
declare var dateDisplayAll: any; 
declare var getColorMap: any;
declare var budgetyear : any;
declare var addCommaPercent: any;


declare var slayNow: any; 

/* start for pinch */
const MAX_SCALE = 11.1;
const MIN_SCALE = 0.9;
const BASE_SCALE = 1.2;
/* end  */

@IonicPage()
@Component({
  selector: 'page-cetegory-tax',
  templateUrl: 'cetegory-tax.html',
})
export class CetegoryTaxPage {
  @ViewChild('barCanvas') barCanvas;
  //map parm
  offcode: any;
  off: any;
  pak: any;
  username: any;
  curTG = "ล้านบาท";
  display_region_product = "";
  display_province_product = "";
  display_region_province = "";
  display_province_province = "";
  display_region_branch = "";
  display_province_branch = "";


  //guage parm
  TaxGauge: any;
  TaxlyGauge: any;
  TaxEstGauge: any;
  responseData: any;
  Data3Year: any;
  offdesc: any;
  name: any;
  toggleBar = 0;
  toggleMap = 0;
  toggleTable = 0;
  toggleTable3Year = 0;

  barChart: any;
  bargetTax = [];
  bargetLAST_TAX = [];
  bargetESTIMATE = [];
  barIsNull = 1;

  //Table parm
  DataCurYear: any;
  DataProduct: any;
  DataGauge: any;
  DataProvince: any;
  DataOverallRegion:any;
  Data = [];
  TAX = [];
  TAX_LY = [];
  EST = [];

  ProdTAX = [];
  ProdTAX_LY = [];
  ProdEST = [];
  responseArea: any;
  responseProvince: any;
  oldArea: any;
  oldtypeCur : any;
  hideTableBrance = 0;
  Tax3YearHeader:any;


  //dateDisplay = localStorage.getItem("last_update_date");
  dateDisplay = "";
  dateAsOff = ""; 
  dateAsOff_Map= "";
  Province: any;
  region:any;
  province:any;
  branch:any;
  Province3Year:any;

  select_region:any;
  select_all_value:any;
  select_all_prov_value:any;
  select_province:any;
  isEnable:any;
  isEnableProv:any;
  oldRegion:any;
  responseDataMap : any; 
  show_map_thiland:any;
  regionSelectType3Year:any;

  responseArea3Year:any;
  responseProvince3Year:any;

    public Mzone1 = `#DCDCDD`;
    public Mzone2 = `#DCDCDD`;
    public Mzone3 = '#DCDCDD';
    public Mzone4 = `#DCDCDD`;
    public Mzone5 = `#DCDCDD`;
    public Mzone6 = `#DCDCDD`;
    public Mzone7 = `#DCDCDD`;
    public Mzone8 = `#DCDCDD`;
    public Mzone9 = `#DCDCDD`; 
    public Mzone10 = `#DCDCDD`; 


    /* start for pinch */
    public fontSize = `${BASE_SCALE}rem`;
    private scale = BASE_SCALE;
    private alreadyScaled = BASE_SCALE;
    public isScaling = false;
    /* end  */
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public webapi: RestProvider) {
    this.dateDisplay = localStorage.last_update_date;
    this.dateAsOff = dateDisplayAll;
     
  this.dateAsOff_Map = slayNow;
    this.username = localStorage.userData;
    this.offdesc = localStorage.offdesc;
    this.name = localStorage.username;
    this.offcode = localStorage.offcode;
    this.off = this.offcode.substring(0, 2);
    this.pak = parseInt(this.offcode, 10);

    ///หา offcode เพื่อหา ภาค จังหวัด สาขา
    this.region = localStorage.offcode.substring(0, 2);
    this.province = localStorage.offcode.substring(2, 4);
    this.branch =  localStorage.offcode.substring(4, 6);
  /// end  หา offcode เพื่อหา ภาค จังหวัด สาขา

   ///ตรวจสอบภาคเพื่อ default selection
   if(this.region != "00"){
     this.select_region = localStorage.region_desc;
     this.select_all_value = false;    
     this.isEnable  = true;        
   }else{
     this.select_all_value = true;
     this.isEnable  = false;
   }
///end ตรวจสอบภาคเพื่อ default selection

 /// ตรวจสอบสาขาเพื่อ default selection
 var res = "";
 if(this.branch != "00" || this.province != "00"){          
    res =  localStorage.offdesc.split(" ");
    this.select_province  = res[0];
    this.select_all_prov_value = false;
    this.isEnableProv = true;
  }else{
    this.select_all_prov_value = true;
    this.isEnableProv = false;
  }
 ///end  ตรวจสอบสาขาเพื่อ default selection
   
  }

  regionSelectType = "";
  ionViewDidLoad() {

    this.show_map_thiland  = 0;

    this.setData();
    this.selectionArea();
    this.selectionProviceFirst();
    let area;
    let Province;
    let typeCur = 'M';

    this.TableGetData(area, Province, typeCur);
    this.hideTableBrance = 0;

    if(this.region != "00"){
      this.hideTableBrance = 2;
    }
    let area3Year;
    let Province3Year;
    let typeCur3Year = 'M';
    this.selectionArea3Year();
    this.selectionProviceFirst3Year();
    this.Get3YearTable(area3Year,Province3Year,typeCur3Year);
   
  }

  toggleBarShow() {
    if (this.toggleBar == 0) {
      this.BarGetData();
      this.toggleBar = 1;
    } else {
      this.toggleBar = 0;
    }
  }

  toggleMapShow() {
    if (this.toggleMap == 0) {
      this.toggleMap = 1;
    } else {
      this.toggleMap = 0;
    }
  }

  toggleTableShow() {
    if (this.toggleTable == 0) {
      this.toggleTable = 1;
    } else {
      this.toggleTable = 0;
    }
  }

    toggleTable3YearShow(){
      if (this.toggleTable3Year == 0) {
        this.toggleTable3Year = 1;
      } else {
        this.toggleTable3Year = 0;
      }
    }

  selectionArea() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea = data;
    });
  }
  selectionProviceFirst() {
    let region;
    if(this.region != "00"){
      region = localStorage.region_desc;
    }

    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.responseProvince = data;
    });
  }

  selectionProvince(area, Province, typeCur) {

    Province = 'undefined';
    this.Province = 'undefined';
    //this.responseProvince = [];

    if(this.region != "00"){
      area = localStorage.region_desc;
    }
    
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area).then((data) => {
      this.responseProvince = data;
    });
    if (area !== "undefined") {
      this.TableGetData(area, Province, this.regionSelectType);
      this.GetProvinceTable(area, this.regionSelectType);
      this.hideTableBrance = 2;
     
    }else{
      this.TableGetData(area, Province, this.regionSelectType);
      this.hideTableBrance = 0;
    }

    this.OverallBranch(area, Province, this.regionSelectType);
  }

  GetProvinceTable(area, typeCur) {
    this.webapi.getData('TaxProvinceCurYear?area=' + area+'&offcode='+this.offcode).then((data) => {
      this.DataProvince = data;
      this.getProvinceTAX(typeCur);
    });
  }

  TableGetData(area, Province, typeCur) {

   let Region;
   let province;
   console.log(this.region);
    if(this.region != "00"){

      if(area != 'undefined'){
        this.display_region_product =  localStorage.region_desc;
        this.display_region_province =  localStorage.region_desc;
        this.display_region_branch =  localStorage.region_desc;
      }else{ 
        this.display_region_product = "";
        this.display_region_province = "";
        this.display_region_branch = "";
      }

      Region = localStorage.region_desc;
      this.GetProvinceTable(Region, this.regionSelectType);
      
    }else{
      if(area != 'undefined'){
        this.display_region_product = area;
        this.display_region_province = area;
        this.display_region_branch  = area;
      }else{ 
        this.display_region_product = "";
        this.display_region_province = "";
        this.display_region_branch = "";
      }

      Region =area;     
    }

    /////////////////////////////////////////////
    if(this.branch != "00" || this.province != "00"){
     
      if(Province != 'undefined'){
        this.display_province_product = this.select_province;
        this.display_province_province = this.select_province;
        this.display_province_branch = this.select_province;
      } else{
        this.display_province_product  = "";
        this.display_province_province  = "";
        this.display_province_branch = "";
      }   
      province =  this.select_province;
    }else{
      if(Province != 'undefined'){
        this.display_province_product = Province;
        this.display_province_province = Province;
        this.display_province_branch = Province;
      }else{
        this.display_province_product = "";
        this.display_province_province = "";
        this.display_province_branch = "";
      }   
  
      province = Province;
    }  

 
 
   /* if (Region !== this.oldArea || typeCur !== this.oldtypeCur) {
      province = undefined;
    }*/

    if(typeCur == undefined){
      this.regionSelectType = "M";
    }else{
      this.regionSelectType =  typeCur;
    }
    
    this.webapi.getData('TaxCurYearbyYear?offcode=' + this.offcode + '&area=' + Region + '&province=' + province).then((data) => {
      this.DataCurYear = data;
    
      this.getTAX( this.regionSelectType);
     
    });
    this.webapi.getData('TaxProductCurYear?offcode=' + this.offcode + '&area=' + Region + '&province=' + province).then((data) => {
      this.DataProduct = data;
      this.getProductTAX( this.regionSelectType);
    });

    //this.GetProvinceTable(area, typeCur);
    this.OverallBranch(area, Province,  this.regionSelectType);
            
  
    if (Province !== undefined) {
      this.hideTableBrance = 1;
    }
    if(typeCur == "M"){
      this.curTG = "ล้านบาท";
    }else if(typeCur == undefined){
      this.curTG = "ล้านบาท";
    }
    else{
      this.curTG = "บาท";
    }
    this.oldArea = Region;
    this.oldtypeCur = typeCur;
  }

  getTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    let percent;
    for (var i = 0; i < this.DataCurYear.length; i++) {
      tax = this.DataCurYear[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataCurYear[i].TAX = tax;

      last_tax = this.DataCurYear[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataCurYear[i].LAST_TAX = last_tax;

      est = this.DataCurYear[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataCurYear[i].ESTIMATE = est;

      if (this.DataCurYear[i].PERCENT_TAX != null) {
        percent = notRound(this.DataCurYear[i].PERCENT_TAX);
        this.DataCurYear[i].PERCENT_NOCOMMA = percent;
        this.DataCurYear[i].PERCENT_TAX = addCommaPercent(percent);
      /*   this.DataCurYear[i].PERCENT_TAX = notRound(this.DataCurYear[i].PERCENT_TAX); */
      }
    }
  }

  getProductTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    let percent;
    for (var i = 0; i < this.DataProduct.length; i++) {
      tax = this.DataProduct[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataProduct[i].TAX = tax;

      last_tax = this.DataProduct[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataProduct[i].LAST_TAX = last_tax;

      est = this.DataProduct[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataProduct[i].ESTIMATE = est;

      if (this.DataProduct[i].PERCENT_TAX != null) {
        percent = notRound(this.DataProduct[i].PERCENT_TAX);
        this.DataProduct[i].PERCENT_NOCOMMA = percent;
        this.DataProduct[i].PERCENT_TAX = addCommaPercent(percent);
       /*  this.DataProduct[i].PERCENT_TAX = notRound(this.DataProduct[i].PERCENT_TAX); */
      }
    }
  }



  getProvinceTAX(typeCur) {
    let tax;
    let last_tax;
    let est;
    let percent;
    for (var i = 0; i < this.DataProvince.length; i++) {
      tax = this.DataProvince[i].TAX;
      if (tax != null) { tax = changeCurrency(tax, typeCur); }
      this.DataProvince[i].TAX = tax;

      last_tax = this.DataProvince[i].LAST_TAX;
      if (last_tax != null) { last_tax = changeCurrency(last_tax, typeCur); }
      this.DataProvince[i].LAST_TAX = last_tax;

      est = this.DataProvince[i].ESTIMATE;
      if (est != null) { est = changeCurrency(est, typeCur); }
      this.DataProvince[i].ESTIMATE = est;

      if (this.DataProvince[i].PERCENT_TAX != null) {
        percent = notRound(this.DataProvince[i].PERCENT_TAX);
        this.DataProvince[i].PERCENT_NOCOMMA = percent;
        this.DataProvince[i].PERCENT_TAX = addCommaPercent(percent);
      /*   this.DataProvince[i].PERCENT_TAX = notRound(this.DataProvince[i].PERCENT_TAX); */
      }
    }
  }

  ChangeCur(area, Province, typeCur) {
    if (this.hideTableBrance == 0) {
      this.TableGetData(area, Province, typeCur);
    } else if (this.hideTableBrance == 1) {
      this.TableGetData(area, Province, typeCur);
    } else {
      Province = undefined;
      this.TableGetData(area, Province, typeCur);
      this.GetProvinceTable(area, typeCur);
    }
  }

  BarGetData() {
    this.webapi.getData('GaugeOverviewRegion?offcode=' + this.offcode).then((data) => {
      this.responseData = data;
      if (this.responseData[0].TAX != null) {
        this.createBarChart();
      } else {
        this.barIsNull = 0;
      }
    });
  }

  createBarChart() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'horizontalBar',
      data: {
        labels: ["ปีนี้", "ปีก่อน", "ประมาณการ"],
        datasets: [{

          data: [
            this.responseData[0].TAX,
            this.responseData[0].LAST_TAX,
            this.responseData[0].ESTIMATE
          ],
          backgroundColor: [
            '#00818A',
            '#b8d00a',
            'rgba(255, 159, 64, 1)',
          ],
          borderColor: [
            '#00818A',
            '#b8d00a',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false,
          labels: {
            boxWidth: 5,
          }
        },
        tooltips: {
          mode: 'index',
          label: 'myLabel',
          callbacks: {
            label: function (tooltipItem, data) {
              let value;
              let valFormat;
              if (tooltipItem.xLabel > 999999) {
               /*  value = tooltipItem.yLabel + ': ' + (tooltipItem.xLabel / 1000000).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ล้านบาท"; */
                valFormat = changeCurrency(tooltipItem.xLabel, 'M');
                value = tooltipItem.yLabel + ': ' + valFormat + " ล้านบาท";
              } else {
              /*   value = tooltipItem.yLabel + ': ' + tooltipItem.xLabel.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " บาท"; */
                valFormat = changeCurrency(tooltipItem.xLabel, 'B');
                value = tooltipItem.yLabel + ': ' + valFormat + " บาท";
              }
              return value;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(171,171,171,1)',
              lineWidth: 1
            },
            ticks: {
              beginAtZero: true,
              userCallback: function (value, index, values) {
                if (value >= 1000000) {
                  value = (value / 1000000);
                  value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  return value;
                } else {
                  return value;
                }
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'ล้านบาท'
            }
          }
          ],
          yAxes: [{
            barThickness: 15,
            ticks: {
              autoSkip: false,
              maxRotation: 90,
              minRotation: 0
            }
          }]
        }
      }

    });
  }

  OverallBranch(area, Province, typeCur){
    if (this.region != "00") {
      area = localStorage.region_desc;
    } else {
      area = area;
    }
    if (this.branch != "00" || this.province != "00") {
      Province = this.select_province;
    } else {
      Province = Province;
    }
    
    this.webapi.getData('TaxOverallRegion?region='+area+'&province='+Province).then((data) => {
      this.DataOverallRegion = data;
      this.getTaxBranch(typeCur);
    });
   }

   getTaxBranch(typeCur){
    let tax_branch;
    let last_tax_branch;
    for (var i = 0; i < this.DataOverallRegion.length; i++) {
      tax_branch = this.DataOverallRegion[i].TAX;
      if (tax_branch != null) { tax_branch = changeCurrency(tax_branch, typeCur); }
      this.DataOverallRegion[i].TAX = tax_branch;

      last_tax_branch = this.DataOverallRegion[i].LAST_TAX;
      if (last_tax_branch != null) { last_tax_branch = changeCurrency(last_tax_branch, typeCur); }
      this.DataOverallRegion[i].LAST_TAX = last_tax_branch;
    }
   }
   

   selectionArea3Year() {
    this.webapi.getData('ddlMRegion?offcode=' + this.offcode).then((data) => {
      this.responseArea3Year = data;     
    });
    console.log(this.responseArea3Year);
  }
  selectionProviceFirst3Year() {
    let region;
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area='+region).then((data) => {
      this.responseProvince3Year = data;
    });
    console.log(this.responseProvince3Year);
  }

  selectionProvince3Year(area3Year,Province3Year,typeCur3Year) {

    Province3Year = 'undefined';
    this.Province3Year = 'undefined';
   
    this.webapi.getData('ddlMProvince?offcode=' + this.offcode + '&area=' + area3Year).then((data) => {
      this.responseProvince3Year = data;
    });

    this.Get3YearTable(area3Year,Province3Year,typeCur3Year);
  }

  GetHeader3Year() {
    this.webapi.getData('Tax3Year').then((data) => {
      this.Tax3YearHeader = data;
    });
    console.log(this.Tax3YearHeader);
  }

   Get3YearTable(area3Year,Province3Year,typeCur3Year) {
    if(typeCur3Year == undefined){
      this.regionSelectType3Year = "M";
    }else{
      this.regionSelectType3Year =  typeCur3Year;
    }
    this.webapi.getData('Tax3Year').then((data) => {
      this.Tax3YearHeader = data;
    });

    this.webapi.getData('Tax3Year?area='+area3Year+'&province='+Province3Year).then((data) => {
      this.Data3Year = data;
      this.getTax3Year(this.regionSelectType3Year);
    });
  }

  getTax3Year(typeCur){
    let taxYear1;
    let taxYear2;
    let taxYear3;
    for (var i = 0; i < this.Data3Year.length; i++) {
      taxYear1 = this.Data3Year[i].YEAR1;
      if (taxYear1 != null) { taxYear1 = changeCurrency(taxYear1, typeCur); }
      this.Data3Year[i].YEAR1 = taxYear1;

      taxYear2 = this.Data3Year[i].YEAR2;
      if (taxYear2 != null) { taxYear2 = changeCurrency(taxYear2, typeCur); }
      this.Data3Year[i].YEAR2 = taxYear2;

      taxYear3 = this.Data3Year[i].YEAR3;
      if (taxYear3 != null) { taxYear3 = changeCurrency(taxYear3, typeCur); }
      this.Data3Year[i].YEAR3 = taxYear3;
    }
   }

  /*section1() {
    this.app.getRootNav().push(TaxCoutrySection1Page);
  }
  section2() {
    this.app.getRootNav().push(TaxCoutrySection2Page);
  }
  section3() {
    this.app.getRootNav().push(TaxCoutrySection3Page);
  }
  section4() {
    this.app.getRootNav().push(TaxCoutrySection4Page);
  }
  section5() {
    this.app.getRootNav().push(TaxCoutrySection5Page);
  }
  section6() {
    this.app.getRootNav().push(TaxCoutrySection6Page);
  }
  section7() {
    this.app.getRootNav().push(TaxCoutrySection7Page);
  }
  section8() {
    this.app.getRootNav().push(TaxCoutrySection8Page);
  }
  section9() {
    this.app.getRootNav().push(TaxCoutrySection9Page);
  }
  section10() {
    this.app.getRootNav().push(TaxCoutrySection10Page);
  }*/

/* start for pinch */
  public onPinchStart(e) {
    this.isScaling = true;
  }
  public onPinchEnd(e) {
    this.isScaling = false;
    this.alreadyScaled = this.scale * this.alreadyScaled;
  }
  public onPinchMove(e) {
    this.scale = e.scale;
    let totalScaled = this.alreadyScaled * e.scale;
    if (totalScaled >= MAX_SCALE) {
      this.scale = MAX_SCALE / this.alreadyScaled;
      totalScaled = MAX_SCALE;
    } else if (totalScaled <= MIN_SCALE) {
      this.scale = MIN_SCALE / this.alreadyScaled;
      totalScaled = MIN_SCALE;
    }

    let fontSize = Math.round(totalScaled * 10) / 10;
    if ((fontSize * 10) % 3 === 0) {
      this.fontSize = `${fontSize}rem`;
    }
  }
  /* end  */

  setData() {

    this.webapi.getData('MapColorThailand?budget_year='+budgetyear).then((data) => {
      this.responseDataMap = data;
      for (var i = 0; i < this.responseDataMap.length; i++) {       
    let mapColor;
    let provinceName; 
        mapColor = this.responseDataMap[i].MAP_COLOR;
        provinceName= this.responseDataMap[i].REGION_NAME_EN;

        if(provinceName=="zone1"){
          this.Mzone1 =getColorMap(mapColor);
        }
        if(provinceName=="zone2"){
          this.Mzone2 =getColorMap(mapColor);
        }
        if(provinceName=="zone3"){
          this.Mzone3 =getColorMap(mapColor);
        }
        if(provinceName=="zone4"){
          this.Mzone4 =getColorMap(mapColor);
        }
        if(provinceName=="zone5"){
          this.Mzone5 =getColorMap(mapColor);
        }
        if(provinceName=="zone6"){
          this.Mzone6 =getColorMap(mapColor);
        }
        if(provinceName=="zone7"){
          this.Mzone7 =getColorMap(mapColor);
        }
        if(provinceName=="zone8"){
          this.Mzone8 =getColorMap(mapColor);
        }
        if(provinceName=="zone9"){
          this.Mzone9 =getColorMap(mapColor);
        } 
        if(provinceName=="zone10"){
          this.Mzone10 =getColorMap(mapColor);
        }
      }
       });   
       
       this.show_map_thiland  = 1;
  }

  gotoZone1(){
    this.app.getRootNav().push(TaxCoutrySection1Page);
  }

  gotoZone2(){
    this.app.getRootNav().push(TaxCoutrySection2Page); 
  }

  gotoZone3(){
    this.app.getRootNav().push(TaxCoutrySection3Page); 
  }

  gotoZone4(){
    this.app.getRootNav().push(TaxCoutrySection4Page); 
  }

  gotoZone5(){
    this.app.getRootNav().push(TaxCoutrySection5Page); 
  }

  gotoZone6(){
    this.app.getRootNav().push(TaxCoutrySection6Page); 
  }

  gotoZone7(){
    this.app.getRootNav().push(TaxCoutrySection7Page); 
  }

  gotoZone8(){
    this.app.getRootNav().push(TaxCoutrySection8Page); 
  }

  gotoZone9(){
    this.app.getRootNav().push(TaxCoutrySection9Page); 
  }

  gotoZone10(){
    this.app.getRootNav().push(TaxCoutrySection10Page); 
  }

}
