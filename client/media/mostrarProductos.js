const shopContent = document.getElementById("shopContent");
const cart = []; // este es nuestro carrito es un array vacio
const productos = [
    {
        id: 1,
        productName: "AB. - The Secret Absolute",
        price: 14200,
        quanty: 1,
        img: "/img/1.png",

    },
    {
        id: 2,
        productName: "PR. - Invictus Parfum",
        price: 15100,
        quanty: 1,
        img: "/img/2.png",
    },
    {
        id: 3,
        productName: "VERSACE - Eros Parfum",
        price: 9000,
        quanty: 1,
        img: "/img/3.png",
    },
    {
        id: 4,
        productName: "DIOR - Sauvage Edt",
        price: 7600,
        quanty: 1,
        img: "/img/4.png",
    },
    {
        id: 5,
        productName: "NIKOS - Sculpture Homme",
        price: 3520,
        quanty: 1,
        img: "/img/5.png",
    },
    {
        id: 6,
        productName: "AZZARO - Azzaro Sport",
        price: 6900,
        quanty: 1,
        img: "/img/6.png",
    },

    {
        id: 7,
        productName: "LATTAFA - Yara Candy",
        price: 16790,
        quanty: 1,
        img: "/img/7.png",

    },
    {
        id: 8,
        productName: "LATTAFA - Musaman",
        price: 22000,
        quanty: 1,
        img: "/img/8.png",
    },
    {
        id: 9,
        productName: "BENSIMON - Bold Intense",
        price: 11500,
        quanty: 1,
        img: "/img/9.png",
    },
    {
        id: 10,
        productName: "LATTAFA - Qaed Al Fursan",
        price: 9900,
        quanty: 1,
        img: "/img/10.png",
    },
    {
        id: 11,
        productName: "LATTAFA - Yara Tous",
        price: 4850,
        quanty: 1,
        img: "/img/11.png",
    },
    {
        id: 12,
        productName: "LATTAFA - Yara Moi",
        price: 8000,
        quanty: 1,
        img: "/img/12.png",
    },
    {
        id: 13,
        productName: "LATTAFA - Sakeen",
        price: 4800,
        quanty: 1,
        img: "/img/13.png",
    },
    {
        id: 14,
        productName: "MAISON - Victorioso ",
        price: 2550,
        quanty: 1,
        img: "/img/14.png",
    },
    {
        id: 15,
        productName: "LATTAFA - Emeer",
        price: 11800,
        quanty: 1,
        img: "/img/15.png",
    },

];

const newProducts = [
    {
        id: 101,
        productName: "AB - The icon elixir",
        price: 55.99,
        img: "/img/17.png",
        quanty: 1
    },
    {
        id: 102,
        productName: "AB - Blue seduction",
        price: 65.99,
        img: "/img/18.png",
        quanty: 1
    },
    {
        id: 103,
        productName: "AB - Her secret tempt",
        price: 75.99,
        img: "/img/19.png",
        quanty: 1
    },
    {
        id: 104,
        productName: "AB - Her secret kiss",
        price: 85.99,
        img: "/img/20.png",
        quanty: 1
    }
];
//cart
const modalOverlay = document.getElementById("modal-overlay");
const cartBtn = document.getElementById("cart-btn");
const cartCounter = document.getElementById("cart-counter");
const modalContainer = document.getElementById("modal-container")

