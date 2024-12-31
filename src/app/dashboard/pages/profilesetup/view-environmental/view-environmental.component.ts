import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditQuestionsDialogComponent } from '../edit-questions-dialog/edit-questions-dialog.component';
import { MyServiceService } from 'src/app/my-service.service';

@Component({
  selector: 'app-view-environmental',
  templateUrl: './view-environmental.component.html',
  styleUrls: ['./view-environmental.component.css']
})
export class ViewEnvironmentalComponent implements OnInit {

  accordionSections = [
    {
      title: 'Supplier DiversityInclusion',
      question1: 'Do you currently prioritize supplier diversity and inclusion?',
      question2: 'If no, please provide a brief description:'
    },
    {
      title: 'Tier Two Supplier Diversities',
      question1: 'Have you implemented tier two supplier diversities in your operations?',
      question2: 'If no, please provide a brief description:'
    },
    {
      title: 'Anti-Bribery & Anti-Corruption',
      question1: 'Is your company committed to anti-bribery and anti-corruption practices?',
      question2: 'If no, please provide a brief description:'
    },
    {
      title: 'Corporate Social Responsibility',
      question1: 'Does your company have established corporate social responsibility initiatives?',
      question2: 'If no, please provide a brief description:'
    },
    {
      title: 'Child Labour',
      question1: 'Does your company ensure there\'s no involvement of child labor in your operations?',
      question2: 'If no, please provide a brief description:'
    },
    {
      title: 'Conflict Minerals',
      question1: 'Do you take measures to avoid using conflict minerals in your products?',
      question2: 'If no, please provide a brief description:'
    }
  ];

  constructor(private dialog: MatDialog,
              private apiService: MyServiceService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  this.apiService.getAnswers().subscribe(answers => {
    this.accordionSections = answers;
  });
  }

  // openEditDialog(): void {
  //   const dialogRef = this.dialog.open(EditQuestionsDialogComponent, {
  //     width: '80%',
  //     data: this.accordionSections // Pass your data to the dialog
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     // Handle any actions after the dialog is closed
  //   });
  // }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditQuestionsDialogComponent, {
      width: '80%',
      data: this.accordionSections
    });
  
      dialogRef.afterClosed().subscribe(response => {
      if (response) {
        console.log('Dialog Closed with response:', response);
      }
    });
  }
  

  
}





