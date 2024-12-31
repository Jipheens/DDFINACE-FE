import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { MyServiceService } from 'src/app/my-service.service';
import { FilesService } from 'src/app/shared/services/files.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { NotificationService } from 'src/app/supplier-authentication/_service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updating-company-info',
  templateUrl: './updating-company-info.component.html',
  styleUrls: ['./updating-company-info.component.css']
})
export class UpdatingCompanyInfoComponent implements OnInit {
  mngForm: FormGroup;
  tDocumentsForm: FormGroup;
  showForm: boolean = true; // Initialize showForm
  tDisplayColumns: string[] = ['tid', 'documentType', 'tfilename', 'tfiletype', 'tselectFile', 'tdownload', 'taction'];
  tRows: FormArray = this.tfb.array([]);
  selectedDocumentType: string = null;
  destroy$: Subject<boolean> = new Subject<boolean>();

  documentTypeOptions = [
    { value: '1', name: 'List of Directors' },
    { value: '2', name: 'Certificate of Incorporation' },
    { value: '3', name: 'Trading Certificate' },
    { value: '4', name: 'TAX PIN Certificate' },
    { value: '5', name: 'CR12' },
    { value: '6', name: 'Certificate/Licenses from relevant authorities' },
    { value: '7', name: 'Copy of VAT Certificate' },
    { value: '8', name: 'Copy of Tax Compliance certificate' },
    { value: '9', name: 'Bank Statement certified by the Bank(last 3 months)' },
    { value: '10', name: 'Other' },
  ];


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private tfb: FormBuilder,
              private filesService: FilesService,
              private myServiceService: MyServiceService,
              private snackbar: SnackbarService,
              private router: Router,
              private notificationAPI: NotificationService,






    ) {
   
    this.mngForm = this.fb.group({
      id:['', Validators.required],
      supplierCode: ['', Validators.required],
      yearEstablished: [null, Validators.required],
      companySize: ['', Validators.required],
      numberOfEmployees: ['', Validators.required],
    industry: ['', Validators.required],
    productsAndServices: ['', Validators.required],
    taxId: ['', Validators.required],
    poDeliveryEmail: ['', Validators.required],
    ownershipType: ['', Validators.required],
    bankName: ['', Validators.required],
    bankAc: ['', Validators.required],
    });

    this.tDocumentsForm = this.fb.group({
      tfiledetails: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
   
if(queryParams.additionalData){
  const fetchedData = JSON.parse(queryParams.additionalData);
  this.mngForm.patchValue({
    id: fetchedData.id,
    supplierCode: fetchedData.supplierCode,
    yearEstablished: fetchedData.yearEstablished,
    companySize: fetchedData.companySize,
    numberOfEmployees:fetchedData.numberOfEmployees,
  industry:fetchedData.industry,
  productsAndServices:fetchedData.productsAndServices,
  taxId:fetchedData.taxId,
  poDeliveryEmail:fetchedData.poDeliveryEmail,
  ownershipType:fetchedData.ownershipType,
  bankName:fetchedData.bankName,
  bankAc:fetchedData.bankAc,
  });

  const tfiledetails = this.tDocumentsForm.get('tfiledetails') as FormArray;
  fetchedData.mandatoryDocumentations.forEach(doc => {
    tfiledetails.push(this.fb.group({
      id: doc.id,
      documentType: doc.documentType,
      filename: doc.filename,
      filetype: doc.filetype,
      file: doc.file
    }));
  });
}
}

generatePayload(formData: any, tDocumentsData: any[]): any {
  return {
    id: formData.id,
    supplierCode: formData.supplierCode,
    yearEstablished: formData.yearEstablished,
    companySize: formData.companySize,
    numberOfEmployees: formData.numberOfEmployees,
    industry: formData.industry,
    productsAndServices: formData.productsAndServices,
    taxId: formData.taxId,
    poDeliveryEmail: formData.poDeliveryEmail,
    ownershipType: formData.ownershipType,
    bankName: formData.bankName,
    bankAc: formData.bankAc,
    status: formData.status, 
    remarks: formData.remarks, // Fill in the appropriate remarks value if needed
    mandatoryDocumentations: tDocumentsData.map(doc => {
      return {
        id: doc.id, // Assuming this is a new document
        documentType: doc.documentType,
        file: doc.file,
        filetype: doc.filetype,
        filename: doc.filename
      };
    })
  };
}

onSubmit() {
  if (this.mngForm.valid && this.tDocumentsForm.valid) {
    const formData = this.mngForm.value;
    const tDocumentsData = this.tDocumentsForm.value.tfiledetails;
    const payload = this.generatePayload(formData, tDocumentsData);
     console.log(payload);
     this.myServiceService
     .reUpdateProfile(payload)
     .pipe(takeUntil(this.destroy$))
     .subscribe({
       next: (res) => {
         if (res.statusCode===200) {
          Swal.fire({
            icon: 'success',
            title: 'Company info updated Successfully!',
            // text: 'Please check your email for further instructions.',
          }).then(() => {
           this.router.navigate(['/dashboard/environmental/viewprofile']);
          });
        }
         else {
           this.snackbar.showNotification("snackbar-danger", res.message);
         }
       },
       error: (err) => {
         console.log("this is the error:",err);
         this.snackbar.showNotification(
           "snackbar-danger",
           "Server Error: !!"
         );
       },
       complete: () => {},
     }),
     Subscription;
  
  }
}


  tIsFileLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

onDocumentTypeSelected(documentTypeValue: string) {
  this.selectedDocumentType = documentTypeValue;
}

// ...

// When a file is selected
onTSelectFile(files: FileList, tSelectedRow: FormGroup, tIndex: number, documentTypeValue: string) {
  if (!documentTypeValue) {
    // If document type is not selected, return without enabling the file input
    return;
  }

  this.tIsFileLoading.next(true);

  const fileListArray = Array.from(files); // Convert FileList to Array of File
  this.filesService.toBase64(fileListArray, []).subscribe((base64Data) => {
    if (base64Data && base64Data.length > 0) {
      this.tIsFileLoading.next(false);

      const documentTypeName = this.getDocumentTypeName(+documentTypeValue);

      const tRowFormGroup = (this.tDocumentsForm.get('tfiledetails') as FormArray).at(tIndex) as FormGroup;

      tRowFormGroup.patchValue({
        file: base64Data[0].base64,
        filename: this.getFileNameWithoutExtension(base64Data[0].name),
        filetype: this.getFileExtension(base64Data[0].name),
        documentType: documentTypeName,
      });

      // Reset the selectedDocumentType after successfully patching the form
      this.selectedDocumentType = null;

      this.updateTView();
    }
    console.log("tfiledetails: ", this.tDocumentsForm.get('tfiledetails').value);
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
  updateTView() {
    // this.tAttachmentsDataSource.next(this.tRows.controls);
  }

  deleteTCall(row: FormGroup) {
    
  }
  cancel() {
    this.router.navigate(["dashboard/dashboard"]);
  }
  

}
