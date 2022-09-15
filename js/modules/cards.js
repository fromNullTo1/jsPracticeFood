function cards() {
    // classes


    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.currency = 50;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.currency;
        }

        render() {
            const div = document.createElement('div');

            if (this.classes.length === 0) {
                this.class = 'menu__item';
                div.classList.add(this.class);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }

            div.innerHTML = `
      <img src=${this.src} alt="${this.alt}">
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>
    `;
            this.parent.append(div);
        }
    }

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`couldnt fetch ${url}, stats: ${result.status}`);
        }

        return await result.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}

module.exports = cards;