/* ===========================================================
   AURØGANT STUDIO
   PRODUCT DATABASE
=========================================================== */

const CATEGORIES = [

    "Oversized T-Shirts",
    "Regular T-Shirts",
    "Hoodies",
    "Polo",
    "Shirts",
    "Raglan",
    "Ringer",
    "Supima",
    "Tie Dye",
    "V Neck",
    "Jackets",
    "Bottomwear"

];



const COLORS = [

    "Black",
    "White",
    "Navy",
    "Grey",
    "Red",
    "Maroon",
    "Olive",
    "Beige",
    "Brown",
    "Blue"

];



const SIZES = [

    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL"

];



const PRINT_AREAS = [

    "Front",
    "Back",
    "Left Chest",
    "Left Sleeve",
    "Right Sleeve"

];



const PRODUCTS = [

/* ===========================================================
   UH62
=========================================================== */

{

    id:1,

    code:"UH62",

    sku:"AUR-UH62",

    name:"Oversized Hoodie",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Oversized",

    material:"100% Cotton",

    gsm:400,

    price:1099,

    salePrice:999,

    bestseller:true,

    newArrival:true,

    customizable:true,

    colors:[

        "Black",

        "White",

        "Grey"

    ],

    sizes:[

        "S",

        "M",

        "L",

        "XL",

        "XXL"

    ],

    printAreas:[

        "Front",

        "Back",

        "Left Sleeve",

        "Right Sleeve"

    ],

    images:{

        front:"assets/products/UH62.png",

        back:"assets/products/UH62.png"

    }

},



/* ===========================================================
   UA30
=========================================================== */

{

    id:2,

    code:"UA30",

    sku:"AUR-UA30",

    name:"Acid Wash Oversized Tee",

    category:"Oversized T-Shirts",

    gender:"Unisex",

    fit:"Oversized",

    material:"Cotton",

    gsm:240,

    price:899,

    salePrice:799,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[

        "Black",

        "Grey"

    ],

    sizes:[

        "S",

        "M",

        "L",

        "XL"

    ],

    printAreas:[

        "Front",

        "Back"

    ],

    images:{

        front:"assets/products/UA30.png",

        back:"assets/products/UA30.png"

    }

},



/* ===========================================================
   UA26
=========================================================== */

{

    id:3,

    code:"UA26",

    sku:"AUR-UA26",

    name:"Heavy Oversized Tee",

    category:"Oversized T-Shirts",

    gender:"Unisex",

    fit:"Oversized",

    material:"100% Cotton",

    gsm:280,

    price:849,

    salePrice:749,

    bestseller:false,

    newArrival:true,

    customizable:true,

    colors:[

        "Black",

        "White",

        "Navy",

        "Olive"

    ],

    sizes:[

        "S",

        "M",

        "L",

        "XL",

        "XXL"

    ],

    printAreas:[

        "Front",

        "Back",

        "Left Chest"

    ],

    images:{

        front:"assets/products/UA26.png",

        back:"assets/products/UA26.png"

    }

},
/* ===========================================================
   FC32
=========================================================== */

{

    id:4,

    code:"FC32",

    sku:"AUR-FC32",

    name:"Classic Regular Fit T-Shirt",

    category:"Regular T-Shirts",

    gender:"Unisex",

    fit:"Regular",

    material:"100% Cotton",

    gsm:180,

    price:549,

    salePrice:449,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Navy",
        "Red",
        "Grey"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Chest"
    ],

    images:{
        front:"assets/products/FC32.png",
        back:"assets/products/FC32.png"
    }

},



/* ===========================================================
   UH38
=========================================================== */

{

    id:5,

    code:"UH38",

    sku:"AUR-UH38",

    name:"Premium Pullover Hoodie",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton Fleece",

    gsm:350,

    price:999,

    salePrice:899,

    bestseller:false,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Maroon",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Sleeve",
        "Right Sleeve"
    ],

    images:{
        front:"assets/products/UH38.png",
        back:"assets/products/UH38.png"
    }

},



/* ===========================================================
   UH83
=========================================================== */

{

    id:6,

    code:"UH83",

    sku:"AUR-UH83",

    name:"Heavyweight Zip Hoodie",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton Fleece",

    gsm:380,

    price:1199,

    salePrice:1099,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "Grey",
        "Olive"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Sleeve",
        "Right Sleeve"
    ],

    images:{
        front:"assets/products/UH83.png",
        back:"assets/products/UH83.png"
    }

},



