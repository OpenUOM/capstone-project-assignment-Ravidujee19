import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import {
  faTrash,
  faPlus,
  faPenSquare,
} from "@fortawesome/free-solid-svg-icons";
import { AppServiceService } from "../../app-service.service";
@Component({
  selector: "app-student-table",
  templateUrl: "./student-table.component.html",
  styleUrls: ["./student-table.component.css"],
})
export class StudentTableComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service: AppServiceService, private router: Router) {}

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent() {
    this.router.navigate(["addStudent"]);
  }

  editStudent(id) {
    const navigationExtras: NavigationExtras = {
      state: {
        id: id,
      },
    };
    this.router.navigate(["editStudent"], navigationExtras);
  }

  getStudentData() {
    this.service.getStudentData().subscribe(
      (response) => {
        this.studentData = Object.keys(response).map((key) => [response[key]]);
      },
      (error) => {
        console.log("ERROR - ", error);
      }
    );
  }

  deleteStudent(itemid) {
    const student = {
      id: itemid,
    };
    this.service.deleteStudent(student).subscribe((response) => {
      this.getStudentData();
    });
  }

  search(value: string) {
    if (value.length <= 0 || !value.trim()) {
      // If search is empty, reload all student data
      this.getStudentData();
    } else {
      this.service.getStudentData().subscribe(
        (response) => {
          const allStudents = Object.keys(response).map((key) => response[key]);
          const foundItems = allStudents.filter((student) => {
            return student.name
              .toLowerCase()
              .includes(value.toLowerCase().trim());
          });
          this.studentData = foundItems;
        },
        (error) => {
          console.log("ERROR - ", error);
        }
      );
    }
  }
}
