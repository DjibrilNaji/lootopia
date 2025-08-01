# Lootopia — Getting Started Guide

## 📦 Prerequisites

Before getting started, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Java JDK](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) (version 21)
- [Maven](https://maven.apache.org/) (version 3.9 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) (optional but recommended for the backend)
- [Xcode](https://developer.apple.com/xcode/) (only required to test the iOS app)

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/ton-org/lootopia.git
cd lootopia
```  

## Start the database (SQL Server)

Make sure Docker is running. At the root of the project, run:

```bash
docker compose up -d
```

This will start a SQL Server container with the correct ports exposed.

> ⚠️ If the lootopia database doesn’t exist yet, remember to create it manually using a tool like DBeaver, Azure Data Studio, etc.

## Run the backend (Spring Boot)

In the folder `server/src/main/resources`, create a file named `application-local.yml` based on the template `application-local.example.yml`.

Then, fill in the sensitive information:

- Database connection

- JWT secret key

> 🔐 These values are not included in the repository for security reasons.

### Start the backend

You can import the backend into IntelliJ IDEA as a Maven project.

Here’s the Maven configuration to use:

![IntelliJ clean install](/img/clean-install.png)

Then, to start the backend, use the following API configuration:

![IntelliJ API config](/img/api-config.png)

## Run the web application (client-web)

### Start

```bash
cd client
npm install
npm run dev
```

The web app will be available at: `http://localhost:3000`

## Run the mobile application (client-mobile)

The app uses **React Native + Expo** (in native mode). To test on **un iPhone**, follow these steps:

### 1. Plug in an iPhone via USB

The iPhone must be:
- Unlocked
- Connected to your Mac
- Trusted (tap “Trust” on the device)

### 2. Install dependencies

```bash
yarn install
ou

npm install
```
### 3. Install iOS pods

```bash
cd ios
pod install
cd ..
```
### 4. Launch the app on the iPhone

```bash
npx expo run:ios --device
```

### Connect to the backend (API)

The frontend uses an environment variable to call the API:

```bash
baseURL: process.env.EXPO_PUBLIC_API_URL
```

In a .env file, for example, add:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.xx:8080/api
```

Replace the IP address with your computer’s IP address (and make sure the mobile device and computer are on the same Wi-Fi network).



