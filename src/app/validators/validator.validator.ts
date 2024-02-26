import { ValidatorFn, AbstractControl, ValidationErrors, FormControl, FormGroup } from "@angular/forms";

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn {
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if (!ctrl.get(main) || !ctrl.get(confirm)) {
            return {
                confirmEqualValidator: 'Invalid control names'
            };
        }
        const mainValue = ctrl.get(main)!.value;
        const confirmValue = ctrl.get(confirm)!.value;
        
        return mainValue === confirmValue ? null : {
            confirmEqualValidator :  `Le champ ${main} n'est pas egale au champ ${confirm}`
        };
    };
}

export function emailValidator() : ValidatorFn {
    return (ctrl : AbstractControl) =>{
        if(ctrl.value != "" && ctrl.value != null && ctrl.value != undefined){
            const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let value = ctrl.value;
            if(mailRegex.test(value)){
                return null
            }
           
        }
        return { mailValidator : "Ceci n'est pas un email"};
    }
}

export function getErrorMessage(ctrl : FormControl | FormGroup, error : string, message : String | null =null) : string{
    if(ctrl.invalid){
      if(ctrl.hasError(error) && ctrl.value){
        return message !=null ? message : ctrl.errors![error];
      }
      return "Ce champ est requis";
    }
    return "";
  }