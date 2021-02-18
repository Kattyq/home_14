import {AddCatalog} from '../../components/catalog/catalog.js'
import Cart from './../cart/cart.js'
import contacts from './../contacts/contact.js'
import data from '../../api.js' // что это за дата и откуда у нас появилась???

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
}
export let products = [];

    data().then(result => {
    products = result;
    localStorage.setItem('key', JSON.stringify(products));
    })

const linkData = [
    {name: 'catalog', component: AddCatalog},
    // {name: 'cart', component: Cart},
    {name: 'contacts', component: contacts}
];


const nav = document.createElement('nav')

linkData.map(linkName => {
    const link = document.createElement('li')
    link.innerHTML = linkName.name

    link.addEventListener('click', () => {
        location.hash = linkName.name
        linkName.component(products)
    })
    nav.appendChild(link)
})

let iconBlockCart = document.createElement('div')
iconBlockCart.classList.add('iconBlockCart')

let iconCart = document.createElement('div')
iconCart.classList.add('iconCart')
iconCart.innerHTML = '<i class="icon-shopping-cart"></i>'

let iconCount = document.createElement('div')
iconCount.classList.add('iconCount')

let iconCostCount = document.createElement('div')
iconCostCount.classList.add('iconCostCount')

iconCart.appendChild(iconCount)
nav.appendChild(iconBlockCart)
iconBlockCart.appendChild(iconCart)
iconBlockCart.appendChild(iconCostCount)
document.body.appendChild(nav)

function cookieCart() {
    let myCookie = getCookie('cart');
    let uniqMyCookie = [];
    if(myCookie !== undefined) {
        uniqMyCookie = myCookie.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
        uniqMyCookie = uniqMyCookie.filter(function(x) {
            return x !== undefined && x !== null; 
        });
        
        console.log(uniqMyCookie)
        
        let productsForCost = JSON.parse(localStorage.getItem('key'));
        let cost = 0;
        let countPP = 0;

        productsForCost.map(key => { 
            uniqMyCookie.map(item => {
                if(item.id === key.id){
                    cost += key.price*item.count;
                    countPP += item.count;
               }
            })
        })
        iconCount.innerHTML = countPP;
        iconCostCount.innerHTML = cost.toFixed(2) + " $";
    } else {
        iconCount.innerHTML = 0;
        iconCostCount.innerHTML = '0 $'
    }
}
cookieCart();

iconBlockCart.addEventListener('click', () => {
    location.hash = 'cart'
    Cart()
})

let logo = document.getElementById('LOGO');
logo.addEventListener('click', () => {
    document.querySelector('.container') ? document.querySelector('.container').remove() : null;

    let main = document.createElement('section');
    let divMain = document.createElement('div');
    document.body.appendChild(main)
    main.classList.add('main')
    main.classList.add('container')
    main.appendChild(divMain)
    divMain.innerHTML = '<img src="../../images/leaves.jpg">'
})