import { Role } from "./role.model"

export class Employee{
    firstName!:string
    lastName !:string
    id!:number
    startDate!:Date
    status!:boolean
    birthDate!:Date
    gender!:number
    rolesForEmployees!:Role[] 
}