const displayCart = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    modalOverlay.style.display = "block";
    // modal header
    const modalHeader = document.createElement("div");

    const modalClose = document.createElement("div");
    modalClose.innerText = "❌"
    modalClose.className = "modal-close";
    modalHeader.append(modalClose);

    modalClose.addEventListener("click", () => {
        modalContainer.style.display = "none";
        modalOverlay.style.display = "none";
    });


    const modalTitle = document.createElement("div");
    modalTitle.innerText = "Carrito de Compras";
    modalTitle.className = "modal-title";
    modalHeader.append(modalTitle);

    modalContainer.append(modalHeader);

    //modal body
    if (cart.length > 0) {
        cart.forEach((product) => {
            const modalBody = document.createElement("div");
            modalBody.className = "modal-body";
            modalBody.innerHTML = `
        <div class="product">
                <img class="product-img" src="${product.img}" />
                <div class="product-info">
                    <h4>${product.productName}</h4>
                </div>
            <div class="quantity">
                <span class="quantity-btn-decrease">-</span>
                <span class="quantity-input">${product.quanty}</span>
                <span class="quantity-btn-increase">+</span>
            </div>
                <div class="price">$ ${product.price * product.quanty} </div>
                <div class="delete-product">✘</div>
        </div>
        `;
            modalContainer.append(modalBody);

            const decrease = modalBody.querySelector(".quantity-btn-decrease");
            decrease.addEventListener("click", () => {
                if (product.quanty !== 1) {
                    product.quanty--;
                    displayCart();
                    displayCartCouter();
                }
            });

            const increase = modalBody.querySelector(".quantity-btn-increase");
            increase.addEventListener("click", () => {
                product.quanty++;
                displayCart();
                displayCartCouter();
            });

            //delete product
            const deleteProduct = modalBody.querySelector(".delete-product");
            deleteProduct.addEventListener("click", () => {
                deleteCartProduct(product.id);
            });
        });

        //modal footer
        const total = cart.reduce((acc, el) => acc + el.price * el.quanty, 0);

        const modalFooter = document.createElement("div");
        modalFooter.className = "modal-footer"
        modalFooter.innerHTML = `
    <div class="total-price">Total: $ ${total} </div>
    <button class="btn-primary" id="checkout-btn">go to checkout</button>
    <div id="wallet_container"></div>
    `;
        modalContainer.append(modalFooter);

        //mp
        const mp = new MercadoPago("TEST-39324c82-2493-4ad8-8db8-e82024ec25e9", {
            locale: "es-AR",
        });

        //funcion que genera un titulo con la info del carrito
        const generateCartDescription = () => {
            return cart.map(product => `${product.productName} (x${product.quanty})`).join(', ');
        };

        document.getElementById("checkout-btn").addEventListener("click", async () => {
            try {
                const orderData = {
                    title: generateCartDescription(),
                    quantity: 1,
                    price: total,
                };

                const response = await fetch("http://localhost:8080/create_preference", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orderData),
                });

                const preference = await response.json();
                createCheckoutButton(preference.id);
            } catch (error) {
                alert("error :(");
            }
        });
        const createCheckoutButton = (preferenceId) => {
            const bricksBuilder = mp.bricks();

            const renderComponent = async () => {
                if (window.checkoutButton) window.checkoutButton.unmount();

                await bricksBuilder.create("wallet", "wallet_container", {
                    initialization: {
                        preferenceId: preferenceId,
                    },
                });
            };
            renderComponent();
        };

    } else {
        const modalText = document.createElement("h2");
        modalText.className = "modal-body";
        modalText.innerText = "Tu carrito está vacio";
        modalContainer.append(modalText);
    };
};


cartBtn.addEventListener("click", displayCart);

const deleteCartProduct = (id) => {
    const foundId = cart.findIndex((element) => element.id === id);
    cart.splice(foundId, 1);
    displayCart();
    displayCartCouter();
}

const displayCartCouter = () => {
    const cartLength = cart.reduce((acc, el) => acc + el.quanty, 0);
    if (cartLength > 0) {
        cartCounter.style.display = "block";
        cartCounter.innerText = cartLength;
    } else {
        cartCounter.style.display = "none";
    }
};
// Mostrar productos
productos.forEach((product) => {
    const content = document.createElement("div");
    content.innerHTML = `
    <img src='${product.img}'>
    <p>${product.productName}</p>
    <p>$ ${product.price} <p>
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

    buyButton.addEventListener("click", () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id) {
                    prod.quanty++;
                    displayCartCouter();
                }
            })
        } else {
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            displayCartCouter();
        }
    });
});

const newProductsContainer = document.getElementById("newProductsContainer");

newProducts.forEach((product) => {
    // Crear el contenedor para cada producto
    const content = document.createElement("div");
    content.classList.add("product");

    // Generar el HTML para el producto
    content.innerHTML = `
        <img src="${product.img}" alt="${product.productName}">
        <p>${product.productName}</p>
        <p>$${product.price}</p>
    `;

    // Botón para agregar a favoritos
    const favoriteButton = document.createElement("button");
    favoriteButton.innerText = "❤ Favorito";
    favoriteButton.addEventListener("click", () => {
        const isFavorite = favorites.some(fav => fav.id === product.id);
        if (!isFavorite) {
            favorites.push(product);
            saveFavorites();
            alert("Producto agregado a favoritos");
        } else {
            alert("El producto ya está en favoritos");
        }
    });
    content.append(favoriteButton);

    // Botón para agregar al carrito
    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";
    buyButton.addEventListener("click", () => {
        const repeat = cart.some((repeatProduct) => repeatProduct.id === product.id);

        if (repeat) {
            cart.map((prod) => {
                if (prod.id === product.id) {
                    prod.quanty++;
                    displayCartCounter();
                }
            });
        } else {
            cart.push({
                id: product.id,
                productName: product.productName,
                price: product.price,
                quanty: product.quanty,
                img: product.img,
            });
            saveCart();
            displayCartCounter();
        }
    });
    content.append(buyButton);

    // Añadir el producto al contenedor de nuevos productos
    newProductsContainer.append(content);
});

