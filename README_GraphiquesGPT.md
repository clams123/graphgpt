# GraphiquesGPT

Generateur local de graphiques SVG/PNG avec themes, modeles, arrondis personnalises et animation SVG optionnelle.

## Utilisation

Ouvrir `index.html` dans un navigateur.

L'application fonctionne en local et sauvegarde l'etat dans `localStorage`.

Pour utiliser `Export Adobe MOV`, ouvrir l'application en HTTPS, par exemple via GitHub Pages. Le statut en haut doit afficher `Adobe : pret`.

En ouverture directe `file://`, l'export video est bloque par le navigateur. `Lancer_GraphiquesGPT_Adobe.bat` reste disponible uniquement comme fallback local.

## Exports

- `Copier SVG` copie le SVG courant dans le presse-papiers quand le navigateur l'autorise.
- `Exporter SVG` telecharge le SVG courant.
- `Exporter PNG` telecharge une image PNG statique.
- `Export Adobe MOV` telecharge une video `.mov` avec alpha, encodee localement via FFmpeg WebAssembly.
- Quand les animations sont activees, l'export PNG est desactive car il ne peut pas conserver l'animation.

## Formats

- `16:9` : 1600 x 900.
- `Carre` : 1200 x 1200.
- `Vertical 4:5` : 1080 x 1350.
- `Vertical 9:16` : 1080 x 1920.

## Adobe Premiere / After Effects

Les animations SVG actuelles sont des animations web integrees au SVG. Elles sont fiables dans un navigateur, mais ne doivent pas etre considerees comme un format d'animation video fiable pour Premiere ou After Effects.

Pour un flux Adobe propre, l'export a privilegier est le `.mov` avec alpha genere par `Export Adobe MOV`. Le SVG reste utile comme source vectorielle statique.

Le bouton `Export Adobe MOV` est volontairement separe : il genere les frames localement, charge FFmpeg WebAssembly single-thread depuis `vendor/ffmpeg/`, puis encode une video QuickTime Animation (`qtrle`) avec canal alpha.

Aucune frame n'est envoyee sur Internet. Les fichiers FFmpeg doivent etre presents dans le repo, notamment `vendor/ffmpeg/core/ffmpeg-core.wasm`.

Ce mode est plus lent que la version FFmpeg multi-thread, mais il est compatible avec un hebergement statique comme GitHub Pages.

## Transparence

Le menu `Transparence` propose trois modes :

- `Fond normal` : export complet avec fond.
- `Fond transparent` : retire le fond global, mais garde les panneaux et elements du graphique.
- `Graphique flottant` : retire le fond global et les panneaux de trace pour faciliter l'integration dans un montage.

## Arrondis

Les graphiques a barres peuvent utiliser :

- arrondis simples ;
- forme glitter horizontale ;
- arrondis par angle avec valeurs de `-50%` a `150%` ;
- presets d'arrondis, dont `Standard 0%`, `Pilule` et formes chaotiques.

Les valeurs negatives creusent le coin vers l'interieur pour obtenir des formes asymetriques.

## Notes techniques

- Les listes de types, themes, formats, polices et presets sont generees depuis `script.js`.
- Les IDs internes du SVG sont prefixes a chaque rendu pour limiter les collisions quand plusieurs SVG sont integres dans un meme document.
- Les anciens graphes sauvegardes avec `glitterBar2` ou `glitterBar2NoShadow` sont migres vers les styles actuels.
