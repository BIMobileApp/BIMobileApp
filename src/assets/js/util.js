var dateDisplayAll = '';
var dateDisplayNow = '';

    var now=new Date();  
    var buddhayear = now.getFullYear()+543;    
    var last  =  new Date(now.getFullYear(),now.getMonth(),0); //th 
    var budgetyear =  0;
    if (now.getMonth() >= 10) {budgetyear= buddhayear;}
    else {budgetyear=buddhayear-1;}
    
    var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม",
    "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
    "ตุลาคม","พฤศจิกายน","ธันวาคม");
    
    if((now.getDate()-1) < 1){
        dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ last.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()-2] ) +" ปีงบฯ " +  (now.getMonth()-2  < 0 ? buddhayear- 1 : buddhayear ); 
      }else{
        dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ (now.getDate()-1) +" "+  (now.getMonth()-1 < 0 ?thmonth[11] : thmonth[now.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()-1  < 0 ? buddhayear- 1 : buddhayear );
      }
    
      dateDisplayNow =  " ข้อมูล ณ วันที่ "+ last.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()-2] ) +" ปีงบฯ " +  (now.getMonth()-2  < 0 ? buddhayear- 1 : buddhayear ); 
      
function changeMillion(val,typeNow) {
  try {

      var result = 0; 

      if (typeNow  == 'M') {
        result =val/1000000;
      }else{

        result =val*1;
      } 
      return result;
  }
  catch (e) {
      alert('error: ' + e);
  }
}