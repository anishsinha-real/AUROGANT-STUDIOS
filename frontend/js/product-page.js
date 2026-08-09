/* ===========================================================
   AURØGANT STUDIO
   PRODUCT DATABASE
=========================================================== */

const PRODUCTS = [

/* ===========================================================
   PREMIUM OVERSIZED HOODIE
=========================================================== */

{

    id: 1,

    code: "UH62",

    slug: "premium-oversized-hoodie",

    name: "Premium Oversized Hoodie",

    category: "Hoodies",

    collection: "Essentials",

    description:
        "380 GSM heavyweight oversized hoodie crafted for premium streetwear.",

    price: 899,

    comparePrice: 1299,

    currency: "INR",

    featured: true,

    newArrival: true,

    bestseller: true,

    customizable: true,

    rating: 4.9,

    reviews: 284,

    tags: [

        "Oversized",

        "Premium",

        "Heavyweight",

        "Streetwear"

    ],

    colors: [

        {

            name: "Black",

            hex: "#111111",

            default: true

        },

        {

            name: "White",

            hex: "#F7F7F7"

        },

        {

            name: "Cream",

            hex: "#EFE6D2"

        },

        {

            name: "Navy",

            hex: "#243A73"

        }

    ],

    sizes: [

        "S",

        "M",

        "L",

        "XL",

        "XXL"

    ],

    mockups: {

        front: "assets/products/UH62/front.png",

        back: "assets/products/UH62/back.png",

        leftSleeve: "assets/products/UH62/left.png",

        rightSleeve: "assets/products/UH62/right.png"

    },

    thumbnails: [

        "assets/products/UH62/front.png",

        "assets/products/UH62/back.png",

        "assets/products/UH62/left.png",

        "assets/products/UH62/right.png"

    ],

    printAreas: {

        front: {

            x: 235,

            y: 170,

            width: 430,

            height: 500

        },

        back: {

            x: 220,

            y: 165,

            width: 460,

            height: 540

        },

        leftSleeve: {

            x: 285,

            y: 215,

            width: 180,

            height: 240

        },

        rightSleeve: {

            x: 285,

            y: 215,

            width: 180,

            height: 240

        }

    },

    pricing: {

        frontPrint: 120,

        backPrint: 120,

        sleevePrint: 70,

        embroidery: 180,

        puffPrint: 150

    }

},

/* ===========================================================
   OVERSIZED T-SHIRT
=========================================================== */

{

    id: 2,

    code: "UT91",

    slug: "premium-oversized-tshirt",

    name: "Premium Oversized T-Shirt",

    category: "T-Shirts",

    collection: "Core",

    description:
        "240 GSM premium cotton oversized tee for everyday wear.",

    price: 599,

    comparePrice: 899,

    currency: "INR",

    featured: true,

    newArrival: false,

    bestseller: true,

    customizable: true,

    rating: 4.8,

    reviews: 512,

    tags: [

        "Cotton",

        "Oversized",

        "Heavy GSM"

    ],

    colors: [

        {

            name: "Black",

            hex: "#111111",

            default: true

        },

        {

            name: "White",

            hex: "#FFFFFF"

        },

        {

            name: "Olive",

            hex: "#556B2F"

        },

        {

            name: "Brown",

            hex: "#6B4F3F"

        }

    ],

    sizes: [

        "S",

        "M",

        "L",

        "XL",

        "XXL"

    ],

    mockups: {

        front: "assets/products/UT91/front.png",

        back: "assets/products/UT91/back.png",

        leftSleeve: "assets/products/UT91/left.png",

        rightSleeve: "assets/products/UT91/right.png"

    },

    thumbnails: [

        "assets/products/UT91/front.png",

        "assets/products/UT91/back.png",

        "assets/products/UT91/left.png",

        "assets/products/UT91/right.png"

    ],

    printAreas: {

        front: {

            x: 240,

            y: 180,

            width: 420,

            height: 480

        },

        back: {

            x: 225,

            y: 170,

            width: 450,

            height: 510

        },

        leftSleeve: {

            x: 290,

            y: 220,

            width: 170,

            height: 220

        },

        rightSleeve: {

            x: 290,

            y: 220,

            width: 170,

            height: 220

        }

    },

    pricing: {

        frontPrint: 100,

        backPrint: 100,

        sleevePrint: 60,

        embroidery: 170,

        puffPrint: 140

    }

},

/* ===========================================================
   PREMIUM SWEATSHIRT
=========================================================== */

{

    id: 3,

    code: "SW44",

    slug: "premium-sweatshirt",

    name: "Premium Sweatshirt",

    category: "Sweatshirts",

    collection: "Winter",

    description:
        "340 GSM brushed fleece premium sweatshirt.",

    price: 799,

    comparePrice: 1099,

    currency: "INR",

    featured: true,

    customizable: true,

    bestseller: false,

    newArrival: true,

    rating: 4.8,

    reviews: 161,

    colors: [

        {

            name: "Black",

            hex: "#111111",

            default: true

        },

        {

            name: "Grey",

            hex: "#8C8C8C"

        },

        {

            name: "Cream",

            hex: "#EFE6D2"

        }

    ],

    sizes: [

        "S",

        "M",

        "L",

        "XL",

        "XXL"

    ],

    mockups: {

        front: "assets/products/SW44/front.png",

        back: "assets/products/SW44/back.png",

        leftSleeve: "assets/products/SW44/left.png",

        rightSleeve: "assets/products/SW44/right.png"

    }

},

];
/* ===========================================================
   PREMIUM POLO
=========================================================== */

