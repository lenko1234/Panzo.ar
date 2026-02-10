# 🎯 Guía de Gestión de Promociones - Panzo.ar

## 📋 Resumen
El sistema de promociones está completamente centralizado en un objeto de configuración llamado `CONFIG_PROMO`. Toda la lógica de animación, temporizador y modal ya está armada. Solo necesitas cambiar los valores en este objeto para activar/desactivar o crear nuevas promos.

---

## 🚀 Cómo Activar/Desactivar la Promo

### Para ACTIVAR la promo:
1. Abrí `index.html`
2. Buscá la línea que dice `CONFIG_PROMO` (aproximadamente línea 2302)
3. Cambiá `activa: false` por `activa: true`
4. Guardá el archivo

### Para DESACTIVAR la promo:
1. Cambiá `activa: true` por `activa: false`
2. Guardá el archivo

**¡Así de simple!** Cuando está en `false`, el código ni siquiera intenta cargar la imagen.

---

## 🎨 Cómo Crear una Nueva Promo

Cuando quieras lanzar una nueva promoción, solo tenés que modificar los valores del objeto `CONFIG_PROMO`:

```javascript
const CONFIG_PROMO = {
    activa: true, // 🔴 Cambiar a true para activar la promo
    
    // Información de la promo
    id: 999, // ID único para el carrito (cambialo si querés trackear diferentes promos)
    titulo: "PROMO FEBRERO 2026", // 👈 Cambiá el título
    label: "promo febrero", // 👈 Texto que aparece debajo de la imagen flotante
    descripcion: "Tu descripción completa aquí...", // 👈 Descripción de la promo
    precio: 25000, // 👈 Precio de la promo (sin puntos ni comas)
    
    // Recursos visuales
    imagen: "assets/promo-nueva.png", // 👈 Ruta de la imagen de la promo
    
    // Configuración de comportamiento
    delayInicial: 3000, // Milisegundos antes de mostrar (3 segundos)
    duracion: 30000, // Cuánto dura visible (30 segundos)
    velocidadTypewriter: 30, // Velocidad del efecto de escritura
    
    // Texto del botón y variante para el carrito
    textoBoton: "🛒 AGREGAR AL PEDIDO",
    varianteTipo: "Descripción corta para el carrito" // 👈 Cómo aparece en el carrito
};
```

---

## 📝 Campos Explicados

| Campo | Qué hace | Ejemplo |
|-------|----------|---------|
| `activa` | Prende/apaga la promo | `true` o `false` |
| `id` | Identificador único en el carrito | `999`, `1000`, etc. |
| `titulo` | Título grande en el modal | `"PROMO VERANO 2026"` |
| `label` | Texto pequeño bajo la imagen flotante | `"promo verano"` |
| `descripcion` | Descripción completa de la promo | `"2 hamburguesas + papas..."` |
| `precio` | Precio en pesos (sin puntos) | `22990` (se muestra como $22.990) |
| `imagen` | Ruta a la imagen de la promo | `"assets/promo-verano.png"` |
| `delayInicial` | Milisegundos antes de aparecer | `3000` = 3 segundos |
| `duracion` | Cuánto tiempo está visible | `30000` = 30 segundos |
| `velocidadTypewriter` | Velocidad del efecto de escritura | `30` = 30ms por letra |
| `textoBoton` | Texto del botón de agregar | `"🛒 AGREGAR AL PEDIDO"` |
| `varianteTipo` | Cómo se ve en el carrito | `"Combo Especial"` |

---

## 🎬 Cómo Funciona (Detrás de Escena)

1. **Carga de página**: El sistema espera `delayInicial` milisegundos (default: 3 segundos)
2. **Pre-carga**: Carga la imagen antes de mostrar nada
3. **Aparición**: La promo aparece flotando en una posición que no tapa elementos importantes
4. **Temporizador**: Un círculo se va dibujando durante `duracion` milisegundos (default: 30 segundos)
5. **Click**: Si el usuario hace click, se abre un modal con efecto typewriter
6. **Agregar al carrito**: El botón agrega la promo al carrito con el precio configurado
7. **Auto-destrucción**: Después de `duracion` milisegundos, la promo desaparece sola

