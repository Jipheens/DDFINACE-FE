import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormArray,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject, BehaviorSubject, takeUntil, Subscription } from "rxjs";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { MyServiceService } from "src/app/my-service.service";
import {
  FilesService,
  SelectedFiles,
} from "src/app/shared/services/files.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { HttpParams } from "@angular/common/http";
import { BanksLookupComponent } from "../app/banks-lookup/banks-lookup.component";
import { BranchesLookupComponent } from "../app/branches-lookup/branches-lookup.component";

@Component({
  selector: "app-profile-management",
  templateUrl: "./profile-management.component.html",
  styleUrls: ["./profile-management.component.sass"],
})
export class ProfileManagementComponent implements OnInit {
  showForm = false;
  pageFunction = "Add";
  mngForm: FormGroup;
  currentUser: any;

  bgtForm: FormGroup;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formData: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  downloadLoading: boolean = false;

  hideSubmit = false;
  hideApprovals: boolean = true;
  approvalVisible: boolean = false;
  disableActions = false;

  documentTypes = [
    { value: "1", label: "List of Directors" },
    { value: "2", label: "Certificate of Incorporation" },
    { value: "3", label: "Trading Certificate" },
    { value: "4", label: "TAX PIN Certificate" },
    { value: "5", label: "CR12" },
    { value: "6", label: "Certificate/Licenses from relevant authorities" },
    { value: "7", label: "Copy of VAT Certificate" },
    { value: "8", label: "Copy of Tax Compliance certificate" },
    {
      value: "9",
      label: "Bank Statement certified by the Bank(last 3 months)",
    },
    { value: "10", label: "Other" },
  ];

  productsAndServicesOptions = [
    { value: "Goods", label: "Goods" },
    { value: "Service", label: "Service" },
    { value: "Goods and Services", label: "Goods and Services" },
  ];

