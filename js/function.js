/* Validation Section
   ========================================================================== */
const name_Input = document.querySelector("#name");
const email_Input = document.querySelector("#email");
const credit_Card_Number_Input = document.querySelector("#cc-num");
const zip_code_Input = document.querySelector("#zip");
const cvv_Input = document.querySelector("#cvv");
const activities_box = document.querySelector("#activities-box");
const activities_Checkbox = document.querySelectorAll("#activities-box input");

const input_list = [
  name_Input,
  email_Input,
  activities_box,
  credit_Card_Number_Input,
  zip_code_Input,
  cvv_Input,
];

const no_Credit_Card_input_list = [name_Input, email_Input, activities_box];

const functionList = {
  name: function () {
    const user_name = name_Input.value;
    return /^[A-Za-z]+$/.test(user_name);
  },
  email: function () {
    const email = email_Input.value;
    return /^[^@]+@+[^@]+\.[a-z]+$/.test(email);
  },
  activities: function () {
    let scheduled_Activities = 0;
    for (let i = 0; i < activities_Checkbox.length; i++) {
      if (activities_Checkbox[i].checked) {
        scheduled_Activities++;
      }
    }
    if (scheduled_Activities > 0) {
      return true;
    } else {
      return false;
    }
  },
  credit_Card: function () {
    const credit_Card_Number = credit_Card_Number_Input.value;
    return /^[0-9]{13,16}$/.test(credit_Card_Number);
  },
  zip_Code: function () {
    const zip_code = zip_code_Input.value;
    return /^[0-9]{5}$/.test(zip_code);
  },
  cvv: function () {
    const cvv = cvv_Input.value;
    return /^[0-9]{3}$/.test(cvv);
  },
};

const no_Credit_card_functionList = {
  name: function () {
    const user_name = name_Input.value;
    return /^[A-Za-z]+$/.test(user_name);
  },
  email: function () {
    const email = email_Input.value;
    return /^[^@]+@+[^@]+\.[a-z]+$/.test(email);
  },
  activities: function () {
    let scheduled_Activities = 0;
    for (let i = 0; i < activities_Checkbox.length; i++) {
      if (activities_Checkbox[i].checked) {
        scheduled_Activities++;
      }
    }
    if (scheduled_Activities > 0) {
      return true;
    } else {
      return false;
    }
  },
};

/* Validation function Section
   ========================================================================== */
const is_Valid = (element) => {
  const parent = element.parentElement;
  const hint = parent.querySelector("span:nth-child(3)");
  parent.classList.remove("not-valid");
  parent.classList.add("valid");
  hint.style.display = "none";
};
const is_Not_Valid = (element) => {
  const parent = element.parentElement;
  const hint = parent.querySelector("span:nth-child(3)");
  parent.classList.remove("valid");
  parent.classList.add("not-valid");
  hint.style.display = "block";
};
