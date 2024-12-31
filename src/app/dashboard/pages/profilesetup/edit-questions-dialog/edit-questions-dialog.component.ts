// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MyServiceService } from 'src/app/my-service.service';

// @Component({
//   selector: 'app-edit-questions-dialog',
//   templateUrl: './edit-questions-dialog.component.html',
//   styleUrls: ['./edit-questions-dialog.component.css']
// })

// export class EditQuestionsDialogComponent {
//   constructor(
//     public dialogRef: MatDialogRef<EditQuestionsDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) { }

//   onSave(data) {
//     console.log("Saved answers:", this.data);
//     this.dialogRef.close(this.data);
//   }

//   onAnswerChanged(sectionIndex: number, questionIndex: number, answer: boolean) {
//     this.data[sectionIndex].selectedAnswer1 = false;
//     this.data[sectionIndex].selectedAnswer2 = false;

//     if (questionIndex === 0) {
//       this.data[sectionIndex].selectedAnswer1 = answer;
//     } else if (questionIndex === 1) {
//       this.data[sectionIndex].selectedAnswer2 = answer;
//     }
//   }

//   onClose(): void {
//     this.dialogRef.close();
//   }
// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-edit-questions-dialog',
  templateUrl: './edit-questions-dialog.component.html',
  styleUrls: ['./edit-questions-dialog.component.css']
})
export class EditQuestionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditQuestionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onSave(data: any[]) {
    console.log("Saved answers:", this.data);
    this.dialogRef.close(this.data);
   
  }

  onAnswerChanged(sectionIndex: number, questionIndex: number, answer: boolean) {
    this.data[sectionIndex].selectedAnswer1 = false;
    this.data[sectionIndex].selectedAnswer2 = false;

    if (questionIndex === 0) {
      this.data[sectionIndex].selectedAnswer1 = answer;
    } else if (questionIndex === 1) {
      this.data[sectionIndex].selectedAnswer2 = answer;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
