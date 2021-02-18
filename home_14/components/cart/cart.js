import {products} from '../../components/nav/nav.js'

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
export default function cartDisplay() {
    document.querySelector('.container') ? document.querySelector('.container').remove() : null;
    let cost = 0;
    let countPP = 0;
    let catalog = document.createElement('section');
    let cartText = document.createElement('div');
    let catalogBlock = document.createElement('div');

    catalog.classList.add('container');
    catalog.classList.add('cart-catalog-container');
    catalog.appendChild(cartText);
    cartText.classList.add('cartText')
    catalogBlock.classList.add('catalog-container');

    let buttonBlock = document.createElement('div')
    let cleanButton = document.createElement('button')
    buttonBlock.classList.add('buttonBlock')
    cleanButton.classList.add('cleanButton')
    cleanButton.innerHTML = 'empty cart'

    let idGoodArrayCookie = getCookie('cart')
    
    let goodsInCart = [];
    console.log(goodsInCart)

    let uniqGoodsInCart = [];

    products.map(key => {
        let chosenBlock = document.createElement('div');
        chosenBlock.classList.add('productBlock');

        if (idGoodArrayCookie !== undefined) {
            idGoodArrayCookie.map(item => {
                if(item.id === key.id){
                    goodsInCart.push(key)
                    uniqGoodsInCart = goodsInCart.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
                    chosenBlock.insertAdjacentHTML('beforeend', `<div> ${key.category} </div>`)
                    chosenBlock.insertAdjacentHTML('beforeend', `
                    <div class="cost-block">
                        <div> Cost ${key.price} $ </div>
                        
                    </div>
                    `)

                    let inputCoun = document.createElement('input')
                    inputCoun.setAttribute('type', 'number')
                    inputCoun.setAttribute('min', 1)
                    inputCoun.setAttribute('max', 10)
                    inputCoun.setAttribute('value', item.count)
                    inputCoun.classList.add('input-count')

                    chosenBlock.insertAdjacentHTML('beforeend', `<a><img src="${key.image}"</a>`)
                    chosenBlock.insertAdjacentHTML('beforeend', `<div> ${key.description} </div>`)
                    chosenBlock.insertAdjacentHTML('beforeend', `<div> ${key.title} </div>`)

                    document.body.appendChild(catalog);
                    catalog.appendChild(catalogBlock);
                    catalogBlock.appendChild(chosenBlock)
                    chosenBlock.appendChild(inputCoun)

                    let inputCounValue;

                    inputCoun.addEventListener('click', () => {
                        console.log(inputCoun)
                        inputCounValue = +inputCoun.value
                        console.log(inputCoun)
                        console.log(key.id)
                        let ind = idGoodArrayCookie.findIndex(item => item.id == key.id)     
                        idGoodArrayCookie[ind].count = inputCounValue
                        console.log(idGoodArrayCookie[ind].count)
                        console.log(idGoodArrayCookie)
                        console.log(inputCounValue)
                        setCookie('cart', idGoodArrayCookie)
                        console.log(getCookie('cart'))
                        cartDisplay()
                    })

                    let deleteFromCartButton = document.createElement('button');
                    deleteFromCartButton.classList.add('deleteFromCartButton');
                    chosenBlock.appendChild(deleteFromCartButton);
                    deleteFromCartButton.innerHTML = 'delete from cart'
                    
                    deleteFromCartButton.addEventListener('click', () => {
                        let ind = idGoodArrayCookie.findIndex(item => item.id == key.id)                   
                        delete idGoodArrayCookie[ind]

                        idGoodArrayCookie = idGoodArrayCookie.filter(function(x) {
                            return x !== undefined && x !== null; 
                        });
                        
                        setCookie('cart', idGoodArrayCookie)
                        cartDisplay();
                    })
                    console.log(uniqGoodsInCart)
                   
                    catalog.appendChild(buttonBlock)
                    buttonBlock.appendChild(cleanButton)
                    cost += key.price*item.count;
                    countPP += item.count;
                }   else {
                    return
                }
                document.querySelector('.iconCount').innerHTML = countPP;
                document.querySelector('.iconCostCount').innerHTML = cost.toFixed(2) + " $";
            })
        }
   })

   cartText.innerHTML = '<h1> Cart (' + countPP + ') </h1>' + cost.toFixed(2) + ' $'

   cleanButton.addEventListener('click', () => {
        uniqGoodsInCart = [];
        setCookie('cart', uniqGoodsInCart)
        cartDisplay()
        document.querySelector('.catalog-container') ? document.querySelector('.catalog-container').remove() : null;
   })
}
