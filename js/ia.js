document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    
    if (!sendBtn) return; // Ne rien faire si on n'est pas sur la page IA

    const getBotResponse = (userText) => {
        const text = userText.toLowerCase().trim();
        let response = "Je suis désolé, je n'ai pas compris votre question. Vous pouvez me poser des questions sur nos services (comme la création de documents), nos formations, ou nos templates PSD.";

        // Recherche d'un produit par son nom
        const foundProduct = products.find(p => text.includes(p.title.toLowerCase()));

        if (foundProduct) {
            if (text.includes('prix')) {
                response = `Le prix de "${foundProduct.title}" est de ${foundProduct.price.toLocaleString('fr-FR')} Ar.`;
            } else if (text.includes('description')) {
                response = `Voici la description de "${foundProduct.title}": ${foundProduct.description}`;
            } else {
                response = `"${foundProduct.title}" est un de nos produits de type "${foundProduct.type}". Son prix est de ${foundProduct.price.toLocaleString('fr-FR')} Ar. Description : ${foundProduct.description}`;
            }
            return response;
        }

        // Réponses générales
        if (text.includes('passeport') || text.includes('licence') || text.includes('document')) {
            response = "Nous proposons un service de création de documents d'identité pour les vérifications en ligne. Vous pouvez passer commande via la page 'Nos Services'. Le prix d'un passeport est de 10,000 Ar et celui d'une licence de 35,000 Ar.";
        } else if (text.includes('formation')) {
            response = "Nous proposons des formations vidéo complètes pour vous aider à démarrer dans le freelancing. Vous pouvez les trouver dans notre catalogue.";
        } else if (text.includes('template')) {
            response = "Nos templates PSD sont des modèles Photoshop prêts à l'emploi. Vous pouvez les acheter directement depuis la page 'Templates PSD' en les ajoutant à votre panier.";
        } else if (text.includes('bonjour') || text.includes('salut')) {
            response = "Bonjour ! En quoi puis-je vous aider concernant nos services ?";
        } else if (text.includes('merci')) {
            response = "De rien ! N'hésitez pas si vous avez d'autres questions.";
        }
        
        return response;
    };

    const sendMessage = () => {
        const userText = userInput.value;
        if (userText.trim() === '') return;

        const userMessageElem = document.createElement('div');
        userMessageElem.className = 'chat-message user';
        userMessageElem.textContent = userText;
        chatBox.appendChild(userMessageElem);

        setTimeout(() => {
            const botResponse = getBotResponse(userText);
            const botMessageElem = document.createElement('div');
            botMessageElem.className = 'chat-message bot';
            botMessageElem.textContent = botResponse;
            chatBox.appendChild(botMessageElem);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);

        userInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
