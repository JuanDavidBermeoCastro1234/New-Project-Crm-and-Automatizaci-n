const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const form = document.querySelector("#appointmentForm");
const emailButton = document.querySelector("#emailButton");

const phoneNumber = "573001790488";
const emailAddress = "scaleup235@gmail.com";

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function getFormMessage() {
  const data = new FormData(form);
  return [
    "Hola ScaleUp, quiero apartar una asesoría.",
    "",
    `Nombre: ${data.get("name")}`,
    `Empresa: ${data.get("company")}`,
    `Teléfono: ${data.get("phone")}`,
    `Plan de interés: ${data.get("plan")}`,
    `Necesidad: ${data.get("message")}`
  ].join("\n");
}

function formIsValid() {
  if (form.checkValidity()) {
    return true;
  }

  form.reportValidity();
  return false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formIsValid()) {
    return;
  }

  const encodedMessage = encodeURIComponent(getFormMessage());
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank", "noopener");
});

emailButton.addEventListener("click", () => {
  if (!formIsValid()) {
    return;
  }

  const subject = encodeURIComponent("Solicitud de asesoría - ScaleUp");
  const body = encodeURIComponent(getFormMessage());
  window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  
});
