import uniqid from 'uniqid';
export default class List {
    constructor(){
        this.item = [];
    }
    addItem(number, unit, ingredient){
        const newItem = {
            // in ES6, we can simply write count;
            number : number,
            unit : unit,
            ingredient : ingredient,
            id: uniqid()
        }
        this.item.push(newItem);
        return newItem;
    }
    deleteItem(id){
        const index = this.item.findIndex(el => el.id === id);
        this.item.splice(index,1);
    }
    updateCount(id, newCount){
        this.item.find(el => el.id === id).number = newCount;
    }
    deleteAllItem(){
        this.item = [];
    }
    setListStorage(){
        localStorage.setItem('list', JSON.stringify(this.item));
    }
    getListStorage(){
        const result = JSON.parse(localStorage.getItem('list'));
        if(result)
            this.item = result;
    }
}