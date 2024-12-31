import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

import { ProfilesetupRoutingModule } from './profilesetup-routing.module';
import { ViewEnvironmentalComponent } from './view-environmental/view-environmental.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewRiskandcomplianceComponent } from './view-riskandcompliance/view-riskandcompliance.component';
import { ViewFinancialperformanceComponent } from './view-financialperformance/view-financialperformance.component';
import { ViewRatingsandreferencesComponent } from './view-ratingsandreferences/view-ratingsandreferences.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxMaskModule } from 'ngx-mask';
import { CdkColumnDef } from '@angular/cdk/table';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditQuestionsDialogComponent } from './edit-questions-dialog/edit-questions-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { UpdatingCompanyInfoComponent } from './updating-company-info/updating-company-info.component';


@NgModule({
  declarations: [
    ViewEnvironmentalComponent,
    ViewRiskandcomplianceComponent,
    ViewFinancialperformanceComponent,
    ViewRatingsandreferencesComponent,
    EditProfileComponent,
    ViewProfileComponent,
    EditQuestionsDialogComponent,
    UpdatingCompanyInfoComponent,
  ],
  imports: [
    CommonModule,
    ProfilesetupRoutingModule,
    MatExpansionModule,


    MatIconModule,
    ComponentsModule,
    SharedModule,
    CdkAccordionModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,
    MatIconModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    ComponentsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    SharedModule,
    MatStepperModule,
    NgxMaskModule,
    MatChipsModule,
    CommonModule,
    FormsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSliderModule,
    NgbModule,
    PerfectScrollbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTabsModule, 
    MatButtonModule,  
    MatDatepickerModule,    
    MatSnackBarModule,
    
  ],
  providers: [
    { provide: CdkColumnDef, useClass: CdkColumnDef }
  ],
})

export class ProfilesetupModule { }
