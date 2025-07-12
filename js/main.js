document.addEventListener('DOMContentLoaded', () => {
    // --- Thème Clair/Sombre ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // --- Compteur de Visiteurs (Supprimé) ---
    // Un vrai compteur de visiteurs nécessite un serveur (backend) ou un service tiers.
    // Le compteur basé sur localStorage n'était pas fiable (comptait par appareil et non par visiteur unique).
    // Il a été remplacé par une métrique marketing statique dans le HTML.
    // Pour un vrai compteur, envisagez des services gratuits comme "GoatCounter" ou "hitcounter.io".

    // --- Formulaire de Contact ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('form-feedback');
            feedback.textContent = `Merci, ${document.getElementById('contact-name').value}! Votre message a été envoyé (simulation).`;
            feedback.style.color = 'green';
            contactForm.reset();
            setTimeout(() => feedback.textContent = '', 4000);
        });
    }

    // --- Active Nav Link ---
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('nav ul a');
    navLinks.forEach(link => {
        if(link.getAttribute('href') === currentPage){
            link.classList.add('active');
        }
    });
});