{

    id: 4,

    code: "PL20",

    slug: "premium-polo",

    name: "Premium Polo",

    category: "Polos",

    collection: "Executive",

    description:
        "240 GSM premium pique cotton polo with modern fit.",

    price: 699,

    comparePrice: 999,

    currency: "INR",

    featured: true,

    bestseller: false,

    newArrival: false,

    customizable: true,

    rating: 4.8,

    reviews: 132,

    tags: [

        "Polo",

        "Cotton",

        "Premium"

    ],

    colors: [

        {

            name: "Black",

            hex: "#111111",

            default: true

        },

        {

            name: "White",

            hex: "#FFFFFF"

        },

        {

            name: "Navy",

            hex: "#1E3A5F"

        },

        {

            name: "Maroon",

            hex: "#6D1E2B"

        }

    ],

    sizes: [

        "S","M","L","XL","XXL"

    ],

    mockups: {

        front:"assets/products/PL20/front.png",

        back:"assets/products/PL20/back.png",

        leftSleeve:"assets/products/PL20/left.png",

        rightSleeve:"assets/products/PL20/right.png"

    },

    thumbnails: [

        "assets/products/PL20/front.png",

        "assets/products/PL20/back.png",

        "assets/products/PL20/left.png",

        "assets/products/PL20/right.png"

    ],

    printAreas: {

        front:{x:245,y:185,width:410,height:450},

        back:{x:235,y:180,width:430,height:470},

        leftSleeve:{x:295,y:225,width:165,height:210},

        rightSleeve:{x:295,y:225,width:165,height:210}

    },

    pricing:{

        frontPrint:100,

        backPrint:100,

        sleevePrint:60,

        embroidery:180,

        puffPrint:140

    }

},

/* ===========================================================
   VARSITY JACKET
=========================================================== */

{

    id:5,

    code:"VJ81",

    slug:"premium-varsity-jacket",

    name:"Premium Varsity Jacket",

    category:"Jackets",

    collection:"College",

    description:
        "Heavyweight varsity jacket with premium wool blend body and faux leather sleeves.",

    price:1799,

    comparePrice:2299,

    currency:"INR",

    featured:true,

    bestseller:true,

    newArrival:true,

    customizable:true,

    rating:4.9,

    reviews:96,

    tags:[

        "Varsity",

        "College",

        "Premium"

    ],

    colors:[

        {

            name:"Black",

            hex:"#111111",

            default:true

        },

        {

            name:"Green",

            hex:"#1F5133"

        },

        {

            name:"Navy",

            hex:"#243A73"

        }

    ],

    sizes:[

        "S","M","L","XL","XXL"

    ],

    mockups:{

        front:"assets/products/VJ81/front.png",

        back:"assets/products/VJ81/back.png",

        leftSleeve:"assets/products/VJ81/left.png",

        rightSleeve:"assets/products/VJ81/right.png"

    },

    thumbnails:[

        "assets/products/VJ81/front.png",

        "assets/products/VJ81/back.png",

        "assets/products/VJ81/left.png",

        "assets/products/VJ81/right.png"

    ],

    printAreas:{

        front:{x:220,y:165,width:455,height:520},

        back:{x:215,y:160,width:470,height:545},

        leftSleeve:{x:285,y:215,width:185,height:250},

        rightSleeve:{x:285,y:215,width:185,height:250}

    },

    pricing:{

        frontPrint:150,

        backPrint:150,

        sleevePrint:80,

        embroidery:220,

        puffPrint:180

    }

},

