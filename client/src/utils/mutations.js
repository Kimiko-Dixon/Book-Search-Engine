import {gql} from '@apollo/client'

//Login mutation
export const LOGIN_USER =gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        } 
    }
`
//Add user mutation
export const ADD_USER =gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
            _id
            email
            username
            }
        }
    }
`
//Save user mutation
export const SAVE_BOOK =gql`
    mutation SaveBook($book: BookInfo!) {
        saveBook(book: $book) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`
//Remove book mutation
export const REMOVE_BOOK = gql`
    mutation DeleteBook($bookId: String!) {
        deleteBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                authors
                description
                image
                link
            }
        }
    }
`