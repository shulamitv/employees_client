import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddemployeeComponent } from './components/addEmployee/addemployee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
export const routes: Routes = [
    //ברעיון אפשר לעשות דף כניסה ואח"כ להיכנס ללוגין
    { path: '', redirectTo: '/employees', pathMatch: 'full' },
    { path: 'employees', component: EmployeesComponent },
    { path: 'addEmployee' , component: AddemployeeComponent},
    { path: 'editEmployee/:id' , component: EditEmployeeComponent},
];
