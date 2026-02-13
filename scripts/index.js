"use strict";

// Uncheck the menu toggle checkbox to close the menu after a link is clicked
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("menu-toggle").checked = false;
  });
});

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelectorAll("nav a");

// Close menu and remove scroll lock when any nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.checked = false;
    document.body.classList.remove("no-scroll");
  });
});

// Add or remove scroll lock based on toggle state
menuToggle.addEventListener("change", () => {
  if (menuToggle.checked) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
});

// FAQ Interaction
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    const allItems = document.querySelectorAll(".faq-item");

    allItems.forEach((faq) => {
      if (faq !== item) {
        faq.classList.remove("active"); // Close other open FAQs
      }
    });

    item.classList.toggle("active"); // Toggle the clicked one
  });
});

// Contact Form Validation
function setupFormValidation(formId) {
  const form = document.getElementById(formId);

  // Get inputs and error containers
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const messageError = document.getElementById("message-error");

  function validateName() {
    if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter at least 2 characters.";
      return false;
    }
    nameError.textContent = "";
    return true;
  }

  function validateEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
    if (!pattern.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email address.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validatePhone() {
    const pattern = /^\+?\d{7,15}$/;
    if (!pattern.test(phoneInput.value.trim())) {
      phoneError.textContent = "Enter a valid phone number (7-15 digits).";
      return false;
    }
    phoneError.textContent = "";
    return true;
  }

  function validateMessage() {
    if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters.";
      return false;
    }
    messageError.textContent = "";
    return true;
  }

  // Real-time validation (on typing)
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  messageInput.addEventListener("input", validateMessage);

  // On form submit
  form.addEventListener("submit", function (event) {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    // Only prevent submission if invalid
    if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid)
      event.preventDefault();
    else {
      setTimeout(() => form.reset(), 10); // clear the form after successful submit
    }
  });
}

setupFormValidation("contact-form");
