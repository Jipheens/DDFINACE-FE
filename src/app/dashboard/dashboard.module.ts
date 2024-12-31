import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxMaskModule } from 'ngx-mask';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardWidgetsComponent } from './pages/dashboard-widgets/dashboard-widgets.component';
import { ChartsModule as chartjsModule } from "ng2-charts";

@NgModule({
  declarations: [ DashboardComponent, DashboardWidgetsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    //Additional imports
    MatIconModule,
    // NgApexchartsModule,
    PerfectScrollbarModule,
    // MatMenuModule,
    MatTooltipModule,
    // MatProgressBarModule,
    
    // MatTableModule,
    // MatPaginatorModule,
    MatInputModule,
    // MatSortModule,
    
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
    chartjsModule,
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
  ],
  bootstrap: [DashboardComponent],
  exports: [DashboardWidgetsComponent]

})
export class DashboardModule { }
