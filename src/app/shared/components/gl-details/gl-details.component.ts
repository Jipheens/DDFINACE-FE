// import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
// import { MiddlewareService } from "../../services/middlware.service";

// @Component({
//   selector: "app-gl-details",
//   templateUrl: "./gl-details.component.html",
//   styleUrls: ["./gl-details.component.scss"],
// })
// export class GlDetailsComponent implements OnInit {
//   @Input() glAccount: string;
//   @Output() glDetailsChange: EventEmitter<any> = new EventEmitter<any>(); // Emit GL details to the parent component
//   glDetails: any;

//   constructor(private middlewareService: MiddlewareService) {}

//   ngOnInit(): void {
//     this.getGlDetails();
//   }

//   getGlDetails() {
//     console.log("this.glAccount:: ", this.glAccount);
//     let body = {
//       mySessionID: "",
//       ourBranchID: "",
//       accountID: this.glAccount,
//     };
//     console.log("this.body:: ", body);
//     this.middlewareService.getGlAccountDetails(body).subscribe(
//       (data) => {
//         //this.glDetails = data;

//         this.glDetails = data;
//         console.log("this.glDetails :: ", this.glDetails);

//         this.glDetailsChange.emit(data); // Emit GL details to the parent component
//       },
//       (error) => {
//         console.error("Error fetching GL details:", error);
//       }
//     );
//   }
// }

import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MiddlewareService } from "../../services/middlware.service";

@Component({
  selector: "app-gl-details",
  templateUrl: "./gl-details.component.html",
  styleUrls: ["./gl-details.component.scss"],
})
export class GlDetailsComponent implements OnInit, OnChanges {
  @Input() glAccount: string;
  @Output() glDetailsChange: EventEmitter<any> = new EventEmitter<any>();
  glDetails: any;
  @Output() glDetailsProcessing = new EventEmitter<boolean>();

  constructor(private middlewareService: MiddlewareService) {}

  ngOnInit(): void {
    this.getGlDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.glAccount && !changes.glAccount.firstChange) {
      this.getGlDetails();
    }
  }

  getGlDetails() {
    console.log("this.glAccount:: ", this.glAccount);
    this.glDetailsProcessing.emit(true);
    let body = {
      mySessionID: "",
      ourBranchID: this.glAccount.slice(0, 3),
      accountID: this.glAccount,
    };
    console.log("this.body:: ", body);
    this.middlewareService.getGlAccountDetails(body).subscribe(
      (data) => {
        //this.glDetails = data;

        this.glDetails = data;
        console.log("this.glDetails :: ", this.glDetails);

        this.glDetailsChange.emit(data);
        this.glDetailsProcessing.emit(false);
      },
      (error) => {
        console.error("Error fetching GL details:", error);
        this.glDetailsProcessing.emit(false);
      }
    );
  }
}
