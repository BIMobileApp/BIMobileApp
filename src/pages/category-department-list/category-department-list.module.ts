import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryDepartmentListPage } from './category-department-list';

@NgModule({
  declarations: [
    CategoryDepartmentListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryDepartmentListPage),
  ],
})
export class CategoryDepartmentListPageModule {}
