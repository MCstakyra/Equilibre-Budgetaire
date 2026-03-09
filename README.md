# Equilibre-Budgetaire
Application web minimaliste et hors-ligne pour gérer son budget, catégoriser ses dépenses (Essentiel / Plaisir) et se constituer une épargne globale mois après mois.
# Mon Budget Équilibre

Une application web simple et minimaliste pour gérer son budget mensuel, classer ses dépenses et se constituer une épargne sans stress. Tout fonctionne dans le navigateur, sans installation ni base de données complexe.

## Fonctionnalités principales

* **Gestion du Budget Mensuel :** Définissez votre budget de départ et ajoutez de l'argent en cours de mois si besoin.
* **Catégorisation Intelligente :** Classez vos opérations en trois catégories claires :
  * **Essentiel :** Loyer, factures, courses.
  * **Plaisir :** Sorties, restaurants, shopping.
  * **Économie :** Argent mis de côté ce mois-ci.
* **Calcul Automatique :** Le "Reste à vivre" se calcule en temps réel à chaque nouvelle dépense.
* **Épargne Globale Cumulée :** Clôturez le mois pour transférer automatiquement votre reste à vivre vers une cagnotte d'épargne globale.
* **Mode "Coup dur" :** Piochez directement dans votre épargne globale pour renflouer votre mois en cours.
* **Sauvegarde Locale :** Vos données sont automatiquement sauvegardées dans la mémoire de votre navigateur (LocalStorage). Rien ne se perd si vous fermez la page.

## Comment utiliser l'application

1. Téléchargez ou copiez le fichier `budget.html`.
2. Double-cliquez sur le fichier pour l'ouvrir dans n'importe quel navigateur web (Chrome, Firefox, Safari, Edge...).
3. Commencez à gérer votre budget !

## Guide d'utilisation rapide

1. **Début de mois :** Entrez votre salaire ou budget dans la case "Budget de ce mois-ci" et cliquez sur **Définir**.
2. **Au quotidien :** Ajoutez vos opérations (ex: "Restaurant", "40", "Plaisir") et cliquez sur **Ajouter**.
3. **Imprévu positif :** Vous recevez de l'argent ? Tapez le montant et cliquez sur **+ Ajouter**.
4. **Imprévu négatif :** Besoin d'argent ? Utilisez le bouton **Piocher** dans le bloc de l'Épargne Globale.
5. **Fin de mois :** Cliquez sur le bouton violet **Clôturer le mois** en bas de page pour sécuriser vos économies et repartir à zéro.

## Technologies utilisées

* HTML5
* CSS3 (Variables natives, Flexbox, Grid)
* Vanilla JavaScript (ES6)