/* ===========================================================
   UH32
=========================================================== */

{

    id:7,

    code:"UH32",

    sku:"AUR-UH32",

    name:"Classic Sweatshirt",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton Blend",

    gsm:320,

    price:899,

    salePrice:799,

    bestseller:false,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UH32.png",
        back:"assets/products/UH32.png"
    }

},



/* ===========================================================
   UH35
=========================================================== */

{

    id:8,

    code:"UH35",

    sku:"AUR-UH35",

    name:"Oversized Sweatshirt",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Oversized",

    material:"Premium Cotton",

    gsm:360,

    price:999,

    salePrice:899,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Beige",
        "Brown"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UH35.png",
        back:"assets/products/UH35.png"
    }

},



/* ===========================================================
   UH26
=========================================================== */

{

    id:9,

    code:"UH26",

    sku:"AUR-UH26",

    name:"Lightweight Hoodie",

    category:"Hoodies",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton",

    gsm:280,

    price:799,

    salePrice:699,

    bestseller:false,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UH26.png",
        back:"assets/products/UH26.png"
    }

},



/* ===========================================================
   UJ31
=========================================================== */

{

    id:10,

    code:"UJ31",

    sku:"AUR-UJ31",

    name:"Varsity Jacket",

    category:"Jackets",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton Fleece",

    gsm:400,

    price:1399,

    salePrice:1299,

    bestseller:true,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "Navy",
        "Maroon"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Sleeve",
        "Right Sleeve"
    ],

    images:{
        front:"assets/products/UJ31.png",
        back:"assets/products/UJ31.png"
    }

},



/* ===========================================================
   UC61
=========================================================== */

{

    id:11,

    code:"UC61",

    sku:"AUR-UC61",

    name:"Classic Oversized Tee",

    category:"Oversized T-Shirts",

    gender:"Unisex",

    fit:"Oversized",

    material:"100% Cotton",

    gsm:240,

    price:649,

    salePrice:549,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey",
        "Olive",
        "Beige"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Chest"
    ],

    images:{
        front:"assets/products/UC61.png",
        back:"assets/products/UC61.png"
    }

},/* ===========================================================
   UA22
=========================================================== */

{

    id:12,

    code:"UA22",

    sku:"AUR-UA22",

    name:"Essential Oversized Tee",

    category:"Oversized T-Shirts",

    gender:"Unisex",

    fit:"Oversized",

    material:"100% Cotton",

    gsm:220,

    price:599,

    salePrice:499,

    bestseller:false,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UA22.png",
        back:"assets/products/UA22.png"
    }

},



/* ===========================================================
   UB73
=========================================================== */

{

    id:13,

    code:"UB73",

    sku:"AUR-UB73",

    name:"Premium Joggers",

    category:"Bottomwear",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton Fleece",

    gsm:320,

    price:799,

    salePrice:699,

    bestseller:true,

    newArrival:false,

    customizable:false,

    colors:[
        "Black",
        "Grey",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[],

    images:{
        front:"assets/products/UB73.png",
        back:"assets/products/UB73.png"
    }

},



/* ===========================================================
   UC21
=========================================================== */

{

    id:14,

    code:"UC21",

    sku:"AUR-UC21",

    name:"Classic Cotton Tee",

    category:"Regular T-Shirts",

    gender:"Unisex",

    fit:"Regular",

    material:"100% Cotton",

    gsm:180,

    price:495,

    salePrice:395,

    bestseller:false,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey",
        "Red"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Chest"
    ],

    images:{
        front:"assets/products/UC21.png",
        back:"assets/products/UC21.png"
    }

},



/* ===========================================================
   MP25
=========================================================== */

{

    id:15,

    code:"MP25",

    sku:"AUR-MP25",

    name:"Male Polo",

    category:"Polo",

    gender:"Male",

    fit:"Regular",

    material:"Pique Cotton",

    gsm:220,

    price:699,

    salePrice:599,

    bestseller:true,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Navy",
        "Maroon"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Chest",
        "Right Sleeve"
    ],

    images:{
        front:"assets/products/MP25.png",
        back:"assets/products/MP25.png"
    }

},



/* ===========================================================
   UC28
=========================================================== */

