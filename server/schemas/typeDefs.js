const typeDefs = `

type User {
    _id: ID
    username: String!
    email: String!
    bookCount:Int
    savedBooks: [Book]
}

type Book {
    bookId:String!
    title: String!
    authors:[String]
    description: String!
    image: String
    link: String
}
    
input BookInfo {
    bookId:String!
    title: String!
    authors:[String]
    description: String!
    image: String
    link: String
} 

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(book: BookInfo!): User
    deleteBook(bookId: String!): User
}
`

module.exports = typeDefs