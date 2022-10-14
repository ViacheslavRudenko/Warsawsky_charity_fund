import { checkCreditCard } from "./validation/cardNumValidation.ts";
import { validateFullName } from "./validation/fullNameValidation.ts";
import { validateCvvCode } from "./validation/cvvValidation.ts";
import { validateExpiryDate } from "./validation/dateValidation.ts";
import { validateSum } from "./validation/sumValidation.ts";

const btnSubmit = document.querySelector("#btn-submit");

export default class Donations {
  getDataFromForm = () => {
    let formData = [];

    btnSubmit.addEventListener("click", (e) => {
      const form = document.getElementById("donations-form");
      const formDataa = new FormData(form);
      for (const [key, value] of formDataa) {
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

  addInputError(err, result) {
    if (!result.success) {
      err.style.display = "block";
      err.innerHTML = result.message;
    } else {
      err.style.display = "none";
      err.innerHTML = "";
    }
  }
  getSumValidation(sum) {
    const result = validateSum(sum);
    const err = document.getElementById("sum-err");
    this.addInputError(err, result);
    return result.success;
  }

  getCardNumValidation(cardnumber) {
    const result = checkCreditCard(cardnumber);
    const err = document.getElementById("cc-err");
    this.addInputError(err, result);
    return result.success;
  }

  getFullNameValidation(fullname) {
    const result = validateFullName(fullname);
    const err = document.getElementById("fullname-err");
    this.addInputError(err, result);
    return result.success;
  }
  getCvvValidation(cvv) {
    const result = validateCvvCode(cvv);
    const err = document.getElementById("cvv-err");
    this.addInputError(err, result);
    return result.success;
  }
  getExpiryDateValidation(expdate) {
    const result = validateExpiryDate(expdate);
    const err = document.getElementById("date-err");
    this.addInputError(err, result);
    return result.success;
  }

  render() {
    this.getDataFromForm();
  }
}
