import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-category-department-list',
  templateUrl: 'category-department-list.html',
})
export class CategoryDepartmentListPage {
  username:any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app:App) {
  }

  ionViewDidLoad() {
    this.username = localStorage.userData;
  }


  TaxTopRegTable(group_id){
    this.navCtrl.push('TaxBudgetRegPage',{group_id:group_id}); 
   /*  this.app.getRootNav().push(TaxBudgetRegPage,{group_id:group_id});  */
  }

  TaxTopMthTable(){
    this.navCtrl.push('TaxBudgetRegByMthPage'); 
    /* this.app.getRootNav().push(TaxBudgetRegByMthPage);  */
  }

}
