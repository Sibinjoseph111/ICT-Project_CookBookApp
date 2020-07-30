import { RecipeModel } from './recipe.model';

export class UserModel{

    constructor(
        public _id: String,
        public username: String,
        public email: String,
        public password: String,
        public tokens:[{
            access: {
              type: String,
              // required: true
            },
            token: {
              type: String,
              // required: true
            }
        }],
        public favorites:RecipeModel[],
        public shoppingList: [{
          _id: String,
          name: String,
          quantity: String
        }]
        
    ){}

    get token(){
        return this.tokens[0].token;
    }
}