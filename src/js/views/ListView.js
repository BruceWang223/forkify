import {elements} from './base';

export const renderItem = (item => {
    const markUp = 
    `
        <li class="shopping__item" data-itemId= ${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.number}" step="${item.number}" min="${0}" class = "shopping__count-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markUp);
});


export const deleteItem = (id => {
    const element = document.querySelector(`[data-itemId="${id}"]`);
    if(element)
        element.parentNode.removeChild(element);
});

export const deleteAllItem = (() => {
   elements.shopping.innerHTML = '';
});

export const checkDeleteAllBtn = (() => {
    document.querySelector('.shopping__delete-all').style.visibility = elements.shopping.childElementCount === 0 ? 'hidden' : 'visible';
});