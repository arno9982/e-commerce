// Attend que tout le contenu HTML soit chargé
document.addEventListener("DOMContentLoaded", function() {

    // =======================================================
    // 0. SÉLECTION DES ÉLÉMENTS CLÉS
    // =======================================================
    const mainHeader = document.getElementById('main-header');
    const btnOpenDrawer = document.getElementById('btn-open-drawer');
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const btnSearchTrigger = document.querySelector('.btn-search-trigger.mobile-only');
    const btnCloseSearch = document.querySelector('.btn-close-search');
    const searchOverlay = document.getElementById('search-overlay');
    // Cibles pour l'effet magnétique : Logo, Panier, Utilisateur, Thème, Loupe Mobile
    const magneticTargets = document.querySelectorAll('.btn-magnetic'); 
    const promoBar = document.getElementById('promo-bar');
    const btnThemeToggle = document.querySelector('#primary-header .btn-theme-toggle');
    const themeIcon = btnThemeToggle ? btnThemeToggle.querySelector('i') : null;
    
    let lastScrollTop = 0; 
    const currentPage = mainHeader ? mainHeader.getAttribute('data-page-type') : 'home';


    // =======================================================
    // 1. GESTION DARK MODE "LIQUIDE" & TRANSITION D'ICÔNE (Soleil/Lune)
    // =======================================================
    function updateThemeIcon(isDark) {
        // Cible tous les boutons de thème (Header Desktop + Drawer Mobile)
        const themeToggles = document.querySelectorAll('.btn-theme-toggle i.fas');
        
        themeToggles.forEach(icon => {
            if (isDark) {
                // Changement vers la Lune
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                // Changement vers le Soleil
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }

    if (btnThemeToggle) {
        btnThemeToggle.addEventListener('click', toggleDarkMode);
        // Le bouton dans le drawer est aussi écouté implicitement ici
    }
    
    // Charger le thème au démarrage
    const isDarkInitial = localStorage.getItem('theme') === 'dark';
    if (isDarkInitial) {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon(isDarkInitial);
    
    // =======================================================
    // 2. STICKY HEADER INTELLIGENT (Cacher au scroll vers le bas)
    // =======================================================
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Active la classe 'is-scrolled' pour le Glassmorphism/ombre après avoir passé la barre de promo
            if (currentScroll > (promoBar ? promoBar.offsetHeight : 50)) {
                mainHeader.classList.add('is-scrolled');
            } else {
                mainHeader.classList.remove('is-scrolled');
            }

            // Sticky Intelligent (Cacher en descendant, Montrer en remontant)
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                // Scroll vers le bas : on cache le header
                mainHeader.style.transform = 'translateY(-100%)';
            } else {
                // Scroll vers le haut : on montre le header
                mainHeader.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });
    }


    // =======================================================
    // 3. MENU MOBILE DRAWER (Morphing Burger + Stagger)
    // =======================================================
    function openMenu() {
        if (mobileMenuDrawer) mobileMenuDrawer.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        if (btnOpenDrawer) btnOpenDrawer.classList.add('is-open'); // Classe pour le Morphing
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        if (mobileMenuDrawer) mobileMenuDrawer.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        if (btnOpenDrawer) btnOpenDrawer.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    if (btnOpenDrawer) btnOpenDrawer.addEventListener('click', openMenu);
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeMenu);
    if (mobileMenuOverlay) mobileMenuOverlay.addEventListener('click', closeMenu);

    
    // =======================================================
    // 4. RECHERCHE CINÉMATIQUE (Overlay Plein Écran)
    // =======================================================
    function openSearch() {
        if (searchOverlay) searchOverlay.classList.add('is-open');
        const searchInput = searchOverlay.querySelector('input');
        if(searchInput) searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        if (searchOverlay) searchOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Le déclencheur est la Loupe sur Mobile, mais on pourrait aussi l'utiliser sur Desktop
    if (btnSearchTrigger) btnSearchTrigger.addEventListener('click', openSearch); 
    if (btnCloseSearch) btnCloseSearch.addEventListener('click', closeSearch);
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('is-open')) {
            closeSearch();
        }
    });


    // =======================================================
    // 5. EFFET MAGNÉTIQUE (Appliqué uniformément sur .btn-magnetic)
    // =======================================================
    function handleMagneticEffect(event) {
        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        
        const strength = 0.1; // Facteur de déplacement (déplace max 10% de la distance)
        
        const x = deltaX * strength;
        const y = deltaY * strength;

        btn.style.transform = `translate(${x}px, ${y}px)`;
    }

    function resetMagneticEffect(event) {
        event.currentTarget.style.transform = 'translate(0, 0)';
    }

    magneticTargets.forEach(btn => {
        btn.addEventListener('mousemove', handleMagneticEffect);
        btn.addEventListener('mouseleave', resetMagneticEffect);
    });
    
    // =======================================================
    // 6. ANIMATION PROMO BAR (Contrôles Précédent/Suivant)
    // =======================================================
    const promoContent = document.querySelector('.promo-content');
    const promoPrev = document.querySelector('.promo-prev');
    const promoNext = document.querySelector('.promo-next');
    
    if (promoContent) {
        // Gestion des contrôles utilisateurs pour le Marquee
        function controlMarquee(action) {
            if (action === 'pause') {
                promoContent.style.animationPlayState = 'paused';
            } else if (action === 'play') {
                 promoContent.style.animationPlayState = 'running';
            }
        }
        
        if (promoPrev) promoPrev.addEventListener('click', () => {
            controlMarquee('pause');
            setTimeout(() => controlMarquee('play'), 1000);
        });

        if (promoNext) promoNext.addEventListener('click', () => {
            controlMarquee('pause');
            setTimeout(() => controlMarquee('play'), 1000);
        });
    }

    // ... (Votre code Intersection Observer existant pour les sections va ici) ...

});