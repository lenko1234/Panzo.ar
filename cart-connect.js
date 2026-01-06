// Conectar botones de "Agregar al Pedido" con el carrito
function connectCartButtons() {
    // Guardar el estado de la variante seleccionada para cada producto
    const selectedVariants = {};

    // Combinar todos los productos que tienen variantes para inicializar
    const productsWithVariants = [
        ...(typeof hamburguesas !== 'undefined' ? hamburguesas : []),
        ...(typeof sanguches !== 'undefined' ? sanguches : []),
        ...(typeof focacciasBackup !== 'undefined' ? focacciasBackup : [])
    ];

    // Inicializar con la primera variante de cada producto
    productsWithVariants.forEach(p => {
        selectedVariants[p.id] = 0; // índice de la primera variante
    });

    // Actualizar cuando se selecciona una variante
    // Usamos delegación o nos aseguramos de que existan
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
                product = beveragesArray().find(b => b.id === productId);
                variant = {
                    type: "Unidad",
                    price: product ? product.price : 0
                };
            } else {
                // Es un sanguche o hamburguesa - tiene variantes de pan/tamaño
                product = productsWithVariants.find(p => p.id === productId);

                if (product) {
                    const variantIndex = selectedVariants[productId] || 0;
                    variant = product.variants[variantIndex];
                }
            }

            if (product && variant) {
                // Agregar al carrito
                cart.addToCart(product, variant);

                // Feedback visual
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="ph-fill ph-check"></i> ¡AGREGADO!';
                btn.classList.add('btn-success'); // O usar estilos inline como antes

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('btn-success');
                }, 1500);
            }
        });
    });

    // Helper para obtener bebidas
    function beveragesArray() {
        return typeof bebidas !== 'undefined' ? bebidas : [];
    }
}
