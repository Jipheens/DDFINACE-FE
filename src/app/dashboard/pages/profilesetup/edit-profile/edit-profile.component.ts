import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
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
import * as XLSX from "xlsx";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  showForm = false;
  pageFunction = "Add";
  mngForm: FormGroup;
  currentUser: any;
  bgtFormArray: FormArray;

  bgtForm: FormGroup;

  

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formData: any;

  destroy$: Subject<boolean> = new Subject<boolean>();

   constructor(
    private fb: FormBuilder,
    private tfb: FormBuilder,
    private filesService: FilesService,
    private tokenStorageService: TokenStorageService,
    private myServiceService: MyServiceService,
    private snackbar: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private tokenCookiService: TokenCookieService

  ) {
    this.currentUser = this.tokenStorageService.getUser().username;
    this.currentUser = this.tokenStorageService.getUser().supplierCode;

    this.formData = {
      supplierCode: '', 
      yearEstablished: '',
      companySize: '',
      numberOfEmployees:'',
    industry:'',
    productsAndServices:'',
    taxId:'',
    poDeliveryEmail:'',
    ownershipType:'',
    bankName:'',
    bankAc:'',
    // bankStatement: [[]],
    mandatoryDocumentations: [[]],
    
    
      
    };

  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.generateFormWithData();
    this.showForm = true;
    this.currentUser = this.tokenCookiService.getUser();
    const defaultSupplierName = this.currentUser?.email || ""; // Using optional chaining and default value to handle undefined case
    const defaultSupplierCode = this.currentUser?.supplierCode || ""; // Using optional chaining and default value to handle undefined case
    this.generateFormWithData();
console.log("this.formData",this.formData)

    // Create six initial file rows
  for (let i = 0; i < 10; i++) {
    this.tAddFileRow();
  }

     }  


  generateFormWithData() {
    this.mngForm = this.fb.group({
      supplierCode: [this.currentUser.supplierCode, [Validators.required]],
      yearEstablished: [, [Validators.required]],
      companySize: [, [Validators.required]],
      numberOfEmployees: [, [Validators.required]],
      industry: [, [Validators.required]],
      productsAndServices: [, [Validators.required]],
      taxId: [, [Validators.required]],
      poDeliveryEmail: [, [Validators.required]],
      ownershipType: [, [Validators.required]],
      bankName: [, [Validators.required]],
      
      bankAc: [, [Validators.required]],
      
      // bankStatement: [this.formData.bankStatement],
      mandatoryDocumentations: [, [Validators.required]],

      
    });
    this.bgtFormArray = this.fb.array([]); // Create an array to store form groups

  }

 
  enterManually: boolean = true;
  manualItemsEntry() {
    this.enterManually = true;
  }

  // *************************************************************************************************************************************
  //Import requsitions from Excel
  @ViewChild("fileInput") fileInput: any;
  importExcel() {
    this.enterManually = false;
    this.fileInput.nativeElement.click();
  }

  items: any[] = []; // Array to store
  itemsForm: FormGroup;
  itemErrors: { [key: string]: string }[] = [];



  collectErrors(control: AbstractControl, path: string = "") {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach((key) => {
        const subControl = control.get(key);
        const subPath = this.getErrorPath(path, key);
        this.collectErrors(subControl, subPath);
      });
    } else {
      const errors = control.errors;
      if (errors) {
        const itemError = {
          field: path,
          message: this.getErrorMessage(errors),
        };
        this.itemErrors.push(itemError);
      }
    }
  }

  getErrorPath(path: string, key: string): string {
    return path ? `${path}.${key}` : key;
  }

  getErrorMessage(errors: any): string {
    if (errors.required) {
      return "This field is required.";
    } else if (errors.pattern) {
      return "Invalid value.";
    }
    return "";
  }

  addImportsToArray() {}
  clearImports() {}

  //***********************************************************************************************************************************8 */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editButton: boolean = false;
  addButton: boolean = true;
  selectedRowIndex: number = -1; // Track the index of the selected row

  
  clearForm() {
    this.bgtForm.reset();
    this.editButton = false;
    this.addButton = true;
    this.selectedRowIndex = -1; // Reset the selected row index
  }

  
// ************************************ Mandatory Documentation **************************************************************
// 

  tAttachmentsDataSource = new BehaviorSubject<AbstractControl[]>([]);
tDisplayColumns = [
  "tid",
  "documentType",
  "tfilename",
  "tfiletype",
  "tselectFile",  
  "tdownload",
  "taction",
];
tCombinedFiles: FormArray = this.tfb.array([]);
tRows: FormArray = this.tfb.array([]);
tDocumentsForm: FormGroup = this.tfb.group({ tfiledetails: this.tRows });
// Add this property to your component
selectedDocumentTypes: number[] = [];

