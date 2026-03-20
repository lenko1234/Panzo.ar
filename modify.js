const fs = require('fs');

let content = fs.readFileSync('/home/robert/apps/Panzo.ar/index.html', 'utf8');

// 1. Google Fonts
content = content.replace(
    /family=Bebas\+Neue&family=Space\+Grotesk:wght@500;700;900&display=swap/g,
    'family=Bebas+Neue&family=Open+Sans:wght@400;600;700&family=Pacifico&family=Space+Grotesk:wght@500;700;900&display=swap'
);

// 2. CSS Vars
content = content.replace(
    /--color-brand: #C01117;\s*\/\* Rojo vibrante \*\/\s*--color-brand-dark: #D50000;\s*--color-dark: #121212;\s*\/\* Negro puro \*\/\s*--color-light: #FFFCF2;\s*\/\* Crema muy suave \*\/\s*--color-white: #FFFFFF;/g,
    `--color-brand: #AA2107;\n            --color-brand-dark: #8A1A05;\n            --color-dark: #121212;\n            --color-light: #FAEBAD;\n            --color-white: #FAEBAD;\n            --color-pure-white: #FFFFFF;`
);

// 3. Body styles
content = content.replace(
    /body {\n            font-family: 'Bebas Neue', sans-serif;\n            background-color: var\(--color-dark\);\n            color: var\(--color-white\);/g,
    `body {\n            font-family: 'Bebas Neue', sans-serif;\n            background-color: var(--color-white);\n            color: var(--color-dark);`
);

content = content.replace(
    /\.feed-section {\n            padding-block: var\(--space-16\);\n            background-color: var\(--color-dark\);\n            color: var\(--color-white\);\n        }/g,
    `.feed-section {\n            padding-block: var(--space-16);\n            background-color: var(--color-white);\n            color: var(--color-dark);\n        }`
);

// 4. Featured Burger Section wrapper
content = content.replace(
    /\.featured-burger-section {([^}]*)}/g,
    (match) => {
        return `.featured-burger-section {\n            background-color: var(--color-brand);\n            border-radius: var(--radius-lg);\n            overflow: hidden;\n            position: relative;\n            display: flex;\n            flex-direction: column;\n            align-items: stretch;\n            justify-content: flex-start;\n            margin-bottom: var(--space-8);\n            border: 4px solid var(--color-dark);\n            box-shadow: 12px 12px 0px var(--color-dark);\n            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n        }\n        .featured-burger-section:hover {\n            transform: translate(-4px, -4px);\n            box-shadow: 16px 16px 0px var(--color-dark);\n        }`;
    }
);

// 5. Hamburguesas Array
const newHamburguesas = `// --- DATA: Hamburguesas (ACTIVO) ---
        const hamburguesas = [
            {
                id: 105,
                name: "THE BACON ISLAND",
                ingredients: "Pan común, medallón de 120gr, cheddar, mermelada de bacon y salsa mil islas.",
                icon: "ph-fill ph-hamburger",
                badge: "🏝️ BURGER DEL MES",
                image: "assets/new design/PANZO (5).png",
                variants: [
                    { type: "Simple", price: 11499 },
                    { type: "Doble", price: 14599 }
                ]
            },
            {
                id: 103,
                name: "LA CLÁSICA",
                ingredients: "Pan común, medallón de 120gr, doble cheddar, lechuga repollada, tomate y mayonesa Hellmann's.",
                icon: "ph-fill ph-hamburger",
                image: "assets/new design/PANZO (1).png",
                variants: [
                    { type: "Simple", price: 9999 },
                    { type: "Doble", price: 13999 }
                ]
            },
            {
                id: 104,
                name: "CUARTO DE LIBRA",
                ingredients: "Medallón de 120gr, doble cheddar por medallón, cebolla brunoise, kétchup y mostaza.",
                icon: "ph-fill ph-hamburger",
                image: "assets/new design/PANZO (3).png",
                variants: [
                    { type: "Simple", price: 10499 },
                    { type: "Doble", price: 13999 }
                ]
            },
            {
                id: 101,
                name: "LA TRAICIÓN",
                ingredients: "Pan común, doble medallón de 120gr, bacon, doble cheddar por medallón, cebolla y nuestra salsa golf especial.",
                icon: "ph-fill ph-hamburger",
                image: "assets/new design/PANZO (6).png",
                variants: [
                    { type: "Doble", price: 13999 },
                    { type: "Triple", price: 17999 }
                ]
            },
        ];`;

content = content.replace(
    /\/\/ --- DATA: Hamburguesas \(ACTIVO\) ---[\s\S]*?const sanguches = \[\];/g,
    newHamburguesas + '\n\n        const sanguches = [];'
);

