import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil } from "rxjs";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { BaseComponent } from "src/app/shared/components/base/base.component";
import { SnackbarService } from "src/app/shared/services/snackbar.service";
import { AccountService } from "../../data/services/account.service";
import { User } from "../../data/types/user";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import Swal from 'sweetalert2';

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.sass"],
})
export class UpdateProfileComponent extends BaseComponent implements OnInit {
  hide = true;
  userId: number;
  user: User;
  currentUser: any;
  updatePasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackbar: SnackbarService,
    private tokenStorage: TokenStorageService,
    private tokenCookiService: TokenCookieService) 
  {
        super();        
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorage.getUser().username;
        console.log("current user:",this.currentUser);

    // Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character (As defined by the REGEX Below)
    // The password defined must be have between 10 - 25 characters
    
    
    
    
    this.updatePasswordForm = this.fb.group({
      username: [this.currentUser, [Validators.required]],
      password: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d)/),
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
      confirmpassword: [
        "",
        [
          Validators.required,
          Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d)/),
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
    });
    

   
  }

 updatePassword() {
  console.log(this.updatePasswordForm.value);
  if (
    this.updatePasswordForm.value.password !==
    this.updatePasswordForm.value.confirmpassword
  ) {
    this.snackbar.showNotification(
      "snackbar-danger",
      "Passwords don't match, Please check and retry!"
    );
  } else {
    this.accountService
      .updatePassword(this.updatePasswordForm.value)
      .pipe(takeUntil(this.subject))
      .subscribe(
        (res) => {
          console.log(res);

          if (res.message === "Password cannot be re-used within a period of 1 year.") {
            // Password cannot be re-used within a period of 1 year
            Swal.fire({
              icon: 'error',
              title: 'Password Update Failed!',
              text: res.message,
              confirmButtonText: 'OK'
            });

            
          } else {





            // Show success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Password Updated!',
              text: res.message,
              confirmButtonText: 'OK'




              
            });
          }
          console.log(res);
        },
        (err) => {
          console.log(err);
          // Check the error response in the console
          console.log(err.error); // Log the error response object
          // Handle other error scenarios if needed
        }
      );
  }
}

  









  // updatePassword() {
  //   console.log(this.updatePasswordForm.value);
  //   if (
  //     this.updatePasswordForm.value.password !==
  //     this.updatePasswordForm.value.confirmpassword
  //   ) {
  //     this.snackbar.showNotification(
  //       "snackbar-danger",
  //       "Passwords don't match, Please check and retry!"
  //     );
  //   } else {
  //     this.accountService
  //       .updatePassword(this.updatePasswordForm.value)
  //       .pipe(takeUntil(this.subject))
  //       .subscribe(
  //         (res) => {
  //           // Show success message using SweetAlert2
  //           Swal.fire({
  //             icon: 'success',
  //             title: 'Password Updated!',
  //             text: res.message,
  //             confirmButtonText: 'OK'
  //           });
  //           console.log(res);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //   }
  // }
  









 
}
