import {ElementRef, Injectable} from "@angular/core";


@Injectable({providedIn: "root", useExisting: false})
export class FormService {

  constructor(private elementRef: ElementRef) {
  }


  getFormDataDef(): any {
    return this.getFormData("form");
  }

  getFormData(formId: string): any {
    var form = this.elementRef.nativeElement.querySelector("form[id='" + formId + "']");
    var inputs = form.querySelectorAll("input");

    var result = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.type == "checkbox") {
        // @ts-ignore
        result[input.name] = input.checked;
        continue;
      }

      // @ts-ignore
      result[input.name] = input.value;
    }

    var inputs = form.querySelectorAll("textarea");

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      // @ts-ignore
      result[input.name] = input.value;
    }


    console.log(result);
    return result;
  }

  getFormDataSet(formId: string): any {
    var form = this.elementRef.nativeElement.querySelector("form[id='" + formId + "']");
    var inputs = form.querySelectorAll("input, textarea");

    var result = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      /*if (input.type == "checkbox") {
        // @ts-ignore
        result[input.name] = input.checked;
        continue;
      }

       */

      let value = input.value;
      let name = input.name;


      if (input.type == "checkbox" || input.type == "radio") {

        if (input.checked == false) {
          continue;
        }
      }

      if (value == null || value === "") {
        continue
      }


      // @ts-ignore
      if (result[name] == null) {
        // @ts-ignore
        result[name] = value;
      } else {
        // @ts-ignore
        if (Array.isArray(result[name])) {
          // @ts-ignore
          result[name].push(value)
        } else {
          // @ts-ignore
          result[name] = [result[name], value];
        }
      }

    }


    console.log(result);
    return result;
  }


  getFormDataAnswer(formId: string): any {
    var form = this.elementRef.nativeElement.querySelector("form[id='" + formId + "']");
    var inputs = form.querySelectorAll("input, textarea");

    var result = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      /*if (input.type == "checkbox") {
        // @ts-ignore
        result[input.name] = input.checked;
        continue;
      }

       */

      let value = Number(input.value);
      let name = input.name;


      if (input.type == "checkbox" || input.type == "radio") {

        if (input.checked == false) {
          continue;
        }
      }

      if (value == null || value == undefined || isNaN(value)) {
        continue
      }


      // @ts-ignore
      if (result[name] == null) {
        // @ts-ignore
        result[name] = [value];
      } else {
        // @ts-ignore
        if (Array.isArray(result[name])) {
          // @ts-ignore
          result[name].push(value)
        } else {
          // @ts-ignore
          result[name] = [result[name], value];
        }
      }


    }
    console.log(result);

    return result
  }
}
