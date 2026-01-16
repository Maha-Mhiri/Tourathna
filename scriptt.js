// LISTE DES ARTISANS
let artisans = [
    {
        nom: "AHMAD SLAMA",
        tel: "22 123 456",
        mail: "poterieslama@gmail.com",
        image: "images/ahmed.jpg",
        localisation: "Nabeul",
        articles: [
            { nom: "Assiette", reference: "A001", prix: "20 ", description: "Assiette plate HANDMADE", image: "images/assiette.jpg" },
			{ nom: "Boc", reference: "B011", prix: "10 ", description: "Boc original ", image: "images/boc.jpg" },
			{ nom: "Tajine", reference: "T501", prix: "50 ", description: "Tajine grand format", image: "images/tajine.jpg" }

        ]
    },
    {
        nom: "Nadia Essid",
        tel: "29 002 778",
        mail: "madelcuir@gmail.com",
        image: "images/nadia.png",
        localisation: "Mareth,Gabes",
        articles: [
            { nom: "Sac à main", reference: "S004", prix: "150 ", description: "Sac en vrai cuir", image: "images/sac.jpg" },
        ]
    },
    {
        nom: "Dorsaf Medelgi",
        tel: "27 365 779",
        mail: "atelierdoudou@gmail.com",
        image: "images/doudou.jpg",
        localisation: "Tunis",
        articles: [
            { nom: "Coussin ", reference: "C011", prix: " 40 ", description: "Coussin coloré avec pompon", image: "images/coussin.jpg" }
        ]
    }
	,
    {
        nom: "El Khomsa",
        tel: "54 659 326",
        mail: "contact@elkhomssa.com",
        image: "images/khomsa.jpg",
        localisation: "Ben Arous",
        articles: [
            { nom: "Manchette traditionnelle ", reference: "M011", prix: " 24 ", description: "Manchette Traditionnelle en cuivre trempé dans l’or ou l’argent.", image: "images/manchette.jpg" },
			{ nom: "Collier JANA ", reference: "C009", prix: "65 ", description: "collier court en cuivre trempé dans l’or avec des pièces de mahboub de deux tailles différentes et perles de culture artificielles", image: "images/collier.jpg" },
        ]
    },
    {
        nom: "Karim Balleh",
        tel: "28 885 805",
        mail: "karimballeh@gmail.com",
        image: "images/karim.jpg",
        localisation: "Rue el Kasbah ,Tunis Medina",
        articles: [
            { nom: "Seau de bain ", reference: "C011", prix: " 110 ", description: "Seau de bain traditionnel", image: "images/seau.jpg" }
        ]
    }
];

let artisanListDiv = document.getElementById("artisanList");
let artisanSelect = document.getElementById("artisanSelect");
let artisanCommandeSelect = document.getElementById("artisanCommandeSelect");
let articleRefSelect = document.getElementById("articleRefSelect");
let articleArtisanSelect = document.getElementById("articleArtisanSelect");
let articlesDiv = document.getElementById("articlesParArtisan");
let searchResult = document.getElementById("searchResult");


// AFFICHAGE DES ARTISANS + selects
function afficherArtisans() {
    artisanListDiv.innerHTML = "";
    artisanSelect.innerHTML = "";
    artisanCommandeSelect.innerHTML = "";
    articleArtisanSelect.innerHTML = "";

    artisans.forEach((a,i) => {
        artisanListDiv.innerHTML += `
            <div class="card">
                <img src="${a.image}">
                <h3>${a.nom}</h3>
                <p><strong>Localisation:</strong> ${a.localisation}</p>
                <p><strong>TEL:</strong> ${a.tel}</p>
                <p><strong>Mail:</strong> ${a.mail}</p>
            </div>
        `;

        artisanSelect.innerHTML += `<option value="${i}">${a.nom}</option>`;
        artisanCommandeSelect.innerHTML += `<option value="${i}">${a.nom}</option>`;
        articleArtisanSelect.innerHTML += `<option value="${i}">${a.nom}</option>`;
    });

    afficherArticlesParArtisan();
    mettreAJourListeArticlesCommande();
}

afficherArtisans();

// Formulaire Contact Artisan 
const contactForm = document.getElementById("contactForm");
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    document.getElementById("msg").innerText =
        "Votre message a été envoyé avec succès à l’artisan sélectionné !";
		contactForm.reset();
});


// AJOUTER ARTICLE AVEC IMAGE-
document.getElementById("addArticleForm").addEventListener("submit", function(e){
    e.preventDefault();

    let nom = document.getElementById("titreArticle").value;
    let ref = document.getElementById("refArticle").value;
    let prix = document.getElementById("prixArticle").value;
    let desc = document.getElementById("descArticle").value;
    let index = articleArtisanSelect.value;

    let file = document.getElementById("imgArticle").files[0];
    let imgURL = file ? URL.createObjectURL(file) : "default.png";

    artisans[index].articles.push({
        nom,
        reference: ref,
        prix,
        description: desc,
        image: imgURL
    });

    afficherArticlesParArtisan();
    mettreAJourListeArticlesCommande();

    // Afficher le message dans un div séparé
	const messageDiv = document.getElementById("joinResponse");
	messageDiv.innerText = "Votre article a été publié avec succès !";
	this.reset();
});


