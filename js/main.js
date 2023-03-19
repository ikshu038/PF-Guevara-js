// Clase con su constructor de cada producto
class Product {
    constructor(name, price, image, type, id) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.type = type;
        this.id = id;
    }
};

// Actulizacion del LS
const updateLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Obtener los productos del LS
const getLSProducts = () => {

    // Obtengo el LS
    let LSproducts = localStorage.getItem("cart");

    // Si no me devuelve null (que seria que hay algo) ejecuto el if
    if (LSproducts !== null) {

        // Parseo los objetos del JSON
        const JSONproducts = JSON.parse(LSproducts);

        // Recorro cada objeto y lo agrego nuevamente a la variable cart
        JSONproducts.forEach(JSONproduct => {
            const existingProduct = cart.find(product => product.id === JSONproduct.id);
            if (!existingProduct) {
                cart.push({
                    ...new Product(JSONproduct.name, JSONproduct.price, JSONproduct.image, JSONproduct.type, JSONproduct.id),
                    amount: JSONproduct.amount
                });
            } else {
                existingProduct.amount += JSONproduct.amount;
            }
        });
    }

    // Retorno productos
    return cart;
}

const getJSONProducts = () => {
    // Obtengo los productos del JSON
    fetch('../JSON/products.json')
        .then(response => response.json())
        .then(data => {
            // Ya cuando tengo el array con objetos literales los instancio con la clase Product
            data.forEach(product => {
                products.push(new Product(product.name, product.price, product.image, product.type, product.id));
            });
        });
}

// Carrito vacio
let cart = [];

// Inicializar la variable donde tengo que obtener los productos del JSON
const products = [];