/* ===========================================================
   BOMBER JACKET
=========================================================== */

{

    id:6,

    code:"BJ14",

    slug:"premium-bomber-jacket",

    name:"Premium Bomber Jacket",

    category:"Jackets",

    collection:"Urban",

    description:
        "Premium bomber jacket with lightweight insulated lining.",

    price:1699,

    comparePrice:2199,

    currency:"INR",

    featured:true,

    bestseller:false,

    newArrival:true,

    customizable:true,

    rating:4.8,

    reviews:88,

    tags:[

        "Bomber",

        "Streetwear"

    ],

    colors:[

        {

            name:"Black",

            hex:"#111111",

            default:true

        },

        {

            name:"Olive",

            hex:"#556B2F"

        },

        {

            name:"Grey",

            hex:"#888888"

        }

    ],

    sizes:[

        "S","M","L","XL","XXL"

    ],

    mockups:{

        front:"assets/products/BJ14/front.png",

        back:"assets/products/BJ14/back.png",

        leftSleeve:"assets/products/BJ14/left.png",

        rightSleeve:"assets/products/BJ14/right.png"

    },

    thumbnails:[

        "assets/products/BJ14/front.png",

        "assets/products/BJ14/back.png",

        "assets/products/BJ14/left.png",

        "assets/products/BJ14/right.png"

    ],

    printAreas:{

        front:{x:225,y:170,width:450,height:510},

        back:{x:220,y:165,width:465,height:535},

        leftSleeve:{x:290,y:215,width:180,height:240},

        rightSleeve:{x:290,y:215,width:180,height:240}

    },

    pricing:{

        frontPrint:140,

        backPrint:140,

        sleevePrint:80,

        embroidery:220,

        puffPrint:180

    }

},

/* ===========================================================
   PREMIUM CARGO JOGGERS
=========================================================== */

{

    id:7,

    code:"CJ52",

    slug:"premium-cargo-joggers",

    name:"Premium Cargo Joggers",

    category:"Bottomwear",

    collection:"Urban",

    description:
        "320 GSM heavyweight cargo joggers with multiple utility pockets.",

    price:999,

    comparePrice:1399,

    currency:"INR",

    featured:false,

    bestseller:true,

    newArrival:true,

    customizable:true,

    rating:4.8,

    reviews:145,

    tags:[

        "Cargo",

        "Joggers",

        "Streetwear"

    ],

    colors:[

        {

            name:"Black",

            hex:"#111111",

            default:true

        },

        {

            name:"Olive",

            hex:"#556B2F"

        },

        {

            name:"Stone",

            hex:"#D7D0C4"

        }

    ],

    sizes:[

        "S","M","L","XL","XXL"

    ],

    mockups:{

        front:"assets/products/CJ52/front.png",

        back:"assets/products/CJ52/back.png"

    },

    thumbnails:[

        "assets/products/CJ52/front.png",

        "assets/products/CJ52/back.png"

    ],

    printAreas:{

        front:{x:250,y:160,width:390,height:560},

        back:{x:250,y:160,width:390,height:560}

    },

    pricing:{

        frontPrint:120,

        backPrint:120,

        embroidery:170

    }

},
/* ===========================================================
   PREMIUM TANK TOP
=========================================================== */