  constructor(
    private fb: FormBuilder,
    private filesService: FilesService,
    private tokenStorageService: TokenStorageService,
    private accountService: AccountService,
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.currentUser = this.tokenStorageService.getUser();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.getPage();

    this.getDataById();

    // if (
    //   this.route.queryParams &&
    //   typeof this.route.queryParams.subscribe === "function"
    // ) {
    //   this.route.queryParams.subscribe((params) => {
    //     console.log("params: ", params);
    //     if (params.id) {
    //       this.Id = params.id;
    //       console.log("ID:", this.Id);
    //       this.getDataById();
    //       this.pageFunction = params.action;
    //     }
    //   });
    //   this.showForm = true;
    // } else {
    //   this.showForm = true;
    // }

    console.log("this.currentUser: ", this.currentUser.supplierCode);
  }
  Id: any;
  getDataById() {
    const params = new HttpParams().set(
      "supplierCode",
      this.currentUser.supplierCode
    );
    this.accountService
      .getProfileById(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log("res :", res);
          if (res.entity) {
            this.formData = res.entity;
            this.pageFunction = "Update";
            // this.isLoading = false;
            this.enteredGlAccount = this.formData.bankAc;
            if (this.formData.mandatoryDocumentations.length > 0) {
              this.isFileDataLoading = false;
              this.formData.mandatoryDocumentations.forEach((element) => {
                const newRow = this.fb.group({
                  file: [element.file],
                  filename: [element.filename],
                  filetype: [element.filetype],
                  documentType: [element.documentType],
                });
                this.rows.push(newRow);
              });

              this.updateView();
            }

            // this.attachementsDataSource.next(
            //   this.formData.mandatoryDocumentations
            // );

            this.showForm = true;

            console.log("ID:", this.Id);

            this.getPage();

            console.log("this.formData :", this.formData);
          } else {
            this.snackbar.showNotification("snackbar-danger", res.message);
            this.showForm = true;
          }
        },
        error: (err) => {
          this.snackbar.showNotification("snackbar-danger", err.message);
          this.showForm = true;
        },
        complete: () => {},
      }),
      Subscription;
  }

  getPage(): void {
    if (this.pageFunction === "Add") {
      this.generateEmptyForm();
      this.hideApprovals = true;
    } else if (this.pageFunction === "Update") {
      this.generateFormWithData();

      this.hideApprovals = true;
    }
  }

  receivedGlDetails: any;

  onGlDetailsChange(glDetails: any) {
    this.receivedGlDetails = glDetails;
    this.mngForm.patchValue({
      bankName: "CaritasBank",
      // bankAc:this.receivedGlDetails.AccountID,
      toBankID: "51",
      branchName: this.receivedGlDetails.BranchName,
      toBranchID: this.receivedGlDetails.OurBranchID,
      bankAcName: this.receivedGlDetails.AccountName,
      currency: this.receivedGlDetails.CurrencyID,
    });
    console.log("this.receivedGlDetails:: ", this.receivedGlDetails);
  }
  isGlDetailsProcessing: boolean = false;

  onGlDetailsProcessing(isProcessing: boolean) {
    console.log("isProcessing:: ", isProcessing);
    this.isGlDetailsProcessing = isProcessing;
  }
  generateEmptyForm() {
    this.mngForm = this.fb.group({
      supplierCode: [this.currentUser.supplierCode, [Validators.required]],
      // yearEstablished: [0, [Validators.required]],
      // companySize: ["", [Validators.required]],
      // numberOfEmployees: [0, [Validators.required]],
      // industry: ["", [Validators.required]],
      // productsAndServices: ["", [Validators.required]],
      // taxId: ["", [Validators.required]],
      // poDeliveryEmail: ["", [Validators.required]],
      // ownershipType: ["", [Validators.required]],
      hasCaritasAccount: ["", [Validators.required]],
      bankName: ["", [Validators.required]],
      bankAc: ["", [Validators.required]],
      bankAcName: ["", [Validators.required]],
      toBankID: ["", [Validators.required]],
      branchName: ["", [Validators.required]],
      toBranchID: ["", [Validators.required]],
      currency: ["", [Validators.required]],

      remarks: ["N/A"],
      mandatoryDocumentations: [[]],
    });
  }

  generateFormWithData() {
    this.mngForm = this.fb.group({
      id: [this.formData.id],
      supplierCode: [this.formData.supplierCode, [Validators.required]],
      // yearEstablished: [this.formData.yearEstablished, [Validators.required]],
      // companySize: [this.formData.companySize, [Validators.required]],
      // numberOfEmployees: [this.formData.numberOfEmployees, [Validators.required]],
      // industry: [this.formData.industry, [Validators.required]],
      // productsAndServices: [
      //   this.formData.productsAndServices,
      //   [Validators.required],
      // ],
      // taxId: [this.formData.taxId, [Validators.required]],
      // poDeliveryEmail: [this.formData.poDeliveryEmail, [Validators.required]],
      // ownershipType: [this.formData.ownershipType, [Validators.required]],
      hasCaritasAccount: [
        this.formData.hasCaritasAccount,
        [Validators.required],
      ],
      bankName: [this.formData.bankName, [Validators.required]],
      bankAc: [this.formData.bankAc, [Validators.required]],
      bankAcName:[this.formData.bankAcName, [Validators.required]],
      toBankID: [this.formData.toBankID, [Validators.required]],
      branchName: [this.formData.branchName, [Validators.required]],
      toBranchID: [this.formData.toBranchID, [Validators.required]],
      currency: [this.formData.currency, [Validators.required]],

      remarks: [this.formData.remarks],
      mandatoryDocumentations: [this.formData.mandatoryDocumentations || []],
    });
  }
  accountLogic(event: any) {
    if (event.value == "Yes") {
    }
  }
  enteredGlAccount: any;
  accountNumberCheck(inputValue: string): void {
    if (inputValue && !this.mngForm.value.hasCaritasAccount) {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please fill in the account type field first"
      );

      this.mngForm.get("bankAc").setValue(null);
    } else {
      this.enteredGlAccount = inputValue;
    }
  }
  // *************************************************************************************************************************************

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // **************************************************************************************************
  //UploadDocuments

  attachementsDataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = [
    "id",
    "documentType",
    "filename",
    "filetype",
    "selectFile",
    "download",
    "action",
  ];
  rows: FormArray = this.fb.array([]);
  documentsForm: FormGroup = this.fb.group({ filedetails: this.rows });

  isFileDataLoading: boolean = true;

  fileForm: FormGroup;
  fileInputs: FormArray;

  createFileForm() {
    this.fileForm = this.fb.group({
      files: this.fb.array([]),
    });
    //this.fileInputs = this.fileForm.get('files') as FormArray;
    this.addFileRow();
  }

  addFileRow() {
    this.isFileDataLoading = false;
    const row = this.fb.group({
      documentType: ["", Validators.required],
      file: ["", Validators.required],
      filetype: ["", Validators.required],
      filename: ["", Validators.required],
    });
    //this.fileInputs.push(row);
    this.rows.push(row);
    this.attachementsDataSource.next(this.rows.controls);
  }

  updateView() {
    this.attachementsDataSource.next(this.rows.controls);

    this.mngForm.patchValue({
      mandatoryDocumentations: this.documentsForm.value.filedetails,
    });
  }

  deleteCall(row: AbstractControl) {
    const dataArray = this.attachementsDataSource.getValue();
    const index = dataArray.indexOf(row);

    if (index !== -1) {
      dataArray.splice(index, 1);
      this.attachementsDataSource.next(dataArray);
    }
  }

  public selectedFiles: SelectedFiles[] = [];
  public isFileLoading = new BehaviorSubject(false);

  currFile: string;
  currFilename: any;
  currType: any;

  onSelectFile(files, selectedRow, index) {
    console.log("row: ", selectedRow.value, index);
    this.isFileLoading.next(true);
    this.selectedFiles = [];
    this.filesService.toBase64(files, this.selectedFiles).subscribe((res) => {
      if (res) {
        this.isFileLoading.next(false);

        this.selectedFiles = res;
        console.log("selectedFiles: ", this.selectedFiles);

        console.log("this.selectedFiles[0].name: ", this.selectedFiles[0].name);

        this.currFile = this.selectedFiles[0].base64;

        const fileName = this.selectedFiles[0].name;
        const fileParts = fileName.split(".");
        const name = fileParts.slice(0, -1).join(".");
        const extension = fileParts[fileParts.length - 1];

        console.log("Name:", name);
        console.log("Extension:", extension);

        this.currFilename = name;
        this.currType = extension;

        this.rows.at(index).patchValue({
          file: this.currFile,
          filename: this.currFilename,
          filetype: this.currType,
        });
        console.log(
          "this.documentsForm.value.filedetails: ",
          this.selectedFiles
        );

        this.updateView();
      }
    });
  }

  downloadDocument(row: any) {
    let file = row.value.file;
    let filename = row.value.filename;
    let filetype = row.value.filetype;

    // Download PDF in Chrome etc.
    const source = `${file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${filename}.${filetype}`;
    link.click();
  }

  // ****************************************************************************************************************************

  //********************************************************************************************************************************** */
  posting: boolean = false;
  onSubmit() {
    console.log("this.mngForm.value: ", this.mngForm.value);
    this.posting = true;
    if (this.mngForm.valid) {
      if (this.pageFunction == "Add") {
        this.accountService
          .addProfile(this.mngForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              console.log("res: ", res);

              if (res.statusCode == 201) {
                this.snackbar.showNotification(
                  "snackbar-success",
                  "Profile created successfully"
                );
              } else {
                this.snackbar.showNotification("snackbar-danger", res.message);
              }
            },
            error: (err) => {
              this.snackbar.showNotification("snackbar-danger", err.message);
            },
            complete: () => {
              this.posting = false;
            },
          }),
          Subscription;
      } else if (this.pageFunction == "Update") {
        this.accountService
          .updateProfile(this.mngForm.value)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res) => {
              if (res.statusCode == 200) {
                this.snackbar.showNotification(
                  "snackbar-success",
                  "Profile updated successfully"
                );
              } else {
                this.snackbar.showNotification("snackbar-danger", res.message);
              }
            },
            error: (err) => {
              this.snackbar.showNotification("snackbar-danger", err.message);
            },
            complete: () => {
              this.posting = false;
            },
          }),
          Subscription;
      }
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Profile Form Invalid!!"
      );
    }
  }

  cancel() {
    // this.router.navigate(["/erp-procurement/needs/all-needs"]);
  }

  // **********************************************************************************************
  // LOOKUPS
  banksLookUp() {
    if (this.mngForm.value.hasCaritasAccount === "N") {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
        action: "Single Bank",
      };

      const dialogRef = this.dialog.open(BanksLookupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        console.log("lookupresonse: ", result.data);

        this.mngForm.patchValue({
          bankName: result.data[0].BankName,
          toBankID: result.data[0].BankID,
        });
      });
    } else if (this.mngForm.value.hasCaritasAccount === "Y") {
      this.snackbar.showNotification(
        "snackbar-danger",
        "When entering a Caritas bank account number, please input the account number directly, without selecting the bank."
      );
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please confirm if it's a Caritas account before proceeding."
      );
    }
  }

  branchesLookUp() {
    if (
      this.mngForm.value.toBankID !== null &&
      this.mngForm.value.toBankID !== "" &&
      this.mngForm.value.toBankID !== undefined
    ) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "800px";
      dialogConfig.data = {
        action: "Single Branch",
        bankId: this.mngForm.value.toBankID,
      };

      const dialogRef = this.dialog.open(BranchesLookupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        console.log("lookup response: ", result.data);

        if (result && result.data && result.data.length > 0) {
          this.mngForm.patchValue({
            branchName: result.data[0].BranchName,
            toBranchID: result.data[0].BranchID,
          });
        }
      });
    } else {
      this.snackbar.showNotification(
        "snackbar-danger",
        "Please select a bank before entering the branch."
      );
    }
  }
}