// AFFICHER ARTICLES AVEC PHOTO
function afficherArticlesParArtisan() {
    articlesDiv.innerHTML = "";

    artisans.forEach(a => {
        if(a.articles.length){
            let articlesHTML = a.articles.map(ar => `
                <div class="card">
                    <img src="${ar.image}" class="article-img">
                    <h4>${ar.nom}</h4>
                    <p><strong>Réf:</strong> ${ar.reference}</p>
                    <p><strong>Prix:</strong> ${ar.prix}DT</p>
                    <p>${ar.description}</p>
                </div>
            `).join("");

            articlesDiv.innerHTML += `
                <h3>${a.nom} - Articles publiés</h3>
                <div class="grid">${articlesHTML}</div>
            `;
        }
    });
}

// RECHERCHE ARTISAN AVEC AFFICHAGE DÉTAILLÉ
function chercherArtisan() {
    let q = document.getElementById("searchInput").value.toLowerCase();
    searchResult.innerHTML = "";

    let artisan = artisans.find(a => a.nom.toLowerCase().includes(q));

    if(!artisan){
        searchResult.innerHTML = "<p style='color:red'>Aucun artisan trouvé!</p>";
		document.getElementById("searchInput").value = "";
        return;
    }

    let articlesHTML = artisan.articles.map(ar => `
        <div class="card">
            <img src="${ar.image}" class="article-img">
            <h4>${ar.nom}</h4>
            <p><strong>Réf:</strong> ${ar.reference}</p>
            <p><strong>Prix:</strong> ${ar.prix}</p>
        </div>
    `).join("");

    searchResult.innerHTML = `
        <div class="card">
            <img src="${artisan.image}" style="height:200px;">
            <h3>${artisan.nom}</h3>
            <p><strong>Localisation:</strong> ${artisan.localisation}</p>
            <p><strong>TEL:</strong> ${artisan.tel}</p>
            <p><strong>Email:</strong> ${artisan.mail}</p>
        </div>
        <h3>Articles :</h3>
        <div class="grid">${articlesHTML}</div>
    `;
	document.getElementById("searchInput").value = "";
}

// METTRE A JOUR LISTE ARTICLES POUR COMMANDE
function mettreAJourListeArticlesCommande() {
    let i = artisanCommandeSelect.value;
    articleRefSelect.innerHTML = "";

    artisans[i].articles.forEach(ar => {
        articleRefSelect.innerHTML += `<option value="${ar.reference}">${ar.reference} - ${ar.nom}</option>`;
    });
}

artisanCommandeSelect.addEventListener("change", mettreAJourListeArticlesCommande);

// COMMANDER ARTICLE
function commanderArticle() {
    let artIndex = artisanCommandeSelect.value;
    let ref = articleRefSelect.value;
    let qty = document.getElementById("articleQty").value;

    let a = artisans[artIndex];
    let article = a.articles.find(ar => ar.reference === ref);
	let total = article.prix * qty;
    document.getElementById("commandeMsg").innerHTML =
        `Votre commande : <strong>${qty}</strong> x <strong>${article.nom}</strong> chez <strong>${a.nom}</strong> a été envoyée et le Total = <strong>${total} DT</strong>! `;
	form.reset();
}

// VIDEOS
let videos = [
    { titre: "Formation 1 - Tissage", url: "vidéos/tissage.mp4" },
    { titre: "Formation 2 - Bijoux en pierre et en verre", url: "vidéos/bijoux.mp4" },
    { titre: "Formation 3 - Poterie traditionnelle", url: "vidéos/poterie.mp4" },
    { titre: "Formation 4 - Tourner un pichet", url: "vidéos/potterie.mp4" },
    { titre: "Formation 5 - Cuivre", url: "vidéos/cuivre.mp4" },
    { titre: "Formation 6 - Tailleur de pierres", url: "vidéos/tailleur.mp4" }
];

function afficherVideos() {
    let gallery = document.getElementById("videoGallery");
    gallery.innerHTML = "";
    videos.forEach(v => {
        gallery.innerHTML += `
            <div class="video-card">
                <h3>${v.titre}</h3>
                <video controls>
                    <source src="${v.url}" type="video/mp4">
                </video>
            </div>
        `;
    });
}

afficherVideos();
const joinForm = document.getElementById("joinForm");

if(joinForm){
    joinForm.addEventListener("submit", function(e){
        e.preventDefault();

        document.getElementById("joinResponse1").innerText = 
            "Votre demande a été envoyée avec succès à TOURATHNA !";
        joinForm.reset();
    });
}