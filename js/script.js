
const onglets = document.querySelectorAll(".onglet");
const panneaux = document.querySelectorAll(".panneau");

onglets.forEach(function(onglet) {

    onglet.addEventListener("click", function() {

        // 1. Désactiver tous les onglets
        onglets.forEach(function(bouton) {
            bouton.classList.remove("actif");
            bouton.setAttribute("aria-selected", "false");
        });

        // 2. Cacher tous les panneaux
        panneaux.forEach(function(panneau) {
            panneau.hidden = true;
        });

        // 3. Activer le bouton cliqué
        onglet.classList.add("actif");
        onglet.setAttribute("aria-selected", "true");

        // 4. Récupérer l'identifiant du panneau
        const cible = onglet.getAttribute("data-cible");

        // 5. Afficher le panneau correspondant
        document.getElementById(cible).hidden = false;

    });

});

const formulaire = document.getElementById("formulaire-resa");

// Numéro WhatsApp du restaurant
const numeroWhatsApp = "22962257379";

formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    // Récupération des informations
    const nom = document.getElementById("nom").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const date = document.getElementById("date").value;
    const heure = document.getElementById("heure").value;
    const personnes = document.getElementById("personnes").value;
    const message = document.getElementById("message").value.trim();

    // Vérification des champs obligatoires
    if (!nom || !telephone || !date || !heure || !personnes) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }

    // Vérification du téléphone
    if (!/^[0-9+\s-]{8,20}$/.test(telephone)) {
        alert("Veuillez entrer un numéro de téléphone valide.");
        return;
    }

    // Vérification de la date
    const dateChoisie = new Date(date + "T00:00:00");
    const maintenant = new Date();

    const aujourdHui = new Date(
        maintenant.getFullYear(),
        maintenant.getMonth(),
        maintenant.getDate()
    );

    if (dateChoisie < aujourdHui) {
        alert("Veuillez choisir une date valide.");
        return;
    }

    // Création du message WhatsApp
    const messageWhatsApp =
        `Bonjour MAÏORA ! Je souhaite réserver une table.

Nom : ${nom}
Téléphone : ${telephone}
Date : ${date}
Heure : ${heure}
Nombre de personnes : ${personnes}
Souhait particulier : ${message || "Aucun"}

Merci de me confirmer la disponibilité.`;

    // Encodage du message
    const lienWhatsApp =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(messageWhatsApp)}`;

    // Ouverture de WhatsApp
    window.open(lienWhatsApp, "_blank");

});
