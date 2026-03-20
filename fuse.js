const fs = require('fs');

// Read files
const oldIndex = fs.readFileSync('index.html', 'utf8');
let newDesign = fs.readFileSync('newdesign.html', 'utf8');

// 1. EXTRACT SCRIPTS AND ARRAYS FROM index.html
const scriptsStart = oldIndex.indexOf('<script src="cart.js"></script>');
const scriptsEnd = oldIndex.indexOf('</body>');
let scriptsBlock = oldIndex.substring(scriptsStart, scriptsEnd);

// Modify renderHamburguesas in scriptsBlock to generate newdesign format
const renderHambRegex = /\/\/ --- Renderizar Hamburguesas ---[\s\S]*?\/\/ --- Renderizar Bebidas ---/;
const newRenderHamb = `// --- Renderizar Hamburguesas ---
        function renderHamburguesas() {
            const grid = document.getElementById('hamburguesas-grid');
            if(!grid) return;

            hamburguesas.forEach((hamburguesa, index) => {
                const card = document.createElement('div');
                card.className = 'card fade-in-up';
                
                // Variantes
                let priceBoxesHtml = '';
                if(hamburguesa.variants && hamburguesa.variants.length > 0) {
                    priceBoxesHtml = hamburguesa.variants.map((v, i) => \`
                        <div class="price-box variant-pill \${i===0 ? 'active' : ''}" 
                             data-sanguche-id="\${hamburguesa.id}" 
                             data-variant-index="\${i}" 
                             onclick="selectPrice(this)">
                            <span class="price-label">\${v.type.toUpperCase() === 'SIMPLE' ? 'SIMPLE' : v.type.toUpperCase() === 'DOBLE' ? 'DOBLE' : v.type.toUpperCase() === 'PORCIÓN REGULAR' ? 'REGULAR' : v.type.toUpperCase() === 'PORCIÓN GRANDE' ? 'GRANDE' : 'TRIPLE'}</span>
                            <span class="price-amount">$\${formatPrice(v.price)}</span>
                        </div>
                    \`).join('');
                }

                let displayTitle = hamburguesa.name;
                if(displayTitle.toUpperCase() === "LA CLÁSICA" || displayTitle.toUpperCase() === "CLASICA") displayTitle = "La Clásica";
                else if(displayTitle.toUpperCase() === "LA TRAICIÓN" || displayTitle.toUpperCase() === "TRAICION") displayTitle = "La Traición";
                else if(displayTitle.toUpperCase() === "CUARTO DE LIBRA") displayTitle = '<span style="white-space: nowrap;">Cuarto de libra</span>';
                else if(displayTitle.toUpperCase() === "BURGER DEL MES") displayTitle = '<span style="white-space: nowrap;">Burger del</span><br>mes';

                let displayIngredients = hamburguesa.ingredients.toLowerCase();
                displayIngredients = displayIngredients.replace('pan común,', 'pan,');
                displayIngredients = displayIngredients.replace('pan de papa,', 'pan,');
                displayIngredients = displayIngredients.replace('120', '<span style="font-family: \\\\\\'Archivo Black\\\\\\', sans-serif; font-size: 1.05em; letter-spacing: 0;">120</span>');

                let imageStyle = '';
                if(hamburguesa.name.toUpperCase() === "CUARTO DE LIBRA") imageStyle = 'transform: translate(-50%, -50%) scale(1.7);';

                card.innerHTML = \`
                    <div class="card-header">
                        <img src="assets/logo-panzo.png" alt="Panzo" class="card-logo">
                    </div>
                    <div class="card-inner">
                        <h2 class="card-burger-title">\${displayTitle}</h2>
                        <img src="\${hamburguesa.image}" alt="\${hamburguesa.name}" class="card-image" style="\${imageStyle}">
                        <p class="card-ingredients">\${displayIngredients}</p>
                    </div>
                    <div class="card-footer">
                        \${priceBoxesHtml}
                    </div>
                    <button class="order-btn add-to-cart-btn" data-product-id="\${hamburguesa.id}">
                        AGREGAR AL PEDIDO <i class="ph-bold ph-shopping-cart"></i>
                    </button>
                \`;
                
                grid.appendChild(card);
            });
        }
        
        // --- Cambiar precio UI interactivo
        function selectPrice(boxElement) {
            const footer = boxElement.parentElement;
            const boxes = footer.querySelectorAll('.price-box');
            boxes.forEach(box => box.classList.remove('active'));
            boxElement.classList.add('active');
        }

        // --- Renderizar Bebidas ---`;
scriptsBlock = scriptsBlock.replace(renderHambRegex, newRenderHamb);


// 2. EXTRACT SIDEBAR CART, STICKY CART AND NAVBAR FROM index.html
const navRegex = /<header class="header" id="header">[\s\S]*?<\/header>/;
const navHtml = oldIndex.match(navRegex)[0];

const sidebarRegex = /<!-- CARRITO SIDEBAR -->[\s\S]*?<!-- FOOTER -->/;
const sidebarHtml = oldIndex.match(sidebarRegex)[0].replace('<!-- FOOTER -->', '');

