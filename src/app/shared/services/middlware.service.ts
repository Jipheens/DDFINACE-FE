import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class MiddlewareService {
  constructor(private http: HttpClient) {}

  getGlAccountStatements(body: any): Observable<any> {
    const GLAccountManagementUrl = `${environment.baseUrlMiddleware}/getAccountStatement`;
    return this.http.post<any[]>(GLAccountManagementUrl, body);
  }

  getGlAccountDetails(body: any): Observable<any> {
    const GLAccountManagementUrl = `${environment.baseUrlMiddleware}/getAccountDetails`;
    return this.http.post<any>(GLAccountManagementUrl, body);
  }



  // getGlAccountDetails(params): Observable<any> {
  //   const glDetails = {
  //     WebServiceStatus: "00",
  //     ClientID: "1942130",
  //     Name: "ERIC MUTHII MWANGI",
  //     ClientType: "Individual Client",
  //     ID1: "32884927",
  //     DateOfBirth: "1994-04-23T00:00:00+03:00",
  //     GenderID: "M",
  //     TitleID: "MR",
  //     BusinessLineID: "Proprietary",
  //     Email: "erickkaragu58@gmail.com",
  //     Mobile: "0707427903",
  //     ClearBalance: "500.0000",
  //     DayOpeningClearBalance: "1",
  //     UnClearBalance: "0.0000",
  //     DayOpeningUnclearBalance: "0",
  //     DrawingPower: "0.0000",
  //     UnSupervisedCredits: "0.0000",
  //     UnSupervisedDebits: "0.0000",
  //     FreezedAmount: "0.0000",
  //     CreditInterest: "0.0000",
  //     DebitInterest: "0.0000",
  //     AvailableBalance: "500.0000",
  //     TotalBalance: "500.0000",
  //     MinimumBalance: "0",
  //     DepositBalance: "0.0000",
  //     CurrencyID: "KES",
  //     ProductTypeID: "CA",
  //     OpenedDate: "2023-08-14",
  //     AccountStatusID: "AA",
  //     Status: "Active",
  //     ClientStatusID: "A",
  //     OurBranchID: "603",
  //     BranchName: "MOMBASA",
  //     ClientName: "ERIC MUTHII MWANGI",
  //     ProductID: "JCA02",
  //     ProductName: "BORA TRANSACTION ACCOUNT",
  //     AccountID: "6031942130002",
  //     AccountName: "ERIC MUTHII MWANGI",
  //     CardNo: "N/A",
  //     Address1: "N.A",
  //     Address2: "THIKA NEAR KENOL",
  //     CityID: "MOM24",
  //     CountryID: "KE",
  //     CountryName: "Kenya",
  //     Fax: "Medium Risk- Refer",
  //     EmailID: "erickkaragu58@gmail.com",
  //     OperatingModeID: "S",
  //     OperatingInstructions: "SELF",
  //     AccountClassID: "SMC001",
  //     CreatedBy: "MKIBUGI",
  //     CreatedOn: "2023-08-14T15:09:00+03:00",
  //     SupervisedBy: "EAGWACHA",
  //     SupervisedOn: "2023-08-14T15:16:00+03:00",
  //     UpdateCount: "2",
  //     IsDormant: "false",
  //     ExcessInterest: "0",
  //     InterestOutStanding: "0",
  //     PenaltyOutstanding: "0",
  //     OpenedBy: "MKIBUGI",
  //     YearOpeningClearBalance: "0",
  //     YearOpeningUnclearBalance: "0",
  //     NoDBTrxafterDormantActivation: "0",
  //     AccountPrefix: "117",
  //     IsSelect: "0"
  //   }
  //   return of(glDetails);
  // }



   getBanksFromCore(): Observable<any> {
    const expenseUrl = `${environment.baseUrlMiddleware}/getBanks`;
    return this.http.post<any[]>(expenseUrl, {});
  }
  // getBanksFromCore(): Observable<any> {
  //   const banks = [
  //     { BankID: "01", BankName: "KENYA COMMERCIAL BANK" },
  //     { BankID: "02", BankName: "STANDARD CHARTERED BANK" },
  //   ];
  //   return of(banks);
  // }

  getBranchesFromCore(reqBody): Observable<any> {
    const expenseUrl = `${environment.baseUrlMiddleware}/getBranches`;
    return this.http.post<any[]>(expenseUrl, reqBody);
  }
  // getBranchesFromCore(reqBody): Observable<any> {
  //   const branches = [
  //     { BranchID: "000", BranchName: "Micro Finance Head Office" },
  //     { BranchID: "001", BranchName: "KOINANGE STREET BRANCH" },
  //     {
  //       BranchID: "100",
  //       BranchName: "KIONGOZI CENTRE",
  //     },
  //   ];
  //   return of(branches);
  // }
}