{

    id: 8,

    code: "TT18",

    slug: "premium-tank-top",

    name: "Premium Tank Top",

    category: "Tank Tops",

    collection: "Summer",

    description:
        "220 GSM premium cotton oversized tank top.",

    price: 499,

    comparePrice: 699,

    currency: "INR",

    featured: false,

    bestseller: true,

    newArrival: true,

    customizable: true,

    rating: 4.7,

    reviews: 81,

    tags: [

        "Tank",

        "Summer",

        "Gym"

    ],

    colors: [

        {

            name: "Black",

            hex: "#111111",

            default: true

        },

        {

            name: "White",

            hex: "#FFFFFF"

        },

        {

            name: "Grey",

            hex: "#8A8A8A"

        }

    ],

    sizes: [

        "S","M","L","XL","XXL"

    ],

    mockups: {

        front: "assets/products/TT18/front.png",

        back: "assets/products/TT18/back.png"

    },

    thumbnails: [

        "assets/products/TT18/front.png",

        "assets/products/TT18/back.png"

    ],

    printAreas: {

        front: {

            x:245,

            y:165,

            width:420,

            height:470

        },

        back: {

            x:235,

            y:160,

            width:440,

            height:490

        }

    },

    pricing: {

        frontPrint:90,

        backPrint:90,

        embroidery:150

    }

},

/* ===========================================================
   PREMIUM TOTE BAG
=========================================================== */

{

    id:9,

    code:"TB05",

    slug:"premium-tote-bag",

    name:"Premium Tote Bag",

    category:"Accessories",

    collection:"Lifestyle",

    description:
        "Premium canvas tote bag with reinforced handles.",

    price:399,

    comparePrice:599,

    currency:"INR",

    featured:true,

    bestseller:true,

    newArrival:false,

    customizable:true,

    rating:4.8,

    reviews:208,

    tags:[

        "Canvas",

        "Tote",

        "Lifestyle"

    ],

    colors:[

        {

            name:"Natural",

            hex:"#E8DDC5",

            default:true

        },

        {

            name:"Black",

            hex:"#111111"

        }

    ],

    sizes:[

        "Standard"

    ],

    mockups:{

        front:"assets/products/TB05/front.png",

        back:"assets/products/TB05/back.png"

    },

    thumbnails:[

        "assets/products/TB05/front.png",

        "assets/products/TB05/back.png"

    ],

    printAreas:{

        front:{

            x:185,

            y:170,

            width:530,

            height:520

        },

        back:{

            x:185,

            y:170,

            width:530,

            height:520

        }

    },

    pricing:{

        frontPrint:80,

        backPrint:80,

        embroidery:120

    }

},

/* ===========================================================
   PREMIUM CAP
=========================================================== */

{

    id:10,

    code:"CP21",

    slug:"premium-cap",

    name:"Premium Baseball Cap",

    category:"Accessories",

    collection:"Headwear",

    description:
        "Structured six-panel premium baseball cap.",

    price:449,

    comparePrice:699,

    currency:"INR",

    featured:false,

    bestseller:true,

    newArrival:true,

    customizable:true,

    rating:4.8,

    reviews:154,

    tags:[

        "Cap",

        "Headwear"

    ],

    colors:[

        {

            name:"Black",

            hex:"#111111",

            default:true

        },

        {

            name:"White",

            hex:"#FFFFFF"

        },

        {

            name:"Navy",

            hex:"#243A73"

        }

    ],

    sizes:[

        "Adjustable"

    ],

    mockups:{

        front:"assets/products/CP21/front.png",

        left:"assets/products/CP21/left.png",

        right:"assets/products/CP21/right.png",

        back:"assets/products/CP21/back.png"

    },

    thumbnails:[

        "assets/products/CP21/front.png",

        "assets/products/CP21/left.png",

        "assets/products/CP21/right.png",

        "assets/products/CP21/back.png"

    ],

    printAreas:{

        front:{

            x:280,

            y:230,

            width:160,

            height:90

        }

    },

    pricing:{

        frontPrint:70,

        embroidery:140

    }

}

];

/* ===========================================================
   PRODUCT HELPERS
=========================================================== */

