import BasketView from './basketView.js';
import Observer from './../common/observer.js';
import BasketModel from './basketModel.js';

export default class BasketController {
    constructor() {
        this.view = new BasketView(this.onBasket, this.onAddOrder, this.onRemainingProducts);
        this.model = new BasketModel();
        Observer.subscribe(Observer.events.onAddToBskt, this.onAddToBasket);
    }

    init = () => {
        this.counter = this.model.getItemsFromBasket().length;
        this.view.countItem(this.counter);
    };

    onAddToBasket = (choosenMoto) => {
        this.view.countItem(++this.counter);
        this.data = this.model.addToBasket(choosenMoto);
    };

    onBasket = () => {
        this.data = this.model.getItemsFromBasket();
        if (this.data.length !== 0) {
            this.view.render(this.data);
        } else {
            alert("You haven't added something to your basket yet!");
        }
    };

    onRemainingProducts = (id) => {
        console.log('s')
        const listProducts = this.model.remainingProducts(this.model.getItemsFromBasket(), id);
        console.log('id', id)
        console.log('listProducts', listProducts)
        this.view.baseRender(listProducts)
        this.counter = this.model.getItemsFromBasket().length;
        this.view.countItem(this.counter);
        this.view.render(listProducts);
    };

    onAddOrder = (data) => {
        this.onSendMSG(data);
    };

    onSendMSG = (msg) => {
        Observer.notify(Observer.events.sendMsgToTG, msg);
    };
}
