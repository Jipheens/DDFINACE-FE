import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { ComponentsModule } from '../shared/components/components.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '../shared/shared.module';
import { ProfileManagementComponent } from './pages/profile-management/profile-management.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BanksLookupComponent } from './pages/app/banks-lookup/banks-lookup.component';
import { BranchesLookupComponent } from './pages/app/branches-lookup/branches-lookup.component';


@NgModule({
  declarations: [
    UpdateProfileComponent,
    ProfileManagementComponent,
    BanksLookupComponent,
    BranchesLookupComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    ComponentsModule,
    SharedModule,
    MatTabsModule,
    MatCheckboxModule,


    MatIconModule,
    PerfectScrollbarModule,
    MatTooltipModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    

    
    MatFormFieldModule,
    
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    ComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    
    MatSnackBarModule,
    // MatToolbarModule,
    
    SharedModule,
    // MatStepperModule,
    NgxMaskModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressBarModule,
    MatRadioModule,
    DragDropModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
  ]
})
export class AccountModule { }
