import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { DataService } from '../../store/data.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent]
})
export class EmployeesComponent {

  employees = this.dataService.employeeList
  filteredEmployees!: Employee[]
  searchText = this.fb.control('');
  activeEmployees$: Observable<Employee[]> | undefined;

  constructor(private employeeService: EmployeeService, private readonly dataService: DataService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchText.valueChanges.subscribe(value =>
      this.dataService.fiterEmployee(value)
    )
    this.activeEmployees$ = this.dataService.employeeList.pipe(
      map(employees => employees.filter(employee => employee.status === true))
    );
  }

  filterEmployees() {
    this.dataService.fiterEmployee(this.searchText.value)
  }

  onDeleteEmployee(employee: Employee) {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      () => {
        this.dataService.getEmployees();
        alert("employee deleted seccessfully");
      },
      (error) => {
        console.error('Error deleting employee:', error);
        alert("Failed to delete employee");
      }
    )
  }

  onPutEmployee(employee: Employee) {
    this.dialog.open(EditEmployeeComponent, {
      data: { id: employee.id }, panelClass: 'custom-dialog-container'
    },);
  }
}




