// ===== CART MANAGER =====
class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.listeners = [];
        this.nextId = this.getNextId();
    }

    // Generar ID único para cada item individual
    getNextId() {
        const items = Object.values(this.items);
        if (items.length === 0) return 1;
        return Math.max(...items.map(item => item.uniqueId || 0)) + 1;
    }

    // Agregar al carrito (SIEMPRE como item individual)
    addToCart(product, variant, isVeggie = false) {
        const uniqueId = this.nextId++;
        const key = `item-${uniqueId}`;

        // Crear nuevo item individual con extras vacíos
        this.items[key] = {
            key,
            uniqueId,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            variantType: variant.type,
            price: variant.price,
            quantity: 1, // Siempre 1 por item individual
            isVeggie: isVeggie,
            comments: '', // Comentarios personalizados
            extras: {
                bacon: 0,
                medallon: 0,
                papas: 0,
                cebolla: 0,
                cebollaCaramelizada: 0,
                salsa: 0,
                pepinillos: 0
            }
        };

        this.saveCart();
        this.notifyListeners();

        // Animar el botón del carrito
        animateCartButton();

        return true;
    }

    // Actualizar cantidad de un extra específico
    updateExtra(key, extraName, newQuantity) {
        if (this.items[key]) {
            this.items[key].extras[extraName] = Math.max(0, newQuantity);
            this.saveCart();
            this.notifyListeners();
        }
    }

    // Actualizar comentarios de un item (sin re-render para evitar saltos)
    updateComments(key, comments) {
        if (this.items[key]) {
            this.items[key].comments = comments;
            this.saveCart();
            // NO llamamos notifyListeners() para evitar re-render mientras se escribe
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

    // Calcular total de un item (precio base + extras)
    getItemTotal(item) {
        // Si no tiene extras (items antiguos), solo devolver el precio base
        if (!item.extras) {
            return item.price * (item.quantity || 1);
        }

        const extrasTotal =
            ((item.extras.bacon || 0) * 1000) +
            ((item.extras.medallon || 0) * 5000) +
            ((item.extras.papas || 0) * 2000) +
            ((item.extras.cebolla || 0) * 100) +
            ((item.extras.cebollaCaramelizada || 0) * 200) +
            ((item.extras.salsa || 0) * 300) +
            ((item.extras.pepinillos || 0) * 700);

        return item.price + extrasTotal;
    }

    // Calcular total del carrito
    getTotal() {
        return Object.values(this.items).reduce((sum, item) => {
            return sum + this.getItemTotal(item);
        }, 0);
    }

    // Obtener cantidad total de items
    getTotalItems() {
        return Object.values(this.items).length;
    }

    // Limpiar carrito
    clearCart() {
        this.items = {};
        this.nextId = 1;
        this.saveCart();
        this.notifyListeners();
    }

    // Persistencia
    saveCart() {
        const cartData = {
            items: this.items,
            nextId: this.nextId,
            timestamp: Date.now()
        };
        localStorage.setItem('panzo_cart', JSON.stringify(cartData));
    }

    loadCart() {
        const saved = localStorage.getItem('panzo_cart');
        if (!saved) return {};

        try {
            const cartData = JSON.parse(saved);

            // Si es formato antiguo (sin timestamp), limpiar
            if (!cartData.timestamp) {
                console.log('🗑️ Carrito antiguo detectado, limpiando...');
                localStorage.removeItem('panzo_cart');
                return {};
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

            // Actualizar nextId si existe
            if (cartData.nextId) {
                this.nextId = cartData.nextId;
            }

            // Migrar items antiguos que no tienen extras
            const migratedItems = {};
            for (const [key, item] of Object.entries(cartData.items)) {
                if (!item.extras) {
                    console.log(`🔄 Migrando item antiguo: ${item.productName}`);
                    // Limpiar items antiguos que no son compatibles
                    continue;
                }
                // Agregar campo comments si no existe
                if (!item.hasOwnProperty('comments')) {
                    item.comments = '';
                }
                migratedItems[key] = item;
            }

            return migratedItems;
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

// Estado de paneles abiertos
const openExtras = new Set();

// ===== UI DEL CARRITO =====
function renderCart() {
    const cartBody = document.getElementById('cart-body');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');

    // Guardar qué paneles están abiertos antes de re-renderizar
    const currentlyOpen = [];
    document.querySelectorAll('.extras-panel').forEach(panel => {
        if (panel.style.display !== 'none') {
            currentlyOpen.push(panel.id.replace('extras-', ''));
        }
    });

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
    cartBody.innerHTML = items.map(item => {
        // Determinar si es una bebida (IDs 5, 6, 7)
        const isBebida = [5, 6, 7].includes(item.productId);
        const itemTotal = cart.getItemTotal(item);

        // Contar cuántos extras tiene seleccionados
        const extrasCount = Object.values(item.extras || {}).reduce((sum, qty) => sum + qty, 0);

        return `
        <div class="cart-item">
            <div class="cart-item-details">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-2);">
                    <div style="flex: 1;">
                        <div class="cart-item-name">${item.productName} ${item.isVeggie ? '<span style="color: #28a745; font-size: 0.75rem; margin-horizontal: 5px; vertical-align: middle;">[VEGGIE 🌱]</span>' : ''}</div>
                        <div class="cart-item-variant">${item.variantType}</div>
                        <div class="cart-item-price">$${formatPrice(itemTotal)}</div>
                    </div>
                    <button class="cart-item-remove" onclick="cart.removeFromCart('${item.key}')">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </div>
                ${!isBebida ? `
                <div style="margin-top: var(--space-3);">
                    <button class="extras-toggle" onclick="toggleExtras('${item.key}')" style="width: 100%; display: flex; align-items: center; justify-content: space-between; background: #f5f5f5; border: none; padding: var(--space-2) var(--space-3); border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.9rem; color: var(--color-dark); transition: all 0.2s ease;">
                        <span>
                            <i class="ph-bold ph-plus-circle" style="margin-right: 6px; color: var(--color-brand);"></i>
                            Extras ${extrasCount > 0 ? `(${extrasCount})` : ''}
                        </span>
                        <i class="ph-bold ph-caret-down extras-arrow" id="arrow-${item.key}" style="transition: transform 0.3s ease;"></i>
                    </button>
                    <div class="extras-panel" id="extras-${item.key}" style="display: none; margin-top: var(--space-2); padding: var(--space-3); background: #fafafa; border-radius: 8px; border: 2px solid #eee;">
                        ${renderExtrasPanel(item)}
                    </div>
                </div>
                ` : ''}
                <div style="margin-top: var(--space-3);">
                    <textarea 
                        id="comments-${item.key}"
                        placeholder="Comentarios..."
                        style="width: 100%; min-height: 50px; padding: var(--space-2); border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; font-size: 0.85rem; resize: vertical; transition: border-color 0.2s ease;"
                        oninput="cart.updateComments('${item.key}', this.value)"
                        onfocus="this.style.borderColor='var(--color-brand)'"
                        onblur="this.style.borderColor='#e0e0e0'"
                    >${item.comments || ''}</textarea>
                </div>
            </div>
        </div>
        `;
    }).join('');

    // Mostrar footer y total
    cartFooter.style.display = 'block';
    cartTotal.textContent = `$${formatPrice(total)}`;

    // Restaurar paneles abiertos
    currentlyOpen.forEach(key => {
        const panel = document.getElementById(`extras-${key}`);
        const arrow = document.getElementById(`arrow-${key}`);
        if (panel && arrow) {
            panel.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
            openExtras.add(key);
        }
    });
}

// Renderizar panel de extras
function renderExtrasPanel(item) {
    const extras = [
        { name: 'bacon', label: 'Bacon', price: 1000 },
        { name: 'medallon', label: 'Medallón + 2 Cheddar', price: 5000 },
        { name: 'papas', label: 'Papas fritas', price: 2000 },
        { name: 'cebolla', label: 'Cebolla', price: 100 },
        { name: 'cebollaCaramelizada', label: 'Cebolla caramelizada', price: 200 },
        { name: 'salsa', label: getSalsaLabel(item.productId), price: 300 },
        { name: 'pepinillos', label: 'Pepinillos', price: 700 }
    ];

    return extras.map(extra => {
        const qty = item.extras[extra.name] || 0;
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2); padding-bottom: var(--space-2); border-bottom: 1px solid #e0e0e0;">
                <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.85rem; color: var(--color-dark);">${extra.label}</div>
                    <div style="font-size: 0.75rem; color: #666;">+$${formatPrice(extra.price)}</div>
                </div>
                <div style="display: flex; align-items: center; gap: var(--space-2);">
                    <button class="cart-qty-btn" onclick="cart.updateExtra('${item.key}', '${extra.name}', ${qty - 1})" style="font-size: 0.8rem; width: 28px; height: 28px;">
                        <i class="ph-bold ph-minus"></i>
                    </button>
                    <span style="min-width: 30px; text-align: center; font-weight: 700; font-size: 0.9rem; color: var(--color-dark);">${qty}</span>
                    <button class="cart-qty-btn" onclick="cart.updateExtra('${item.key}', '${extra.name}', ${qty + 1})" style="font-size: 0.8rem; width: 28px; height: 28px;">
                        <i class="ph-bold ph-plus"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Obtener label de salsa según la hamburguesa
function getSalsaLabel(productId) {
    const salsas = {
        101: 'Salsa Golf',      // La Traición
        102: 'Salsa Panzo',     // La Traición 2.0
        103: 'Mayonesa',        // La Clásica
        104: 'Kétchup/Mostaza', // Cuarto de Libra
        201: 'Mayo Barbacoa'    // Bondiola
    };
    return salsas[productId] || 'Salsa';
}

// Toggle de extras
function toggleExtras(itemKey) {
    const panel = document.getElementById(`extras-${itemKey}`);
    const arrow = document.getElementById(`arrow-${itemKey}`);

    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        panel.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
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

// Animar el botón del carrito cuando se agrega algo
function animateCartButton() {
    const stickyIcon = document.querySelector('.sticky-cart-icon');
    const stickyItems = document.querySelector('.sticky-cart-items');

    if (!stickyIcon || !stickyItems) return;

    // Animar el ícono rojo (resplandor blanco interno)
    stickyIcon.classList.remove('glow-animation');
    void stickyIcon.offsetWidth; // Force reflow para reiniciar la animación
    stickyIcon.classList.add('glow-animation');

    // Animar el texto del número de items
    stickyItems.classList.remove('grow-animation');
    void stickyItems.offsetWidth; // Force reflow
    stickyItems.classList.add('grow-animation');

    // Remover las clases después de que termine la animación
    setTimeout(() => {
        stickyIcon.classList.remove('glow-animation');
        stickyItems.classList.remove('grow-animation');
    }, 500);
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

    // Botón vaciar carrito
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que querés vaciar el carrito?')) {
            cart.clearCart();
        }
    });

    // Renderizar carrito inicial
    renderCart();
    renderStickyCartBar();
});
