document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // --- Logique pour la page templates.html ---
    const templatesGrid = document.getElementById('templates-grid-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');

    function findProductById(id) {
        return products.find(p => p.id === parseInt(id));
    }

    function addToCart(productId) {
        const product = findProductById(productId);
        if (product) {
            const existingItem = cart.find(item => item.id === productId);
            if (!existingItem) {
                cart.push({ ...product, quantity: 1 });
            } else {
                alert('Cet article est déjà dans votre panier.');
            }
            updateCart();
        }
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function updateCart() {
        if (templatesGrid) { // S'assurer qu'on est sur la bonne page
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
            calculateTotal();
        }
    }

    function renderCartItems() {
        if (!cartItemsContainer) return;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <span class="item-name">${item.title}</span>
                    <span class="item-price">${item.price.toLocaleString('fr-FR')} Ar</span>
                    <button class="remove-from-cart-btn" data-id="${item.id}">&times;</button>
                </div>
            `).join('');
        }
    }

    function calculateTotal() {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        if (cartTotalPriceSpan) {
            cartTotalPriceSpan.textContent = `${total.toLocaleString('fr-FR')} Ar`;
        }
        if (checkoutButton) {
            checkoutButton.disabled = cart.length === 0;
        }
        return total;
    }

    if (templatesGrid) {
        // La fonction renderProducts est appelée depuis data.js
        // Utiliser la délégation d'événements pour les boutons "Ajouter au panier"
        templatesGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = parseInt(e.target.dataset.id);
                addToCart(productId);
            }
        });
         // Utiliser la délégation d'événements pour les boutons de suppression
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-from-cart-btn')) {
                removeFromCart(parseInt(e.target.dataset.id));
            }
        });
        updateCart(); // Affichage initial du panier
    }
    
    if(checkoutButton){
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = 'checkout.html';
            }
        });
    }

    // --- Logique pour la page checkout.html ---
    const orderItemsList = document.getElementById('order-items-list');
    const orderTotalPriceSpan = document.getElementById('order-total-price');
    const orderDownloadLinks = document.getElementById('order-download-links');
    const payWhatsappRadio = document.getElementById('pay-whatsapp');
    const payTelmaRadio = document.getElementById('pay-telma');
    const whatsappAction = document.getElementById('whatsapp-action');
    const telmaAction = document.getElementById('telma-action');
    const telmaUssdCode = document.getElementById('telma-ussd-code');
    const telmaReferenceInput = document.getElementById('telma-reference');
    const whatsappPaymentLink = document.getElementById('whatsapp-payment-link');
    const telmaConfirmLink = document.getElementById('telma-confirm-link');

    function loadCheckoutData() {
        if (!orderItemsList) return;

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        orderTotalPriceSpan.textContent = `${total.toLocaleString('fr-FR')} Ar`;
        
        if (cart.length === 0 && window.location.pathname.endsWith('checkout.html')) {
            window.location.href = 'templates.html'; // Rediriger si le panier est vide
            return;
        }

        orderItemsList.innerHTML = cart.map(item => `
            <div class="order-item">
                <span>${item.title}</span>
                <span>${item.price.toLocaleString('fr-FR')} Ar</span>
            </div>
        `).join('');

        orderDownloadLinks.innerHTML = cart.map(item => `
            <div class="download-link-item">
                <span>${item.title}:</span>
                <a href="${item.downloadLink || '#'}" target="_blank" onclick="event.preventDefault(); alert('Le fichier est protégé par mot de passe. Vous recevrez le mot de passe après confirmation du paiement.')">Télécharger</a>
            </div>
        `).join('');

        const itemNames = cart.map(item => item.title).join(', ');
        
        const whatsappMsg = `Bonjour, je suis prêt à payer ${total.toLocaleString('fr-FR')} Ar pour les articles suivants : ${itemNames}. Merci de m'indiquer la marche à suivre.`;
        whatsappPaymentLink.href = `https://wa.me/261326439245?text=${encodeURIComponent(whatsappMsg)}`;
        
        telmaUssdCode.textContent = `#111*1*2*0388629307*${total}#`;

        telmaConfirmLink.addEventListener('click', (e) => {
            e.preventDefault();
            const reference = telmaReferenceInput.value;
            if (!reference) {
                alert('Veuillez entrer la référence de la transaction Telma.');
                return;
            }
            const telmaConfirmMsg = `Bonjour, j'ai effectué le paiement de ${total.toLocaleString('fr-FR')} Ar pour les articles : ${itemNames}. Ma référence de transaction est : ${reference}. Pouvez-vous me fournir le(s) mot(s) de passe ? Merci.`;
            window.open(`https://wa.me/261326439245?text=${encodeURIComponent(telmaConfirmMsg)}`, '_blank');
        });
    }

    if(payWhatsappRadio){
        payWhatsappRadio.addEventListener('change', () => {
            whatsappAction.style.display = 'block';
            telmaAction.style.display = 'none';
        });
    }
    if(payTelmaRadio){
        payTelmaRadio.addEventListener('change', () => {
            whatsappAction.style.display = 'none';
            telmaAction.style.display = 'block';
        });
    }

    if (document.getElementById('order-items-list')) {
        loadCheckoutData();
    }
});
