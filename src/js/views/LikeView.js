import {elements} from './base';
import {limitRecipeTitle} from './SearchView';

export const toggleLikeBtn = (isLiked) => {
    const string = isLiked ? "icon-heart-outlined" : "icon-heart";
    document.querySelector(".header__likes use").setAttribute("href", `img/icons.svg#${string}`);
};


export const toggleLikeMenu = (numberOfLikes) => {
    elements.likesMenu.style.visibility = numberOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (likeItem) => {
    const markUp = 
    `
    <li>
        <a class="likes__link" href="#${likeItem.id}">
            <figure class="likes__fig">
                <img src="${likeItem.image}" alt="${limitRecipeTitle(likeItem.title)}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(likeItem.title)}</h4>
                <p class="likes__author">${likeItem.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likeList.insertAdjacentHTML('beforeend', markUp);
};

export const deleteLike = (id) => {
    const el = document.querySelector(`.likes__link[href="#${id}"]`);
    if(el){
        el.parentNode.removeChild(el);
    }
};