// 6. renderHamburguesas function logic
const newRenderHamburguesas = `// --- Renderizar Hamburguesas ---
        function renderHamburguesas() {
            const grid = document.getElementById('hamburguesas-grid');
            const placeholder = document.getElementById('hamburguesas-placeholder');

            if (hamburguesas.length > 0) {
                placeholder.style.display = 'none';
            }

            hamburguesas.forEach((hamburguesa, index) => {
                const featured = document.createElement('div');
                featured.className = 'featured-burger-section fade-in-up';
                featured.style.transitionDelay = \`\${(index + 1) * 100}ms\`;

                const initialPrice = hamburguesa.variants[0].price;

                featured.innerHTML = \`
                    <div class="featured-media-container" style="position: relative; width: 100%; aspect-ratio: 4/5; border-bottom: 4px solid var(--color-dark); background-color: var(--color-light); overflow: hidden;">
                        <img src="\${hamburguesa.image}" alt="\${hamburguesa.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                        \${hamburguesa.badge ? \`<div class="burger-mes-badge" style="position: absolute; top: var(--space-4); left: var(--space-4); background: var(--color-accent); font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; color: var(--color-dark); padding: var(--space-2) var(--space-4); border: 3px solid var(--color-dark); box-shadow: 6px 6px 0px var(--color-dark); transform: rotate(-5deg);">\${hamburguesa.badge}</div>\` : ''}
                    </div>
                    
                    <div class="featured-content" style="background-color: var(--color-brand); padding: var(--space-8) var(--space-5); display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: var(--space-5); text-align: center; z-index: 10;">
                        
                        <h2 class="featured-title" style="font-family: 'Pacifico', cursive; text-transform: none; color: #FFFFFF; font-size: clamp(2.8rem, 8vw, 4.5rem); text-shadow: 4px 4px 0px var(--color-dark); margin-bottom: 0; line-height: 1.1; letter-spacing: normal;">
                            \${hamburguesa.name}
                        </h2>
                        
                        <p class="featured-tagline" style="font-family: 'Open Sans', sans-serif; position: relative; bottom: auto; left: auto; transform: none; text-shadow: none; color: #FFFFFF; font-size: 1.05rem; max-width: 500px; text-align: center; font-weight: 600; line-height: 1.5; margin: 0 auto; width: 100%;">
                            \${hamburguesa.ingredients}
                        </p>
                        
                        <div class="featured-purchase-bar" style="position: relative; bottom: auto; left: auto; transform: none; width: 100%; max-width: 500px; padding: var(--space-4); background: #FFFFFF; border: 4px solid var(--color-dark); box-shadow: 8px 8px 0px var(--color-dark); display: flex; flex-direction: column; gap: var(--space-4); margin-top: var(--space-4); border-radius: 0;">
                            <div class="purchase-row" style="margin-bottom: 0; display: flex; justify-content: space-between; align-items: center;">
                                <div class="variants-pills" style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    \${hamburguesa.variants.map((variant, vIndex) => \`
                                        <button 
                                            class="variant-pill \${vIndex === 0 ? 'active' : ''}" 
                                            data-sanguche-id="\${hamburguesa.id}" 
                                            data-variant-index="\${vIndex}"
                                            data-price="\${variant.price}"
                                            style="padding: 6px 14px; font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; border: 2px solid var(--color-dark); background: \${vIndex === 0 ? 'var(--color-dark)' : 'transparent'}; color: \${vIndex === 0 ? '#FFFFFF' : 'var(--color-dark)'}; cursor: pointer;"
                                        >
                                            \${variant.type}
                                        </button>
                                    \`).join('')}
                                </div>
                                <div class="price-display" data-price-display="\${hamburguesa.id}" style="font-family: 'Bebas Neue', sans-serif; font-size: 3rem; color: var(--color-brand-dark); line-height: 1;">
                                    $\${formatPrice(initialPrice)}
                                </div>
                            </div>
                            
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="\${hamburguesa.id}" style="width: 100%; font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 0.05em; padding-block: var(--space-3); border-radius: 0;">
                                AGREGAR AL PEDIDO <i class="ph-bold ph-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                \`;

                // Agregar al grid directamente
                grid.appendChild(featured);
            });
        }`;

content = content.replace(
    /\/\/ --- Renderizar Hamburguesas ---[\s\S]*?function renderEncargues\(\) {/g,
    newRenderHamburguesas + '\n\n        // --- Renderizar Encargues ---\n        function renderEncargues() {'
);

// 7. Remove CSS rules that disrupt the new layout
content = content.replace(/\.featured-media-container video,\s*\.featured-media-container img {\s*width: 100%;\s*height: 100%;\s*object-fit: contain;\s*transform: scale\(1\.3\) translateY\(0\);\s*transition: transform 0\.3s ease;\s*}/g,
    `.featured-media-container video,
        .featured-media-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            /* transform removed */
        }`
);

// Remove specific desktop adjustments that interfere with static layout
content = content.replace(/@media \(min-width: 769px\) {\s*\.featured-burger-section {([^}]*)}\s*\.featured-title {([^}]*)}\s*\.featured-media-container video,[\s\S]*?}\s*\.featured-tagline {([^}]*)}\s*\/\* Video del sanguche más chico en desktop \*\/[\s\S]*?}\s*}/g, 
"");
content = content.replace(/@media \(max-width: 768px\) {[\s\S]*?\.featured-content {\s*padding-top: 0;\s*}\s*}/g, "");

content = content.replace(/grid\.parentNode\.insertBefore\(featured, grid\);/g, "// insertBefore removed");

fs.writeFileSync('/home/robert/apps/Panzo.ar/index.html', content);
console.log('Update successful');
