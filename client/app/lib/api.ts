import { ContactDto, HuntDto, UserDto } from "~/types/api"

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api"

// Fonctions API pour les utilisateurs
export const fetchUsers = async (): Promise<UserDto[]> => {
  const response = await fetch(`${API_BASE_URL}/users`)
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des utilisateurs")
  }
  return response.json()
}

// Fonctions API pour les chasses
export const fetchHunts = async (): Promise<HuntDto[]> => {
  const response = await fetch(`${API_BASE_URL}/hunts`)
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des chasses")
  }
  return response.json()
}

// Fonctions API pour les messages
export const fetchMessages = async (): Promise<ContactDto[]> => {
  const response = await fetch(`${API_BASE_URL}/contacts`)
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des messages")
  }
  return response.json()
}

// Données mockées pour la démonstration
export const mockUsers: UserDto[] = [
  {
    id: 1,
    username: "john_doe",
    email: "john@example.com",
    isActive: true,
    twoFactorEnabled: true,
    createdAt: new Date("2024-01-15")
  },
  {
    id: 2,
    username: "jane_smith",
    email: "jane@example.com",
    isActive: true,
    twoFactorEnabled: false,
    createdAt: new Date("2024-02-20")
  },
  {
    id: 3,
    username: "bob_wilson",
    email: "bob@example.com",
    isActive: false,
    twoFactorEnabled: true,
    createdAt: new Date("2024-03-10")
  }
]

export const mockHunts: HuntDto[] = [
  {
    id: 1,
    name: "Chasse au Trésor Urbaine",
    description: "Une aventure passionnante à travers la ville",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    privateHunt: false,
    latitude: 48.8566,
    longitude: 2.3522,
    draft: false,
    slug: "chasse-tresor-urbaine"
  },
  {
    id: 2,
    name: "Mystères de la Forêt",
    description: "Explorez les secrets cachés de la forêt",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-08-15"),
    privateHunt: true,
    latitude: 48.7589,
    longitude: 2.1772,
    draft: true,
    slug: "mysteres-foret"
  }
]

export const mockMessages: ContactDto[] = [
  {
    name: "Alice Martin",
    email: "alice@example.com",
    subject: "Question sur l'application",
    message: "Bonjour, j'aimerais savoir comment créer une nouvelle chasse."
  },
  {
    name: "Pierre Dubois",
    email: "pierre@example.com",
    subject: "Bug signalé",
    message: "J'ai rencontré un problème lors de la connexion à mon compte."
  },
  {
    name: "Sophie Laurent",
    email: "sophie@example.com",
    subject: "Suggestion d'amélioration",
    message: "Il serait intéressant d'ajouter une fonctionnalité de chat en temps réel."
  }
]
