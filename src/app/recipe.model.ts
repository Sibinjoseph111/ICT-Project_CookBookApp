import {IngredientsModel} from './ingredients.model';

export class RecipeModel{

    constructor(
        public _id: String,
        public name: String,
        public description: String,
        public steps: String[],
        public ingredients: IngredientsModel[],
        public imageURL: String
    ){}
}