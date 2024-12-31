import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { MyServiceService } from 'src/app/my-service.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manage-policies',
  templateUrl: './manage-policies.component.html',
  styleUrls: ['./manage-policies.component.sass']
})
export class ManagePoliciesComponent implements OnInit {

  mngForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  pageFunction: string = "Add";
  hideSubmit: boolean = false;
  isLoading: boolean = true;
  posting: boolean = false;
  response: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private policiesService: MyServiceService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ManagePoliciesComponent>
  ) {}

  ngOnInit(): void {
    console.log("Dialog data:", this.data);  
  
    if (this.data) {
      this.pageFunction = this.data.action;
      this.formData = this.data.record;
      this.generateForm(this.formData);
      this.getPage();
    }
  }
  

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  formData: any;
  disableTransactionType: boolean = true;

  getPage() {
    this.disableTransactionType = true;
    console.log("this.data.action :", this.data.action);
    if (this.data.action === "Add") {
      this.isLoading = false;
      this.generateForm(this.data.record);
    } else if (this.data.action === "Update") {
      this.generateForm(this.data.record);
    } else if (this.data.action === "View") {
      this.generateForm(this.data.record);
      this.activateViewMode();
    }
    this.isLoading = false;
  }

  generateForm(formData?: any): void {
    console.log("generateForm formData :: ", formData);
    this.mngForm = this.fb.group({
      id: [formData?.id ?? ''],
      policyNumber: [formData?.policyNumber ?? '', Validators.required],
      policyHolderName: [formData?.policyHolderName ?? '', Validators.required],
      startDate: [formData?.startDate ?? '', Validators.required],
      endDate: [formData?.endDate ?? '', Validators.required],
      premiumAmount: [formData?.premiumAmount ?? '', [Validators.required, Validators.min(1)]],
      coverageType: [formData?.coverageType ?? '', Validators.required],
    });
  }

  viewMode: boolean = false;

  activateViewMode() {
    this.viewMode = true;
  }


  // submit() {
  //   console.log("this.mngForm.value: ", this.mngForm.value);
  //   this.posting = true;

  //   if (this.pageFunction === "Add") {
  //     this.policiesService.createPolicy(this.mngForm.value)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe({
  //         next: (res) => {
  //           this.response = res;
  //           console.log("res: ", res);
  //           if (res.statusCode === 201) {
  //             this.snackbar.showNotification("snackbar-success", res.message);
  //           } else {
  //             this.snackbar.showNotification("snackbar-danger", res.message);
  //           }
  //         },
  //         error: (err) => {
  //           console.error("Error:", err);
  //           this.snackbar.showNotification("snackbar-danger", err.message || 'An error occurred');
  //         },
  //         complete: () => {
  //           this.posting = false;
  //           setTimeout(() => {
  //             this.onNoClick();
  //           }, 3000);
  //         },
  //       });
  //   } else if (this.pageFunction === "Update") {
  //     this.policiesService.updatePolicy(this.mngForm.value)
  //       .pipe(takeUntil(this.destroy$))
  //       .subscribe({
  //         next: (res) => {
  //           this.response = res;
  //           console.log("resres:: ", res);
  //           if (res.statusCode === 200) {
  //             this.snackbar.showNotification("snackbar-success", res.message);
  //           } else {
  //             this.snackbar.showNotification("snackbar-danger", res.message);
  //           }
  //         },
  //         error: (err) => {
  //           console.error("Error:", err);
  //           this.snackbar.showNotification("snackbar-danger", err.message || 'An error occurred');
  //         },
  //         complete: () => {
  //           this.posting = false;
  //           setTimeout(() => {
  //             this.onNoClick();
  //           }, 3000);
  //         },
  //       });
  //   }
  // }


  submit() {
    console.log("this.mngForm.value: ", this.mngForm.value);
    this.posting = true;
  
    // Remove 'id' from the payload for Add operation
    let payload = { ...this.mngForm.value };
  
    // Only remove 'id' if it's for an Add operation
    if (this.pageFunction === "Add") {
      delete payload.id; // Exclude 'id' for Add
    }
  
    if (this.pageFunction === "Add") {
      this.policiesService.createPolicy(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.response = res;
            console.log("res: ", res);
            if (res.statusCode === 201) {
              this.snackbar.showNotification("snackbar-success", res.message);
            } else {
              this.snackbar.showNotification("snackbar-danger", res.message);
            }
          },
          error: (err) => {
            console.error("Error:", err);
            this.snackbar.showNotification("snackbar-danger", err.message || 'An error occurred');
          },
          complete: () => {
            this.posting = false;
            setTimeout(() => {
              this.onNoClick();
            }, 3000);
          },
        });
    } else if (this.pageFunction === "Update") {
      this.policiesService.updatePolicy(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.response = res;
            console.log("resres:: ", res);
            if (res.statusCode === 200) {
              this.snackbar.showNotification("snackbar-success", res.message);
            } else {
              this.snackbar.showNotification("snackbar-danger", res.message);
            }
          },
          error: (err) => {
            console.error("Error:", err);
            this.snackbar.showNotification("snackbar-danger", err.message || 'An error occurred');
          },
          complete: () => {
            this.posting = false;
            setTimeout(() => {
              this.onNoClick();
            }, 3000);
          },
        });
    }
  }
  

  onNoClick(): void {
    this.mngForm.reset();
    this.dialog.closeAll();
  }

}