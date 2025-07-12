document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('document-request-form');
    if (!form) return;

    const serviceType = document.getElementById('service-type');
    const hasBarcodeCheckbox = document.getElementById('has-barcode');
    const barcodeOptionWrapper = document.getElementById('barcode-option-wrapper');
    const barcodeUploadGroup = document.getElementById('barcode-upload-group');
    const barcodePhotoInput = document.getElementById('barcode-photo');
    const totalPriceSpan = document.getElementById('total-price');
    const feedbackDiv = document.getElementById('form-feedback');

    const PASSPORT_PRICE = 10000;
    const DRIVER_LICENSE_BASE_PRICE = 35000;
    const DRIVER_LICENSE_DISCOUNT_PRICE = 10000;

    function updatePrice() {
        const isDriverLicense = serviceType.value === 'Driver Licence';
        const isPassport = serviceType.value === 'Passport';

        barcodeOptionWrapper.style.display = isDriverLicense ? 'flex' : 'none';

        if (isPassport) {
            totalPriceSpan.textContent = PASSPORT_PRICE.toLocaleString('fr-FR');
            barcodeUploadGroup.style.display = 'none';
            barcodePhotoInput.required = false;
            hasBarcodeCheckbox.checked = false;
        } else if (isDriverLicense) {
            if (hasBarcodeCheckbox.checked) {
                totalPriceSpan.textContent = DRIVER_LICENSE_DISCOUNT_PRICE.toLocaleString('fr-FR');
                barcodeUploadGroup.style.display = 'block';
                barcodePhotoInput.required = true;
            } else {
                totalPriceSpan.textContent = DRIVER_LICENSE_BASE_PRICE.toLocaleString('fr-FR');
                barcodeUploadGroup.style.display = 'none';
                barcodePhotoInput.required = false;
            }
        }
    }
    
    serviceType.addEventListener('change', updatePrice);
    hasBarcodeCheckbox.addEventListener('change', updatePrice);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const commandId = Math.floor(10000 + Math.random() * 90000);
        const formData = new FormData(form);
        let emailBody = `Nouvelle commande de document N°${commandId}\n\n`;
        emailBody += "--------------------------------------\n";
        for (let [key, value] of formData.entries()) {
            if (value instanceof File) {
                emailBody += `${key}: ${value.name} (${(value.size / 1024).toFixed(2)} KB)\n`;
            } else {
                emailBody += `${key}: ${value}\n`;
            }
        }
        emailBody += `Prix Total: ${totalPriceSpan.textContent} Ar\n`;
        emailBody += "--------------------------------------\n";
        emailBody += "IMPORTANT: Le client doit joindre manuellement les fichiers image à cet email.\n";

        const mailtoLink = `mailto:command@simonservice.help?subject=Commande N°${commandId}&body=${encodeURIComponent(emailBody)}`;
        
        const whatsappMsg = `Salut, je suis le propriétaire de la commande N°${commandId} passée sur simonservice.help.`;
        const whatsappLink = `https://wa.me/261326439245?text=${encodeURIComponent(whatsappMsg)}`;

        feedbackDiv.style.display = 'block';
        feedbackDiv.style.color = 'green';
        feedbackDiv.innerHTML = `
            <p><strong>Commande N°${commandId} enregistrée !</strong></p>
            <p>Pour finaliser, veuillez suivre ces deux étapes :</p>
            <ol>
                <li><strong>Envoyez-nous les informations par email :</strong> <a href="${mailtoLink}" target="_blank">Cliquez ici pour ouvrir votre client mail</a>. <strong style="color: #dc3545;">N'oubliez pas de joindre manuellement votre photo d'identité (et le code barre si nécessaire) à l'email avant de l'envoyer.</strong></li>
                <li><strong>Contactez-nous sur WhatsApp :</strong> <a href="${whatsappLink}" target="_blank">Cliquez ici pour démarrer la conversation</a>.</li>
            </ol>
        `;
        
        form.reset();
        updatePrice();
    });

    updatePrice(); // Initial price check
});
