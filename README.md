# Gestion des Étudiants

application Angular permettant de gérer une liste d’étudiants, avec la possibilité d’ajouter, de modifier et de supprimer des informations. L’application se connecte à une API Node.js/MongoDB pour gérer la persistance des données des étudiants.

## Fonctionnalités

- **Affichage de la liste des étudiants** : Visualisez les noms et âges des étudiants enregistrés.
- **Ajout d’un étudiant** : Ajoutez un nouvel étudiant avec un nom et un âge.
- **Modification des informations d'un étudiant** : Mettez à jour le nom ou l’âge d’un étudiant existant.
- **Suppression d’un étudiant** : Supprimez un étudiant de la liste.

## Prérequis

- **Node.js** et **npm** installés sur votre machine.
- **Angular CLI** pour lancer l'application.
- **Backend Node.js/MongoDB** opérationnel pour gérer les données (non inclus dans ce dépôt).

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/Sidel-malek/angular-exprs-mongo.git
```
### 2. Accéder au dossier du projet
### 3. Installer les dépendances
```bash
npm install
```
### 4. Lancer le serveur de développement : trouver dans dossier /serveur/serveur.js

```bash
ng serve
```

L’application sera disponible dans votre navigateur à l’adresse `http://localhost:4200`.

## API Backend

Pour le bon fonctionnement de cette application, un backend Node.js avec une base de données MongoDB est requis pour gérer les données des étudiants. Assurez-vous que votre API backend est en cours d'exécution sur `http://localhost:3031` avec les routes suivantes :

- **GET** `/etudiants` : Récupérer la liste des étudiants.
- **POST** `/addAUser` : Ajouter un étudiant.
- **DELETE** `/deleteUser/:id` : Supprimer un étudiant par son ID.
- **PUT** `/student/:id` : Mettre à jour un étudiant par son ID.

## Technologies Utilisées

- **Angular** : Framework pour le frontend.
- **Bootstrap** : Pour le style et la mise en page.
- **Material Icons** : Pour les icônes (supprimer, modifier).
- **Node.js** et **MongoDB** : Pour le backend et la base de données (non inclus dans ce dépôt).
