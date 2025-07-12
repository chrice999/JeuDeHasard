// Les données des produits sont définies ici.
// C'est ce tableau que vous modifierez manuellement après avoir utilisé admin.html en local.
function getInitialProducts() {
    return [
        { id: 1, title: "Pack Sécurité AGTVT Pro", description: "Une solution complète pour protéger votre PME contre les ransomwares et le phishing.", price: 499, image: "https://placehold.co/600x400/007BFF/FFFFFF?text=AGTVT+Pro", type: "AGTVT", category: "payant" },
        { id: 2, title: "Formation Développeur Web", description: "Apprenez le HTML, CSS et JavaScript de A à Z avec ce pack complet.", price: 99, image: "https://placehold.co/600x400/28A745/FFFFFF?text=Formation+Web", type: "Formation", category: "payant" },
        { id: 3, title: "Template Portfolio Moderne", description: "Un template responsive et élégant pour présenter vos travaux.", price: 29, image: "https://placehold.co/600x400/FFC107/000000?text=Template+Portfolio", type: "Template", category: "payant" },
        { id: 4, title: "Tutoriel JavaScript Asynchrone", description: "Comprendre les promesses et async/await.", price: 0, image: "https://placehold.co/600x400/17A2B8/FFFFFF?text=Tuto+JS", type: "Tuto", category: "gratuit" },
        { id: 5, title: "Outil de Compression d'Image", description: "Un script simple pour optimiser le poids de vos images.", price: 0, image: "https://placehold.co/600x400/6C757D/FFFFFF?text=Outil+Image", type: "Outil", category: "gratuit" },
        { id: 6, title: "Pack d'icônes SVG", description: "Collection de 50 icônes pour vos projets web.", price: 0, image: "https://placehold.co/600x400/343A40/FFFFFF?text=Pack+Icones", type: "ZIP", category: "gratuit" }
    ];
}

// Utilise directement les données de la fonction ci-dessus.
const products = getInitialProducts();

function renderProducts(filter = 'all') {
    const productCatalog = document.getElementById('product-catalog');
    const freeResourcesList = document.getElementById('free-resources-list');
    
    let container, productList;

    if (productCatalog) {
        container = productCatalog;
        productList = products.filter(p => p.category === 'payant');
    } else if (freeResourcesList) {
        container = freeResourcesList;
        productList = products.filter(p => p.category === 'gratuit');
        if (filter !== 'all') {
            productList = productList.filter(p => p.type === filter);
        }
    } else {
        return;
    }

    container.innerHTML = '';
    if (productList.length === 0) {
        container.innerHTML = '<p>Aucun article disponible pour le moment.</p>';
        return;
    }

    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+non+disponible';">
            <div class="product-content">
                <h3>${product.title}</h3>
                <p>${product.description.substring(0, 100)}...</p>
                ${product.category === 'payant' ? `<p class="price">${product.price} €</p>` : ''}
                <button onclick="alert('Affichage des détails pour : ${product.title.replace(/'/g, "\\'")}')">Voir plus</button>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Affichage initial sur les pages concernées
    if (document.getElementById('product-catalog') || document.getElementById('free-resources-list')) {
        renderProducts();
    }

    // Gestion des filtres pour la page gratuite
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });
});

