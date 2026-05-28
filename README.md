# 🎓 MboloProf - Connexion Éducative au Gabon

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**MboloProf** est une plateforme Fullstack moderne de mise en relation entre professeurs et élèves, spécialement optimisée pour le Gabon. Elle offre une expérience fluide, sécurisée et performante pour la gestion du soutien scolaire.

---

## Fonctionnalités Clés

- **Recherche Intelligente** : Filtres multicritères par Matière, Ville et Province du Gabon.
- **Espace Professeur** : Dashboard complet pour gérer ses annonces et visualiser ses performances.
- **Sécurité avancée** : Authentification via JWT (HttpOnly Cookies) et Middleware de protection des routes.
- **Interface Mobile-First** : Expérience utilisateur premium adaptée à tous les supports.
- **Optimisation SEO** : Routes dynamiques et rendu côté serveur pour une visibilité maximale.

---

## Stack Technologique & Architecture

### Frontend (User Interface)
- **Next.js 15 (App Router)** : Utilisation des Server Components pour la performance et du Client Components pour l'interactivité.
- **Material UI (MUI) v7** : Bibliothèque de composants pour une interface structurée et élégante.
- **Tailwind CSS 4.0** : Pour un styling utilitaire ultra-flexible et des micro-animations fluides.
- **Context API** : Gestion globale de l'état d'authentification utilisateur.

### Backend (Infrastructure)
- **Next.js API Routes** : Architecture Serverless permettant des temps de réponse rapides.
- **MongoDB & Mongoose** : Base de données NoSQL pour une flexibilité totale des schémas (Annonces, Utilisateurs, Matières).
- **Jose (JWT)** : Gestion sécurisée des sessions utilisateur sans session côté serveur (Stateless).

### Sécurité (Cybersecurity)
- **Bcrypt.js** : Hachage sécurisé des mots de passe.
- **Middleware Global** : Interception des requêtes pour vérifier l'autorisation d'accès aux zones sensibles (/dashboard, /publish).
- **Validation MongoDB** : Schémas rigides garantissant l'intégrité des données (Unique indexes, Enums).


## Installation Locale

Suivez ces étapes pour lancer le projet sur votre machine :

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/votre-compte/mboloprof.git
   cd mboloprof
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   - Créez un fichier `.env.local` à la racine (ne pas le commiter).
   - Inspirez-vous du fichier `.env.example`.
   ```env
   MONGODB_URI=votre_uri_mongodb
   JWT_SECRET=votre_secret_securise
   ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

---

## Structure du Projet

```text
/app        - Routes et pages Next.js
/api        - Routes de l'API backend
/models     - Schémas Mongoose
/services   - Logique d'appel API côté client
/context    - Contextes React (Authentification)
/lib        - Utilitaires partagés (DB, Helpers)
/public     - Images et assets statiques
```

## Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](./LICENSE) pour plus de détails.

---

*Développé avec coeur pour l'éducation au Gabon.*
