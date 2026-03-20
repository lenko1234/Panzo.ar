const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');
let nd = fs.readFileSync('newdesign.html', 'utf8');

// 1. EXTRAER CSS de newdesign.html (Borrando body/html) y pegarlo en index.html
const styleMatch = nd.match(/<style>([\s\S]*?)<\/style>/);
if(styleMatch) {
    let addStyles = `
        /* === ESTILOS NUEVOS (NEW DESIGN) === */
        .nd-card {
            background-color: var(--color-bg);
            padding: 15px;
            display: flex;
            flex-direction: column;
            border-radius: var(--radius-md);
        }
        .nd-card-inner {
            background-color: var(--color-bg);
            border-radius: var(--radius-md);
            padding: 20px 15px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            position: relative;
            min-height: 420px;
            overflow: hidden;
        }
        .nd-card-header {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 80px;
            margin-bottom: 5px;
        }
        .nd-card-logo {
            height: 75px;
            object-fit: contain;
        }
        .nd-card-burger-title {
            font-family: 'Yellowtail', cursive;
            color: var(--color-card-bg);
            font-size: clamp(3rem, 7vw, 5rem);
            text-align: center;
            margin: 0;
            line-height: 1;
            position: relative;
            z-index: 2;
            top: -0.45em;
            text-shadow: -4px -4px 0 var(--color-brand), 4px -4px 0 var(--color-brand), -4px 4px 0 var(--color-brand), 4px 4px 0 var(--color-brand), -4px 0px 0 var(--color-brand), 4px 0px 0 var(--color-brand), 0px -4px 0 var(--color-brand), 0px 4px 0 var(--color-brand);
        }
        .nd-card-image {
            width: 120%;
            height: auto;
            object-fit: contain;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            pointer-events: none;
        }
        .nd-card-ingredients {
            font-family: 'Extenda Peta', sans-serif;
            color: var(--color-card-bg);
            font-size: 0.85rem;
            text-align: center;
            line-height: 1.3;
            letter-spacing: 0.03em;
            margin: 0;
            position: relative;
            z-index: 2;
        }
        .nd-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 12px;
            gap: 8px;
        }
        .nd-price-box {
            cursor: pointer;
            opacity: 0.4;
            transition: opacity 0.2s;
            display: flex;
            gap: 6px;
            align-items: baseline;
            color: var(--color-bg);
            line-height: 1;
        }
        .nd-price-box.active {
            opacity: 1;
        }
        .nd-price-label {
            font-family: 'Extenda Peta', sans-serif;
            font-size: clamp(1.2rem, 3vw, 1.9rem);
            color: var(--color-bg);
        }
        .nd-price-amount {
            font-family: 'Archivo Black', sans-serif;
            font-size: clamp(1.4rem, 3.8vw, 2.2rem);
            color: var(--color-bg);
        }
        .nd-order-btn {
            background-color: transparent;
            color: var(--color-bg);
            font-family: 'Extenda Peta', sans-serif;
            font-size: 1.6rem;
            border: 3px solid var(--color-bg);
            border-radius: 8px;
            padding: 12px;
            width: 100%;
            margin-top: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            letter-spacing: 0.05em;
        }
        .nd-order-btn:hover {
            background-color: var(--color-card-bg);
            color: var(--color-bg);
            transform: translateY(-4px);
            box-shadow: 4px 4px 0px var(--color-bg);
        }
    `;
    index = index.replace(/<\/style>/, addStyles + '\n</style>');
}

// 1.5 MANTEL BACKGROUND Update
index = index.replace(/\.mantel-bg \{[\s\S]*?\}/, `.mantel-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    background-color: var(--color-card-bg);
    background-image: conic-gradient(var(--color-bg) 90deg, var(--color-card-bg) 90deg 180deg, var(--color-bg) 180deg 270deg, var(--color-card-bg) 270deg);
    background-size: 60px 60px;
    background-repeat: repeat;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease, visibility 0.5s ease;
    pointer-events: none;
}`);
// Fonts injection
if(!index.includes('Yellowtail')) {
    index = index.replace(/@font-face \{[\s\S]*?TT Backwards Script[\s\S]*?\}/, `@font-face {
            font-family: 'Yellowtail';
            src: url('assets/new design/Yellowtail-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }`);
}

