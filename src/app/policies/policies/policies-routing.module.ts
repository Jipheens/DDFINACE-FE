import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePoliciesComponent } from './manage-policies/manage-policies.component';
import { AllPoliciesComponent } from './all-policies/all-policies.component';

const routes: Routes = [


  {
    path: "manage-policies",
    component: ManagePoliciesComponent,
  },
  {
    path: "all-policies",
    component: AllPoliciesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
