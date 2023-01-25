const display1Elm = document.querySelector(".display-1");
const display2Elm = document.querySelector(".display-2");
const tempResultElm = document.querySelector(".tempResult");

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const allClear = document.querySelector(".btn-ac");
const clear = document.querySelector(".btn-c");

let display1 = "";
let display2 = "";
let result = null;
let lastOperator = "";
let haveDot = false;

numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    if (e.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === "." && haveDot) {
      return;
    }

    display2 += e.target.innerText;
    display2Elm.innerText = display2;
  });
});

operations.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (!display2) {
      return;
    } else {
      haveDot = false;
      const operatorName = e.target.innerText;
      if (display1 && display2 && lastOperator) {
        mathOperator();
      } else {
        result = parseFloat(display2); // changing string to float
      }

      clearVariable(operatorName);
      lastOperator = operatorName;
    }
  });
});

const clearVariable = (optName = "") => {
  display1 += display2 + "" + optName;
  display1Elm.innerText = display1;
  display2Elm.innerText = "";
  display2 = "";
  tempResultElm.innerText = result;
};

const mathOperator = () => {
  if (lastOperator === "X") {
    result = parseFloat(result) * parseFloat(display2);
  } else if (lastOperator === "+") {
    result = parseFloat(result) + parseFloat(display2);
  } else if (lastOperator === "-") {
    result = parseFloat(result) - parseFloat(display2);
  } else if (lastOperator === "/") {
    result = parseFloat(result) / parseFloat(display2);
  } else if (lastOperator === "%") {
    result = parseFloat(result) % parseFloat(display2);
  }
};

equal.addEventListener("click", (e) => {
  if (!display1 || !display2) return;

  mathOperator();
  clearVariable();
  display2Elm.innerText = result;
  tempResultElm.innerText = "";
  display2 = result;
  display1 = "";
});

allClear.addEventListener("click", (e) => {
  display1Elm.innerText = "0";
  display2Elm.innerText = "0.00";
  display1 = "";
  display2 = "";
  result = "";
  tempResultElm.innerText = "";
});

clear.addEventListener("click", (e) => {
  display2Elm.innerText = "";
  display2 = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickNumElm(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOptElm(e.key);
  } else if (e.key === "*") {
    clickOptElm("X");
  } else if (e.key === "=" || e.key === "Enter") {
    equal.click();
  } else if (e.key === "Escape") {
    allClear.click();
  } else if (e.key === "Backspace") {
    clickBack();
  }
});

const clickNumElm = (key) => {
  numbers.forEach((btn) => {
    if (btn.innerText === key) {
      btn.click();
    }
  });
};

const clickOptElm = (key) => {
  operations.forEach((btn) => {
    if (btn.innerText === key) {
      btn.click();
    }
  });
};

const clickBack = () => {
  if (display2Elm.innerText != "0.00")
    display2 = display2.toString().slice(0, -1);
  display2Elm.innerText = display2;
};
