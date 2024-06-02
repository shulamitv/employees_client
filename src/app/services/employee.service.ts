import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  public getEmployees(): Observable<Employee[]> {
    console.log("get employee")
    return this.http.get<Employee[]>('https://localhost:7019/api/Employee');
  }
  public getEmployeeById(id:number): Observable<Employee> {
    console.log("get employee by id");
    return this.http.get<Employee>(`https://localhost:7019/api/Employee/${id}`)
  }
  public addEmployee(employee:Employee): Observable<Employee> {
    return this.http.post<Employee>('https://localhost:7019/api/Employee/', employee)
  }
  public putEmployee(id:number,employee:Employee): Observable<Employee> {
    return this.http.put<Employee>(`https://localhost:7019/api/Employee/put/${id}`, employee)
  }
  public deleteEmployee(id:number): Observable<void>{
    return this.http.delete<void>(`https://localhost:7019/api/Employee/delete/${id}`)
  }
}
