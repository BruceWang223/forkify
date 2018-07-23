import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchPages.innerHTML = '';
};

export const limitRecipeTitle = (title, limit = 17) => {
    if(title.length > limit){
        return title.substring(0, title.substring(0, limit + 1).lastIndexOf(" ")).concat(" ...");
    }
    return title;
};
const renderRecipe = (recipe) => {
    const markUp = `<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.publisher}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);
};

const drawButtons = (type, page) => {
    elements.searchPages.insertAdjacentHTML('afterbegin', 
    `
        <button class="btn-inline results__btn--${type}" data-goTo = ${type == 'next' ? page + 1: page - 1}>
            <span>Page ${type == 'next' ? page + 1: page - 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type == 'next' ? "right": "left"}"></use>
            </svg>
        </button>
    `
    );
}

const renderButtons = (page, resultCount, numberPerPage = 10) => {
    const pages = Math.ceil(resultCount / numberPerPage);
    if(page === 1 && pages > 1){
        //show next ;
        drawButtons('next', page);
    } else if(page === pages && pages > 1){
        // show prev;
        drawButtons('prev', page);
    }
    else if(page < pages && pages > 1){
        // show prev and next
        drawButtons('next', page);
        drawButtons('prev', page);
    }
};

export const renderResult = (recipes, page = 1, numberPerPage = 10) => {
    let start = (page - 1) *  numberPerPage; 
    let end = page * numberPerPage;
    clearResult();
    recipes.slice(start,end).forEach(renderRecipe);
    renderButtons(page, recipes.length);
};

