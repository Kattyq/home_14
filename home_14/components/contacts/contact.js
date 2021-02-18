export default function () {
    document.querySelector('.container') ? document.querySelector('.container').remove() : null;
    let contacts = document.createElement('section');
    contacts.innerHTML = `<h2> Телефон </h2>
    <h3>Адрес</h3>
    <h3>И што-то ещё</h3>`
    contacts.classList.add('container');
    document.body.appendChild(contacts)
}