function getAllProducts() {

    return PRODUCTS;

}

function getProductById(id) {

    return PRODUCTS.find(

        product => product.id === Number(id)

    );

}

function getProductByCode(code) {

    return PRODUCTS.find(

        product =>

            product.code.toLowerCase() ===

            code.toLowerCase()

    );

}

function getProductBySlug(slug) {

    return PRODUCTS.find(

        product =>

            product.slug === slug

    );

}

function getFeaturedProducts() {

    return PRODUCTS.filter(

        product => product.featured

    );

}

function getBestSellerProducts() {

    return PRODUCTS.filter(

        product => product.bestseller

    );

}

function getNewArrivals() {

    return PRODUCTS.filter(

        product => product.newArrival

    );

}

function getProductsByCategory(category) {

    return PRODUCTS.filter(

        product =>

            product.category.toLowerCase() ===

            category.toLowerCase()

    );

}

function getProductsByCollection(collection) {

    return PRODUCTS.filter(

        product =>

            product.collection.toLowerCase() ===

            collection.toLowerCase()

    );

}

function searchProducts(query) {

    query = query.toLowerCase();

    return PRODUCTS.filter(product =>

        product.name.toLowerCase().includes(query) ||

        product.code.toLowerCase().includes(query) ||

        product.category.toLowerCase().includes(query) ||

        product.collection.toLowerCase().includes(query) ||

        product.tags.some(tag =>

            tag.toLowerCase().includes(query)

        )

    );

}

function getAvailableCategories() {

    return [

        ...new Set(

            PRODUCTS.map(

                product => product.category

            )

        )

    ];

}

function getAvailableCollections() {

    return [

        ...new Set(

            PRODUCTS.map(

                product => product.collection

            )

        )

    ];

}

function getRelatedProducts(productId) {

    const product = getProductById(productId);

    if (!product) return [];

    return PRODUCTS.filter(item =>

        item.id !== product.id &&

        item.category === product.category

    ).slice(0,4);

}
/* ===========================================================
   PRODUCT UTILITIES
=========================================================== */

function getTrendingProducts(limit = 6) {

    return [...PRODUCTS]

        .sort((a, b) => b.rating - a.rating)

        .slice(0, limit);

}

function getRandomProducts(limit = 4) {

    return [...PRODUCTS]

        .sort(() => Math.random() - 0.5)

        .slice(0, limit);

}

function getProductsOnSale() {

    return PRODUCTS.filter(

        product => product.comparePrice > product.price

    );

}

function getProductPrice(productId) {

    const product = getProductById(productId);

    return product ? product.price : 0;

}

function calculateDiscount(product) {

    if (!product.comparePrice) return 0;

    return Math.round(

        ((product.comparePrice - product.price) /

            product.comparePrice) *

            100

    );

}

function sortProducts(sortBy = "featured") {

    const items = [...PRODUCTS];

    switch (sortBy) {

        case "price-low":

            return items.sort(

                (a, b) => a.price - b.price

            );

        case "price-high":

            return items.sort(

                (a, b) => b.price - a.price

            );

        case "rating":

            return items.sort(

                (a, b) => b.rating - a.rating

            );

        case "reviews":

            return items.sort(

                (a, b) => b.reviews - a.reviews

            );

        case "newest":

            return items.sort(

                (a, b) =>

                    Number(b.newArrival) -

                    Number(a.newArrival)

            );

        default:

            return items.sort(

                (a, b) =>

                    Number(b.featured) -

                    Number(a.featured)

            );

    }

}

/* ===========================================================
   FILTERS
=========================================================== */

function filterProducts({

    category = null,

    collection = null,

    minPrice = 0,

    maxPrice = Infinity,

    featured = null,

    bestseller = null,

    customizable = null

} = {}) {

    return PRODUCTS.filter(product => {

        if (

            category &&

            product.category !== category

        ) {

            return false;

        }

        if (

            collection &&

            product.collection !== collection

        ) {

            return false;

        }

        if (

            product.price < minPrice ||

            product.price > maxPrice

        ) {

            return false;

        }

        if (

            featured !== null &&

            product.featured !== featured

        ) {

            return false;

        }

        if (

            bestseller !== null &&

            product.bestseller !== bestseller

        ) {

            return false;

        }

        if (

            customizable !== null &&

            product.customizable !== customizable

        ) {

            return false;

        }

        return true;

    });

}

