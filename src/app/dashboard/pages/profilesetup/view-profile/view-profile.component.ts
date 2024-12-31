import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenCookieService } from 'src/app/core/service/token-storage-cookies.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  companyInfo: any;
  currentUser: any;
  data: any;


  constructor(private companyInfoService: MyServiceService,
    private tokenCookiService: TokenCookieService,
    private tokenStorageService: TokenStorageService,
    private router: Router,

    ) {
      this.currentUser = this.tokenCookiService.getUser();
      
      const defaultSupplierName = this.currentUser?.username || "";
      const defaultSupplierRole = this.currentUser?.role || "";
    }

  ngOnInit(): void {
    this.fetchCompanyInfo();    
  }

  fetchCompanyInfo() {
    const params = new HttpParams().set("supplierCode", this.currentUser.supplierCode);
    console.log("this.params :", params);
    this.companyInfoService.getCompanyInfo(params)
      .subscribe(
        data => {
          this.companyInfo = data;
          console.log('companyInfo:', this.companyInfo.entity);
          console.log("current user:", this.currentUser);
          const additionalData=this.companyInfo.entity;
          console.log('companyInfo Additonal data:', additionalData);


        },
        error => {
          console.error('Error fetching data:', error);
        }
      );
  }
   



  onEditButtonClick(data: any) {
    const additionalData = data;
    const serializedData = JSON.stringify(additionalData);

    let route = '/dashboard/environmental/update-company-info';
    this.router.navigate([route], { queryParams: { id: data.id, additionalData: serializedData ,action: 'Update' } });
  }

}
