import axios from 'axios';
import {proxy, key} from '../config';

export default class {
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        try{
            const result = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.image = result.data.recipe.image_url;
            this.ingredients = result.data.recipe.ingredients;
            this.author = result.data.recipe.publisher;
            this.source = result.data.recipe.source_url;
            this.serving = 4;
        }
        catch(error){
            console.log(error);
            alert("Something weng wrong :)");
        }
    }
    calcTime(){
        this.time = this.ingredients.length * 5;
    }
    parseIngredient(){
        //1 replaces long version with short versions, removes parenses;
        const longVersion = ['cups', 'cup', 'tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'pounds', 'pound'];
        const shortVersion = ['cup', 'cup', 'tbsp', 'tbsp', 'oz', 'oz','tsp', 'tsp','pound', 'pound', 'kg', 'g'];

        const newIngredient = this.ingredients.map(el => {
            let ingredients = el.toLowerCase();
            // 1 remove parenthese
            ingredients = ingredients.replace(/ *\([^)]*\) */g, ' ');
            // 2 remove long versions
            longVersion.forEach((unit, i) => {
                ingredients = ingredients.replace(unit, shortVersion[i]);
            });

            const arryIng = ingredients.split(" ");
            const obj = {
                unit:"",
                number: 1.0,
                ingredient: ""
            }
            // ['1' 'oz' 'shrimp']
            const unitIndex = arryIng.findIndex((el2) => shortVersion.includes(el2));
            if(unitIndex > -1){
                // 1 oz --
                let arryCount = arryIng.slice(0, unitIndex);
                if(arryCount.length === 1){
                    obj.number = Math.round(eval(arryIng[0].replace("-", "+"))*100) / 100;
                }
                else {
                    obj.number = Math.round(eval(arryCount.join("+"))*100) / 100;
                }
                obj.unit = arryIng[unitIndex];
                obj.ingredient = arryIng.slice(unitIndex+1).join(" ");
            } else if(parseInt(arryIng[0], 10)){
                // 1 package
                obj.number = parseInt(arryIng[0], 10);
                obj.ingredient = arryIng.slice(1).join(" ");

            } else{
                obj.ingredient = ingredients;
            }
            // console.log(obj);
            return obj;
        })
        this.ingredients = newIngredient;
    }

    updateServing(type){
        const newServing = type === 'dec' ? this.serving - 1 : this.serving + 1;
        this.ingredients.forEach(el => {
            el.number *= newServing / this.serving;
        });
        this.serving = newServing;
    }
}











