// ═══════════════════════════════════════════════════════════════
// 🎯 EJEMPLO RÁPIDO: Cómo cambiar la promo
// ═══════════════════════════════════════════════════════════════

// ❌ ESTADO ACTUAL (Promo desactivada)
const CONFIG_PROMO = {
    activa: false, // 🔴 La promo NO aparece
    // ... resto de la configuración
};

// ✅ PARA ACTIVAR LA PROMO ACTUAL
const CONFIG_PROMO = {
    activa: true, // ✅ Solo cambiá esto a true
    // ... resto de la configuración
};

// ═══════════════════════════════════════════════════════════════
// 🎨 EJEMPLO: Nueva promo de Marzo
// ═══════════════════════════════════════════════════════════════

const CONFIG_PROMO = {
    activa: true, // ✅ Activada

    // Información de la promo
    id: 1003, // Nuevo ID
    titulo: "PROMO MARZO 2026", // 👈 Nuevo título
    label: "promo marzo", // 👈 Nuevo label
    descripcion: "3 hamburguesas La Clásica + 1 pack de 6 Coronas + papas grandes + envío gratis", // 👈 Nueva descripción
    precio: 35990, // 👈 Nuevo precio

    // Recursos visuales
    imagen: "assets/promo-marzo.png", // 👈 Nueva imagen

    // Configuración de comportamiento (opcional cambiar)
    delayInicial: 3000,
    duracion: 30000,
    velocidadTypewriter: 30,

    // Texto del botón y variante para el carrito
    textoBoton: "🛒 AGREGAR AL PEDIDO",
    varianteTipo: "Combo Marzo: 3 Clásicas + 6 Coronas + Papas + Envío" // 👈 Nueva variante
};

// ═══════════════════════════════════════════════════════════════
// 💡 TIPS RÁPIDOS
// ═══════════════════════════════════════════════════════════════

// 1. Para DESACTIVAR: activa: false
// 2. Para ACTIVAR: activa: true
// 3. El precio es SIN puntos: 35990 (se muestra como $35.990)
// 4. La imagen debe estar en la carpeta assets/
// 5. El ID debe ser único para cada promo diferente
