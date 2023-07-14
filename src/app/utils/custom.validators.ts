import {AbstractControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static notBlank(control: AbstractControl): ValidationErrors | null  {
    const isBlank = (`${control?.value || ''}`).trim().length === 0;
    return isBlank ? { notBlank: false } : null;
  }
}
