import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function forbiddenCharacterValidator(forbiddenCharacter:string): ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null => {
    const value = String(control.value??'');
    return value.includes(forbiddenCharacter)?{ forbiddenCharacter: { character: forbiddenCharacter } }:null;
  }
}


