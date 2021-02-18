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
export function modalWindow(block, it) {
    let modalWrapper = document.createElement('div')
    document.body.appendChild(modalWrapper)
    modalWrapper.classList.add('modalWrapper')

    let buttonModalClose = document.createElement('button')
    buttonModalClose.classList.add('buttonModalClose')
    buttonModalClose.innerHTML = 'Close'
    modalWrapper.appendChild(buttonModalClose)

    let modalContent = document.createElement('div')
    modalWrapper.appendChild(modalContent)
    modalContent.innerHTML = block.innerHTML
    modalContent.classList.add('modalContent')

    buttonModalClose.addEventListener('click', () => {
        modalWrapper.classList.add('show');
    })

    let add = modalContent.querySelector('.add')

    console.log(add)

    add.addEventListener('click', () => {
        let myCookie = getCookie('cart')
        let uniqMyCookie = []
        let iconCount = document.querySelector('.iconCount')
                
        if(myCookie !== undefined) {
            myCookie.push({id: it, count: 1})
            uniqMyCookie = myCookie.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
            iconCount.innerHTML = uniqMyCookie.length
        } else {
            myCookie = [{id: it, count: 1}]
            uniqMyCookie = myCookie.filter((set => f => !set.has(f.id) && set.add(f.id))(new Set));
            
        }

        let productsForCost = JSON.parse(localStorage.getItem('key'));
        let iconCostCount = document.querySelector('.iconCostCount');
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
        iconCostCount.innerHTML = cost + " $";

        setCookie('cart', uniqMyCookie)
    })
}