import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private employeeBehaviorSubject = new BehaviorSubject<Employee[]>([]);
  employeeList = this.employeeBehaviorSubject.asObservable();
  employeeListSource: Employee[] = [];

  constructor(private readonly employeeService: EmployeeService) {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.setValue(data);
      this.employeeListSource = data
    })
  }

  setValue(value: Employee[]) {
    this.employeeBehaviorSubject.next(value);
  }

  fiterEmployee(search: string | null) {
    if (search === "" || search) {
      this.setValue(this.employeeListSource);
    }
    this.setValue(this.employeeListSource.filter(employee =>
      employee.firstName?.toLowerCase().includes(search!.toLowerCase()) ||
      employee.lastName?.toLowerCase().includes(search!.toLowerCase()) ||
      employee.id?.toString().includes(search!.toLowerCase())
    ));
  }
}