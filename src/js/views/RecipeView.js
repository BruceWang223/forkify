import {elements} from './base';
import {Fraction} from 'fractional';

export const clearResult = () => {
    elements.recipe.innerHTML = '';
};

const formatNumber = (input) => {
    if(input){
        const [int, dec] = input.toString().split(".").map(el => parseInt(el, 10));
        if(!dec) return input;
        if(int === 0){
            const fr = new Fraction(input);
            return `${fr.numerator}/${fr.denominator}`;
        }
        else{
            const fr = new Fraction(input - int);
            return `${int} ${fr.numerator}/${fr.denominator}` ;
        }
    }
    return "?";
};

export const highlightSection = (id) => {
    Array.from(document.querySelectorAll(".results__link")).forEach(el => {
        el.classList.remove("results__link--active");
    });
    const e = document.querySelector(`.results__link[href="#${id}"]`);
    if(e){
        e.classList.add("results__link--active");
    }
};

export const updateServingIngredient = (recipe) => {
    document.querySelector(".recipe__info-data--people").textContent = recipe.serving;
    Array.from(document.querySelectorAll(".recipe__count")).forEach((el, i) => {
        el.textContent = formatNumber(recipe.ingredients[i].number);
    });
};

export const toggleItem = (el) => {
    const string = el.getAttribute('href').includes("icon-check") ?  "img/icons.svg#icon-uncheck": "img/icons.svg#icon-check";
    el.setAttribute('href', string);
};

export const getCheckedItem = () => {
    return Array.from(document.querySelectorAll(".recipe__item")).map( el => {
        const href = el.firstElementChild.firstElementChild.getAttribute('href');
        return href.includes("icon-check") ?  true : false;
    })
};


const createIngrident = (recipe) => {
    const result = recipe.ingredients.map(el => 
        `
        <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-uncheck"></use>
            </svg>
            <div class="recipe__count">${formatNumber(el.number)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${el.unit}</span>
                ${el.ingredient}
            </div>
        </li>
        `
    ).join(" ");
    return result;
}


export const renderRecipe = (recipe, isLiked) =>{
    const markUp = 
    `
        <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.serving}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${isLiked ? "icon-heart" : "icon-heart-outlined"}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${createIngrident(recipe)}
                </ul>

                <button class="btn-small recipe__btn recipe__btn-add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.source}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
    elements.recipe.insertAdjacentHTML("afterbegin", markUp);
}