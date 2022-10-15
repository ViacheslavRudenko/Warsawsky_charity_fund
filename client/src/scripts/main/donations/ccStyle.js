const ccInputElement = document.querySelector("#ccnum");

ccInputElement.format = () => {
  // split at cursor position
  let cursorPosition = ccInputElement.selectionStart;
  let partBeforeCursorPosition = ccInputElement.value.substring(
    0,
    cursorPosition
  );
  let partAfterCursorPosition = ccInputElement.value.substring(cursorPosition);

  // remove whitespace, set cursor position accordingly
  const originalLength = partBeforeCursorPosition.length;
  partBeforeCursorPosition = partBeforeCursorPosition.replace(/\s/gi, "");
  cursorPosition -= originalLength - partBeforeCursorPosition.length;
  partAfterCursorPosition = partAfterCursorPosition.replace(/\s/gi, "");
  const ccNumber = partBeforeCursorPosition + partAfterCursorPosition;

  // break into groups of 4 digits
  const parts = ccNumber.match(/.{1,4}/g);

  // add spaces, set cursor position accordingly
  ccInputElement.value = parts?.join(" ") || "";
  cursorPosition += Math.floor((cursorPosition * 1) / 4);
  ccInputElement.setSelectionRange(cursorPosition, cursorPosition);
};

ccInputElement.addEventListener("input", ccInputElement.format);

ccInputElement.addEventListener("keydown", (event) => {
  const cursorPosition = ccInputElement.selectionStart;

  // when the cursor is positioned after a space, deleting applies to the space and the digit before the space
  if (event.key == "Backspace") {
    // if space before cursor and no selection, remove two characters and set cursor position accordingly
    if (
      cursorPosition == ccInputElement.selectionEnd &&
      ccInputElement.value[cursorPosition - 1] == " "
    ) {
      event.preventDefault();
      const newCursorPosition = cursorPosition - 2;
      ccInputElement.value =
        ccInputElement.value.substring(0, newCursorPosition) +
        ccInputElement.value.substring(cursorPosition);
      ccInputElement.setSelectionRange(newCursorPosition, newCursorPosition);
      ccInputElement.format();
    }
  } else if (event.key == "ArrowRight") {
    if (ccInputElement.value[cursorPosition + 1] == " ") {
      const newCursorPosition = cursorPosition + 1;
      ccInputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  } else if (event.key == "ArrowLeft") {
    if (ccInputElement.value[cursorPosition - 1] == " ") {
      const newCursorPosition = cursorPosition - 1;
      ccInputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }
  }
});

function formatString(e) {
  var inputChar = String.fromCharCode(e.keyCode);
  var code = e.keyCode;
  var allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return;
  }

  e.target.value = e.target.value
    .replace(
      /^([1-9]\/|[2-9])$/g,
      "0$1/" // 3 > 03/
    )
    .replace(
      /^(0[1-9]|1[0-2])$/g,
      "$1/" // 11 > 11/
    )
    .replace(
      /^([0-1])([3-9])$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
      "$1/$2" // 141 > 01/41
    )
    .replace(
      /^([0]+)\/|[0]+$/g,
      "0" // 0/ > 0 and 00 > 0
    )
    .replace(
      /[^\d\/]|^[\/]*$/g,
      "" // To allow only digits and `/`
    )
    .replace(
      /\/\//g,
      "/" // Prevent entering more than 1 `/`
    );
}
