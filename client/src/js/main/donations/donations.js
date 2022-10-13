import { checkCreditCard } from "./validation/cardNumValidation.js";
import { validateFullName } from "./validation/fullNameValidation.js";
import { validateCvvCode } from "./validation/cvvValidation.js";
import { validateExpiryDate } from "./validation/dateValidation.js";
import { validateSum } from "./validation/sumValidation.js";

const btnSubmit = document.querySelector("#btn-submit");

export default class Donations {
  getDataFromForm = () => {
    let formData = [];

    btnSubmit.addEventListener("click", (e) => {
      formData = Array.from(
        document.querySelectorAll("#donations-form input")
      ).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});
      const sumSuccess = this.getSumValidation(formData.sum);
      const ccSuccess = this.getCardNumValidation(formData.cardnumber);
      const nameSuccess = this.getFullNameValidation(formData.fullname);
      const cvvSuccess = this.getCvvValidation(formData.cvv);
      const dateSuccess = this.getExpiryDateValidation(formData.expdate);
      if (sumSuccess && ccSuccess && nameSuccess && cvvSuccess) {
        const form = document.getElementById("donations-form");
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
