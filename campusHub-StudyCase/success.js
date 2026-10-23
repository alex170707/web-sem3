const registrationForm = document.querySelector("#registration-form");

if (!(registrationForm instanceof HTMLFormElement)) {
    throw new Error("Form pendaftaran tidak ditemukan.");
}

const successDialog = document.createElement("dialog");
successDialog.className = "success-dialog";
successDialog.setAttribute("aria-labelledby", "registration-success-title");

const successIcon = document.createElement("div");
successIcon.className = "success-dialog__icon";
successIcon.setAttribute("aria-hidden", "true");
successIcon.textContent = "\u2713";

const successTitle = document.createElement("h2");
successTitle.id = "registration-success-title";
successTitle.textContent = "Pendaftaran Berhasil!";

const successMessage = document.createElement("p");
successMessage.textContent = "Terima kasih sudah mendaftar. Sampai bertemu di kegiatan kampus!";

const closeForm = document.createElement("form");
closeForm.method = "dialog";

const closeButton = document.createElement("button");
closeButton.className = "success-dialog__close";
closeButton.type = "button";
closeButton.textContent = "OK";

closeForm.append(closeButton);
successDialog.append(successIcon, successTitle, successMessage, closeForm);
document.body.append(successDialog);

const closeSuccessDialog = () => {
    if (!successDialog.open || successDialog.classList.contains("is-closing")) {
        return;
    }

    successDialog.classList.add("is-closing");
};

successDialog.addEventListener("animationend", (event) => {
    if (event.target !== successDialog || event.animationName !== "success-dialog-exit") {
        return;
    }

    successDialog.close();
    successDialog.classList.remove("is-closing");
    registrationForm.reset();
});

successDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeSuccessDialog();
});

closeButton.addEventListener("click", closeSuccessDialog);

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    successDialog.classList.remove("is-closing");
    successDialog.showModal();
});
