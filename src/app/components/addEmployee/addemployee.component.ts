import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { Employee } from '../../models/employee.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from '../../services/validation.service';
import { DataService } from '../../store/data.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatDialogModule } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatChipsModule, MatIconModule, MatFormFieldModule, MatFormFieldModule],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css'
})
export class AddemployeeComponent {

  employeeForm!: FormGroup
  rolesList: Role[] = []
  employee?: Employee
  newRole = this.formBuilder.group({ roleDId: [0], roleName: [""], entryDate: [new Date().toString()], isManagerial: [0]  });

  constructor(private readonly dataService: DataService, private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private roleService: RoleService, private readonly validationService: ValidationService, private dialogRef: MatDialogRef<EditEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', Validators.required],
      status: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: [0, Validators.required],
      rolesForEmployees: this.formBuilder.array([
        this.newRole
      ], { validators: this.validationService.validateRoleId() })
    }, { validator: this.validationService.validateDateStart });

    this.roleService.getRoles().subscribe(
      (res) => {
        this.rolesList = res
      }
    )
  }

  get rolesForEmployees() {
    return this.employeeForm?.get('rolesForEmployees') as FormArray;
  }

  addRole() {
    this.rolesForEmployees.push(this.formBuilder.group({ roleDId: [0], roleName: [""], entryDate: [new Date().toString()],isManagerial: [0] }));
  }

  removeRole(index: number) {
    this.rolesForEmployees.removeAt(index);
  }

  onCloseForm() {
    this.dialogRef.close();
  }

  onSubmit() {
    var gender = Number(this.employeeForm.get("gender")?.value);
    this.employeeForm.get("gender")?.setValue(gender);
    this.rolesForEmployees.controls.forEach(r => {
      r.get("roleName")?.setValue(this.rolesList.find(role => role.id == r.get("roleDId")?.value)?.roleName)
    })
    this.employeeService.addEmployee(this.employeeForm?.value).subscribe(
      () => {
        this.dataService.getEmployees();
        alert("employee add successfully!")
        this.dialogRef.close();

      }),
      (error: HttpErrorResponse) => {
        console.error('Error add employee:', error);
      }
  }
}



