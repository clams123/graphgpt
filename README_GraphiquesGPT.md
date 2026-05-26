# GraphiquesGPT — V9 styles + comparaison visible

Générateur local de graphiques statiques.

## Lancer le projet

Ouvrir simplement `index.html` dans le navigateur.

## Correctif V9.1.3

- correction de l’ombre Glitter 1 / Glitter 2 : les arrondis du bas de l’ombre restent maintenant corrects ;
- l’ombre reste limitée avant les libellés ;

## Correctif V9.1.2

- suppression complète de l’import/collage CSV ;
- correction Glitter 1 / Glitter 2 : les libellés restent proches des barres ;
- l’ombre portée des barres Glitter est limitée pour ne plus passer sous les libellés ;
- correction du mode comparaison quand B vaut 0.

## Nouveautés V9

Cette version corrige les points remontés après la V8 :

- les palettes automatiques changent maintenant réellement selon le style sélectionné ;
- le mode comparaison est visible dans l’interface ;
- le mode comparaison fonctionne sur tous les types de graphiques via des duos de lignes : A/B, C/D, E/F… ;
- un libellé effacé reste vide, il n’est plus remplacé par `Sans titre` ;
- les exports PNG et SVG sont conservés ;
- Glitter 2 conserve son arrondi inversé validé.

## Styles ajoutés

- Astral RPG
- Cristal éthéré
- Lifestream bleu
- Phénix rubis
- Néant stellaire
- Twitch Pulse
- Stream Overlay
- Onde résonante
- Nocturne royal
- Arcade néon

## Mode comparaison

Dans `Réglages rapides`, active **Mode comparaison A/B**.

Les données sont regroupées par duos :

- ligne 1 / ligne 2 ;
- ligne 3 / ligne 4 ;
- ligne 5 / ligne 6 ;
- etc.

Trois calculs sont disponibles :

- Ratio A/B × 100 ;
- Écart A - B ;
- Évolution % depuis B.


## Correctif V9.1.4

- ajout de 2 nouveaux styles : **Glitter 1 sans ombre** et **Glitter 2 sans ombre** ;
- sur ces deux styles, les graphiques Glitter n’affichent plus l’ombre portée.


## Correctif V9.1.5

- ajout de **Barres arrondies glitter 1 sans ombre** dans le menu `Type de graphique` ;
- ajout de **Barres arrondies glitter 2 sans ombre** dans le menu `Type de graphique` ;
- les styles Glitter sans ombre restent aussi disponibles si présents dans le menu `Style`.
