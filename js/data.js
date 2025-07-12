// Les données des produits sont définies ici.
// C'est ce tableau que vous modifierez manuellement après avoir utilisé admin.html en local.
function getInitialProducts() {
    return [
        { id: 1, title: "Création de Document d'Identité", description: "Service de création de passeport ou permis de conduire (Driver Licence) pour vérifications en ligne.", price: 35000, image: "https://placehold.co/600x400/007BFF/FFFFFF?text=Document+Pro", type: "Service", category: "payant" },
        { id: 2, title: "Formation Vidéo : Freelancing de A à Z", description: "Un pack de fichiers vidéo pour apprendre les bases du travail sur les plateformes de micro-tâches.", price: 495000, image: "https://placehold.co/600x400/28A745/FFFFFF?text=Formation+Vidéo", type: "Formation", category: "payant" },
        { id: 3, title: "Template PSD : Carte de Visite Moderne", description: "Un template Photoshop professionnel et facile à éditer pour vos cartes de visite.", price: 45000, image: "https://placehold.co/600x400/FFC107/000000?text=Template+PSD+1", type: "Template PSD", category: "payant" },
        { id: 7, title: "Template PSD : Flyer Événementiel", description: "Créez des flyers percutants pour vos événements avec ce template PSD dynamique.", price: 65000, image: "https://placehold.co/600x400/fd7e14/FFFFFF?text=Template+PSD+2", type: "Template PSD", category: "payant" },
        { id: 8, title: "Template PSD : CV Professionnel", description: "Un design de CV élégant pour vous démarquer auprès des recruteurs. Fichier PSD inclus.", price: 55000, image: "https://placehold.co/600x400/6f42c1/FFFFFF?text=Template+CV", type: "Template PSD", category: "payant" },
        { id: 4, title: "Tutoriel Vidéo : Inscription Remotask", description: "Fichier vidéo vous guidant pas à pas pour réussir votre inscription et vos premiers tests sur Remotask.", price: 0, image: "https://placehold.co/600x400/17A2B8/FFFFFF?text=Tuto+Remotask", type: "Tuto", category: "gratuit" },
        { id: 5, title: "Outil : Checklist du Freelance", description: "Un document PDF avec la checklist complète pour ne rien oublier avant de commencer une mission.", price: 0, image: "https://placehold.co/600x400/6C757D/FFFFFF?text=Outil+Checklist", type: "Outil", category: "gratuit" },
        { id: 6, title: "Pack de Fichiers : Polices Premium", description: "Un fichier ZIP contenant une sélection de polices de caractères professionnelles pour vos designs.", price: 0, image: "https://placehold.co/600x400/343A40/FFFFFF?text=Pack+Polices", type: "ZIP", category: "gratuit" }
    ];
}

const products = getInitialProducts();

function showDetails(productType, productTitle, category) {
    if (productType === 'Service') {
        window.location.href = 'demande.html';
        return;
    }

    let message = `Détails pour : ${productTitle}.\n\n`;
    if (category === 'payant') {
        message += "Pour obtenir l'accès à ce service ou fichier, veuillez procéder à l'achat en nous contactant. Le mot de passe ou le lien d'accès vous sera envoyé personnellement après paiement.";
    } else {
        message += "Cet article est gratuit. Le lien de téléchargement est généralement direct. Si un mot de passe est requis, il sera indiqué dans la description ou fourni sur demande.";
    }
    alert(message);
}


function renderProducts(filter = 'all') {
    const productCatalog = document.getElementById('product-catalog');
    const freeResourcesList = document.getElementById('free-resources-list');
    const allArticlesList = document.getElementById('articles-list-container');
    const templatesList = document.getElementById('templates-list-container');
    
    let container, productList, displayMode;

    if (productCatalog) {
        container = productCatalog;
        productList = products.filter(p => p.category === 'payant');
        displayMode = 'grid';
    } else if (freeResourcesList) {
        container = freeResourcesList;
        productList = products.filter(p => p.category === 'gratuit');
        if (filter !== 'all') {
            productList = productList.filter(p => p.type === filter);
        }
        displayMode = 'grid';
    } else if (allArticlesList) {
        container = allArticlesList;
        productList = products; // Prend tous les produits
        displayMode = 'list';
    } else if (templatesList) {
        container = templatesList;
        productList = products.filter(p => p.type === 'Template PSD');
        displayMode = 'list';
    }
    else {
        return;
    }

    container.innerHTML = '';
    if (productList.length === 0) {
        container.innerHTML = '<p>Aucun article disponible pour le moment.</p>';
        return;
    }

    productList.forEach(product => {
        let elementHtml = '';
        const priceText = product.price > 0 
            ? `${product.price.toLocaleString('fr-FR')} Ar` 
            : 'Gratuit';
        
        const productTitleEscaped = product.title.replace(/'/g, "\\'").replace(/"/g, "&quot;");
        const productTypeEscaped = product.type.replace(/'/g, "\\'");

        if (displayMode === 'grid') {
            elementHtml = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+non+disponible';">
                    <div class="product-content">
                        <h3>${product.title}</h3>
                        <p>${product.description.substring(0, 100)}...</p>
                        <p class="price">${priceText}</p>
                        <button onclick="showDetails('${productTypeEscaped}', '${productTitleEscaped}', '${product.category}')">Voir plus</button>
                    </div>
                </div>
            `;
        } else if (displayMode === 'list') {
            elementHtml = `
                <div class="article-list-item" onclick="showDetails('${productTypeEscaped}', '${productTitleEscaped}', '${product.category}')" style="cursor: pointer;">
                    <div class="thumbnail">
                        <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/CCCCCC/FFFFFF?text=Image+non+disponible';">
                    </div>
                    <div class="details">
                        <div class="tag">${product.type.toUpperCase()}</div>
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <div class="price">${priceText}</div>
                    </div>
                </div>
            `;
        }
        container.innerHTML += elementHtml;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-catalog') || document.getElementById('free-resources-list') || document.getElementById('articles-list-container') || document.getElementById('templates-list-container')) {
        renderProducts();
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); 
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderProducts(button.dataset.filter);
        });
    });
});
