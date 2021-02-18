
export default class App {
    // element: mainDiv;

    create() {
        let mainDiv = document.createElement('div');
        mainDiv.classList.add('App');
    }
    render() {
        document.body.appendChild(mainDiv);

    }
    init() {

        this.create();
        this.render();
    }
}
// init(): export default new App().init(); // что это??


// ещё подключить этот файл нужно