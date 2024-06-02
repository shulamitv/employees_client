import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateDateStart(group: FormGroup): ValidationErrors | null {
    const rolesForEmployees = (group.get("rolesForEmployees") as FormArray).controls;
    for (const role of rolesForEmployees) {

      const startDate = group.get("startDate");
      const entryDate = role.get("entryDate");

      if (new Date(entryDate?.value) < new Date(startDate?.value)) {
        return { invalidEntryDate: true };
      }
    }
    return null;
  }

    validateRoleId(): ValidatorFn {
      return (roles: AbstractControl): ValidationErrors | null => {
        const formArray = roles as FormArray;
        const numersRols = formArray.controls.map(p => p.get("roleDId")?.value as number);

        for (let i = 0; i < numersRols.length; i++) {
          for (let x = i + 1; x < numersRols.length; x++) {
            if (numersRols[i] == numersRols[x]) {
              return { roleAlreadyExists: true };
            }
          }
        }
        return null;
      }
    }
  }
