import {modalWindow} from '../modalWindow/modalWindow.js'

function setCookie(name, value) {
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));
    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
}
export function AddCatalog(products) {
    document.querySelector('.container') ? document.querySelector('.container').remove() : null;
    const catalog = document.createElement('section')
    catalog.classList.add('container')
    catalog.classList.add('catalog-container')

    let productsFromLocal = JSON.parse(localStorage.getItem('key'));

    productsFromLocal.map(item => {
        let productBlock = document.createElement('div')
        productBlock.classList.add('productBlock')

        let add = document.createElement('button');
        add.classList.add('add');
        add.innerHTML = 'add in cart';
        productBlock.appendChild(add)
        console.log(item)
        productBlock.insertAdjacentHTML('beforeend', `<div> ${item.category} </div>`)
        productBlock.insertAdjacentHTML('beforeend', `<div> Cost ${item.price} $ </div>`)
        productBlock.insertAdjacentHTML('beforeend', `<a><img src="${item.image}"</a>`)
        productBlock.insertAdjacentHTML('beforeend', `<div> ${item.description} </div>`)
        productBlock.insertAdjacentHTML('beforeend', `<div> ${item.title} </div>`)

        add.addEventListener('click', () => {
            let iconCount = document.querySelector('.iconCount')
            let iconCostCount = document.querySelector('.iconCostCount')
            let myCookie = getCookie('cart');
            let uniqMyCookie = [];

            if(myCookie !== undefined) {
                myCookie.push({id: item.id, count: 1})
                uniqMyCookie = myCookie.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
                // uniqMyCookie = uniqMyCookie.filter(function(x) {
                //     return x !== undefined && x !== null; 
                // });
                iconCount.innerHTML = uniqMyCookie.length
                console.log(uniqMyCookie)
            } else {
                myCookie = [{id: item.id, count: 1}]
                uniqMyCookie = myCookie.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
                
            }

            let productsForCost = JSON.parse(localStorage.getItem('key'));
            let cost = 0;
            let countPP = 0;    
        
            productsForCost.map(key => { 
                uniqMyCookie.map(item => {
                    if(item.id === key.id) {
                        cost += key.price*item.count;
                        countPP += item.count;
                    }
                })
            })
            iconCount.innerHTML = countPP;
            iconCostCount.innerHTML = cost.toFixed(2) + " $";

            setCookie('cart', uniqMyCookie)
            console.log(uniqMyCookie)
        })
        catalog.appendChild(productBlock)

        productBlock.addEventListener('dblclick', () => {
            location.hash = 'product/' + item.id
            modalWindow(productBlock, item.id)
        })
    })
    document.body.appendChild(catalog);
}