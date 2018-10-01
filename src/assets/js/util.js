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
            
      var now = new Date();  
      var buddhayear = now.getFullYear()+543;    
      var last  =  new Date(now.getFullYear(),now.getMonth(),0); //th 
      var budgetyear =  0;
      
      // ปล. เดือน ในระบบ เริ่มตั้งแต่ 0 จึง +1 ให้ลำดับเท่ากับปฏิทิน
      if (now.getMonth()+1 >= 10) {budgetyear= buddhayear;}
      else {budgetyear=buddhayear-1;}
      
      var thmonth = new Array ("มกราคม","กุมภาพันธ์","มีนาคม",
      "เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
      "ตุลาคม","พฤศจิกายน","ธันวาคม");
      /* if((now.getDate()-1) < 1){
          dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ last.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()-1] ) +" ปีงบฯ " +  (now.getMonth()-1  ? buddhayear- 1 : buddhayear ); 
        }else{
          dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ (now.getDate()-1) +" "+  (now.getMonth()-1 < 0 ?thmonth[11] : thmonth[now.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()-1  < 0 ? buddhayear- 1 : buddhayear );
        } */
      
        if((now.getDate()-1) < 1){
          dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ last.getDate() +" "+   (last.getMonth()-2 < 0 ?thmonth[11] : thmonth[last.getMonth()]) +" ปีงบฯ " +  (last.getMonth()+1 >= 10  ? buddhayear: buddhayear-1 ); 
        }else{
          dateDisplayAll="ตั้งแต่ 1 ตุลาคม ถึง "+ (now.getDate() -1) +" "+  (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[last.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()+1 >= 10  ? buddhayear: buddhayear-1);
        }
        dateDisplayNow =  " ข้อมูล ณ วันที่ "+ now.getDate() +" "+   (now.getMonth()-2 < 0 ?thmonth[11] : thmonth[now.getMonth()] ) +" ปีงบฯ " +  (now.getMonth()+1  >= 10  ? buddhayear: buddhayear-1);
          //ฟังก์ชั่น เปลี่ยนบาทเป็นล้านบาท
        function changeCurrency(val,typeNow) {
          try {
              var result = 0; 
              if (typeNow == 'M') {
                val = val/1000000;
                result = notRound(val);
              }else {
                result = notRound(val);
              } 
              result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
              return result;
          }
          catch (e) {
              alert('error: ' + e);
          }
        }
       //ฟังก์ชั่น ไม่ปัดเศษ
      /* function notRound(number, precision){
          var factor = Math.pow(10, precision);
          var tempNumber = number * factor;
          var roundedTempNumber = Math.floor(tempNumber);
          return roundedTempNumber / factor;
      } */
      
      function notRound(val){
        var returnVal;  
        var res = val.toString().split("."); 
        if(res.length == 1){
         returnVal = res + ".00" ;
        }else if(res[1].length < 2){
             returnVal =res[0]+ "." + res[1] + "0";
        }else{
             returnVal = res[0] + "." + res[1].substring(0, 2);
        }
        return returnVal;
      }