# Élan, l'appli iPhone

Une webapp installable : icône sur l'écran d'accueil, plein écran, fonctionne hors-ligne.
Tes données restent sur l'iPhone (dans l'appli). Pour les copier depuis ou vers la version claude.ai, va dans Suivi, puis « Transférer mes données ».

## Mettre en ligne avec GitHub Pages (une seule fois)

1. Sur GitHub, crée un dépôt **public** nommé `elan`. GitHub Pages est gratuit pour les dépôts publics. Le dépôt ne contient que le code, jamais tes données.
2. Mets tous les fichiers de ce dossier à la racine du dépôt, puis commit et push :
   ```
   git init
   git add .
   git commit -m "Élan"
   git branch -M main
   git remote add origin https://github.com/Lampadwair/elan.git
   git push -u origin main
   ```
3. Sur GitHub, ouvre **Settings → Pages**. Dans « Build and deployment », choisis **Deploy from a branch**, puis `main` et `/ (root)`, puis Save.
4. Une à deux minutes plus tard, l'appli est disponible sur `https://lampadwair.github.io/elan/`.

## L'installer sur l'iPhone

1. Ouvre `https://lampadwair.github.io/elan/` dans **Safari**.
2. Touche **Partager**, puis **Sur l'écran d'accueil**, puis Ajouter.
3. Lance-la depuis l'icône Élan : elle s'ouvre en plein écran, comme une appli.

Sur PC, avec Chrome ou Edge, tu peux aussi l'installer depuis l'icône « Installer » de la barre d'adresse.

## Mettre à jour

Remplace les fichiers et fais un push. L'appli prend la nouvelle version à la prochaine ouverture avec du réseau. Si tu modifies les icônes, change aussi `VERSION` dans `sw.js`.

## Ce qui ne marche que dans la version claude.ai

- La synchronisation automatique entre PC et iPhone.
- L'import de recettes par Claude (captures d'écran Jow ou texte collé). Ici, tu saisis les recettes à la main.