// 2. ACTUALIZAR renderHamburguesas()
const newRender = `
        // Función para cambiar de precio en UI interactivo de abajo
        function selectPrice(boxElement) {
            const footer = boxElement.parentElement;
            const boxes = footer.querySelectorAll('.nd-price-box');
            boxes.forEach(box => box.classList.remove('active'));
            boxElement.classList.add('active');
        }

        // --- Renderizar Hamburguesas ---
        function renderHamburguesas() {
            const grid = document.getElementById('hamburguesas-grid');
            const placeholder = document.getElementById('hamburguesas-placeholder');

            if (hamburguesas.length > 0) {
                placeholder.style.display = 'none';
            }

            // Actualizar el GRID visual de hamburguesas a cards mas anchas (como poster)
            grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(320px, 1fr))";
            
            hamburguesas.forEach((hamburguesa, index) => {
                const card = document.createElement('div');
                card.className = 'nd-card fade-in-up';
                card.style.transitionDelay = \`\${(index + 1) * 100}ms\`;
                card.style.backgroundColor = "var(--color-card-bg)"; // color crema
                
                // Procesar variantes
                let priceBoxesHtml = '';
                if(hamburguesa.variants && hamburguesa.variants.length > 0) {
                    priceBoxesHtml = hamburguesa.variants.map((v, i) => \`
                        <div class="nd-price-box variant-pill \${i===0 ? 'active' : ''}" 
                             data-sanguche-id="\${hamburguesa.id}" 
                             data-variant-index="\${i}" 
                             onclick="selectPrice(this)">
                            <span class="nd-price-label">\${v.type.toUpperCase() === 'SIMPLE' ? 'SIMPLE' : v.type.toUpperCase() === 'DOBLE' ? 'DOBLE' : v.type.toUpperCase() === 'PORCIÓN REGULAR' ? 'REGULAR' : v.type.toUpperCase() === 'PORCIÓN GRANDE' ? 'GRANDE' : 'TRIPLE'}</span>
                            <span class="nd-price-amount">$\${formatPrice(v.price)}</span>
                        </div>
                    \`).join('');
                }

                // Generar HTML Final de la Card (estilo Poster newdesign)
                let displayTitle = hamburguesa.name;
                if(displayTitle.toUpperCase() === "LA CLÁSICA" || displayTitle.toUpperCase() === "CLASICA" || displayTitle.toUpperCase() === "LA CLASICA") displayTitle = "La Clásica";
                if(displayTitle.toUpperCase() === "TRAICIÓN" || displayTitle.toUpperCase() === "LA TRAICIÓN" || displayTitle.toUpperCase() === "LA TRAICION") displayTitle = "La Traición";
                if(displayTitle.toUpperCase() === "CUARTO DE LIBRA") displayTitle = '<span style="white-space: nowrap;">Cuarto de libra</span>';
                if(displayTitle.toUpperCase() === "COMBO CLÁSICO") displayTitle = 'Combo Clásico';

                let displayIngredients = hamburguesa.ingredients.toLowerCase();
                displayIngredients = displayIngredients.replace('pan de papa,', 'pan,');
                displayIngredients = displayIngredients.replace('pan común,', 'pan,');
                displayIngredients = displayIngredients.replace('120', '<span style="font-family: \\'Archivo Black\\', sans-serif; font-size: 1.05em; letter-spacing: 0;">120</span>');

                let imageStyle = 'transform: translate(-50%, -50%) scale(1.6);';
                if(hamburguesa.name.toUpperCase() === "CUARTO DE LIBRA") imageStyle = 'transform: translate(-50%, -50%) scale(1.7);';

                card.innerHTML = \`
                    <div class="nd-card-header">
                        <img src="assets/logo-panzo.png" alt="Panzo" class="nd-card-logo">
                    </div>
                    <div class="nd-card-inner">
                        <h2 class="nd-card-burger-title">\${displayTitle}</h2>
                        <img src="\${hamburguesa.image}" alt="\${hamburguesa.name}" class="nd-card-image" style="\${imageStyle}">
                        <p class="nd-card-ingredients">\${displayIngredients}</p>
                    </div>
                    <div class="nd-card-footer">
                        \${priceBoxesHtml}
                    </div>
                    <button class="nd-order-btn add-to-cart-btn" data-product-id="\${hamburguesa.id}">
                        AGREGAR AL PEDIDO <i class="ph-bold ph-shopping-cart"></i>
                    </button>
                \`;
                
                grid.appendChild(card);
            });
        }
`;

index = index.replace(/\/\/ --- Renderizar Hamburguesas ---[\s\S]*?\/\/ --- Renderizar Bebidas ---/, newRender + "\n        // --- Renderizar Bebidas ---");

fs.writeFileSync('index.html', index);
console.log("Migracion completada!!");
