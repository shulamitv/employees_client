import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Role } from '../../models/role.model';
import { RoleService } from '../../services/role.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidationService } from '../../services/validation.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../store/data.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css',
  providers: [DatePipe]
})



export class EditEmployeeComponent {

  id!: number;
  employeeForm: FormGroup = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    id: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(9)]],
    startDate: ['', Validators.required],
    status: ['', Validators.required],
    birthDate: [new Date(), Validators.required],
    gender: ['', Validators.required],
    rolesForEmployees: new FormArray([], { validators: this.validationService.validateRoleId() })
  }, { validator: this.validationService.validateDateStart });
  employeeId?: number | null
  employee!: Employee
  rolesList!: Role[]
  birthDate: any;
  startDate: any

  constructor(private readonly dataService: DataService, private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { id: number },
    private employeeService: EmployeeService, private roleService: RoleService, private formBuilder: FormBuilder, private validationService: ValidationService, private datePipe: DatePipe) {
    this.id = data.id
  }

  ngOnInit(): void {
    this.employeeId = Number(this.id)
    this.roleService.getRoles().subscribe(
      (res) => {
        this.rolesList = res
      }
    )

    this.employeeService.getEmployeeById(this.employeeId ?? 0).subscribe(
      (res) => {
        console.log(new Date(res.startDate));
        this.employeeForm.patchValue({
          firstName: res.firstName,
          lastName: res.lastName,
          id: res.id,
          startDate: this.datePipe.transform(res.startDate, 'yyyy-MM-dd'),
          status: res.status,
          birthDate: this.datePipe.transform(res.birthDate, 'yyyy-MM-dd'),
          gender: res.gender,
        });

        this.patchRolesForEmployees(res.rolesForEmployees);

      }),
      (error: HttpErrorResponse) => {
        console.error('Error fetching employee:', error);
      }
  }

  patchRolesForEmployees(roles: Role[]) {
    this.rolesForEmployees.clear();
    if (roles && roles.length > 0) {
      roles.forEach(role => {
      const formattedDate = this.datePipe.transform(role.entryDate, 'yyyy-MM-dd');
        this.rolesForEmployees.push(this.formBuilder.group({ roleDId: [role.roleDId], roleName: [role.roleName], entryDate: [formattedDate], isManagerial: [role.isManagerial] }));
      });
    }
  }

  get rolesForEmployees() {
    return this.employeeForm.get('rolesForEmployees') as FormArray;
  }

  addRole() {
    this.rolesForEmployees.push(this.formBuilder.group({ roleDId: [0], roleName: [""], entryDate: [new Date], isManagerial: [0] }));
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
    this.employeeService.putEmployee(this.employeeId ?? 0, this.employeeForm.value).subscribe(
      () => {
        this.dataService.getEmployees();
        alert("your details update successfully")
        this.dialogRef.close();
      }
    )
  }
}


