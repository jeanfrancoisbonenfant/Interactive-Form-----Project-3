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

/* Submit listener Section
   ========================================================================== */
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
          console.log("error!");
          break;
        } else {
          e.preventDefault();
          is_Valid(input_list[i]);
          i++;
          console.log("woot woot!");
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
          console.log("else error!");
          break;
        } else {
          e.preventDefault();
          is_Valid(no_Credit_Card_input_list[i]);
          i++;
          console.log("else woot!");
          break;
        }
      }
    }
  }
});
