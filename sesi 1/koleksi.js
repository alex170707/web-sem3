const productTriggers = document.querySelectorAll('[data-dialog]');

productTriggers.forEach((trigger) => {
    const dialog = document.getElementById(trigger.dataset.dialog);
    const closeButton = dialog.querySelector('.dialog-close');

    trigger.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});
