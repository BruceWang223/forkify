import axios from 'axios';
import {proxy, key} from '../config';
export default class query {
    constructor(query){
        this.query = query;
    }
    async getData(){
        try{
            let result = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = result.data.recipes;
            //console.log(this.result);
        }
        catch(error){
            alert(error);
        }
    }
}