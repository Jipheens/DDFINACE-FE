import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { User } from "../types/user";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}

  // /soa/otherusers/find/{id}
  getUserById(userId): Observable<User> {
    const getUserByIdUrl = `${environment.baseUrl}/soa/otherusers/find/${userId}`;

    return this.http.get<User>(getUserByIdUrl);
  }

  updatePassword(user): Observable<{ message: string }> {
    const updatePasswordUrl = `${environment.baseUrlSelfservice}/erp/suppliers/auth/updatepassword`;

    return this.http.put<{ message: string }>(updatePasswordUrl, user);
  }

  updatePersonalProfile(profileBody): Observable<{ message: string }> {
    const updatePasswordUrl = `${environment.baseUrl}/erp/otherusers/updateprofile`;

    return this.http.put<{ message: string }>(updatePasswordUrl, profileBody);
  }

  getProfileById(params: any): Observable<any> {
    const NeedssUrl = `${environment.baseUrlSelfservice}/erp/profile/company-information/find/by/suppliercode`;
    return this.http.get<any>(NeedssUrl, { params: params });
  }

  addProfile(data: any): Observable<any> {
    const NeedssUrl = `${environment.baseUrlSelfservice}/erp/profile/company-information/create`;
    return this.http.post<any>(NeedssUrl, data);
  }
  updateProfile(data: any): Observable<any> {
    const NeedssUrl = `${environment.baseUrlSelfservice}/erp/profile/company-information/update`;
    return this.http.put<any>(NeedssUrl, data);
  }

  // getBanksFromCore(): Observable<any> {
  //   const expenseUrl = `${environment.baseUrl}/getBanks`;
  //   return this.http.post<any[]>(expenseUrl, {});
  // }
  getBanksFromCore(): Observable<any> {
    const banks = [
      { BankID: "01", BankName: "KENYA COMMERCIAL BANK" },
      { BankID: "02", BankName: "STANDARD CHARTERED BANK" },
    ];
    return of(banks);
  }

  // getBranchesFromCore(reqBody): Observable<any> {
  //   const expenseUrl = `${environment.baseUrl}/getBranches`;
  //   return this.http.post<any[]>(expenseUrl, reqBody);
  // }
  getBranchesFromCore(reqBody): Observable<any> {
    const branches = [
      { BranchID: "000", BranchName: "Micro Finance Head Office" },
      { BranchID: "001", BranchName: "KOINANGE STREET BRANCH" },
      {
        BranchID: "100",
        BranchName: "KIONGOZI CENTRE",
      },
    ];
    return of(branches);
  }
}
