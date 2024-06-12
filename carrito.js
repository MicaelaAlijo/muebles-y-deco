document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.innerText = cart.length;
    };

    const updateTotalAmount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
        totalAmount.innerText = total.toFixed(2);
    };

    const renderCartItems = () => {
        cartItemsContainer.innerHTML = '';
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.price}</p>
                <button class="remove-from-cart" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(productElement);
        });

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                updateTotalAmount();
                renderCartItems();
            });
        });
    };

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h2').innerText;
            const productPrice = productElement.querySelector('p').innerText;

            const product = { id: productId, name: productName, price: productPrice };

            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateTotalAmount();
        });
    });

    updateCartCount();
    updateTotalAmount();
    if (cartItemsContainer) {
        renderCartItems();
    }
});