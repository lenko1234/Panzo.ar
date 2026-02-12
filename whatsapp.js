// ===== WHATSAPP CON EXTRAS =====

const WHATSAPP_NUMBER = '5493442678312'; // Tu número de WhatsApp

// Crear mensaje de WhatsApp con extras
function createWhatsAppMessage() {
    const items = cart.getItems();

    if (items.length === 0) {
        alert('Tu carrito está vacío');
        return null;
    }

    // Mensaje con formato específico
    let message = 'Hola, te encargo el siguiente pedido:\n\n';

    items.forEach((item, index) => {
        message += `${index + 1}. ${item.productName}`;

        // Solo agregar variante si no es "Unidad" (bebidas)
        if (item.variantType !== 'Unidad') {
            message += ` - ${item.variantType}`;
        }

        message += '\n';

        // Agregar extras si tiene
        const extrasLabels = {
            bacon: 'Bacon',
            medallon: 'Medallón + 2 Cheddar',
            papas: 'Papas fritas',
            cebolla: 'Cebolla',
            cebollaCaramelizada: 'Cebolla caramelizada',
            salsa: getSalsaLabel(item.productId)
        };

        let hasExtras = false;
        for (const [extraKey, extraLabel] of Object.entries(extrasLabels)) {
            const qty = item.extras?.[extraKey] || 0;
            if (qty > 0) {
                if (!hasExtras) {
                    message += '   Extras:\n';
                    hasExtras = true;
                }
                message += `   • ${qty}x ${extraLabel}\n`;
            }
        }

        // Agregar comentarios si tiene
        if (item.comments && item.comments.trim() !== '') {
            message += `   💬 ${item.comments.trim()}\n`;
        }

        message += '\n';
    });

    // Agregar total del pedido
    const total = cart.getTotal();
    message += `💰 Total: $${formatPrice(total)}\n\n`;

    // Agregar alias
    message += 'Alias: Alehartvig\n\n';

    message += 'Gracias.';

    return message;
}

// Abrir WhatsApp con el mensaje
function sendWhatsAppOrder() {
    const message = createWhatsAppMessage();

    if (!message) return;

    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Abrir en nueva ventana
    window.open(whatsappURL, '_blank');
}

// Event listener para el botón de WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', sendWhatsAppOrder);
    }
});
