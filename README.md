# Lootopia — Guide de démarrage

## 📦 Prérequis

Avant de commencer, assure‑toi d’avoir installé :

- [Node.js](https://nodejs.org/) (version 18 ou plus)
- [Java JDK](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (version 21)
- [Maven](https://maven.apache.org/) (version 3.9 ou plus)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (optionnel mais recommandé pour le backend)
- [Xcode](https://developer.apple.com/xcode/) (nécessaire uniquement pour tester l’application iOS)

---

## 🚀 Mise en route

### Cloner le dépôt

```bash
git clone https://github.com/ton-org/lootopia.git
cd lootopia
```

## Démarrer la base de données (SQL Server)

Assurez-vous que Docker fonctionne. À la racine du projet, exécutez :

```bash
docker compose up -d
```

Cela va démarrer un conteneur SQL Server avec les ports correctement exposés.

> ⚠️ Si la base lootopia n'existe pas encore, pensez à la créer manuellement via un outil comme DBeaver, Azure Data Studio, etc..

## Lancer le backend (Spring Boot)

Dans le dossier `server/src/main/resources`, créez un fichier `application-local.yml` à partir du modèle `application-local.example.yml`.

Ensuite, remplissez les informations sensibles :

- Connexion base de données

- Clé secrète JWT

> 🔐 Ces valeurs ne sont pas présentes dans le dépôt pour des raisons de sécurité.

### Démarrer le backend

Vous pouvez importer le backend dans IntelliJ IDEA en tant que projet Maven.

Voici la configuration Maven à utiliser :

![IntelliJ clean install](/img/clean-install.png)

Ensuite, pour lancer le backend, voici la configuration de l'API à utiliser :

![IntelliJ API config](/img/api-config.png)

## Lancer l'application web (client-web)

### Démarrage

```bash
cd client
npm install
npm run dev
```

L’application web sera disponible à l’adresse suivante : `http://localhost:3000`

## Lancer l’application mobile (client-mobile)

L'application fonctionne avec **React Native + Expo** (en mode natif). Pour  tester sur **un iPhone**, voici les étapes :

### 1. Brancher un iPhone en USB

L’iPhone doit être :
- Déverrouillé
- Connecté &u Mac
- Autorisé (cliquer sur “faire confiance”)

### 2. Installer les dépendances

```bash
yarn install
ou

npm install
```
### 3. Installer les pods iOS

```bash
cd ios
pod install
cd ..
```
### 4. Lancer l'app sur l'iPhone

```bash
npx expo run:ios --device
```
### Connexion au backend (API)

Le frontend utilise une variable d’environnement pour appeler l’API :

```bash
baseURL: process.env.EXPO_PUBLIC_API_URL
```
Dans un fichier .env, ajoute par exemple :

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.xx:8080/api
```
Remplacer l’adresse IP par celle de ton ordi (et assurez-vous que le mobile et l'ordinateur  soit sur le même réseau Wi-Fi)




