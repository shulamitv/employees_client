import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
import { Employee } from '../../models/employee.model';
import { AddemployeeComponent } from '../addEmployee/addemployee.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../store/data.service';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent,MatButtonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router, private excelService:ExcelService, private readonly dataService: DataService, private fb: FormBuilder,  private dialog: MatDialog ) {}

  onAddEmployee() {
    this.dialog.open(AddemployeeComponent,{data :{},panelClass:'custom-dialog-container'
  },);
  
  }

  onExportToExcel() {
    this.dataService.employeeList.subscribe((employees: Employee[]) => {
      const newEmployees = employees.map(employee => ({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        startDate: employee.startDate,
      }));
      this.excelService.exportToExcel(newEmployees, 'employees');
    });
  }

}
