const {User} = require('../models')
const {signToken, AuthenticationError} = require('../utils/auth')

const resolvers = {
    Query: {
        me: async (parent,args,context) => {
            if (context.user){
                return User.findById(context.user._id);
            }
            
            return AuthenticationError
          }
    },
    Mutation: {
        createUser: async (parent,{ username, email, password }) => {
            const user = await User.create( {username, email, password});
        
/*             if (!user) {
              return { message: 'Something is wrong!' }
            } */

            const token = signToken(user);
            return { token, user }
          },
          // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
          // {body} is destructured req.body
          login: async (parent, { email, password }) => {
            console.log(email,password)
            const user = await User.findOne({ email });
            if (!user) {
              throw AuthenticationError
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
                throw AuthenticationError
            }
            const token = signToken(user);
            return { token, user };
          },
          // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
          // user comes from `req.user` created in the auth middleware function
          saveBook: async (parent, { book }, context) => {
            console.log(book);
            if(context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                );
            }
            
            throw AuthenticationError
          },
          // remove a book from `savedBooks`
          deleteBook: async (parent, { bookId }, context) => {
            if (context.user){
              console.log(bookId)
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
            }

            throw AuthenticationError
          },
    }
}

module.exports = resolvers