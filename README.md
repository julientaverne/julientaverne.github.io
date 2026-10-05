# Site professionnel de Julien Taverne

Site statique de conseil IT prêt pour GitHub Pages. Aucune installation et aucune compilation ne sont nécessaires.

Le site présente trois gammes d’offres :

- modernisation des systèmes d’information ;
- compétences et autonomie des équipes IT ;
- pilotage technique des projets et prestataires.

## Publication

1. Créez un dépôt GitHub, par exemple `julientaverne.github.io`.
2. Décompressez l’archive et déposez **tout son contenu** à la racine du dépôt : les fichiers HTML/CSS/JavaScript, `.nojekyll`, ainsi que le dossier `assets`.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.
4. Après quelques minutes, le site sera accessible à l’adresse indiquée par GitHub.

## Référencement

Le site comprend les métadonnées SEO et sociales, les données structurées `ProfilePage`,
un contenu entièrement lisible sans JavaScript, une structure sémantique et un fichier `robots.txt`.

L’URL canonique, les métadonnées Open Graph et le sitemap sont configurés pour
`https://jtaverne.online/`. Le fichier `CNAME` conserve ce domaine personnalisé lors
du déploiement GitHub Pages.

## Formulaire de contact

Le formulaire envoie les messages via Formspree avec l’identifiant `xzdnjrza`. Aucun serveur applicatif n’est nécessaire : il fonctionne directement depuis GitHub Pages.

La structure et les contenus se trouvent dans `index.html`, la direction visuelle dans `styles.css` et les interactions dans `script.js`.
