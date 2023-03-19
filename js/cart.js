// Funcion para renderizar los productos
const renderProducts = () => {

    // Borro lo que hay (para no renderizar lo mismo)
    productsContainer.innerHTML = "";

    // Todo lo que se ejecuta para agregar un producto (por eso el forEach)
    cart.forEach(product => {

        // Creacion de los elementos, ponerle las clases y algunos atributos
        const productDOM = document.createElement("div")
        productDOM.className = "product d-flex flex-wrap align-items-center justify-content-between p-3"

        // Le pongo el contenido (con los valores con los templates literals o backticks)
        productDOM.innerHTML =
            `
        
            <img class='product__img' src='${product.image}'>
            <div class='product__name'>
                <p class='fs-5 text-center title'>Producto</p>
                <p class='fs-4 text-center text'>${product.name}</p>
            </div>
            <div class='product__amount d-flex align-items-center'>  
                <p class="fs-2 m-3 quit">-</p>
                <div>
                    <p class='fs-5 text-center title'>Cantidad</p>
                    <p class='fs-4 text-center text'>${product.amount}</p>
                </div>
                <p class="fs-2 m-3 add">+</p>
            </div>
            <div class='product__total'>
                <p class='fs-5 text-center title'>Total</p>
                <p class='fs-4 text-center text'>${product.amount * product.price}</p>
            </div>
        
        `

        // Obtengo el boton de agregar o quitar cantidad de los productos
        const addButton = productDOM.querySelector(".add");
        const quitButton = productDOM.querySelector(".quit");

        addButton.addEventListener("click", () => {

            // Aumente la cantidad en uno mediante Sugar Syntax
            product.amount++;

            // Actulizo el LS
            updateLocalStorage();

            // Renderizo nuevamente los productos con todo actualizado
            renderProducts();
        });

        quitButton.addEventListener("click", () => {

            // Permito la disminucion de la cantidad en 1 si es mayor a 1
            if (product.amount > 1) {

                // Disminuyo la cantidad en 1
                product.amount--;

                // Actulizo el LS
                updateLocalStorage();

                // Renderizo nuevamente los productos con todo actualizado
                renderProducts();
            }
        });

        // Creo el boton de eliminar con las clases de Bootstrap (para los estilos) y le pongo de contenido (con templates literals o backticks) "Eliminar y el nombre del producto"
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger";
        deleteButton.innerText = `Eliminar ${product.name}`;

        // Le agrego la funcionalidad al boton de eliminar
        deleteButton.addEventListener("click", () => {
            // Busco índice donde está el elemento en el array
            const indexDelete = cart.findIndex((productForDelete) => productForDelete.name === product.name);

            // Borro el producto utilizando el índice del array obtenido en lo anterior
            cart.splice(indexDelete, 1);

            // Actulizo el LS
            updateLocalStorage();

            // Renderizo el array nuevamente
            renderProducts();
        });

        // Agrego el boton de eliminar
        productDOM.append(deleteButton)

        // Agrego todo al DOM
        productsContainer.append(productDOM);
    });

    // Ejecuto la funcion de renderizar totales asi se actualiza simultaneamente con los productos
    updatePrices()
}

const updatePrices = () => {

    // Obtengo el precio de cada producto con funciones de orden superior
    const matesTotal = (cart.filter(product => product.type === "mates")).reduce((total, product) => total + (product.price * product.amount), 0);
    const bombillasTotal = (cart.filter(product => product.type === "bombillas")).reduce((total, product) => total + (product.price * product.amount), 0);
    const yerbasTotal = (cart.filter(product => product.type === "yerbas")).reduce((total, product) => total + (product.price * product.amount), 0);

    // Sumo todo y le saco el IVA (en arg el 21%)
    const IVA = ((matesTotal + bombillasTotal + yerbasTotal) * 0.21)

    // Sumo el total de todo
    const total = matesTotal + bombillasTotal + yerbasTotal + IVA

    // Obtengo el lugar donde van los totales
    const matesTotalDiv = document.querySelector(".total__mate--total")
    const bombillasTotalDiv = document.querySelector(".total__bombilla--total")
    const yerbasTotallDiv = document.querySelector(".total__yerba--total")
    const IVATotalDiv = document.querySelector(".total__iva--total")
    const totalTotalDiv = document.querySelector(".total__total--total")

    // Les pongo los resultados a cada uno (parseandolos a enteros)
    matesTotalDiv.innerText = parseInt(matesTotal)
    bombillasTotalDiv.innerText = parseInt(bombillasTotal)
    yerbasTotallDiv.innerText = parseInt(yerbasTotal)
    IVATotalDiv.innerText = parseInt(IVA)
    totalTotalDiv.innerText = parseInt(total)
}

