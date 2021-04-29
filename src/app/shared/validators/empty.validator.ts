import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emptyValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let value: any = control.value;

    while (value.includes('  ')) {
      value = value.split('  ');
      value = value.join(' ');
    }

    // tslint:disable-next-line:object-literal-key-quotes
    return value.trim().length >=  minLength ? null : {'value': value};
  };
}
