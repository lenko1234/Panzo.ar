// ===== WHATSAPP SIMPLE (SIN PRECIOS) =====

const WHATSAPP_NUMBER = '5493442678312'; // Tu número de WhatsApp

// Crear mensaje de WhatsApp simple y limpio
function createWhatsAppMessage() {
    const items = cart.getItems();

    if (items.length === 0) {
        alert('Tu carrito está vacío');
        return null;
    }

    // Mensaje con formato específico
    let message = 'Hola, te encargo el siguiente pedido:\n\n';

    items.forEach((item) => {
        message += `${item.quantity}x ${item.productName}`;

        // Solo agregar variante si no es "Unidad" (bebidas)
        if (item.variantType !== 'Unidad') {
            message += ` - ${item.variantType}`;
        }

        message += '\n';
    });

    message += '\nGracias.';

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
