import { checkCreditCard } from "./validation/cardNumValidation";
import { validateFullName } from "./validation/fullNameValidation";
import { validateCvvCode } from "./validation/cvvValidation";
import { validateExpiryDate } from "./validation/dateValidation";
import { validateSum } from "./validation/sumValidation";

const btnSubmit = <HTMLButtonElement>document.querySelector("#btn-submit");
type Result = { message: string; success: boolean };
export default class Donations {
  getDataFromForm = () => {
    let formData: {
      sum?: number;
      cardnumber?: number;
      fullname?: string;
      cvv?: number;
      expdate?: number;
    };

    btnSubmit.addEventListener("click", (e) => {
      const form = <HTMLFormElement>document.getElementById("donations-form");
      const formValue = new FormData(form);
      for (const [key, value] of formValue) {
        value !== "" && (formData = { [key]: value });
      }
      const sumSuccess = this.getSumValidation(formData.sum);
      const ccSuccess = this.getCardNumValidation(formData.cardnumber);
      const nameSuccess = this.getFullNameValidation(formData.fullname);
      const cvvSuccess = this.getCvvValidation(formData.cvv);
      const dateSuccess = this.getExpiryDateValidation(formData.expdate);
      if (sumSuccess && ccSuccess && nameSuccess && cvvSuccess && dateSuccess) {
        form.reset();
        console.log(formData);
      }
    });
  };

  addInputError(err: any, result: Result): void {
    if (!result.success) {
      err.style.display = "block";
      err.innerHTML = result.message;
    } else {
      err.style.display = "none";
      err.innerHTML = "";
    }
  }
  getSumValidation(sum: number): boolean {
    const result: Result = validateSum(sum);
    const err = document.getElementById("sum-err");
    this.addInputError(err, result);
    return result.success;
  }

  getCardNumValidation(cardnumber: number): boolean {
    const result: Result = checkCreditCard(cardnumber);
    const err = document.getElementById("cc-err");
    this.addInputError(err, result);
    return result.success;
  }

  getFullNameValidation(fullname: string): boolean {
    const result: Result = validateFullName(fullname);
    const err = document.getElementById("fullname-err");
    this.addInputError(err, result);
    return result.success;
  }
  getCvvValidation(cvv: number): boolean {
    const result: Result = validateCvvCode(cvv);
    const err = document.getElementById("cvv-err");
    this.addInputError(err, result);
    return result.success;
  }
  getExpiryDateValidation(expdate: string): boolean {
    const result: Result = validateExpiryDate(expdate);
    const err = document.getElementById("date-err");
    this.addInputError(err, result);
    return result.success;
  }

  render() {
    this.getDataFromForm();
  }
}
