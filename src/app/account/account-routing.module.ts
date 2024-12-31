import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';

const routes: Routes = [
  {
    path: "update-profile",
    component: UpdateProfileComponent
  },

  {
    path: "supplier-profile",
    component: ProfileManagementComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