tIsFileDataLoading: boolean = true;

tFileForm: FormGroup;
tFileInputs: FormArray;

createTFileForm() {
  this.tFileForm = this.tfb.group({
    tfiles: this.tfb.array([]),
  });
  this.tAddFileRow();
  // Initialize the documentType values for all rows to a default value
  this.tRows.controls.forEach((row) => {
    row.get('documentType').setValue('1'); // Set to the desired default value (e.g., '1')
  });
}

tAddFileRow() {
  this.tIsFileDataLoading = false;
  const tRow = this.tfb.group({
    file: ["", Validators.required],
    filetype: ["", Validators.required],
    filename: ["", Validators.required],
    documentType: [null, Validators.required], // Initialize documentType with null
  });
  this.tRows.push(tRow);
  this.updateTView();
  this.tAttachmentsDataSource.next(this.tRows.controls);
}


updateTView() {
  this.tAttachmentsDataSource.next(this.tRows.controls);
}

deleteTCall(tRow: AbstractControl) {
  const tDataArray = this.tAttachmentsDataSource.getValue();
  const tIndex = tDataArray.indexOf(tRow);

  if (tIndex !== -1) {
    tDataArray.splice(tIndex, 1);
    this.tAttachmentsDataSource.next(tDataArray);
  }
}

documentTypeLookup(){
  console.log("Lookup clicked");
}

public tSelectedFiles: SelectedFiles[] = [];
public tIsFileLoading = new BehaviorSubject(false);

tCurrFile: string;
tCurrFilename: any;
tCurrType: any;
documentType: any;



onTSelectFile(tFiles, tSelectedRow, tIndex, documentTypeValue) {
  if (!documentTypeValue) {
    // If document type is not selected, return without enabling the file input
    return;
  }

  this.tIsFileLoading.next(true);

  this.filesService.toBase64(tFiles, []).subscribe((tres) => {
    if (tres && tres.length > 0) {
      this.tIsFileLoading.next(false);

      const documentTypeName = this.getDocumentTypeName(+documentTypeValue);

      const tRowFormGroup = this.tRows.at(tIndex) as FormGroup;
      tRowFormGroup.patchValue({
        file: tres[0].base64,
        filename: this.getFileNameWithoutExtension(tres[0].name),
        filetype: this.getFileExtension(tres[0].name),
        documentType: documentTypeName,
      });

      this.updateTView();
    }
    console.log("tRows: ", this.tRows.value);
  });
}

getFileNameWithoutExtension(filename: string): string {
  // Helper function to get the filename without the file extension
  const parts = filename.split('.');
  return parts.slice(0, -1).join('.');
}

getFileExtension(filename: string): string {
  // Helper function to get the file extension from the filename
  const parts = filename.split('.');
  return parts[parts.length - 1];
}


getDocumentTypeName(documentType: number): string {
  switch (documentType) {
    case 1:
      return "List of Directors";
    case 2:
      return "Certificate of Incorporation";
    case 3:
      return "Trading Certificate";
    case 4:
      return "TAX PIN Certificate";
    case 5:
      return "CR12";
    case 6:
      return "Certificate/Licenses from relevant authorities";
    case 7:
      return "Copy of VAT Certificate";
    case 8:
      return "Copy of Tax Compliance certificate";
    case 9:
      return "Bank Statement certified by the Bank(last 3 months)";
    case 10:
      return "Other";
    default:
      return "Unknown Document Type";
  }
}

// *****************************************End*********************************************************

  downloadDocument(row: any) {
    let file = row.value.file;
    let filename = row.value.filename;
    let filetype = row.value.filetype;
    let documentType = row.value.documentType;


    // Download PDF in Chrome etc.
    const source = `${file}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${filename}.${filetype}`;
    link.click();
  }
  
   onSubmit() {
    // const attachments = this.documentsForm.value.filedetails;
    const mandatoryDocumentations = this.tDocumentsForm.value.tfiledetails;
// console.log(attachments,mandatoryDocumentations)
    this.mngForm.patchValue({
      mandatoryDocumentations: mandatoryDocumentations,
    });

    console.log("this.mngForm.value: ", this.mngForm.value);

         this.myServiceService.updateProfile(this.mngForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res.statusCode===200) {
              this.snackbar.showNotification(
                "snackbar-success",
                "Profile updated successfully"
              );
              this.router.navigate(["/dashboard/dashboard"]);
            } else {
              this.snackbar.showNotification("snackbar-danger", res.message);
            }
          },
          error: (err) => {
            this.snackbar.showNotification(
              "snackbar-danger",
              "Server Error: !!"
            );
          },
          complete: () => {},
        }),
        Subscription;

  }

  cancel() {
    this.router.navigate(["/dashboard/dashboard"]);
  }
  

  hasAccess: boolean;

  
}
