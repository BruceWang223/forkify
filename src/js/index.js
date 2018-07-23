// Global app controller
import { elements, insertLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import Search from './models/Search';
import List from './models/List';
import Like from './models/Like';
import * as SearchView from './views/SearchView';
import * as RecipeView from './views/RecipeView';
import * as ListView from './views/ListView';
import * as LikeView from './views/LikeView';
/**
search object
current object
shopping list object
liked recipes
*/
const state = {};

/**
Search Control
*/
const controlSearch = async function(){
    // 1. get input
    const query = SearchView.getInput();
    
    if(query){
        // 2. add query object to the state object
        state.search = new Search(query);
        // 3. clear fields and UI prepartion
        SearchView.clearResult();
        SearchView.clearInput();
        insertLoader(elements.searchResultField);
        // 4. get result
        try{
            await state.search.getData();
            clearLoader();
            // 5. render result 
            SearchView.renderResult(state.search.result);
        }
        catch(error){
            alert("Something went wrong for searching...");
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

elements.searchPages.addEventListener("click", e => {
    let btn = e.target.closest('.btn-inline');
    if(btn){
        const page = parseInt(btn.dataset.goto, 10);
        SearchView.clearResult();
        SearchView.renderResult(state.search.result, page);
    }
});

/**
Recipe Control
*/
const controlRecipe = async () => {
    // 1 Get input
    const id = window.location.hash.replace("#", "");
    if(id){
        // 2. prepare UI
        RecipeView.clearResult();
        RecipeView.highlightSection(id);
        insertLoader(elements.recipe);
        //3. create Object
        state.recipe = new Recipe(id);
        try{
            //4. Get data;
            await state.recipe.getRecipe();
            clearLoader();
            //5. calculte time and parse ingredients;
            state.recipe.calcTime();
            state.recipe.parseIngredient();
            //6. Render result;
            RecipeView.renderRecipe(state.recipe, state.like.isLiked(id));
            
        }
        catch(error){
            alert("Something went wrong");
            clearLoader();
        }
    }
} 

['load','hashchange'].forEach(el => window.addEventListener(el, controlRecipe));


/**
 * shopping list control -add ingredients to the list;
 */

const controlShop = () => {
    if(!state.list){
        state.list = new List();
    }
    const result = RecipeView.getCheckedItem();
    state.recipe.ingredients.forEach((el, i)=> {
        if(result[i]){
            const item = state.list.addItem(el.number, el.unit, el.ingredient);
            ListView.renderItem(item);
        }
    });
    state.list.setListStorage();
    ListView.checkDeleteAllBtn();
} 

/**
 * control likes
 */

window.addEventListener('load', () => {
    state.like = new Like();
    state.list = new List();
    state.like.getLikeStorage();
    state.list.getListStorage();
    LikeView.toggleLikeMenu(state.like.getLikes());
    state.like.likes.forEach(el => {
        LikeView.renderLike(el);
    });
    state.list.item.forEach(el => {
        ListView.renderItem(el);
    });
    ListView.checkDeleteAllBtn();
});

const controlLike = () => {
    if(!state.like){
        state.like = new Like();
    };
    const curRecipe = state.recipe;
    const id = curRecipe.id;
    if(state.like.isLiked(id)){
        // remove the likes in array
        state.like.deleteLike(curRecipe.id);
        // toggle button class 
        LikeView.toggleLikeBtn(true);
        // update in the like list
        LikeView.deleteLike(id);
    }
    else{
        // add the likes in array
        const newLike = state.like.addLike(curRecipe.id,curRecipe.author,curRecipe.image,curRecipe.title);
        // toggle button class 
        LikeView.toggleLikeBtn(false);
        // update in the like list
        LikeView.renderLike(newLike);
    }
    LikeView.toggleLikeMenu(state.like.getLikes());
}


/**
 *  add recipe && list handler;
*/
document.querySelector(".recipe").addEventListener("click", e => {
    // console.log(e.target);
    // add serving people and update ingrident;
    if(e.target.matches(".btn-decrease, .btn-decrease *")){
        if(state.recipe.serving > 1){
            state.recipe.updateServing('dec');
            RecipeView.updateServingIngredient(state.recipe);
        }
    }
    else if(e.target.matches(".btn-increase, .btn-increase *")){
        state.recipe.updateServing('inc');
        RecipeView.updateServingIngredient(state.recipe);
    }
    // add shopping list
    else if(e.target.matches(".recipe__btn-add, .recipe__btn-add *")){
        // console.log(state.recipe);
        controlShop();
    }
    else if(e.target.matches(".recipe__love, .recipe__love *")){
        controlLike();
    }

    else if(e.target.matches(".recipe__icon, .recipe__icon *")){
        // console.log(e.target.closest(".recipe__icon").parentElement);
        RecipeView.toggleItem(e.target.closest(".recipe__icon").firstElementChild);
    }

});

/**
 * Delete shopping list;
 */

elements.shopping.addEventListener('click', e => {
    const id = e.target.closest(".shopping__item").dataset.itemid;
    if(e.target.matches(".shopping__delete, .shopping__delete *")){
        state.list.deleteItem(id);
        ListView.deleteItem(id);
        state.list.setListStorage();
        ListView.checkDeleteAllBtn();
    } 
    else if(e.target.matches(".shopping__count-value")){
        const val = e.target.value;
        state.list.updateCount(id, val);
        state.list.setListStorage();
        ListView.checkDeleteAllBtn();
    }
}); 


elements.shoppingSection.addEventListener('click', e => {
    if(e.target.matches('.shopping__delete-all')){
        state.list.deleteAllItem();
        ListView.deleteAllItem();
        state.list.setListStorage();
        ListView.checkDeleteAllBtn();
    }
})