---

## ✅ Checklist para Nueva Promo

- [ ] Crear la imagen de la promo y guardarla en `assets/`
- [ ] Actualizar `imagen` con la ruta correcta
- [ ] Cambiar `titulo` y `label`
- [ ] Escribir la `descripcion` completa
- [ ] Configurar el `precio` (sin puntos ni comas)
- [ ] Actualizar `varianteTipo` para que se vea bien en el carrito
- [ ] Cambiar `activa` a `true`
- [ ] Probar en el navegador

---

## 🔧 Ejemplos de Uso

### Ejemplo 1: Promo de San Valentín
```javascript
const CONFIG_PROMO = {
    activa: true,
    id: 1001,
    titulo: "PROMO SAN VALENTÍN 💕",
    label: "especial san valentín",
    descripcion: "2 hamburguesas La Traición + 2 cervezas Corona + postre sorpresa",
    precio: 28990,
    imagen: "assets/promo-sanvalentin.png",
    delayInicial: 3000,
    duracion: 30000,
    velocidadTypewriter: 30,
    textoBoton: "🛒 PEDIR PARA DOS",
    varianteTipo: "Combo San Valentín: 2 Traiciones + 2 Coronas + Postre"
};
```

### Ejemplo 2: Promo Flash (más rápida)
```javascript
const CONFIG_PROMO = {
    activa: true,
    id: 1002,
    titulo: "FLASH SALE ⚡",
    label: "solo por hoy",
    descripcion: "50% OFF en todas las hamburguesas hasta las 18hs",
    precio: 0, // Descuento, no producto específico
    imagen: "assets/promo-flash.png",
    delayInicial: 1000, // 👈 Aparece más rápido (1 segundo)
    duracion: 15000, // 👈 Dura menos (15 segundos)
    velocidadTypewriter: 20, // 👈 Escribe más rápido
    textoBoton: "🔥 APROVECHAR AHORA",
    varianteTipo: "Flash Sale 50% OFF"
};
```

---

## 🐛 Troubleshooting

### La promo no aparece
- ✅ Verificá que `activa: true`
- ✅ Verificá que la ruta de la imagen sea correcta
- ✅ Abrí la consola del navegador (F12) y buscá errores

### La imagen no se ve
- ✅ Verificá que el archivo exista en `assets/`
- ✅ Verificá que el nombre del archivo coincida exactamente (mayúsculas/minúsculas)

### El precio se ve mal
- ✅ El precio debe ser un número sin puntos ni comas: `22990` (no `"22.990"`)
- ✅ El sistema automáticamente lo formatea con puntos

---

## 💡 Tips Pro

1. **Imágenes**: Usá imágenes cuadradas o verticales de aproximadamente 400x400px para que se vean bien
2. **Timing**: 3 segundos de delay inicial es bueno para no molestar al usuario apenas entra
3. **Duración**: 30 segundos es suficiente para que lo vean sin ser invasivo
4. **Texto**: Mantené la descripción concisa pero completa
5. **Testing**: Siempre probá la promo en modo incógnito para ver cómo la ve un usuario nuevo

---

## 🎯 Estructura del Código

Todo está en `index.html`, aproximadamente desde la línea 2301:

```
CONFIG_PROMO (línea ~2302)
    ↓
initPromoPopup() (línea ~2326)
    ↓
    ├─ Pre-carga de imagen
    ├─ Posicionamiento inteligente
    ├─ Animación de entrada
    ├─ Temporizador circular
    ├─ openPromoModal()
    │   ├─ Efecto typewriter
    │   ├─ Botón agregar al carrito
    │   └─ Cerrar modal
    └─ Auto-destrucción
```

---

**¿Dudas?** Todo el código está comentado y es fácil de entender. Si necesitás hacer cambios más avanzados, buscá la función `initPromoPopup()` en `index.html`.
