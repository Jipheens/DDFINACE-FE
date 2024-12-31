import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-widgets',
  templateUrl: './dashboard-widgets.component.html',
  styleUrls: ['./dashboard-widgets.component.css']
})
export class DashboardWidgetsComponent implements OnInit {

  rfpCount: number = 0;
  rfqCount: number = 0;
  poCount: number = 0;
  invoiceCount: number = 0;
  data: any;
  subscription!: Subscription;



  constructor(
    private router: Router,
    // private SupplierCategoryService: SupplierCategoriesService,
    ) {}

  ngOnInit(): void {
    this.getSuppliers();
    this.getExpenses();
    this.getBranschStores();
    this.getAllUsers();
  }

  suppliers() {
    this.router.navigateByUrl('/admin/supplier/suppliers-management/all');

  }
  expenses() {
    this.router.navigateByUrl('/admin/supplier/expenses-management/all');
    
  }
  branschStores() {
    this.router.navigateByUrl('/admin/supplier/cost-centers-management/all');
  }
  userManagement() {
    this.router.navigateByUrl('/admin/user-accounts/all');
  }

  getExpenses(){
    // this.expenseService.getExpenses
    // ()
    // .subscribe(
    //   (res) => {
    //     this.expenseCount = res.length;
    //   },
    //   (err) => {
    //     console.log(err);
    //   })
  }

  
  // Getting Supplier Categories
  getSuppliers() {
    // this.subscription = this.SupplierCategoryService.getCategories().subscribe(res => {
    //   this.data = res;
    //   this.suppliersCount = this.data.length;
    // })

  }
  getBranschStores() {
    // this.branschStoreservice
    //   .getBranschStores()
    //   .subscribe(
    //     (res) => {
          
    //       this.branschStoresCount = res.length;

         
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }
  getAllUsers() {
    // this.accountService
    //   .listActiveAccounts()
    //   .subscribe(
    //     (res) => {
    //       this.usersCount = res.length;          
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
  }


}


