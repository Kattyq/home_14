export default function() {
    let response = fetch('https://fakestoreapi.com/products')
    // let json = await response.json();
    .then(res => res.json())
console.log(response)
    return response
}


// this.users = JSON.parse(localStorage.getItem('key')) || [];
// let response = await fetch('https://jsonplaceholder.typicode.com/users');
//         let result = await response.json();
//         let ppp = JSON.stringify(result);
//         self.users = await JSON.parse(ppp);
//         self.users.forEach(element => {
//             let yyy = JSON.stringify(element.address);
//             element.address = yyy;
//         });
//     localStorage.setItem('key', JSON.stringify(self.users));
//     this.users.push({id: this.users.length +1, ...myUser});
//     localStorage.getItem('key', JSON.stringify(this.users));
//     localStorage.setItem('key', JSON.stringify(this.users));
//     this.users = JSON.parse(localStorage.getItem('key'));