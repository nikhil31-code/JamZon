// Get cart items from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBody = document.getElementById('cart-body');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        row.innerHTML = `
            <td><img src="${item.img}" width="50"></td>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>
                <input type="number" value="${item.qty}" min="1" data-index="${index}" class="qty-input">
            </td>
            <td>₹${itemTotal}</td>
            <td><button class="remove-item" data-index="${index}">X</button></td>
        `;
        cartBody.appendChild(row);
    });

    cartTotal.textContent = total;

    // Update quantity
    document.querySelectorAll('.qty-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const idx = e.target.dataset.index;
            cart[idx].qty = parseInt(e.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.dataset.index;
            cart.splice(idx, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

renderCart();
