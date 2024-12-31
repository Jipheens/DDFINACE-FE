import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { AuthService } from "src/app/core/service/auth.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { SuplierAuthService } from "../../_service/supplier-auth.service";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.scss"],
})
export class OtpComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = "end";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  otpForm: FormGroup;
  currentEmail: any;
  maskedEmail: any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private tokenCookieService: TokenCookieService,
    private router: Router,
    private supauthservice: SuplierAuthService,
    // private snackBar: MatSnackBar,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log("this.currentUser: ", this.tokenCookieService.getUser());

    this.getEmail();

    this.otpForm = this.fb.group({
      first: ["", Validators.required],
      second: ["", Validators.required],
      third: ["", Validators.required],
      fourth: ["", Validators.required],
    });
  }

  getEmail() {
    // this.currentEmail = this.tokenCookieService.getUser().email;
    // this.currentUser = this.tokenCookieService.getUser().username;

    this.currentEmail = this.tokenCookieService.getUser().email;
    this.currentUser = this.tokenCookieService.getUser().username;

    console.log("this.currentUser: ", this.currentUser);
    const email = this.currentEmail;
    const atIndex = email.indexOf("@");
    const username = email.slice(0, atIndex);
    const domain = email.slice(atIndex);

    const maskedUsername =
      username.charAt(0) +
      "*".repeat(username.length - 2) +
      username.charAt(username.length - 1);
    const maskedEmail = maskedUsername + domain;
    this.maskedEmail = maskedEmail;
    console.log(maskedEmail); // Output: s********n@gmail.com
  }

  // onSubmit() {
  //   this.router.navigate(["/admin/dashboard"]);
  //   if (this.otpForm.invalid) {
  //     return;
  //   }

  //   // TODO: Add logic to validate OTP code

  //   console.log('OTP Code:', this.otpForm.value);
  // }
  loading: boolean = false;
  error: any;
  onSubmit() {
    this.loading = true;
    this.error = "";
    if (this.otpForm.invalid) {
      this.error = "Invalid OTP!";
      return;
    } else {
      const otpValue = Number(
        this.otpForm.controls.first.value +
          this.otpForm.controls.second.value +
          this.otpForm.controls.third.value +
          this.otpForm.controls.fourth.value
      );

      console.log(otpValue);

      const params = new HttpParams()
        // .set("format", type)
        .set("username", this.currentUser)
        .set("otpCode", otpValue);

      console.log("params: ", params);

      //this.router.navigate(["/admin/dashboard"]);
      this.supauthservice.verifyOTP(this.currentUser, otpValue).subscribe(
        (res) => {
          console.log("Res: ", res);
          if (res.entity.token) {
            this.tokenCookieService.saveUser(res.entity);
            this.router.navigate(["/dashboard/dashboard"]);

            this.snackBar.showNotification(
              "snackbar-success",
              "Login Successful"
            );
            this.loading = false;
          } else {
            this.snackBar.showNotification("snackbar-danger", res.message);
            this.error = "Invalid Login";
            this.loading = false;
          }
        },
        (err) => {
          console.log(err);
          //this.error = "Invalid Credentials!" ;
          this.snackBar.showNotification("snackbar-danger", err.message);
          this.error = err;
          console.log(err);
          this.loading = false;
        }
      );

      // this.snackBar.open(
      //   "Login Successful!",
      //   "X",
      //   {
      //     horizontalPosition: this.horizontalPosition,
      //     verticalPosition: this.verticalPosition,
      //     duration: 60000,
      //     panelClass: ["snackbar-success", "snackbar-success"],
      //   }
      // );
    }
  }

  ngAfterViewInit() {
    const inputs =
      document.querySelectorAll<HTMLInputElement>('input[type="text"]');

    inputs.forEach((input, index) => {
      input.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        const maxLength = target.maxLength;
        const inputLength = target.value.length;

        if (inputLength === maxLength) {
          const nextIndex = index + 1;

          if (inputs[nextIndex]) {
            (inputs[nextIndex] as HTMLInputElement).focus();
          }
        }
      });
    });
  }
}
