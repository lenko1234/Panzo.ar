const fs = require('fs');
const path = require('path');
const {createClient} = require('@sanity/client');

// Instanciar el cliente usando el token inyectado por sanity exec --with-user-token
const client = createClient({
  projectId: 'zq23sglj',
  dataset: 'production',
  apiVersion: '2021-10-21',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

// --- DATA ORIGINAL ---
const hamburguesasBackup = [
  {
    id: 111,
    name: "ARGENTUM",
    ingredients: "Pan de papa, medallón de carne, doble cheddar, cebolla salteada y chimichurri.",
    image: "assets/new design/argentum.webp",
    variants: [
      { type: "Simple", price: 11499 },
      { type: "Doble", price: 14599 }
    ]
  },
  {
    id: 108,
    name: "COMBO CLÁSICA",
    ingredients: "1 CLÁSICA + 1 PAPAS FRITAS SAZONADAS + 1 GASEOSA DE VIDRIO A ELECCIÓN.",
    image: "assets/new design/clasica.webp",
    variants: [
      { type: "PROMO", price: 13499 }
    ]
  },
  {
    id: 103,
    name: "LA CLÁSICA",
    ingredients: "Pan, medallón de 120gr, doble cheddar, lechuga repollada, tomate y mayonesa Hellmann's.",
    image: "assets/new design/clasica.webp",
    variants: [
      { type: "Simple", price: 10999 },
      { type: "Doble", price: 14499 }
    ]
  },
  {
    id: 104,
    name: "CUARTO DE LIBRA",
    ingredients: "Medallón de 120gr, doble cheddar por medallón, cebolla brunoise, kétchup y mostaza.",
    image: "assets/new design/cuartodelibra.webp",
    variants: [
      { type: "Simple", price: 11199 },
      { type: "Doble", price: 14499 }
    ]
  },
  {
    id: 101,
    name: "LA TRAICIÓN",
    ingredients: "Pan, doble medallón de 120gr, bacon, doble cheddar por medallón, cebolla y nuestra salsa golf especial.",
    image: "assets/new design/traicion.webp",
    variants: [
      { type: "Doble", price: 14799 },
      { type: "Triple", price: 18799 }
    ]
  },
  {
    id: 110,
    name: "CHEESE BURGER",
    ingredients: "Medallón de 120gr, doble cheddar, pepinillos, cebolla y kétchup + 1 feta de cheddar en la base",
    image: "assets/new design/cheeseburger.webp",
    variants: [
      { type: "Simple", price: 11499 },
      { type: "Doble", price: 14599 }
    ]
  },
  {
    id: 109,
    name: "PAPAS FRITAS",
    ingredients: "",
    image: "assets/new design/papasfritas.webp",
    variants: [
      { type: "Porción", price: 2500 }
    ]
  },
];

const encarguesBackup = [
  {
    id: 201,
    name: "LA BONDIOLA",
    subtitle: "Los secretos de la bondiola",
    ingredients: "Pan de focaccia con topping de trocitos de milan, bondiola desmechada a la cerveza, cebolla salteada, morrón y cebolla de verdeo con mayonesa de barbacoa.",
    video: "assets/freepik_a-cinematic-product-showcase-of-a-wide-thick-sandw_kling_1080p_9-16_24fps_31479.mp4",
    whatsappMsg: "Hola Panzo! Quiero hacer un encargue de LA BONDIOLA para mañana 🥖"
  }
];

const bebidasBackup = [
  {
    id: 5,
    name: "COCA COLA DE VIDRIO",
    description: "Coca Cola de vidrio de 237ml",
    image: "assets/optimized/coca-cola.webp",
    price: 3000,
    icon: "ph-fill ph-wine"
  },
  {
    id: 6,
    name: "CERVEZA CORONA",
    description: "Cerveza marca Corona 330cm3",
    image: "assets/optimized/corona-pack.webp",
    price: 4000,
    icon: "ph-fill ph-beer-bottle"
  },
  {
    id: 7,
    name: "CORONA PACK x6",
    description: "Pack de cerveza marca Corona por 6 unidades",
    image: "assets/optimized/corona.webp",
    price: 22000,
    icon: "ph-fill ph-package"
  }
];

// Helper para subir imágenes
async function uploadImage(localPath) {
  if (!localPath) return null;
  const absolutePath = path.resolve(__dirname, '..', localPath);
  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️ Imagen no encontrada en: ${absolutePath}`);
    return null;
  }
  
  console.log(`📤 Subiendo imagen: ${localPath}...`);
  try {
    const fileStream = fs.createReadStream(absolutePath);
    const asset = await client.assets.upload('image', fileStream, {
      filename: path.basename(localPath),
    });
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Error subiendo imagen ${localPath}:`, error.message);
    return null;
  }
}

// Helper para subir archivos de video
async function uploadVideo(localPath) {
  if (!localPath) return null;
  const absolutePath = path.resolve(__dirname, '..', localPath);
  if (!fs.existsSync(absolutePath)) {
    console.log(`⚠️ Video no encontrado en: ${absolutePath}`);
    return null;
  }

  console.log(`📤 Subiendo video: ${localPath}...`);
  try {
    const fileStream = fs.createReadStream(absolutePath);
    const asset = await client.assets.upload('file', fileStream, {
      filename: path.basename(localPath),
      contentType: 'video/mp4'
    });
    return {
      _type: 'file',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`❌ Error subiendo video ${localPath}:`, error.message);
    return null;
  }
}

async function migrate() {
  console.log('🚀 Iniciando migración de datos a Sanity...');

  // 1. Migrar Hamburguesas
  for (const h of hamburguesasBackup) {
    const imageAsset = await uploadImage(h.image);
    const doc = {
      _type: 'burger',
      _id: `burger-${h.id}`,
      id: h.id,
      name: h.name,
      ingredients: h.ingredients || '',
      variants: h.variants,
    };
    if (imageAsset) doc.image = imageAsset;

    console.log(`💾 Guardando hamburguesa: ${h.name}`);
    await client.createOrReplace(doc);
  }

  // 2. Migrar Bebidas
  for (const b of bebidasBackup) {
    const imageAsset = await uploadImage(b.image);
    const doc = {
      _type: 'bebida',
      _id: `bebida-${b.id}`,
      id: b.id,
      name: b.name,
      description: b.description || '',
      price: b.price,
      icon: b.icon || 'ph-fill ph-wine',
    };
    if (imageAsset) doc.image = imageAsset;

    console.log(`💾 Guardando bebida: ${b.name}`);
    await client.createOrReplace(doc);
  }

  // 3. Migrar Encargues
  for (const e of encarguesBackup) {
    const videoAsset = await uploadVideo(e.video);
    const doc = {
      _type: 'encargue',
      _id: `encargue-${e.id}`,
      id: e.id,
      name: e.name,
      subtitle: e.subtitle || '',
      ingredients: e.ingredients || '',
      whatsappMsg: e.whatsappMsg || '',
    };
    if (videoAsset) doc.video = videoAsset;

    console.log(`💾 Guardando encargue: ${e.name}`);
    await client.createOrReplace(doc);
  }

  console.log('🎉 Migración completada con éxito!');
}

migrate().catch((err) => {
  console.error('❌ Error fatal en la migración:', err);
  process.exit(1);
});
