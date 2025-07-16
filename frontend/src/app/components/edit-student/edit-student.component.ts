import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../../app-service.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentData: any;

  constructor(private service: AppServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  getStudentData() {
    const studentId = history.state.id;

    if (!studentId) {
      console.error('No student ID provided in navigation state.');
      return;
    }

    this.service.getOneStudentData({ id: studentId }).subscribe(
      (response) => {
        this.studentData = response[0];
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }

  editStudent(values: any) {
    values.id = history.state.id;

    this.service.editStudent(values).subscribe(
      (response) => {
        console.log('Student updated successfully');
        this.router.navigate(['studentTable']); // Optional redirect
      },
      (error) => {
        console.log('ERROR - ', error);
      }
    );
  }
}
