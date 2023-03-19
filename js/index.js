// Actulizo el numerito del carrito
const upadateMiniNumber = () => {
    const miniNumber = document.querySelector(".cart-count");
    const amountOfProducts = cart.reduce((accumulator, el) => accumulator + el.amount, 0);
    miniNumber.innerHTML = amountOfProducts;
}

// Agrego el producto
const addProduct = (id) => {
    
    // Almaceno el producto a agregar (lo veo por la id)
    const productToAdd = products.find((el) => el.id == id);

    // Veo si ya esta (para ver si agrego el objeto o aumento en 1 la cantidad)
    const existingProduct = cart.find((product) => product.id === productToAdd.id);

    if (!existingProduct) {
        cart.push({
            ...productToAdd,
            amount: 1
        });
    } else {
        existingProduct.amount += 1;
    }

    // Actualizo el LS
    updateLocalStorage();

    // Muestro Popup
    Toastify({
        text: `Agregaste ${productToAdd.name}`,
        duration: 2000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #1C372B, #365E28)",
        },
    }).showToast();

    // Actualizo el numerito del carrito
    upadateMiniNumber();
}

// Filtro de productos para comprar
const filterProducts = (buttonToFocus, productToFocus) => {
    
    // Obtengo todos los botones
    const allTheButtons = document.querySelectorAll(".products__ul--li--button");

    // Obtengo el contenedor para renderizarlos alli
    const containerForTheProducts = document.querySelector(".cards");

    // Elimino todo lo que contiene
    containerForTheProducts.innerHTML = ""

    // Elimino la clases active de todos (aunque en realidad solo 1 lo tiene)
    allTheButtons.forEach((el) => el.classList.remove("active"));

    // Le agrego la clase active (para cambiarle el estilo) al boton que hay que hacerle focus
    buttonToFocus.classList.add("active");

    // Filtro los productos que hay que renderizar
    const filterProductsToRender = () => {
        // Inicio la variable en un array vacio
        let leakedProducts = []

        // Si el producto es mates, bombillas o yerbas lo filtro, si es algun otro (solamente puede ser all) serian todos los productos del array products
        if (productToFocus === "mates" || productToFocus === "bombillas" || productToFocus === "yerbas") {
            leakedProducts = products.filter((product) => product.type == productToFocus)
        } else {
            leakedProducts = products
        }

        // Retorno el array con los productos filtrados
        return leakedProducts
    }

    // Asigno a la variable productsToRender el array filtrado (El que retorna filterProductsToRender())
    const productsToRender = filterProductsToRender()

    // Renderizo cada producto (por eso el forEach)
    productsToRender.forEach((el) => {
        
        // Creo un div (donde va a ir todo lo del producto)
        const productToRender = document.createElement("div")
        
        // Almaceno en una variable el id del producto
        const idOfTheProduct = el.id

        // Le pongo el id al producto
        productToRender.setAttribute("id", `card-${idOfTheProduct}`)
        
        // Le agrego la clase card (para los estilos de Bootstrap)
        productToRender.classList.add("card")
        
        // Le agrego el innerHTML
        productToRender.innerHTML =
            `
        <img src='${el.image}' class='card-img-top'>
        <div class='card-body d-flex flex-column'>
            <p class='card-text'>${el.name}</p>
            <h5 class='card-title'>$${el.price}</h5>
            <button class='btn btn-success ml-auto'>Agregar al carrito</button>
        </div>
        </div>
        `

        // Agreo el producto renderizado
        containerForTheProducts.append(productToRender)

        // Creo la variable y el escuchador de eventos del boton de agregar
        const buttonOfAdd = document.querySelector (`#card-${idOfTheProduct}`)
        buttonOfAdd.addEventListener("click", () => {
            addProduct(idOfTheProduct);
        });
    })
}

// Obtengo el carrito

// Obtengo todos los botones
const button1 = document.querySelector("#card-1 div button");
const button2 = document.querySelector("#card-2 div button");
const button3 = document.querySelector("#card-3 div button");
const button4 = document.querySelector("#card-4 div button");
const button5 = document.querySelector("#card-5 div button");
const button6 = document.querySelector("#card-6 div button");
const button7 = document.querySelector("#card-7 div button");
const button8 = document.querySelector("#card-8 div button");
const button9 = document.querySelector("#card-9 div button");
const button10 = document.querySelector("#card-10 div button");
const button11 = document.querySelector("#card-11 div button");
const button12 = document.querySelector("#card-12 div button");
const button13 = document.querySelector("#card-13 div button");
const button14 = document.querySelector("#card-14 div button");
const button15 = document.querySelector("#card-15 div button");
const button16 = document.querySelector("#card-16 div button");
const button17 = document.querySelector("#card-17 div button");
const button18 = document.querySelector("#card-18 div button");

// Les pongo los escuchadores de eventos a cada uno y le pongo la respectiva id
button1.addEventListener("click", () => {
    addProduct(1);
});
button2.addEventListener("click", () => {
    addProduct(2);
});
button3.addEventListener("click", () => {
    addProduct(3);
});
button4.addEventListener("click", () => {
    addProduct(4);
});
button5.addEventListener("click", () => {
    addProduct(5);
});
button6.addEventListener("click", () => {
    addProduct(6);
});
button7.addEventListener("click", () => {
    addProduct(7);
});
button8.addEventListener("click", () => {
    addProduct(8);
});
button9.addEventListener("click", () => {
    addProduct(9);
});
button10.addEventListener("click", () => {
    addProduct(10);
});
button11.addEventListener("click", () => {
    addProduct(11);
});
button12.addEventListener("click", () => {
    addProduct(12);
});
button13.addEventListener("click", () => {
    addProduct(13);
});
button14.addEventListener("click", () => {
    addProduct(14);
});
button15.addEventListener("click", () => {
    addProduct(15);
});
button16.addEventListener("click", () => {
    addProduct(16);
});
button17.addEventListener("click", () => {
    addProduct(17);
});
button18.addEventListener("click", () => {
    addProduct(18);
});

// Obtengo los 4 botones de filtrado
const allTheProducts = document.querySelector(".all");
const mates = document.querySelector(".mates");
const bombillas = document.querySelector(".bombillas");
const yerbas = document.querySelector(".yerbas");


// Les pongo los escuchadores de eventos (con la funcion de filtrado respectivamente)
allTheProducts.addEventListener("click", () => {
    filterProducts(allTheProducts)
})
mates.addEventListener("click", () => {
    filterProducts(mates, "mates")
})
bombillas.addEventListener("click", () => {
    filterProducts(bombillas, "bombillas")
})
yerbas.addEventListener("click", () => {
    filterProducts(yerbas, "yerbas")
})


// Obtengo los productos del JSON
getJSONProducts();

// Obtengo los productos del LS (si es que hay)
getLSProducts();

// Actualizo el numerito del carrito
upadateMiniNumber();