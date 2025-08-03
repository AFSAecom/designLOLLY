# Projet Lolly – README pour TempoAI

## 🎯 Objectif
Développer une application web responsive pour la marque Lolly, intégrant :
- Vente directe et par réseau de conseillères
- Système de parrainage multi-niveaux
- Commissions automatisées
- Suivi d’activité, notifications, et bonus anniversaire
- Back-office complet pour l’administrateur

## 🛠️ Technologies attendues
- **Frontend** : React (mobile-first)
- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **Connexion externe** : Facebook, WhatsApp (V2)
- **IA (V2)** : moteur de recommandation + scoring réseau

## 📁 Fichiers fournis
- `cahier_des_charge_Lolly_version2.docx` : Spécifications détaillées
- `Lolly_Diagramme_Relationnel_2025-07-31_version4_complet.pdf` : Relations entre tables
- `schema_Lolly_2025-07-31_version4.sql` : Script SQL (création de base)
- `seed_Lolly_2025-07-31_version6.sql` : Données de test complètes
- `README_TempoAI.md` : Ce fichier

## ✅ Instructions de démarrage

### 1. Créer un projet Supabase vide
- Aller sur https://supabase.com/dashboard
- Créer un nouveau projet `LollyApp`
- Copier le mot de passe de la base PostgreSQL

### 2. Exécuter les scripts SQL dans l'ordre
- Aller dans l’onglet **SQL Editor**
- Exécuter le fichier `schema_Lolly_2025-07-31_version4.sql`
- Puis exécuter le fichier `seed_Lolly_2025-07-31_version6.sql`

### 3. Ajouter l'utilisateur d'authentification
- Après l'import du fichier `seed.sql`, exécuter `npx ts-node scripts/seedAuthUsers.ts`
  (nécessite la variable d'environnement `SUPABASE_SERVICE_ROLE_KEY`).
- L'utilisateur `client@lolly.tn` sera créé dans `auth.users` et répliqué dans la table `users`.

### 4. Vérifications à faire :
- 6 niveaux Lolly
- 6 utilisateurs (3 clients, 2 conseillères, 1 admin)
- 6 parfums + variantes
- 3 commandes + items
- 1 promotion reliée à 1 produit
- 3 commissions multi-niveaux
- 1 notification de bienvenue

### 5. Frontend
- Construire une application React (mobile-first)
- Respecter la charte graphique :
  - Couleurs : #CE8F8A, #FBF0E9, #805050, #D4C2A1, #AD9C92
  - Polices : Playfair Display (titres), Montserrat (contenu)


## 🎨 Charte graphique Lolly

- **Couleurs principales :**
  - Couleur principale : `#CE8F8A`
  - Fond doux / secondaire : `#FBF0E9`
  - Couleur de contraste : `#805050`
  - Beige doré / déco : `#D4C2A1`
  - Gris rosé élégant : `#AD9C92`

- **Polices typographiques :**
  - Titres : Playfair Display
  - Paragraphes : Montserrat

- **Design attendu :**
  - Mobile-first (smartphone prioritaire)
  - Responsive desktop
  - Cartes produits arrondies, typographie élégante
  - Design inspiré du luxe, minimaliste


## 🧠 IA (V2 à prévoir)
- Suggestion de parfums
- Prédiction de progression dans le réseau
- Auto-rédaction de messages

## 📌 Contact projet
Ahmed Limaiem  
Mail : (à renseigner si besoin)
