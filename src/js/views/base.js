export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput : document.querySelector('.search__field'),
    searchResultList: document.querySelector(".results__list"),
    searchResultField: document.querySelector(".results"),
    searchPages: document.querySelector(".results__pages"),
    recipe: document.querySelector(".recipe"),
    shopping: document.querySelector('.shopping__list'),
    shoppingSection: document.querySelector('.shopping'),
    likesMenu: document.querySelector('.likes__field'),
    likeList : document.querySelector('.likes__list')
};

export const elementString = {
    loader : 'loader'
}

export const insertLoader = (parent) => {
    const loader = `
    <div class = ${elementString.loader}>
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};


export const clearLoader = () => {
    const loader = document.querySelector(`.${elementString.loader}`);
    loader.parentNode.removeChild(loader);
};







