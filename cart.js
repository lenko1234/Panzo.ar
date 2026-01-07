// ===== CART MANAGER =====
class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.listeners = [];
    }

    // Generar unique key para agrupar items
    generateKey(productId, variantType) {
        return `${productId}-${variantType.toLowerCase().replace(/\s+/g, '-')}`;
    }

    // Agregar al carrito
    addToCart(product, variant) {
        const key = this.generateKey(product.id, variant.type);

        if (this.items[key]) {
            // Caso A: Mismo producto + misma variante → aumentar cantidad
            this.items[key].quantity += 1;
        } else {
            // Caso B: Nueva combinación → crear nueva fila
            this.items[key] = {
                key,
                productId: product.id,
                productName: product.name,
                productImage: product.image,
                variantType: variant.type,
                price: variant.price,
                quantity: 1,
                salsaCriollaQty: 0
            };
        }

        this.saveCart();
        this.notifyListeners();
        return true;
    }

    // Actualizar cantidad
    updateQuantity(key, newQuantity) {
        if (this.items[key]) {
            if (newQuantity <= 0) {
                this.removeFromCart(key);
            } else {
                this.items[key].quantity = newQuantity;
                this.saveCart();
                this.notifyListeners();
            }
        }
    }

    // Eliminar del carrito
    removeFromCart(key) {
        delete this.items[key];
        this.saveCart();
        this.notifyListeners();
    }

    // Obtener todos los items
    getItems() {
        return Object.values(this.items);
    }

    // Calcular total
    getTotal() {
        return Object.values(this.items).reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    // Obtener cantidad total de items
    getTotalItems() {
        return Object.values(this.items).reduce((sum, item) => sum + item.quantity, 0);
    }

    // Limpiar carrito
    clearCart() {
        this.items = {};
        this.saveCart();
        this.notifyListeners();
    }

    // Actualizar cantidad de salsa criolla para un item
    updateSalsaCriollaQty(key, newQty) {
        if (this.items[key]) {
            // Limitar entre 0 y la cantidad de burgers
            const maxQty = this.items[key].quantity;
            const validQty = Math.max(0, Math.min(newQty, maxQty));

            this.items[key].salsaCriollaQty = validQty;
            this.saveCart();
            this.notifyListeners();
        }
    }

    // Persistencia
    saveCart() {
        const cartData = {
            items: this.items,
            timestamp: Date.now()
        };
        localStorage.setItem('panzo_cart', JSON.stringify(cartData));
    }

    loadCart() {
        const saved = localStorage.getItem('panzo_cart');
        if (!saved) return {};

        try {
            const cartData = JSON.parse(saved);

            // Si es formato antiguo (sin timestamp), migrar
            if (!cartData.timestamp) {
                return cartData;
            }

            // Verificar si han pasado más de 24 horas (86400000 ms)
            const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
            const now = Date.now();
            const timePassed = now - cartData.timestamp;

            if (timePassed > EXPIRATION_TIME) {
                // Carrito expirado, limpiar
                console.log('🗑️ Carrito limpiado automáticamente (más de 24 horas de inactividad)');
                localStorage.removeItem('panzo_cart');
                return {};
            }

            return cartData.items;
        } catch (error) {
            console.error('Error al cargar carrito:', error);
            return {};
        }
    }

    // Observer pattern
    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback());
    }
}

// Instancia global del carrito
const cart = new CartManager();

