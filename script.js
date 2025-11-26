// Attend que tout le contenu HTML soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function() {
    
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null, // Utilise le viewport (la fenêtre du navigateur) comme zone d'observation
        rootMargin: "0px",
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    };

    // La fonction qui sera appelée quand un élément observé entre ou sort de la vue
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Si l'élément est en train d'entrer dans la vue
            if (entry.isIntersecting) {
                // On ajoute la classe "is-visible" pour déclencher l'animation CSS
                entry.target.classList.add("is-visible");
                
                // On cesse d'observer cet élément (l'animation ne se joue qu'une fois)
                observer.unobserve(entry.target);
            }
        });
    };

    // On crée l'observateur
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // On cible TOUTES les sections qu'on veut animer
    // On va leur ajouter la classe de "départ" (reveal-on-scroll)
    // et ensuite on demande à l'observer de les surveiller.
    const sectionsToReveal = document.querySelectorAll(
        '.about-section, .testimonial-section, .why-us-section, .page-title-section'
    );
    
    sectionsToReveal.forEach(section => {
        section.classList.add('reveal-on-scroll'); // Ajoute la classe CSS de "départ"
        observer.observe(section); // Demande à l'observer de surveiller cet élément
    });

});




// ajout


// Fonction principale pour basculer le thème
    const toggleTheme = () => {
        // 1. Basculer la classe 'dark-mode' sur le body
        const isDarkMode = body.classList.toggle('dark-mode'); 

        // 2. Mettre à jour l'icône (Soleil si clair, Lune si sombre)
        if (themeIcon) {
            themeIcon.querySelector('path').setAttribute('d', isDarkMode ? moonIconPath : sunIconPath);
        }

        // 3. Stocker la préférence de l'utilisateur
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

    // 4. Appliquer le thème au chargement de la page
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        // Si le thème sombre est stocké, on l'applique
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.querySelector('path').setAttribute('d', moonIconPath);
        }
    } 
    // Si 'light' est stocké ou s'il n'y a rien, le mode clair par défaut s'applique

    // 5. Attacher l'écouteur d'événement au bouton
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
