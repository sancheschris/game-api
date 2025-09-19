export const typeDefs = `
  enum Job {
    Warrior
    Thief
    Mage
  }

  type Character {
    id: ID!
    name: String!
    job: Job!
    health: Int!
    strength: Int!
    dexterity: Int!
    intelligence: Int!
    attackModifier: Float!
    speedModifier: Float!
    alive: Boolean!
  }

  type JobStats {
    name: Job!
    health: Int!
    strength: Int!
    dexterity: Int!
    intelligence: Int!
    attack: String!
    speed: String!
  }

  type Query {
    listCharacters: [Character!]!
    character(id: ID!): Character
    jobs: [JobStats!]!
  }

  type CreateCharacterResponse {
    success: Boolean!
    character: Character
    errors: [String!]
  }

  type Mutation {
    createCharacter(name: String!, job: Job!): CreateCharacterResponse!
  }
`;
