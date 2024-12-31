import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil, Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ProfileManagementComponent } from '../../profile-management/profile-management.component';
import { AccountService } from 'src/app/account/data/services/account.service';

@Component({
  selector: 'app-banks-lookup',
  templateUrl: './banks-lookup.component.html',
  styleUrls: ['./banks-lookup.component.sass']
})
export class BanksLookupComponent implements OnInit {

  displayedColumns: string[] = [
    "select",
    "BankID",
    "BankName",
    
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  selection = new SelectionModel<any>(false, []);

  selectedRows: any[] = [];
  atleastOneSelected: boolean = false;

  dataSourceFilteredList: any[] = [];
  array: any[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  isLoading: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ProfileManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    if (this.data.action === 'Single Bank') {
      this.selection = new SelectionModel<any>(false, []);
    } else {
      this.selection = new SelectionModel<any>(true, []);
    }

    this.getData();
  }
  ngAfterViewInit() {
    console.log("Finally: ", this.dataSourceFilteredList);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  filter() {
    //let storeId = [1, 2, 3];
    this.dataSource.data.forEach((element) => {
      this.array.forEach((item) => {
        if (item === element.id) {
          // this.dataSourceFilteredList.push(this.dataSource.data.indexOf(element));
          this.selection.select(element);
        }
      });
    });

    console.log("dataSourceFilteredList ", this.dataSourceFilteredList);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //******************************************************************************************************
  //Select

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.position + 1
      }`;
  }

  expSelected() {
    this.atleastOneSelected = true;
    this.selectedRows = this.selection.selected;

    console.log("this.selectedRows: ", this.selectedRows);
  }
  proceed() {
    this.dialogRef.close({ event: "close", data: this.selectedRows });

    //   console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close({ event: "close", data: this.selectedRows });
  }
  public confirmAdd(): void { }

  getData() {
    this.isLoading = true;

    // let params = { status: "APPROVED" }
    this.accountService
      .getBanksFromCore()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {

          console.log("RESPONSE =>: ", res);

          this.data = res;


          console.log("this.data: ", this.data);

          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          this.isLoading = false;
        },
        error: (err) => {
          this.snackbar.showNotification("snackbar-danger", err.message);
        },
        complete: () => { },
      }),
      Subscription;
  }
}
