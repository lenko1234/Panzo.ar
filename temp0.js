
        // --- DATA: Focaccias (BACKUP - Para usar cuando vuelvan) ---
        const focacciasBackup = [
            {
                id: 1,
                name: "PANZO ORIGINAL",
                ingredients: "Pan de masa madre, jamón crudo, tomates cherry confitados, mayonesa de palta, queso sardo, rúcula fresca y huevo revuelto.",
                icon: "ph-fill ph-hamburger",
                gradient: "linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-dark) 100%)",
                badge: "ORIGINAL",
                image: "assets/optimized/panzo-original.webp",
                variants: [
                    { type: "Focaccia XXL (26cm)", price: 12999 },
                    { type: "Ciabatta", price: 10999 },
                    { type: "Focaccia Clásica (20cm)", price: 10999 }
                ]
            },
            {
                id: 2,
                name: "PANZO VEGGIE",
                ingredients: "Pan de masa madre, salteado de vegetales, pesto de albahaca, mayonesa casera, queso tybo fundido, cebollas caramelizadas, lechuga mantecosa, tomates cherry confitados y rúcula.",
                icon: "ph-fill ph-leaf",
                gradient: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
                image: "assets/optimized/panzo-veggie.webp",
                variants: [
                    { type: "Focaccia XXL (26cm)", price: 10999 },
                    { type: "Ciabatta", price: 8999 },
                    { type: "Focaccia Clásica (20cm)", price: 8999 }
                ]
            },
            {
                id: 3,
                name: "PANZO BRAVO",
                ingredients: "Pan de masa madre, pollo desmenuzado a la mostaza, lechuga mantecosa, mayonesa casera, panceta, huevo y cebollas caramelizadas.",
                icon: "ph-fill ph-fire",
                gradient: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
                image: "assets/optimized/panzo-bravo.webp",
                variants: [
                    { type: "Focaccia XXL (26cm)", price: 13999 },
                    { type: "Ciabatta", price: 11999 },
                    { type: "Focaccia Clásica (20cm)", price: 12999 }
                ]
            },
            {
                id: 4,
                name: "PANZO PIG",
                ingredients: "Pan de masa madre, bondiola a la cerveza, zanahorias asadas, morrones asados, cebolla, cebolla de verdeo y mayonesa casera.",
                icon: "ph-fill ph-beer-bottle",
                gradient: "linear-gradient(135deg, #8B4513 0%, #5D2E0F 100%)",
                image: "assets/optimized/panzo-pig.webp",
                variants: [
                    { type: "Focaccia XXL (26cm)", price: 14999 },
                    { type: "Ciabatta", price: 12999 },
                    { type: "Focaccia Clásica (20cm)", price: 12999 }
                ]
            }
        ];

        // --- DATA: Hamburguesas (ACTIVO) ---
        const hamburguesas = [
            {
                id: 106,
                name: "Combo Clásico",
                ingredients: "1 clásica + 1 papas fritas sazonadas + 1 gaseosa de vidrio a elección.",
                icon: "ph-fill ph-hamburger",
                badge: "🍟 NUEVO COMBO",
                image: "assets/optimized/combo-clasico.webp",
                variants: [
                    { type: "Simple", price: 13999 },
                    { type: "Doble", price: 17999 }
                ]
            },
            {
                id: 103,
                name: "La Clásica",
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
                name: "Cuarto De Libra",
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
                name: "La Traición",
                ingredients: "Pan común, doble medallón de 120gr, bacon, doble cheddar por medallón, cebolla y nuestra salsa golf especial.",
                icon: "ph-fill ph-hamburger",
                image: "assets/new design/PANZO (5).png",
                variants: [
                    { type: "Doble", price: 13999 },
                    { type: "Triple", price: 17999 }
                ]
            },
            {
                id: 107,
                name: "Papas Fritas Sazonadas",
                ingredients: "Porción de nuestras papas fritas súper crocantes, espolvoreadas con sazonador secreto de la casa.",
                icon: "ph-fill ph-hand-coins",
                image: "assets/new design/PANZO (6).png",
                variants: [
                    { type: "Porción regular", price: 4999 },
                    { type: "Porción grande", price: 6999 }
                ]
            }
        ];

        const sanguches = [];

        // --- DATA: Encargues (solo por pedido previo para el día siguiente) ---
        const encargues = [
            {
                id: 201,
                name: "LA BONDIOLA",
                subtitle: "Los secretos de la bondiola",
                ingredients: "Pan de focaccia con topping de trocitos de milan, bondiola desmechada a la cerveza, cebolla salteada, morrón y cebolla de verdeo con mayonesa de barbacoa.",
                video: "assets/freepik_a-cinematic-product-showcase-of-a-wide-thick-sandw_kling_1080p_9-16_24fps_31479.mp4",
                whatsappMsg: "Hola Panzo! Quiero hacer un encargue de LA BONDIOLA para mañana 🥖"
            }
        ];

        // --- DATA: Bebidas ---
        const bebidas = [
            {
                id: 5,
                name: "COCA COLA DE VIDRIO",
                description: "Coca Cola de vidrio de 237ml",
                image: "assets/optimized/coca-cola.webp",
                price: 2000,
                icon: "ph-fill ph-wine"
            },
            {
                id: 6,
                name: "CERVEZA CORONA",
                description: "Cerveza marca Corona 330cm3",
                image: "assets/optimized/corona-pack.webp",
                price: 3000,
                icon: "ph-fill ph-beer-bottle"
            },
            {
                id: 7,
                name: "CORONA PACK x6",
                description: "Pack de cerveza marca Corona por 6 unidades",
                image: "assets/optimized/corona.webp",
                price: 15000,
                icon: "ph-fill ph-package"
            }
        ];

        // --- Función para formatear precio ---
        function formatPrice(price) {
            return price.toLocaleString('es-AR');
        }

        // --- Renderizar Hamburguesas ---
        function renderHamburguesas() {
            const grid = document.getElementById('hamburguesas-grid');
            if (!grid) return;
            hamburguesas.forEach((hamburguesa, index) => {
                const card = document.createElement('div');
                card.className = 'nd-card fade-in-up';
                card.style.transitionDelay = `${(index + 1) * 100}ms`;

                let priceBoxesHtml = '';
                if(hamburguesa.variants && hamburguesa.variants.length > 0) {
                    priceBoxesHtml = hamburguesa.variants.map((v, i) => `
                        <div class="nd-price-box variant-pill ${i===0 ? 'active' : ''}" 
                             data-sanguche-id="${hamburguesa.id}" 
                             data-variant-index="${i}" 
                             onclick="selectPrice(this)">
                            <span class="nd-price-label">${v.type.toUpperCase()}</span>
                            <span class="nd-price-amount">${formatPrice(v.price)}</span>
                        </div>
                    `).join('');
                }

                let displayTitle = hamburguesa.name;
                if(displayTitle.toUpperCase() === "CLÁSICA" || displayTitle.toUpperCase() === "CLASICA") displayTitle = "La Clásica";
                if(displayTitle.toUpperCase() === "TRAICIÓN" || displayTitle.toUpperCase() === "TRAICION") displayTitle = "La Traición";
                if(displayTitle.toUpperCase() === "CUARTO DE LIBRA") displayTitle = '<span style="white-space: nowrap;">Cuarto de libra</span>';
                if(displayTitle.toUpperCase() === "BURGER DEL MES") displayTitle = '<span style="white-space: nowrap;">Burger del</span><br>mes';

                let displayIngredients = hamburguesa.ingredients.toLowerCase();
                displayIngredients = displayIngredients.replace('pan de papa,', 'pan,');
                displayIngredients = displayIngredients.replace('120', '<span style="font-family: \'Archivo Black\', sans-serif; font-size: 1.05em; letter-spacing: 0;">120</span>');

                let imageStyle = 'transform: translate(-50%, -50%) scale(1.6);';
                if(hamburguesa.name.toUpperCase() === "CUARTO DE LIBRA") imageStyle = 'transform: translate(-50%, -50%) scale(1.7);';

                card.innerHTML = `
                    <div class="nd-card-header">
                        <img src="assets/logo-panzo.png" alt="Panzo" class="nd-card-logo">
                    </div>
                    <div class="nd-card-inner">
                        <h2 class="nd-card-burger-title">${displayTitle}</h2>
                        <img src="${hamburguesa.image}" alt="${hamburguesa.name}" class="nd-card-image" style="${imageStyle}">
                        <p class="nd-card-ingredients">${displayIngredients}</p>
                    </div>
                    <div class="nd-card-footer">
                        ${priceBoxesHtml}
                    </div>
                    <button class="nd-order-btn add-to-cart-btn" data-product-id="${hamburguesa.id}">
                        AGREGAR AL PEDIDO <i class="ph-bold ph-shopping-cart"></i>
                    </button>
                `;
                
                grid.appendChild(card);
            });
        }

        // --- Renderizar Bebidas ---
        function renderBebidas() {
            const grid = document.getElementById('bebidas-grid');
            if (!grid) return;
            bebidas.forEach((bebida, index) => {
                const card = document.createElement('article');
                card.className = 'post-card fade-in-up';
                card.style.transitionDelay = `${(index + 1) * 80}ms`;
                const imageContent = bebida.image
                    ? `<img src="${bebida.image}" alt="${bebida.name}" class="post-img" loading="lazy" decoding="async" style="height:100%;object-fit:cover;">`
                    : `<div style="width:100%;height:100%;background:var(--color-brand);display:flex;align-items:center;justify-content:center;"><i class="${bebida.icon}" style="font-size:6rem;color:white;opacity:0.4;"></i></div>`;
                card.innerHTML = `
                    <div class="post-header">
                        <div class="avatar-circle"></div>
                        <span class="post-username">panzo.ar</span>
                    </div>
                    <div class="post-img-container">${imageContent}</div>
                    <div class="post-footer">
                        <p class="post-caption"><span style="font-weight:900;">${bebida.name}.</span> ${bebida.description}</p>
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;">
                            <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--color-brand);">$${formatPrice(bebida.price)}</span>
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${bebida.id}" style="padding:8px 18px;font-size:1rem;">
                                <i class="ph-bold ph-shopping-cart"></i> AGREGAR
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // --- Renderizar Encargues ---
        function renderEncargues() {
            const container = document.getElementById('encargues-grid');
            const WHATSAPP_NUMBER = '5492216817239';

            encargues.forEach((item, index) => {
                const section = document.createElement('div');
                section.className = 'featured-burger-section fade-in-up encargue-item';
                section.style.transitionDelay = `${(index + 1) * 100}ms`;

                const nameParts = item.name.split(' ');
                const titleHtml = nameParts.length >= 3
                    ? `<span>${nameParts.slice(0, -1).join(' ')}</span><span>${nameParts[nameParts.length - 1]}</span>`
                    : `<span>${nameParts[0]}</span><span>${nameParts.slice(1).join(' ')}</span>`;

                const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.whatsappMsg)}`;

                section.innerHTML = `
                    <div class="featured-media-container">
                        <div class="video-loop-container">
                            <video autoplay muted playsinline class="cf-active">
                                <source src="${item.video}" type="video/mp4">
                            </video>
                            <video muted playsinline class="cf-inactive">
                                <source src="${item.video}" type="video/mp4">
                            </video>
                        </div>
                    </div>
                    <div class="featured-content">
                        <h2 class="featured-title">${titleHtml}</h2>
                    </div>

                    <p class="featured-tagline">${item.ingredients}</p>

                    <div class="featured-purchase-bar encargue-purchase-bar">
                        <div class="encargue-notice">
                            <i class="ph-bold ph-clock"></i>
                            <span>Pedido previo · entrega al día siguiente</span>
                        </div>
                        <a href="${waLink}" target="_blank" class="btn btn-encargue" style="width: 100%;">
                            <i class="ph-bold ph-whatsapp-logo"></i> ENCARGAR AHORA
                        </a>
                    </div>
                `;

                container.parentNode.insertBefore(section, container);
            });
        }

        // --- Crossfade seamless loop (sin oscurecimiento) ---
        function setupCrossfadeLoops() {
            document.querySelectorAll('.video-loop-container').forEach(container => {
                const vids = container.querySelectorAll('video');
                if (vids.length < 2) return;

                let va = vids[0]; // activo (se ve)
                let vb = vids[1]; // en espera (oculto)
                let swapping = false;

                // Estado inicial vía inline styles
                va.style.cssText += ';position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:2;opacity:1;';
                vb.style.cssText += ';position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;z-index:1;opacity:0;';

                function swap() {
                    if (swapping) return;
                    swapping = true;

                    // 1. Traer vb al frente (encima de va) a opacity 0, sin transición
                    vb.style.transition = 'none';
                    vb.style.zIndex = '3';
                    vb.style.opacity = '0';
                    vb.currentTime = 0;
                    vb.play();

                    // 2. En el siguiente frame, fade IN de vb (va sigue al 100% debajo → sin oscurecer)
                    requestAnimationFrame(() => requestAnimationFrame(() => {
                        vb.style.transition = 'opacity 1.2s ease';
                        vb.style.opacity = '1';
                    }));

                    // 3. Después del fade, ocultar va (ya detrás de vb)
                    setTimeout(() => {
                        va.style.transition = 'none';
                        va.style.opacity = '0';
                        va.style.zIndex = '1';
                        vb.style.zIndex = '2';
                        vb.style.transition = '';
                        [va, vb] = [vb, va];
                        swapping = false;
                    }, 1400);
                }

                // Disparar swap cuando el video activo le quedan ~1.5s
                vids.forEach(v => {
                    v.addEventListener('timeupdate', () => {
                        if (v === va && v.duration && (v.duration - v.currentTime) <= 1.5) {
                            swap();
                        }
                    });
                });
            });
        }

        // --- Inicializar ---
        // --- Animaciones de Scroll ---
        // 1. Header
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // 2. Observer fade-in-up (declarado ANTES del DOMContentLoaded para que DOMContentLoaded pueda usarlo)
        const observerOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px -30px 0px"
        };

        const mantel = document.getElementById('mantel-bg');
        const sectionsWithMantel = document.querySelectorAll('.has-mantel');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('fade-in-up')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);

        const mantelObserver = new IntersectionObserver((entries) => {
            let anyVisible = false;
            entries.forEach(entry => {
                if (entry.isIntersecting) anyVisible = true;
            });
            if (anyVisible) {
                mantel.classList.add('visible');
            } else {
                const currentVisible = Array.from(sectionsWithMantel).some(s => {
                    const rect = s.getBoundingClientRect();
                    return rect.top < window.innerHeight && rect.bottom > 0;
                });
                if (!currentVisible) mantel.classList.remove('visible');
            }
        }, { threshold: 0.01 });

        document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
        sectionsWithMantel.forEach(section => mantelObserver.observe(section));

        
        function selectPrice(boxElement) {
            const footer = boxElement.parentElement;
            const boxes = footer.querySelectorAll('.nd-price-box');
            boxes.forEach(box => box.classList.remove('active'));
            boxElement.classList.add('active');
        }

        // Script al final del body: el DOM ya existe, se ejecuta directo
        renderHamburguesas();
        renderEncargues();
        renderBebidas();
        connectCartButtons();

        // Forzar visibilidad de elementos en pantalla después de renderizar
        setTimeout(() => {
            document.querySelectorAll('.fade-in-up').forEach(el => {
                observer.observe(el);
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('visible');
                }
            });
            setupCrossfadeLoops();
        }, 100);

        // Parallax del mantel
        window.addEventListener('scroll', () => {
            if (mantel.classList.contains('visible')) {
                mantel.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
            }
        });

    