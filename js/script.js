/* Basic Info Section
   ========================================================================== */
document.getElementById("name").focus();
const job_Role = document.getElementById("title");
const other_Job = document.getElementById("other-job-role");

other_Job.style.display = "none";

job_Role.addEventListener("change", (e) => {
  if (e.target.value === "other") {
    other_Job.style.display = "block";
    other_Job.focus();
  } else {
    other_Job.style.display = "none";
  }
});
/* T-Shirt Info
   ========================================================================== */
const shirt_Color = document.getElementById("color");
const shirt_Color_Option = document.querySelectorAll("#color option");
shirt_Color.disabled = true;

const shirtDesign = document.getElementById("design");

shirtDesign.addEventListener("change", (e) => {
  shirt_Color_Option[0].innerHTML = "&#11015 Select a shirt color &#11015";
  if (e.target.value === "js puns") {
    shirt_Color.disabled = false;
    for (let i = 6; i > 3; i--) {
      shirt_Color_Option[i].style.display = "none";
    }
    for (let i = 1; i < 4; i++) {
      shirt_Color_Option[i].style.display = "block";
    }
  } else if (e.target.value === "heart js") {
    shirt_Color.disabled = false;
    for (let i = 1; i < 4; i++) {
      shirt_Color_Option[i].style.display = "none";
    }
    for (let i = 6; i > 3; i--) {
      shirt_Color_Option[i].style.display = "block";
    }
  }
});
/* Register for Activities
   ========================================================================== */
const activities = document.getElementById("activities");
let total_Activity_Cost = 0;

activities.addEventListener("change", (e) => {
  const activity = e.target;
  let activity_Cost = activity.getAttribute("data-cost");
  const activities_Total = document.getElementById("activities-cost");
  if (activity.checked) {
    total_Activity_Cost += parseInt(activity_Cost);
    activities_Total.textContent = `Total: $${total_Activity_Cost}`;
  } else {
    total_Activity_Cost -= parseInt(activity_Cost);
    activities_Total.textContent = `Total: $${total_Activity_Cost}`;
  }
});

/* Default payment layout
   ========================================================================== */
const payment_Selector = document.getElementById("payment");
const default_Payment = document.querySelectorAll("#payment option");
default_Payment[1].selected = true;
const bitcoin = document.querySelector("#bitcoin");
bitcoin.style.display = "none";

const paypal = document.querySelector("#paypal");
paypal.style.display = "none";

payment_Selector.addEventListener("change", (e) => {
  const credit_Card_info = document.querySelector("#credit-card");
  if (e.target.value === "paypal") {
    credit_Card_info.style.display = "none";
    paypal.style.display = "block";
    bitcoin.style.display = "none";
  } else if (e.target.value === "bitcoin") {
    credit_Card_info.style.display = "none";
    bitcoin.style.display = "block";
    paypal.style.display = "none";
  } else {
    credit_Card_info.style.display = "block";
    bitcoin.style.display = "none";
    paypal.style.display = "none";
  }
});

/* Validation Section
   ========================================================================== */
const name_Input = document.querySelector("#name");
const email_Input = document.querySelector("#email");
const credit_Card_Number_Input = document.querySelector("#cc-num");
const zip_code_Input = document.querySelector("#zip");
const cvv_Input = document.querySelector("#cvv");
const activities_Checkbox = document.querySelectorAll("#activities-box input");

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

/* Accessibility Section
   ========================================================================== */

for (let i = 0; i < activities_Checkbox.length; i++) {
  const activities_Label = activities_Checkbox[i].parentNode;
  activities_Checkbox[i].addEventListener("focus", (e) => {
    activities_Label.className = "focus";
  });
}

for (let i = 0; i < activities_Checkbox.length; i++) {
  const activities_Label = activities_Checkbox[i].parentNode;
  activities_Checkbox[i].addEventListener("blur", (e) => {
    activities_Label.className = "";
  });
}
/* Validation function Section
   ========================================================================== */
const is_Valid = (element) => {
  const parent = element.parentNode;
  parent.classList.remove("not-valid");
  parent.classList.add("valid");
  parent.lastElementChild.style.display = "none";
};
const is_Not_Valid = (element) => {
  const parent = element.parentNode;
  parent.classList.remove("valid");
  parent.classList.add("not-valid");
  parent.lastElementChild.style.display = "block";
};

/* Submit listener Section
   ========================================================================== */
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  for (let key in functionList) {
    if (!functionList[key]()) {
      e.preventDefault();
      is_Not_Valid(functionList[key]);
      console.log("error!");
    } else {
      e.preventDefault();
      is_Valid(functionList[key]);
      console.log("woot woot!");
    }
  }
});

/*
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
  
  
});
*/
