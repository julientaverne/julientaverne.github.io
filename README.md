# Portfolio de Julien Taverne

Site statique prêt pour GitHub Pages. Aucune installation et aucune compilation ne sont nécessaires.

## Publication

1. Créez un dépôt GitHub, par exemple `julientaverne.github.io`.
2. Décompressez l’archive et déposez **tout son contenu** à la racine du dépôt : les fichiers HTML/CSS/JavaScript, `.nojekyll`, ainsi que le dossier `assets`.
3. Dans **Settings → Pages**, choisissez **Deploy from a branch**, la branche `main` et le dossier `/ (root)`.
4. Après quelques minutes, le site sera accessible à l’adresse indiquée par GitHub.

## Référencement

Le site comprend les métadonnées SEO et sociales, les données structurées `ProfilePage`,
un contenu de secours indexable sans JavaScript, ainsi qu’un fichier `robots.txt`.

Une fois l’adresse publique GitHub Pages connue, ajoutez cette URL absolue :

1. dans une balise `<link rel="canonical" href="URL_PUBLIQUE" />` dans le `<head>` ;
2. dans les propriétés Open Graph `og:url` et `og:image` ;
3. dans un fichier `sitemap.xml`, puis déclarez ce sitemap dans Google Search Console.

N’utilisez pas une URL supposée : l’URL canonique doit être exactement celle qui sera
ouverte par les visiteurs.

## Formulaire de contact

Le formulaire envoie les messages via Formspree avec l’identifiant `xzdnjrza`. Aucun serveur applicatif n’est nécessaire : il fonctionne directement depuis GitHub Pages.

Les contenus détaillés (compétences, missions, entreprises et témoignages) se trouvent dans `profile-data.js`. La structure générale est dans `index.html` et les couleurs principales au début de `styles.css`.