/* ===========================================================
   URL HELPERS
=========================================================== */

function getStudioURL(product) {

    return `studio.html?id=${product.code}`;

}

function getCatalogURL(category = "") {

    return category

        ? `catalog.html?category=${encodeURIComponent(category)}`

        : "catalog.html";

}

/* ===========================================================
   PRODUCT SELECTION
=========================================================== */

function getSelectedProduct() {

    const params = new URLSearchParams(

        window.location.search

    );

    const code = params.get("id");

    if (!code) return null;

    return getProductByCode(code);

}

/* ===========================================================
   PRELOAD IMAGES
=========================================================== */

function preloadProductImages(product) {

    if (!product) return;

    Object.values(product.mockups).forEach(src => {

        const image = new Image();

        image.src = src;

    });

}

/* ===========================================================
   INITIALIZE PRODUCT
=========================================================== */

function initializeSelectedProduct() {

    const product = getSelectedProduct();

    if (!product) return;

    preloadProductImages(product);

    if (

        typeof loadProduct === "function"

    ) {

        loadProduct(product);

    }

}

/* ===========================================================
   GLOBAL SEARCH INDEX
=========================================================== */

const PRODUCT_SEARCH_INDEX = PRODUCTS.map(product => ({

    id: product.id,

    code: product.code,

    slug: product.slug,

    title: product.name,

    category: product.category,

    collection: product.collection,

    keywords: [

        product.name,

        product.code,

        product.category,

        product.collection,

        ...(product.tags || [])

    ]

        .join(" ")

        .toLowerCase()

}));

/* ===========================================================
   SEARCH SUGGESTIONS
=========================================================== */

function getSearchSuggestions(query) {

    if (!query) return [];

    query = query.toLowerCase();

    return PRODUCT_SEARCH_INDEX

        .filter(item =>

            item.keywords.includes(query)

        )

        .slice(0, 8);

}

/* ===========================================================
   PRODUCT STATISTICS
=========================================================== */

const PRODUCT_STATS = {

    totalProducts: PRODUCTS.length,

    featured: PRODUCTS.filter(

        p => p.featured

    ).length,

    bestsellers: PRODUCTS.filter(

        p => p.bestseller

    ).length,

    newArrivals: PRODUCTS.filter(

        p => p.newArrival

    ).length,

    customizable: PRODUCTS.filter(

        p => p.customizable

    ).length

};

/* ===========================================================
   AUTO INITIALIZATION
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeSelectedProduct();

        console.log(

            `%cAURØGANT PRODUCTS LOADED`,

            "color:#D4AF37;font-size:18px;font-weight:bold"

        );

        console.table(PRODUCT_STATS);

    }

);

/* ===========================================================
   EXPORTS
=========================================================== */

window.PRODUCTS = PRODUCTS;

window.ProductDB = {

    getAllProducts,

    getProductById,

    getProductByCode,

    getProductBySlug,

    getFeaturedProducts,

    getBestSellerProducts,

    getNewArrivals,

    getTrendingProducts,

    getProductsOnSale,

    getRandomProducts,

    getProductsByCategory,

    getProductsByCollection,

    getRelatedProducts,

    filterProducts,

    sortProducts,

    searchProducts,

    getSearchSuggestions,

    getAvailableCategories,

    getAvailableCollections,

    calculateDiscount,

    getProductPrice,

    getSelectedProduct,

    getStudioURL,

    getCatalogURL

};

/* ===========================================================
   END OF PRODUCT DATABASE
=========================================================== */

console.log(

    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

);

console.log(

    " AURØGANT PRODUCT DATABASE READY "

);

console.log(

    ` Products Loaded : ${PRODUCTS.length}`

);

console.log(

    ` Categories      : ${getAvailableCategories().length}`

);

console.log(

    ` Collections     : ${getAvailableCollections().length}`

);

console.log(

    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

);