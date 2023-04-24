// MASKS

const isValidEmail = (email) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

// VALIDATION
const form = document.querySelector("form");
const inputEmail = document.querySelector('input[name="email"]');
const inputPais = document.querySelector('input[name="pais"');
const contents = document.querySelectorAll("article[data-modal]");
const closeModal = document.querySelectorAll(".modal button");
const botaoWallpaper = document.querySelector("#btn-form");

closeModal.forEach((close) => {
  close.addEventListener("click", () => {
    contents.forEach((content) => content.classList.remove("open"));
  });
});

let isValidForm = false;

const resetInput = (elem) => {
  elem.classList.remove("invalid");
  elem.nextElementSibling.classList.add("error-hidden");
};

const invalidateElem = (elem) => {
  elem.classList.add("invalid");
  elem.nextElementSibling.classList.remove("error-hidden");
  isValidForm = false;
};

const validateInput = () => {
  isValidForm = true;
  if (!isValidEmail(inputEmail.value)) {
    invalidateElem(inputEmail);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
  const formData = new FormData(e.target);
  formData.append("extension", "lp_shazam");

  if (isValidForm) {
    botaoWallpaper.disable = true;
    botaoWallpaper.innerHTML = "ENVIANDO...";
    botaoWallpaper.style.width = "380px";

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        form.reset();
        botaoWallpaper.innerHTML = "REGISTRO ENVIADO";
        setTimeout(() => {
          botaoWallpaper.innerHTML = "REGISTRARSE";
          botaoWallpaper.style.width = "350px";
        }, 5000);
      }
    });
    xhr.open(
        "POST",
        "https://tools.l0gik.com.br/warner/warner-salesforce-post-latam/",
        true
    );
    xhr.send(formData);
  }
});

inputEmail.addEventListener("input", () => {
  resetInput(inputEmail);
});
