// Conectar botones de "Agregar al Pedido" con el carrito
function connectCartButtons() {
    // Guardar el estado de la variante seleccionada para cada producto
    const selectedVariants = {};

    // Inicializar con la primera variante de cada producto
    sanguches.forEach(s => {
        selectedVariants[s.id] = 0; // índice de la primera variante
    });

    // Actualizar cuando se selecciona una variante
    document.querySelectorAll('.variant-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.sangucheId);
            const variantIndex = parseInt(e.currentTarget.dataset.variantIndex);
            selectedVariants[productId] = variantIndex;
        });
    });

    // Manejar clicks en "Agregar al Pedido"
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            const productType = btn.dataset.productType || 'sanguche';

            let product, variant;

            if (productType === 'bebida') {
                // Es una bebida - no tiene variantes
                product = bebidas.find(b => b.id === productId);
                variant = {
                    type: "Unidad",
                    price: product.price
                };
            } else {
                // Es un sanguche - tiene variantes de pan
                product = sanguches.find(s => s.id === productId);
                const variantIndex = selectedVariants[productId] || 0;
                variant = product.variants[variantIndex];
            }

            // Agregar al carrito
            cart.addToCart(product, variant);

            // NO abrir el carrito automáticamente
            // En mobile aparecerá el sticky bar
            // En desktop el usuario puede abrir manualmente con el botón del header

            // Feedback visual
            btn.innerHTML = '<i class="ph-fill ph-check"></i> ¡AGREGADO!';
            btn.style.background = 'var(--color-brand)';
            btn.style.color = 'var(--color-white)';

            setTimeout(() => {
                btn.innerHTML = '<i class="ph-bold ph-shopping-cart"></i> AGREGAR AL PEDIDO';
                btn.style.background = '';
                btn.style.color = '';
            }, 1500);
        });
    });
}
