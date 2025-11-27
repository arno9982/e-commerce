// Sélectionne toutes les cartes du blog
const blogCards = document.querySelectorAll('.blog-card');

// Fonction d'apparition au scroll
function showCardsOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  blogCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.classList.add('visible');
    }
  });
}

// Événement au scroll
window.addEventListener('scroll', showCardsOnScroll);

// Appel initial
showCardsOnScroll();



//Récuperation 
const modal=document.getElementById("blog-modal");
const modalTitle=document.querySelector(".blog-title");
const modalContent=document.querySelector(".blog-content");
const blogImages=document.querySelectorAll(".blog-image");
const modalClose=document.querySelector(".modal-close");


//Ouvrir le modal au clic sur une carte de blog
document.querySelectorAll(".blog-card").forEach(card=>{
    card.addEventListener("click", function(){
modalTitle.textContent=card.dataset.title;

modalContent.textContent=card.dataset.content;

modal.style.display="flex";
    });

});
//Fermer le modal en cliquant sur la croix
modalClose.addEventListener("click", function(){
    modal.style.display="none";
});
//Fermer le modal en cliquant en dehors du contenu
modalClose.addEventListener("click", function(e){
    if(e.target===modal){
        modal.style.display="none";
    };
});
