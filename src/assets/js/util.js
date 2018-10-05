/*var dateDisplayAll = '';

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
        dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ (now.getDate()) +" "+  (now.getMonth()-1 < 0 ?thmonth[11] : thmonth[now.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()-1  < 0 ? buddhayear- 1 : buddhayear );
      }*/

var dateDisplayAll = '';
var dateDisplayNow = '';
var dateDisplayDataReailTime = "";
var monthNowNumber = "";
var monthCnvBudYear = "";
var datePreviousOneDay = "";
var lastDay = "";
var slayNow = 'ตั้งแต่ 1 ตุลาคม ถึง 30 กันยายน ปีงบฯ 2561';

var now = new Date();
var buddhayear = now.getFullYear() + 543;
var last = new Date(now.getFullYear(), now.getMonth(), 0); //th 
//var d = new Date(date.getFullYear(), 9 + 1, 0); alert(d);
var budgetyear = 0;

// ปล. เดือน ในระบบ เริ่มตั้งแต่ 0 จึง +1 ให้ลำดับเท่ากับปฏิทิน
if (now.getMonth() + 1 >= 10) {
  budgetyear = buddhayear + 1;
} else {
  budgetyear = buddhayear;
}

var thmonth = new Array("มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
  "ตุลาคม", "พฤศจิกายน", "ธันวาคม");

var thmonthBudYear = new Array("ตุลาคม", "พฤศจิกายน", "ธันวาคม","มกราคม", "กุมภาพันธ์", "มีนาคม",
  "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน"
  );
/* if((now.getDate()-1) < 1){
    dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ last.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()-1] ) +" ปีงบฯ " +  (now.getMonth()-1  ? buddhayear- 1 : buddhayear ); 
  }else{
    dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ (now.getDate()-1) +" "+  (now.getMonth()-1 < 0 ?thmonth[11] : thmonth[now.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()-1  < 0 ? buddhayear- 1 : buddhayear );
  } */

if ((now.getDate() - 1) < 1) {
  dateDisplayAll = "ตั้งแต่ 1 ตุลาคม ถึง " + last.getDate() + " " + (last.getMonth() - 2 < 0 ? thmonth[11] : thmonth[last.getMonth()]) + " ปีงบฯ " + (last.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1);
  //dateDisplayDataReailTime = "ข้อมูลเดือน" + last.getDate() + " " + (last.getMonth() - 2 < 0 ? thmonth[11] : thmonth[last.getMonth()]) + " ปีงบฯ " + (last.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1);
} else {
  dateDisplayAll = "ตั้งแต่ 1 ตุลาคม ถึง " + (now.getDate() - 1) + " " + (now.getMonth() - 2 < 0 ? thmonth[11] : thmonth[now.getMonth()]) + " ปีงบฯ " + (now.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1);
  //dateDisplayDataReailTime = "ข้อมูลเดือน " + (now.getDate() - 1) + " " + (now.getMonth() - 2 < 0 ? thmonth[11] : thmonth[now.getMonth()]) + " ปีงบฯ " + (now.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1);
}

dateDisplayNow = " ข้อมูล ณ วันที่ " + now.getDate() + " " + (now.getMonth() - 2 < 0 ? thmonth[11] : thmonth[now.getMonth()]) + " ปีงบฯ " + (now.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1);

dateDisplayDataReailTime = "ข้อมูลเดือน "+ (now.getMonth() - 2 < 0 ? thmonth[11] : thmonth[now.getMonth()] + " ปีงบฯ " + (now.getMonth() + 1 >= 10 ? budgetyear : budgetyear - 1));

monthNowNumber = now.getMonth();

monthNowText = thmonth[now.getMonth()];

datePreviousOneDay = now.getDate() - 1;

//ฟังก์ชั่น เปลี่ยนบาทเป็นล้านบาท
function changeCurrency(val, typeNow) {
  try {
    var result = 0;
    if (typeNow == 'M') {
      val = val / 1000000;
      result = notRound(val);
    } else {
      result = notRound(val);
    }
    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return result;
  } catch (e) {
    alert('error: ' + e);
  }
}

function changeCurrencyNoUnit(val, typeNow) {
  try {
    var result = 0;
    if (typeNow == 'M') {
      val = val / 1000000;
      result = notRound(val);
    } else {
      result = val;
    }
    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return result;
  } catch (e) {
    alert('error: ' + e);
  }
}


function fillterMonthCd(monthForm,monthTo){

  var lastDay = new Date(now.getFullYear(), monthTo + 1, 0).getDate(); //;วันที่สุดท้ายของเดือน
  dateDisplayAll = "ตั้งแต่ 1 "+ thmonthBudYear[monthForm-1]+  "ถึง " + lastDay + " " + thmonthBudYear[monthTo-1]+ " ปีงบฯ " + (monthTo + 1 >= 10 ? budgetyear : budgetyear - 1);
  return dateDisplayAll;
}

//ฟังก์ชั่น ไม่ปัดเศษ
/* function notRound(number, precision){
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.floor(tempNumber);
    return roundedTempNumber / factor;
} */

function notRound(val) {
  var returnVal;
  var res = val.toString().split(".");
  if (res.length == 1) {
    returnVal = res + ".00";
  } else if (res[1].length < 2) {
    returnVal = res[0] + "." + res[1] + "0";
  } else {
    returnVal = res[0] + "." + res[1].substring(0, 2);
  }
  return returnVal;
}


function convertMthBudYear(month){

  switch(month) {
 
    case 10:
      monthCnvBudYear = 1;
        break;
    case 11:
      monthCnvBudYear = 2;
      break;
    case 12:
      monthCnvBudYear = 3;
      break;
    case 1:
      monthCnvBudYear = 4;
      break;
    case 2:
      monthCnvBudYear = 5;
      break;
    case 3:
      monthCnvBudYear = 6;
      break;
    case 4:
      monthCnvBudYear = 7;
      break;
    case 5:
      monthCnvBudYear = 8;
      break;
    case 6:
      monthCnvBudYear = 9;
      break;
    case 7:
      monthCnvBudYear = 10;
      break;
    case 8:
      monthCnvBudYear = 11;
      break;
    default:
      monthCnvBudYear = 12;
    break;
  }
  return monthCnvBudYear;
}

