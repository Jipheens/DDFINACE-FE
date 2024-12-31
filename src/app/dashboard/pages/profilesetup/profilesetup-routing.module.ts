import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEnvironmentalComponent } from './view-environmental/view-environmental.component';
import { ViewRiskandcomplianceComponent } from './view-riskandcompliance/view-riskandcompliance.component';
import { ViewRatingsandreferencesComponent } from './view-ratingsandreferences/view-ratingsandreferences.component';
import { ViewFinancialperformanceComponent } from './view-financialperformance/view-financialperformance.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdatingCompanyInfoComponent } from './updating-company-info/updating-company-info.component';
const routes: Routes = [
   {path: "", component: ViewEnvironmentalComponent},
   {path: "riskandcompliance", component: ViewRiskandcomplianceComponent},
   {path: "financialperformance", component: ViewFinancialperformanceComponent},
   { path: "ratingsandreferences", component: ViewRatingsandreferencesComponent },
   { path: "editprofile", component: EditProfileComponent },
   { path: "viewprofile", component: ViewProfileComponent },
   { path: "update-company-info", component: UpdatingCompanyInfoComponent },



   


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesetupRoutingModule { }
