document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    document.querySelectorAll(".border-red-500").forEach((e) => {
      e.classList.remove("border-red-500", "border-2");
    });

    document.querySelectorAll(".error-container").forEach((e) => {
      e.innerHTML = "";
    });

    const agreementContainer = document.getElementById(
      "agreement-error-container",
    );
    if (agreementContainer) agreementContainer.innerHTML = "";

    let isValid = true;

    const name = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const fullnameValue = name.value.trim() + " " + lastname.value.trim();

    if (fullnameValue === "") {
      showError(name, "Введите фамилию и имя");
      isValid = false;
    } else if (fullnameValue.split("").length < 2) {
      if (name.value.trim() === "") {
        showError(name, "Введите имя");
      }
      if (lastname.value.trim() === "") {
        showError(lastname, "Введите фамилию");
      }
      isValid = false;
    }

    const phone = document.getElementById("phone_number");
    const phoneValue = phone.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, ""); //заменяем знаки везде на ничего

    if (phoneValue === "") {
      showError(phone, "Введите номер телефона");
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showError(phone, "Введите 10 цифр номера");
      isValid = false;
    }

    const email = document.getElementById("email");
    const emailValue = email.value.trim();

    if (emailValue === "") {
      showError(email, "Введите email");
      isValid = false;
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      showError(email, "Введите корректный email");
      isValid = false;
    }

    const agreement = document.getElementById("agreement");
    if (!agreement.checked) {
      const container = document.getElementById("agreement-error-container");
      const errorMsg = document.createElement("p");
      errorMsg.classList.add("text-red-500", "text-xs");
      errorMsg.textContent = "Необходимо согласие на обработку данных";
      container.appendChild(errorMsg);
      isValid = false;
    }
    const subject = document.getElementById("subject");
    const subjectValue = subject.value;
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        phone: phoneValue,
        subject: subjectValue,
        email: emailValue,
        message:
          document.getElementById("message").value.trim() || "(не заполнено)",
      };

      const event = new CustomEvent("formValid", { detail: formData });
      document.dispatchEvent(event);

      alert("Форма отправлена!");
    }
  });

  function showError(input, message) {
    input.classList.add("border-red-500", "border-2");
    const container = input.nextElementSibling;

    if (container && container.classList.contains("error-container")) {
      const errorMsg = document.createElement("p");
      errorMsg.classList.add("text-red-500", "text-xs");
      errorMsg.textContent = message;
      container.appendChild(errorMsg);
    }
  }

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("border-red-500", "border-2");

      const container = this.nextElementSibling;
      if (container && container.classList.contains("error-container")) {
        container.innerHTML = "";
      }
    });

    if (input.tagName === "SELECT") {
      input.addEventListener("change", function () {
        this.classList.remove("border-red-500", "border-2");
        const container = this.nextElementSibling;
        if (container && container.classList.contains("error-container")) {
          container.innerHTML = "";
        }
      });
    }
  });
  const agreement = document.getElementById("agreement");
  if (agreement) {
    agreement.addEventListener("change", function () {
      const container = document.getElementById("agreement-error-container");
      if (container) container.innerHTML = "";
    });
  }
});
