import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from "src/app/core/service/token-storage.service";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import { userJSON } from "../_data/userJSON";
import { SuplierAuthService } from "../_service/supplier-auth.service";
import { privileges } from "../_data/privilages";
import { SnackbarService } from "src/app/shared/services/snackbar.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tokenCookieService: TokenCookieService,
    private supauthservice: SuplierAuthService,
    private snackbar: SnackbarService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
  
    const hardcodedUsername = "admin";
    const hardcodedPassword = "password123";
  
    const enteredUsername = this.authForm.value.username;
    const enteredPassword = this.authForm.value.password;
  
    if (enteredUsername === hardcodedUsername && enteredPassword === hardcodedPassword) {
      console.log("Login successful");
  
      
      const res = {
        status: 200,
        body: {
          entity: {
            message: "Login successful",
            
          }
        }
      };
  
      
      if (res.status === 200) {
        this.tokenCookieService.saveUser(res.body.entity); 
        this.snackbar.showNotification("snackbar-success", res.body.entity.message); 
        this.router.navigate(["/dashboard/dashboard"]);
        this.loading = false;
      } else {
        this.error = res.body.entity.message; 
        this.snackbar.showNotification("snackbar-danger", res.body.entity.message);
        this.loading = false;
      }
    } else {
      this.error = "Invalid Username or Password!";
      this.snackbar.showNotification("snackbar-danger", this.error);
      this.loading = false;
    }
  }
}  
