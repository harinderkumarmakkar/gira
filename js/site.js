const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-navigation");

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

function closeMenu() {
  if (!header || !menuToggle) return;
  header.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (header && menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const inquiryForm = document.querySelector("[data-inquiry-form]");

if (inquiryForm) {
  const message = inquiryForm.querySelector("[data-form-message]");
  const requiredFields = inquiryForm.querySelectorAll("[required]");
  const honeypot = inquiryForm.querySelector("[name='website_url']");

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => {
      field.setAttribute("aria-invalid", String(!field.checkValidity()));
    });
  });

  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (honeypot && honeypot.value) {
      inquiryForm.reset();
      return;
    }

    const isValid = inquiryForm.checkValidity();

    requiredFields.forEach((field) => {
      field.setAttribute("aria-invalid", String(!field.checkValidity()));
    });

    if (!isValid) {
      if (message) {
        message.textContent = "Please complete the required fields before submitting the form.";
        message.classList.add("error");
      }
      inquiryForm.reportValidity();
      return;
    }

    if (message) {
      message.textContent = "Submitting...";
      message.classList.remove("error");
    }

    requiredFields.forEach((field) => field.setAttribute("aria-invalid", "false"));
    HTMLFormElement.prototype.submit.call(inquiryForm);
  });
}
