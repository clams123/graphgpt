# Rapport de vérification — GraphiquesGPT V9

Date : 2026-05-26

## Demande traitée

Correction de la V8 après retour utilisateur :

- les thèmes ne modifiaient pas réellement la palette automatique ;
- le mode comparaison n’était pas visible ;
- les libellés vides ne devaient pas être remplacés par `Sans titre`.

## Corrections réalisées

### Correctif V9.1.3

- Correction de l’ombre Glitter 1 / Glitter 2 : les arrondis inférieurs de l’ombre ne sont plus cassés.
- L’ombre utilise maintenant une forme dédiée au lieu d’une découpe rectangulaire, ce qui conserve les coins arrondis en bas.


### Correctif V9.1.2

- Suppression complète de l’interface et de la logique d’import/collage CSV.
- Correction Glitter 1 / Glitter 2 : les libellés ne sont plus descendus exagérément quand il y a peu de lignes.
- L’ombre portée est maintenant limitée avant la zone des libellés, ce qui évite le chevauchement sans créer un grand vide.
- Correction des cas de comparaison avec division par zéro.


### 1. Palette automatique réellement dépendante du style

Ajout de palettes par thème via `THEME_PALETTES`.

La fonction `getRowColor()` utilise maintenant :

- la palette du thème actif en mode `Palette automatique` ;
- `--accent` et `--accent2` en mode `Couleur principale` ;
- les couleurs saisies dans les lignes en mode `Couleurs des lignes`.

### 2. 10 styles ajoutés

Ajout de 10 styles dans :

- `THEMES` ;
- le menu `Style` de `index.html` ;
- les classes CSS `.theme-*` ;
- les fonds SVG via `backgroundMarkup()`.

### 3. Mode comparaison visible

Ajout dans l’interface :

- case `Mode comparaison A/B` ;
- menu `Calcul comparaison`.

Le mode comparaison est intégré à `getRows()`, donc il s’applique à tous les types de graphiques.

### 4. Libellés vides conservés

`normalizeRow()` ne remplace plus un libellé vide par `Sans titre`.

## Vérifications techniques

- `node --check script.js` : OK.
- `glitterBar2` conservé.
- Export PNG conservé.
- Export SVG conservé.
- Aucun fichier externe ajouté.

## Fichiers inclus

- `index.html`
- `style.css`
- `script.js`
- `README_GraphiquesGPT.md`
- `RAPPORT_VERIFICATION.md`


## Correctif V9.1.4

- Ajout de deux nouveaux thèmes dans le menu `Style` : `Glitter 1 sans ombre` et `Glitter 2 sans ombre`.
- Les graphiques `glitterBar` et `glitterBar2` désactivent automatiquement l’ombre portée quand l’un de ces deux styles est utilisé.
- Les palettes automatiques dédiées ont été ajoutées côté `THEME_PALETTES`.


## Correctif V9.1.5

- Ajout des variantes `glitterBarNoShadow` et `glitterBar2NoShadow` dans `CHART_TYPES`.
- Ajout des libellés dans `TYPE_LABELS`.
- Ajout des options correspondantes dans le menu `Type de graphique` de `index.html`.
- Le rendu appelle `renderGlitterBar(..., forceNoShadow=true)` pour supprimer l’ombre uniquement sur ces deux variantes.
