import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  public getRoles(): Observable<Role[]> {
    console.log("get role")
    return this.http.get<Role[]>('https://localhost:7019/api/role');
  }
}