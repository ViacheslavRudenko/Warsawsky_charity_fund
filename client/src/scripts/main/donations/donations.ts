import { checkCreditCard } from "./validation/cardNumValidation.js";
import { validateFullName } from "./validation/fullNameValidation.js";
import { validateCvvCode } from "./validation/cvvValidation.js";
import { validateExpiryDate } from "./validation/dateValidation.js";
import { validateSum } from "./validation/sumValidation.js";

const btnSubmit = <HTMLButtonElement>document.querySelector("#btn-submit");
type Result = { message: string; success: boolean };
export default class Donations {
  getDataFromForm() {
    let formData: {
      sum: number;
      cardnumber: number;
      fullname: string;
      cvv: number;
      expdate: string;
    } = { sum: 0, cardnumber: 0, fullname: "", cvv: 0, expdate: "" };

    btnSubmit.addEventListener("click", (e) => {
      const form = <HTMLFormElement>document.getElementById("donations-form");
      const formValue = new FormData(form);
      for (const [key, value] of formValue) {
        value !== "" && (formData = { ...formData, [key]: value });
      }

      const sumSuccess = this.getValidation(
        validateSum(formData.sum),
        "sum-err"
      );
      const ccSuccess = this.getValidation(
        checkCreditCard(formData.cardnumber),
        "cc-err"
      );
      const nameSuccess = this.getValidation(
        validateFullName(formData.fullname),
        "fullname-err"
      );
      const cvvSuccess = this.getValidation(
        validateCvvCode(formData.cvv),
        "cvv-err"
      );
      const dateSuccess = this.getValidation(
        validateExpiryDate(formData.expdate),
        "date-err"
      );
      if (sumSuccess && ccSuccess && nameSuccess && cvvSuccess && dateSuccess) {
        form.reset();
        console.log(formData);
      }
    });
  }

  addInputError(err: any, result: Result): void {
    if (!result.success) {
      err.style.display = "block";
      err.innerHTML = result.message;
    } else {
      err.style.display = "none";
      err.innerHTML = "";
    }
  }
  // getSumValidation(sum: number): boolean {
  //   const result: Result = validateSum(sum);
  //   const err = document.getElementById("sum-err");
  //   this.addInputError(err, result);
  //   return result.success;
  // }

  // getCardNumValidation(cardnumber: number): boolean {
  //   const result: Result = checkCreditCard(cardnumber);
  //   const err = document.getElementById("cc-err");
  //   this.addInputError(err, result);
  //   return result.success;
  // }

  // getFullNameValidation(fullname: string): boolean {
  //   const result: Result = validateFullName(fullname);
  //   const err = document.getElementById("fullname-err");
  //   this.addInputError(err, result);
  //   return result.success;
  // }
  // getCvvValidation(cvv: number): boolean {
  //   const result: Result = validateCvvCode(cvv);
  //   const err = document.getElementById("cvv-err");
  //   this.addInputError(err, result);
  //   return result.success;
  // }
  // getExpiryDateValidation(expdate: string): boolean {
  //   this.getValidation(validateExpiryDate(expdate), "date-err");
  // }
  getValidation(validation: any, errId: string): boolean {
    const result: Result = validation;
    const err = document.getElementById(errId);
    this.addInputError(err, result);
    return result.success;
  }

  render() {
    this.getDataFromForm();
  }
}
