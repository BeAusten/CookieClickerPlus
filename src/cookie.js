let compare = 10000;

class Product {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.best = false;
        this.createBadge();
    }

    get price() {
        let object = Game.ObjectsById[this.id];
        return object.price;
    }

    get cps() {
        let object = Game.ObjectsById[this.id];
        return object.storedCps;
    }

    get realCPS() {
        return this.cps * Game.globalCpsMult;
    }

    get location() {
        return document.getElementsByClassName('product')[this.id].getElementsByClassName('price')[0] ?? null;
    }

    get value() {
        if (this.price === 0) return 0;
        return (this.realCPS / this.price) * compare;
    }

    get displayValue() {
        return this.value.toFixed(2).toString();
    }

    get backgroundColor() {
        return this.best ? 'rgb(176, 148, 6)' : 'rgb(25, 25, 25)';
    }

    createBadge() {
        const buttonHTML = `<button class="custom-value-btn" title="Cookies/s per 10k cookies." style="background-color: ${this.backgroundColor};border: 2px solid rgba(242, 255, 0, 0.601);display: inline-flex;align-items: center;justify-content: center;color: rgb(219, 194, 0);gap: 1px;padding: 0 3px;border-radius: 5px;margin-left: 5px;vertical-align: middle;"><img src="https://cubedex.austen.be/images/crown.png" alt="" height="10px" width="10px"> <p style="margin: 0;font-weight: bold;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size:10px">${this.displayValue}</p></button>`;
        this.location.innerHTML += buttonHTML;
    }

    renderValue() {
        if (this.location.innerHTML.includes('custom-value-btn')) {
            document.querySelectorAll('.custom-value-btn')[this.id].style.backgroundColor = this.backgroundColor;
            document.querySelectorAll('.custom-value-btn p')[this.id].textContent = this.displayValue;
        } else {
            this.createBadge();
        }

    }
}

function createProduct(id) {
    let object = Game.ObjectsById[id];
    return new Product(object.name, id);
}

function checkBestProduct(products) {
    let best = products[0];
    products.forEach(product => {
        if (product.value > best.value) {
            best = product;
        }
    });
    products.forEach(product => {
        product.best = (product === best);
    });
}

function loopCode() {
    checkBestProduct(products);
    products.forEach(product => {
        product.renderValue();
    });
}

let products = [];
for (let i = 0; i < Game.ObjectsById.length; i++) {
    products.push(createProduct(i));
}

setInterval(loopCode, 1000);
addEventListener('click', loopCode);