{

    id:16,

    code:"UC28",

    sku:"AUR-UC28",

    name:"Oversized Classic Shirt",

    category:"Shirts",

    gender:"Unisex",

    fit:"Oversized",

    material:"Cotton",

    gsm:220,

    price:899,

    salePrice:799,

    bestseller:false,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Olive",
        "Beige"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UC28.png",
        back:"assets/products/UC28.png"
    }

},



/* ===========================================================
   UR37
=========================================================== */

{

    id:17,

    code:"UR37",

    sku:"AUR-UR37",

    name:"Raglan T-Shirt",

    category:"Raglan",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton",

    gsm:180,

    price:549,

    salePrice:449,

    bestseller:false,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UR37.png",
        back:"assets/products/UR37.png"
    }

},



/* ===========================================================
   UR50
=========================================================== */

{

    id:18,

    code:"UR50",

    sku:"AUR-UR50",

    name:"Premium Raglan T-Shirt",

    category:"Raglan",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton",

    gsm:220,

    price:599,

    salePrice:499,

    bestseller:true,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Grey"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UR50.png",
        back:"assets/products/UR50.png"
    }

},



/* ===========================================================
   UR39
=========================================================== */

{

    id:19,

    code:"UR39",

    sku:"AUR-UR39",

    name:"Ringer T-Shirt",

    category:"Ringer",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton",

    gsm:180,

    price:549,

    salePrice:449,

    bestseller:false,

    newArrival:false,

    customizable:true,

    colors:[
        "White",
        "Grey"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UR39.png",
        back:"assets/products/UR39.png"
    }

},



/* ===========================================================
   UC23
=========================================================== */

{

    id:20,

    code:"UC23",

    sku:"AUR-UC23",

    name:"Supima T-Shirt",

    category:"Supima",

    gender:"Unisex",

    fit:"Regular",

    material:"Supima Cotton",

    gsm:180,

    price:799,

    salePrice:699,

    bestseller:true,

    newArrival:true,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back",
        "Left Chest"
    ],

    images:{
        front:"assets/products/UC23.png",
        back:"assets/products/UC23.png"
    }

},



/* ===========================================================
   UT58
=========================================================== */

{

    id:21,

    code:"UT58",

    sku:"AUR-UT58",

    name:"Tie & Dye Oversized T-Shirt",

    category:"Tie Dye",

    gender:"Unisex",

    fit:"Oversized",

    material:"100% Cotton",

    gsm:240,

    price:699,

    salePrice:599,

    bestseller:true,

    newArrival:true,

    customizable:true,

    colors:[
        "Blue",
        "Brown",
        "Grey"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UT58.png",
        back:"assets/products/UT58.png"
    }

},



/* ===========================================================
   UV34
=========================================================== */

{

    id:22,

    code:"UV34",

    sku:"AUR-UV34",

    name:"V-Neck T-Shirt",

    category:"V Neck",

    gender:"Unisex",

    fit:"Regular",

    material:"Cotton",

    gsm:180,

    price:549,

    salePrice:449,

    bestseller:false,

    newArrival:false,

    customizable:true,

    colors:[
        "Black",
        "White",
        "Navy"
    ],

    sizes:[
        "S",
        "M",
        "L",
        "XL",
        "XXL"
    ],

    printAreas:[
        "Front",
        "Back"
    ],

    images:{
        front:"assets/products/UV34.png",
        back:"assets/products/UV34.png"
    }

}

];

/* ===========================================================
   EXPORTS
=========================================================== */

window.AUR_PRODUCTS = PRODUCTS;
window.AUR_CATEGORIES = CATEGORIES;
window.AUR_COLORS = COLORS;
window.AUR_SIZES = SIZES;
window.AUR_PRINT_AREAS = PRINT_AREAS;

/* Studio adapter: the database remains the source of truth. */
PRODUCTS.forEach(product => {
    const code = product.code;
    const main = `assets/products/${code}.png`;
    product.basePrice = product.salePrice || product.price;
    product.mockups = {
        front: main,
        back: main,
        leftSleeve: main,
        rightSleeve: main
    };
});

window.ProductDB = {
    getAllProducts: () => PRODUCTS,
    getProductById: id => PRODUCTS.find(p => Number(p.id) === Number(id)),
    getProductByCode: code => PRODUCTS.find(p => p.code === code),
    getProductsByCategory: category => PRODUCTS.filter(p => p.category === category),
    searchProducts: query => {
        const q = String(query || '').toLowerCase();
        return PRODUCTS.filter(p => `${p.name} ${p.code} ${p.category}`.toLowerCase().includes(q));
    }
};