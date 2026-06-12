# Rapport de verification

Derniere verification : 2026-06-09

## Points controles

- Verification syntaxique de `script.js` avec Node.js.
- Migration des anciennes sauvegardes `glitterBar2` et `glitterBar2NoShadow` vers les styles actuels.
- Desactivation de l'export PNG quand les animations SVG sont actives.
- Generation centralisee des menus depuis les constantes JavaScript.
- Formats export : 16:9, carre, vertical 4:5 et vertical 9:16.
- Modes de transparence : fond normal, fond transparent, graphique flottant.
- Prefixage des IDs SVG pour reduire les collisions en cas d'integration de plusieurs SVG dans un meme document.

## Points a surveiller

- Les animations SVG restent natives au SVG. Le PNG reste volontairement statique.
- Les animations SVG sont adaptees au navigateur. Pour Premiere ou After Effects, utiliser l'export `Adobe MOV`, qui produit une video QuickTime Animation avec alpha via FFmpeg WebAssembly.
- `Export Adobe MOV` utilise FFmpeg WebAssembly single-thread depuis `vendor/ffmpeg/` pour rester compatible avec GitHub Pages sans Worker cross-origin.
- Le mode `Graphique flottant` retire les fonds et panneaux, mais conserve les axes, grilles, textes et barres selon les options activees.
- Les tests visuels doivent etre refaits apres chaque modification des renderers de graphiques.

## Verification rapide conseillee

1. Ouvrir `index.html`.
2. Tester un graphique vertical, horizontal et lineaire.
3. Activer `Animations` et verifier que le bouton PNG devient indisponible.
4. Tester les trois modes `Transparence`.
5. Exporter deux SVG et verifier que leurs IDs internes ne sont pas identiques.
