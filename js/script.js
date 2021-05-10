/* Basic Info Section
   ========================================================================== */
document.getElementById("name").focus();
const job_Role = document.getElementById("title");
const other_Job = document.getElementById("other-job-role");

other_Job.style.display = "none";

//Toggle the other job input box
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

// Show & hide T-Shirt Color based on selected Design
shirtDesign.addEventListener("change", (e) => {
  shirt_Color_Option[0].innerHTML = "&#11015 Select a shirt color &#11015";
  if (e.target.value === "js puns") {
    shirt_Color.disabled = false;
    for (let i = 6; i > 3; i--) {
      shirt_Color_Option[i].style.display = "none";
    }
    for (let i = 1; i < 4; i++) {
      shirt_Color_Option[i].style.display = "block";
      shirt_Color_Option[0].selected = "true";
    }
  } else if (e.target.value === "heart js") {
    shirt_Color.disabled = false;
    for (let i = 1; i < 4; i++) {
      shirt_Color_Option[i].style.display = "none";
    }
    for (let i = 6; i > 3; i--) {
      shirt_Color_Option[i].style.display = "block";
      shirt_Color_Option[0].selected = "true";
    }
  }
});
/* Register for Activities
   ========================================================================== */
const activities = document.getElementById("activities");
let total_Activity_Cost = 0;

// Add/Substract Activity cost to the Total
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

//Toggle Payment method info between Credit Card / Paypal / Bitcoin
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

/* Accessibility Section
   ========================================================================== */

//Provide more visibility on the focused Activity
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

/* Submit listener Section
   ==========================================================================
   Submit listener loop throught an object to provide validation fonction
*/
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  let i = 0;
  if (payment_Selector.value === "credit-card") {
    for (let key in functionList) {
      for (i = i; i < input_list.length; ) {
        if (!functionList[key]()) {
          e.preventDefault();
          is_Not_Valid(input_list[i]);
          i++;
          break;
        } else {
          is_Valid(input_list[i]);
          i++;
          break;
        }
      }
    }
  } else {
    for (let key in no_Credit_card_functionList) {
      for (i = i; i < no_Credit_Card_input_list.length; ) {
        if (!no_Credit_card_functionList[key]()) {
          e.preventDefault();
          is_Not_Valid(no_Credit_Card_input_list[i]);
          i++;
          break;
        } else {
          is_Valid(no_Credit_Card_input_list[i]);
          i++;
          break;
        }
      }
    }
  }
});

/* Exceeds Expectations Section
   ========================================================================== */

/* Click listener on the Activity Div to compare data-day-and-time of available
 activity and disable same time activity  */
const label = activities_box.children;
activities_box.addEventListener("click", (e) => {
  const activity_chosen = e.target;
  const event_Checkbox = e.target.getAttribute("data-day-and-time");
  if (event_Checkbox) {
    for (let i = 1; i < activities_Checkbox.length; i++) {
      const parent_Element = activities_Checkbox[i].parentElement;
      const to_Be_check = activities_Checkbox[i].getAttribute(
        "data-day-and-time"
      );
      if (
        event_Checkbox === to_Be_check &&
        activity_chosen !== activities_Checkbox[i]
      ) {
        if (activity_chosen.checked) {
          parent_Element.classList.add("disabled");
          activities_Checkbox[i].disabled = true;
        } else {
          parent_Element.classList.remove("disabled");
          activities_Checkbox[i].disabled = false;
        }
      }
    }
  }
});

/* Real-time error message
   ========================================================================== */

//also embedded Conditional error message for blank and space.
name_Input.addEventListener("keyup", (e) => {
  const parent_Name = name_Input.parentElement;
  const hint = parent_Name.querySelector("span:nth-child(3)");
  if (name_Input.value === "" || name_Input.value === " ") {
    hint.style.display = "none";
    parent_Name.lastElementChild.style.display = "block";
    parent_Name.classList.add("not-valid");
  } else {
    parent_Name.lastElementChild.style.display = "none";
    parent_Name.classList.remove("not-valid");
    if (!functionList.name()) {
      is_Not_Valid(name_Input);
    } else {
      is_Valid(name_Input);
    }
  }
});

email_Input.addEventListener("keyup", (e) => {
  const parent_Email = email_Input.parentElement;
  const hint = parent_Email.querySelector("span:nth-child(3)");
  if (email_Input.value === "" || email_Input.value === " ") {
    hint.style.display = "none";
    parent_Email.lastElementChild.style.display = "block";
    parent_Email.classList.add("not-valid");
  } else {
    parent_Email.lastElementChild.style.display = "none";
    parent_Email.classList.remove("not-valid");

    if (!functionList.email()) {
      is_Not_Valid(email_Input);
    } else {
      is_Valid(email_Input);
    }
  }
});

if (payment_Selector.value === "credit-card") {
  credit_Card_Number_Input.addEventListener("keyup", (e) => {
    if (!functionList.credit_Card()) {
      is_Not_Valid(credit_Card_Number_Input);
    } else {
      is_Valid(credit_Card_Number_Input);
    }
  });
  zip_code_Input.addEventListener("keyup", (e) => {
    if (!functionList.zip_Code()) {
      is_Not_Valid(zip_code_Input);
    } else {
      is_Valid(zip_code_Input);
    }
  });
  cvv_Input.addEventListener("keyup", (e) => {
    if (!functionList.cvv()) {
      is_Not_Valid(cvv_Input);
    } else {
      is_Valid(cvv_Input);
    }
  });
}