const loadFinalConfirmationInfo = () => {
    finalProductsContainer.innerHTML = ""

    cart.forEach((product) => {
        // Creacion de los elementos, ponerle las clases y algunos atributos
        const productDOM = document.createElement("div")
        productDOM.className = "product d-flex flex-wrap align-items-center justify-content-between p-3"

        // Le pongo el contenido (con los valores con los templates literals o backticks)
        productDOM.innerHTML =
            `
        
            <img class='product__img' src='${product.image}'>
            <div class='product__name'>
                <p class='fs-5 text-center title'>Producto</p>
                <p class='fs-4 text-center text'>${product.name}</p>
            </div>
            <div class='product__amount d-flex align-items-center'>  
                <div>
                    <p class='fs-5 text-center title'>Cantidad</p>
                    <p class='fs-4 text-center text'>${product.amount}</p>
                </div>
            </div>
            <div class='product__total'>
                <p class='fs-5 text-center title'>Total</p>
                <p class='fs-4 text-center text'>${product.amount * product.price}</p>
            </div>
            
        `

        finalProductsContainer.append(productDOM)
    })

    // Le inserto la informacion personal a su contenedor
    finalDataContainer.innerHTML = confirmPersonalData
}

// Declaro la variable que contendra el mensaje con los datos
let confirmPersonalData = ""

// Obtengo el contenedor de los productos
const productsContainer = document.querySelector(".products");

// Obtengo el contenedor de los productos finales
const finalProductsContainer = document.querySelector(".cart-confirmation");

// Obtengo el contenedor de la informacion finale
const finalDataContainer = document.querySelector(".data-confirmation");

// Obtengo los botones de confirmacion
const confirmCartButton = document.querySelector(".confirm-cart")
const finalButtonConfirmation = document.querySelector(".final-button-confirmation")

// Obtengo el form
const form = document.querySelector(".form")

// Obtengo las secciones
const confirmCart = document.querySelector(".cart_confirmation")
const confirmData = document.querySelector(".data_confirmation")
const confirmConfirm = document.querySelector(".confirmation-confirmation")

// Le agrego el escuchador de eventos a los botones de confirmacion con su respectiva funcion
confirmCartButton.addEventListener("click", () => {
    // Sweet alert
    Swal.fire({
        icon: 'success',
        title: 'Carrito confirmado!',
    })

    // Elimino la seccion, pongo la siguiente
    confirmCart.classList.add("d-none")
    confirmData.classList.remove("d-none")
})

// Escuchador de eventos del boton de la compra final
finalButtonConfirmation.addEventListener("click", () => {

    // Elimino el carrito ya que supuestamente ya se "compro"
    localStorage.clear()

    // Sweet alert
    Swal.fire({
        title: 'Estas seguro de que quieres confimar la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero mi compra!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Compra confirmada',
                'Nos comunicaremos con vos via mail a la brevedad',
                'success'
            )
            setTimeout (function() {
                window.location.href = "../index.html";
              }, 10000)
        }
    })
    
})

// Le agrego el escuchador de eventos a los botones de confirmacion con su respectiva funcion
form.addEventListener("submit", (e) => {

    // Para que la pagina no se recargue
    e.preventDefault()

    // Obtengo los inputs
    const inputName = document.querySelector(".input-name")
    const inputSurname = document.querySelector(".input-surname")
    const inputCountry = document.querySelector(".input-country")
    const inputProvince = document.querySelector(".input-province")
    const inputCity = document.querySelector(".input-city")
    const inputStreet = document.querySelector(".input-street")
    const inputPlace = document.querySelector(".input-place")
    const inputPostalCode = document.querySelector(".input-postal-code")
    const inputMail = document.querySelector(".input-mail")
    const inputPhone = document.querySelector(".input-phone")
    const inputCardName = document.querySelector(".input-card-name")
    const inputCardNumber = document.querySelector(".input-card-number")
    const inputExpiration = document.querySelector(".input-expiration")
    const inputSecureCode = document.querySelector(".input-secure-code")

    // hago un html con los valores de los inputs mediante backticks o templates literals
    confirmPersonalData =
        `
                  <div class='personal-data'>
                      <div class='name'>${inputName.value} ${inputSurname.value}</div>
                      <div class='place'>${inputCountry.value} - ${inputProvince.value} - ${inputCity.value}</div>
                      <div class='direction'>${inputPostalCode.value} - ${inputStreet.value} ${inputPlace.value}</div>
                      <div class='contact'>${inputMail.value} - ${inputPhone.value}</div>
                  </div>
                  <div class='payment-data'>
                      <div class='payment-data-content'>${inputCardName.value} - ${inputCardNumber.value}</div>
                      <div class='payment-data-content'>${inputExpiration.value} - ${inputSecureCode.value}</div>
                  </div>
                  <div class='total'>Total: ${parseInt((cart.reduce((total, product) => total + (product.price * product.amount), 0)) * 1.21)}</div>
        `

    // Sweet alert
    Swal.fire({
        icon: 'success',
        title: 'Informacion personal y de pago confirmada!',
    })

    // Elimino la seccion, pongo la siguiente
    confirmData.classList.add("d-none")
    confirmConfirm.classList.remove("d-none")

    // Agrego la informacion de la ultima seccion
    loadFinalConfirmationInfo()

    // Retorno la informacion personal
    return confirmPersonalData
})

// Obtengo los productos del JSON
getJSONProducts();

// Obtengo los productos del LS (si es que hay)
getLSProducts();

// Renderizo los productos
renderProducts()