import { Component, OnInit, ViewChild } from '@angular/core';
import { ManagePoliciesComponent } from '../manage-policies/manage-policies.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import Swal from 'sweetalert2';
import { MyServiceService } from 'src/app/my-service.service';
import { NotificationServiceService } from 'src/app/notification-service.service';

@Component({
  selector: 'app-all-policies',
  templateUrl: './all-policies.component.html',
  styleUrls: ['./all-policies.component.sass']
})
export class AllPoliciesComponent implements OnInit {
  displayedColumns: string[] = [
    "select", "id", "policyNumber", "policyHolderName","startDate", "endDate","premiumAmount","coverageType", "action"
  ];
  

  loading: boolean = false;
  data: any;
  error: any;
  dialogConfig: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selection = new SelectionModel<any>(true, []); // For row selection

  downloadLoading: boolean = false;
  posting: boolean = false;
  showForm: boolean = false;

  Form: FormGroup;

  constructor(
    private dialog: MatDialog,
    private policiesService: MyServiceService,
    private snackbar: SnackbarService,
    private fb: FormBuilder,
    private notificationAPI: NotificationServiceService
  ) {}

  ngOnInit(): void {
    this.Form = this.fb.group({
      status: ['PENDING'],
    });
    this.Form.valueChanges.subscribe(() => {
      this.getData();
    });

    this.getData();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  reqStatuses: any[] = [
    { name: "PENDING" },
    { name: "APPROVED" },
    { name: "RETURNED" },
    { name: "REJECTED" },
  ];
  selectedStatus: string = "PENDING";

  getData() {
    this.loading = true;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.policiesService.getActivePolicies().pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.data = res.entity;
          console.log("Policies displayed on table", this.data);
          this.loading = false;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        this.loading = false;
        this.notificationAPI.alertWarning("Server Error: " + err.message);
      },
      complete: () => {},
    });
  }

  refresh() {
    this.getData();
  }


  mngRecord(action: any, record?: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; 
    dialogConfig.width = "800px"; 
    dialogConfig.data = { action, record };
  
    const dialogRef = this.dialog.open(ManagePoliciesComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(() => {
      this.getData();  
    });
  }
  

  deleteRecord(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "THIS RECORD WILL BE DELETED PERMANENTLY!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
  
        this.policiesService.deletePolicy(id).pipe(takeUntil(this.destroy$)).subscribe({
          next: (res) => {
            if (res.statusCode == 200) {
              this.getData();  
              this.loading = false;
              this.notificationAPI.alertSuccess("RECORD DELETED SUCCESSFULLY");
            } else {
              this.getData();
              this.loading = false;
              this.notificationAPI.alertWarning(res.message);
            }
          },
          error: (err) => {
            this.loading = false;
            this.notificationAPI.alertSuccess("Server Error: " + err.message);
          },
          complete: () => {},
        });
      }
    });
  }
  

  input: any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.input = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1}`;
  }

  expSelected() {
    this.atleastOneSelected = true;
    this.selectedRows = this.selection.selected;
    console.log("this.selectedRows: ", this.selectedRows);
  }
}