const stickyCartRegex = /<!-- STICKY CART BAR \(MOBILE\) -->[\s\S]*?<!-- CARRITO SIDEBAR -->/;
const stickyHtml = oldIndex.match(stickyCartRegex)[0].replace('<!-- CARRITO SIDEBAR -->', '');

const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
const footerHtml = oldIndex.match(footerRegex)[0];

const encarguesRegex = /<section id="encargues-section"[\s\S]*?<\/section>/;
const encarguesHtml = oldIndex.match(encarguesRegex)[0];

const bebidasRegex = /<section id="bebidas-section"[\s\S]*?<\/section>/;
const bebidasHtml = oldIndex.match(bebidasRegex)[0];

const ctaRegex = /<!-- CTA FINAL -->[\s\S]*?<\/section>/;
const ctaHtml = oldIndex.match(ctaRegex)[0];

// 3. EXTRACT CSS DE COMPONENTES DEL CART Y NAV DE index.html
const stylesMatch = oldIndex.match(/<style>([\s\S]*?)<\/style>/)[1];

// Sacamos root vars para index.html cart/nav components
const rootVarsMatch = stylesMatch.match(/:root \{[\s\S]*?\}/)[0];

// Variables y utilidades
let cartNavCSS = `
        /* --- ESTILOS INYECTADOS DE INDEX.HTML (Carrito, Nav, Footer, Misc) --- */
        ${rootVarsMatch}

        button { font-family: 'Bebas Neue', sans-serif; cursor: pointer; }
        .ph-bold, .ph-fill { display: inline-block; vertical-align: middle; }
        
        .container {
            width: 100%;
            max-width: 1400px;
            margin-inline: auto;
            padding-inline: var(--space-5);
        }

        /* Botones genéricos de index */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--space-2);
            padding: var(--space-3) var(--space-6);
            font-size: 1.25rem;
            font-weight: 700;
            border: var(--border-thick);
            border-radius: var(--radius-full);
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
            cursor: pointer;
            text-transform: uppercase;
        }

        .btn-primary {
            background-color: var(--color-brand);
            color: var(--color-white);
            border-color: var(--color-dark);
        }
        .btn-primary:hover {
            transform: translate(-4px, -4px);
            box-shadow: var(--shadow-pop);
        }
`;

// Extract other structural CSS from oldIndex using simple keywords
const keywords = ['.header', '.cart-overlay', '.cart-sidebar', '.cart-header', '.cart-body', '.cart-item', '.cart-footer', '.sticky-cart-bar', '.badge', '.feed-section', '.encargue', '.post-'];
let extractedIndexCssLines = [];
let capture = false;
let brackets = 0;
let currentBlock = [];

// A very hacky css extractor for specific classes needed
const lines = stylesMatch.split('\n');
for (let line of lines) {
    let _line = line.trim();
    if (!capture) {
        if (_line.includes('{') && keywords.some(k => _line.includes(k))) {
            capture = true;
            brackets = (_line.match(/\{/g) || []).length - (_line.match(/\}/g) || []).length;
            currentBlock.push(line);
        }
    } else {
        currentBlock.push(line);
        brackets += (_line.match(/\{/g) || []).length - (_line.match(/\}/g) || []).length;
        if (brackets <= 0) {
            extractedIndexCssLines.push(currentBlock.join('\n'));
            capture = false;
            currentBlock = [];
        }
    }
}
cartNavCSS += extractedIndexCssLines.join('\n');

// Also add media queries broadly if they relate to cart header etc
cartNavCSS += `
        @media (max-width: 768px) {
            .sticky-cart-bar { display: flex; }
            body.cart-open .sticky-cart-bar { transform: translateY(100%); }
        }
`;

// 4. MODIFY newdesign.html
// 4a. Add Phosphor icons to head
newDesign = newDesign.replace(/<\/title>/, `</title>\n    <!-- Iconos Phosphor -->\n    <script src="https://unpkg.com/@phosphor-icons/web" defer></script>`);
// 4b. Add extracted CSS
newDesign = newDesign.replace(/<\/style>/, cartNavCSS + '\n    </style>');
// 4c. Inject Header before Title
newDesign = newDesign.replace(/<div class="checkerboard"><\/div>/, navHtml + '\n    <div class="checkerboard" style="margin-top: 80px;"></div>');
// 4d. Replace Cards Container with empty dynamic Grid
const cardsRegex = /<!-- Contenedor del Grid -->[\s\S]*?<!-- Borde Checkerboard Inferior -->/;
newDesign = newDesign.replace(cardsRegex, `<!-- Contenedor del Grid -->\n    <div id="hamburguesas-grid" class="cards-container"></div>\n\n    ${encarguesHtml}\n    ${bebidasHtml}\n    ${ctaHtml}\n\n    <!-- Borde Checkerboard Inferior -->`);
// 4e. Inject sidebars, footer, scripts at bottom
const scriptsInjection = `
    ${stickyHtml}
    ${sidebarHtml}
    ${footerHtml}
    ${scriptsBlock}
`;
newDesign = newDesign.replace(/<script>[\s\S]*?<\/script>/, ''); // Remove old simple toggle script from newdesign
newDesign = newDesign.replace(/<\/body>/, scriptsInjection + '\n</body>');

fs.writeFileSync('newdesign.html', newDesign);
console.log('FUSION COMPLETE!');
