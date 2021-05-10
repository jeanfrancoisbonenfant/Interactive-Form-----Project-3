const is_Valid_Name = () => {
  const user_name = name_Input.value;
  return /^[A-Za-z]+$/.test(user_name);
};

const email_field = document.querySelector("#email");
const is_Valid_email = () => {
  const email = email_field.value;
  return /^[^@]+@+[^@]+\.[a-z]+$/.test(email);
};

const credit_Card_Number_field = document.getElementById("cc-num");
const is_Valid_Credit_Card = () => {
  const credit_Card_Number = credit_Card_Number_field.value;
  return /^[0-9]{13,16}$/.test(credit_Card_Number);
};

const zip_code_field = document.getElementById("zip");
const is_Valid_Zip_Code = () => {
  const zip_code = zip_code_field.value;
  return /^[0-9]{5}$/.test(zip_code);
};

const cvv_field = document.getElementById("cvv");
const is_Valid_Cvv = () => {
  const cvv = cvv_field.value;
  return /^[0-9]{3}$/.test(cvv);
};

const activities_Checkbox = document.querySelectorAll("#activities-box input");
const is_Valid_Activities = () => {
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
};

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", (e) => {
  const name_Input_Parent = name_Input.parentNode;
  const name_Hint = document.querySelector("#name-hint");
  if (!is_Valid_Name()) {
    e.preventDefault();
    name_Hint.style.display = "block";
    name_Input_Parent.className = "";
    name_Input_Parent.className = "not-valid";
  } else {
    e.preventDefault();
    name_Input_Parent.className = "";
    name_Input_Parent.className = "valid";
    name_Hint.style.display = "none";
  }
  const email_field_Parent = email_field.parentNode;
  const email_Hint = document.querySelector("#email-hint");
  if (!is_Valid_email()) {
    e.preventDefault();
    email_Hint.style.display = "block";
    email_field_Parent.classList.remove("valid");
    email_field_Parent.classList.add("not-valid");
  } else {
    e.preventDefault();
    email_field_Parent.classList.remove("not-valid");
    email_field_Parent.classList.add("valid");
    email_Hint.style.display = "none";
  }
  const activities = document.querySelector("#activities");
  const activities_Hint = document.querySelector("#activities-hint");
  if (!is_Valid_Activities()) {
    e.preventDefault();
    activities_Hint.style.display = "block";
    activities.classList.remove("valid");
    activities.classList.add("not-valid");
  } else {
    e.preventDefault();
    activities.classList.remove("not-valid");
    activities.classList.add("valid");
    activities_Hint.style.display = "none";
  }
  if (payment_Selector.value === "credit-card") {
    const Credit_Card_field_Parent = credit_Card_Number_field.parentNode;
    const Credit_Card_Hint = document.querySelector("#cc-hint");
    if (!is_Valid_Credit_Card()) {
      e.preventDefault();
      Credit_Card_Hint.style.display = "block";
      Credit_Card_field_Parent.className = "";
      Credit_Card_field_Parent.className = "not-valid";
      console.log("error!");
    } else {
      e.preventDefault();
      Credit_Card_field_Parent.className = "";
      Credit_Card_field_Parent.className = "valid";
      Credit_Card_Hint.style.display = "none";
      console.log("woot woot");
    }
    const zip_Code_Field_Parent = zip_code_field.parentNode;
    const Zip_Code_Hint = document.querySelector("#zip-hint");
    if (!is_Valid_Zip_Code()) {
      e.preventDefault();
      Zip_Code_Hint.style.display = "block";
      zip_Code_Field_Parent.className = "";
      zip_Code_Field_Parent.className = "not-valid";
      console.log("error!");
    } else {
      e.preventDefault();
      zip_Code_Field_Parent.className = "";
      zip_Code_Field_Parent.className = "valid";
      Zip_Code_Hint.style.display = "none";
      console.log("woot woot");
    }
    const cvv_Field_Parent = cvv_field.parentNode;
    const cvv_Hint = document.querySelector("#cvv-hint");
    if (!is_Valid_Cvv()) {
      e.preventDefault();
      cvv_Hint.style.display = "block";
      cvv_Field_Parent.className = "";
      cvv_Field_Parent.className = "not-valid";
      console.log("error!");
    } else {
      e.preventDefault();
      cvv_Field_Parent.className = "";
      cvv_Field_Parent.className = "valid";
      cvv_Hint.style.display = "none";
      console.log("woot woot");
    }
  }
  /*
  
  */
});