// ===== UI DEL CARRITO =====
function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');

    const items = cart.getItems();
    const total = cart.getTotal();
    const totalItems = cart.getTotalItems();

    // Actualizar badge
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }

    // Si está vacío
    if (items.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <i class="ph-fill ph-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }

    // Renderizar items
    cartBody.innerHTML = items.map(item => `
        <div class="cart-item">
            ${item.productImage ? `<img src="${item.productImage}" alt="${item.productName}" class="cart-item-image">` : ''}
            <div class="cart-item-details">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-2);">
                    <div style="flex: 1;">
                        <div class="cart-item-name">${item.productName}</div>
                        <div class="cart-item-variant">${item.variantType}</div>
                        <div class="cart-item-price">$${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="cart.updateQuantity('${item.key}', ${item.quantity - 1})">
                            <i class="ph-bold ph-minus"></i>
                        </button>
                        <span class="cart-qty-display">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="cart.updateQuantity('${item.key}', ${item.quantity + 1})">
                            <i class="ph-bold ph-plus"></i>
                        </button>
                        <button class="cart-item-remove" onclick="cart.removeFromCart('${item.key}')">
                            <i class="ph-bold ph-trash"></i>
                        </button>
                    </div>
                </div>
                <div style="margin-top: var(--space-2); padding-top: var(--space-2); border-top: 2px solid #eee;">
                    <div style="font-size: 0.85rem; font-weight: 700; margin-bottom: var(--space-1); color: var(--color-dark);">
                        ¿Cuántas con salsa criolla?
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                        <button class="cart-qty-btn" onclick="cart.updateSalsaCriollaQty('${item.key}', ${(item.salsaCriollaQty || 0) - 1})" style="font-size: 0.9rem;">
                            <i class="ph-bold ph-minus"></i>
                        </button>
                        <span style="min-width: 60px; text-align: center; font-weight: 700; font-size: 0.95rem; color: var(--color-dark);">
                            ${item.salsaCriollaQty || 0} / ${item.quantity}
                        </span>
                        <button class="cart-qty-btn" onclick="cart.updateSalsaCriollaQty('${item.key}', ${(item.salsaCriollaQty || 0) + 1})" style="font-size: 0.9rem;">
                            <i class="ph-bold ph-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Mostrar footer y total
    cartFooter.style.display = 'block';
    cartTotal.textContent = `$${formatPrice(total)}`;
}

// ===== STICKY CART BAR (MOBILE) =====
function renderStickyCartBar() {
    const stickyBar = document.getElementById('sticky-cart-bar');
    const stickyItems = document.getElementById('sticky-cart-items');
    const stickyTotal = document.getElementById('sticky-cart-total');

    const totalItems = cart.getTotalItems();
    const total = cart.getTotal();

    if (totalItems > 0) {
        // Mostrar barra
        stickyBar.classList.add('visible');

        // Actualizar contenido
        const itemText = totalItems === 1 ? 'item' : 'items';
        stickyItems.textContent = `${totalItems} ${itemText}`;
        stickyTotal.textContent = `$${formatPrice(total)}`;
    } else {
        // Ocultar barra
        stickyBar.classList.remove('visible');
    }
}

// Toggle del carrito con Push Effect
function toggleCart() {
    const overlay = document.getElementById('cart-overlay');
    const sidebar = document.getElementById('cart-sidebar');
    const body = document.body;

    const isOpening = !sidebar.classList.contains('active');

    if (isOpening) {
        // Abrir carrito
        body.classList.add('cart-open');
        sidebar.classList.add('active');
        overlay.classList.add('active');
    } else {
        // Cerrar carrito
        body.classList.remove('cart-open');
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Suscribirse a cambios del carrito
cart.subscribe(() => {
    renderCart();
    renderStickyCartBar();
});

// Event listeners del carrito
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    document.getElementById('cart-close').addEventListener('click', toggleCart);
    document.getElementById('cart-overlay').addEventListener('click', toggleCart);

    // Sticky bar abre el carrito
    document.getElementById('sticky-cart-bar').addEventListener('click', toggleCart);

    // Bot\u00f3n vaciar carrito
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        if (confirm('\u00bfEst\u00e1s seguro de que quer\u00e9s vaciar el carrito?')) {
            cart.clearCart();
        }
    });

    // Renderizar carrito inicial
    renderCart();
    renderStickyCartBar();
});
