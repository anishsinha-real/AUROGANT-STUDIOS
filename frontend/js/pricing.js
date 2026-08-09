/* ===========================================================
   AURØGANT STUDIO
   PRICING ENGINE
   PART 1
=========================================================== */

/* ===========================================================
   CONFIGURATION
=========================================================== */

const PricingEngine = {

    currency: "INR",

    symbol: "₹",

    gstRate: 18,

    quantityDiscounts: [

        { min: 1, discount: 0 },

        { min: 5, discount: 5 },

        { min: 10, discount: 10 },

        { min: 25, discount: 15 },

        { min: 50, discount: 20 },

        { min: 100, discount: 30 }

    ],

    printMethods: {

        dtf: {

            name: "DTF Printing",

            multiplier: 1

        },

        screen: {

            name: "Screen Printing",

            multiplier: 0.90

        },

        embroidery: {

            name: "Embroidery",

            multiplier: 1.50

        },

        puff: {

            name: "Puff Print",

            multiplier: 1.30

        },

        vinyl: {

            name: "Heat Transfer Vinyl",

            multiplier: 1.15

        }

    }

};

/* ===========================================================
   HELPERS
=========================================================== */

function formatCurrency(amount) {

    return `${PricingEngine.symbol}${amount.toFixed(2)}`;

}

function roundPrice(amount) {

    return Math.round(amount);

}

/* ===========================================================
   BASE PRODUCT PRICE
=========================================================== */

function getBasePrice(product) {

    if (!product) return 0;

    return product.price || 0;

}

/* ===========================================================
   OBJECT COUNT
=========================================================== */

function getDesignObjects(viewData) {

    if (

        !viewData ||

        !viewData.objects

    ) {

        return [];

    }

    return viewData.objects.filter(

        object =>

            object.type !== "rect"

    );

}

/* ===========================================================
   VIEW PRICE
=========================================================== */

function calculateViewPrice(

    product,

    viewName,

    objects,

    method = "dtf"

) {

    if (!product) return 0;

    const pricing = product.pricing || {};

    let base = 0;

    switch (viewName) {

        case "front":

            base = pricing.frontPrint || 0;

            break;

        case "back":

            base = pricing.backPrint || 0;

            break;

        case "leftSleeve":

        case "rightSleeve":

            base = pricing.sleevePrint || 0;

            break;

        default:

            base = 0;

    }

    if (objects.length === 0) {

        return 0;

    }

    let total = base;

    objects.forEach(object => {

        if (object.type === "textbox") {

            total += 15;

        }

        if (object.type === "image") {

            total += 25;

        }

    });

    const multiplier =

        PricingEngine

            .printMethods[method]

            ?.multiplier || 1;

    return roundPrice(

        total * multiplier

    );

}

/* ===========================================================
   DESIGN PRICE
=========================================================== */

function calculateDesignPrice(

    product,

    design,

    method = "dtf"

) {

    if (!product || !design) {

        return {

            base: 0,

            front: 0,

            back: 0,

            leftSleeve: 0,

            rightSleeve: 0,

            subtotal: 0

        };

    }

    const front = calculateViewPrice(

        product,

        "front",

        getDesignObjects(

            design.views.front

        ),

        method

    );

    const back = calculateViewPrice(

        product,

        "back",

        getDesignObjects(

            design.views.back

        ),

        method

    );

    const leftSleeve = calculateViewPrice(

        product,

        "leftSleeve",

        getDesignObjects(

            design.views.leftSleeve

        ),

        method

    );

    const rightSleeve = calculateViewPrice(

        product,

        "rightSleeve",

        getDesignObjects(

            design.views.rightSleeve

        ),

        method

    );

    const base = getBasePrice(product);

    return {

        base,

        front,

        back,

        leftSleeve,

        rightSleeve,

        subtotal:

            base +

            front +

            back +

            leftSleeve +

            rightSleeve

    };

}

/* ===========================================================
   QUANTITY DISCOUNT
=========================================================== */

function getQuantityDiscount(quantity) {

    let percent = 0;

    PricingEngine.quantityDiscounts.forEach(rule => {

        if (quantity >= rule.min) {

            percent = rule.discount;

        }

    });

    return percent;

}
/* ===========================================================
   PRICING ENGINE
   PART 2
   GST • Coupons • Bulk Pricing • Price Breakdown
=========================================================== */

/* ===========================================================
   GST
=========================================================== */

function calculateGST(amount) {

    const gst =

        amount *

        (PricingEngine.gstRate / 100);

    return roundPrice(gst);

}

function calculateTotalWithGST(amount) {

    return roundPrice(

        amount +

        calculateGST(amount)

    );

}

/* ===========================================================
   PRINT METHOD SURCHARGE
=========================================================== */

function calculatePrintMethodCost(

    subtotal,

    method = "dtf"

) {

    const multiplier =

        PricingEngine.printMethods[method]

            ?.multiplier || 1;

    return roundPrice(

        subtotal * multiplier

    );

}

/* ===========================================================
   LARGE DESIGN SURCHARGE
=========================================================== */

function calculateLargeDesignCharge(

    objects

) {

    if (!objects || !objects.length) {

        return 0;

    }

    let surcharge = 0;

    objects.forEach(object => {

        const width =

            (object.width || 0) *

            (object.scaleX || 1);

        const height =

            (object.height || 0) *

            (object.scaleY || 1);

        const area = width * height;

        if (area > 90000) {

            surcharge += 50;

        }

        else if (area > 50000) {

            surcharge += 25;

        }

    });

    return surcharge;

}

/* ===========================================================
   BULK ORDER PRICE
=========================================================== */

function calculateBulkPrice(

    subtotal,

    quantity

) {

    const discount =

        getQuantityDiscount(quantity);

    const discountAmount =

        roundPrice(

            subtotal *

            (discount / 100)

        );

    return {

        discount,

        discountAmount,

        total:

            subtotal -

            discountAmount

    };

}

/* ===========================================================
   COUPONS
=========================================================== */

const COUPONS = {

    WELCOME10: {

        type: "percentage",

        value: 10

    },

    AURØGANT15: {

        type: "percentage",

        value: 15

    },

    SAVE100: {

        type: "flat",

        value: 100

    },

    FREESHIP: {

        type: "shipping",

        value: 0

    }

};

function applyCoupon(

    subtotal,

    code

) {

    if (!code) {

        return {

            valid: false,

            amount: 0

        };

    }

    const coupon =

        COUPONS[

            code.toUpperCase()

        ];

    if (!coupon) {

        return {

            valid: false,

            amount: 0

        };

    }

    let amount = 0;

    switch (coupon.type) {

        case "percentage":

            amount = roundPrice(

                subtotal *

                (coupon.value / 100)

            );

            break;

        case "flat":

            amount = coupon.value;

            break;

        default:

            amount = 0;

    }

    return {

        valid: true,

        amount,

        coupon

    };

}

/* ===========================================================
   COMPLETE ORDER BREAKDOWN
=========================================================== */

function calculateOrder(

    product,

    design,

    {

        quantity = 1,

        coupon = "",

        printMethod = "dtf"

    } = {}

) {

    const designPrice =

        calculateDesignPrice(

            product,

            design,

            printMethod

        );

    const objects = [

        ...getDesignObjects(

            design.views.front

        ),

        ...getDesignObjects(

            design.views.back

        ),

        ...getDesignObjects(

            design.views.leftSleeve

        ),

        ...getDesignObjects(

            design.views.rightSleeve

        )

    ];

    const designCharge =

        calculateLargeDesignCharge(

            objects

        );

    let subtotal =

        designPrice.subtotal +

        designCharge;

    subtotal =

        calculatePrintMethodCost(

            subtotal,

            printMethod

        );

    subtotal *= quantity;

    const bulk =

        calculateBulkPrice(

            subtotal,

            quantity

        );

    const couponDiscount =

        applyCoupon(

            bulk.total,

            coupon

        );

    const taxableAmount =

        bulk.total -

        couponDiscount.amount;

    const gst =

        calculateGST(

            taxableAmount

        );

    const grandTotal =

        taxableAmount +

        gst;

    return {

        product,

        quantity,

        printMethod,

        breakdown: {

            base:

                designPrice.base,

            front:

                designPrice.front,

            back:

                designPrice.back,

            leftSleeve:

                designPrice.leftSleeve,

            rightSleeve:

                designPrice.rightSleeve,

            designCharge,

            subtotal,

            bulkDiscount:

                bulk.discountAmount,

            couponDiscount:

                couponDiscount.amount,

            gst,

            total:

                roundPrice(

                    grandTotal

                )

        }

    };

}
/* ===========================================================
   PRICING ENGINE
   PART 3
   Shipping • Taxes • Invoice • Live UI Updates
=========================================================== */

/* ===========================================================
   SHIPPING RULES
=========================================================== */

const SHIPPING = {

    standard: {

        name: "Standard Delivery",

        charge: 99,

        days: "5-7 Business Days"

    },

    express: {

        name: "Express Delivery",

        charge: 199,

        days: "2-3 Business Days"

    },

    priority: {

        name: "Priority Delivery",

        charge: 299,

        days: "Next Business Day"

    },

    freeAbove: 2999

};

function calculateShipping(

    subtotal,

    method = "standard"

) {

    if (

        subtotal >= SHIPPING.freeAbove

    ) {

        return {

            charge: 0,

            free: true,

            method

        };

    }

    const option =

        SHIPPING[method];

    return {

        charge: option.charge,

        free: false,

        method

    };

}

/* ===========================================================
   ESTIMATED DELIVERY
=========================================================== */

function getEstimatedDelivery(

    method = "standard"

) {

    return SHIPPING[method]?.days ||

        SHIPPING.standard.days;

}

/* ===========================================================
   COMPLETE ORDER TOTAL
=========================================================== */

function calculateGrandTotal(

    order,

    shippingMethod = "standard"

) {

    const shipping =

        calculateShipping(

            order.breakdown.total,

            shippingMethod

        );

    return {

        ...order,

        shipping,

        grandTotal:

            roundPrice(

                order.breakdown.total +

                shipping.charge

            )

    };

}

/* ===========================================================
   PRICE SUMMARY
=========================================================== */

function generatePriceSummary(order) {

    return {

        baseProduct:

            order.breakdown.base,

        frontPrint:

            order.breakdown.front,

        backPrint:

            order.breakdown.back,

        leftSleeve:

            order.breakdown.leftSleeve,

        rightSleeve:

            order.breakdown.rightSleeve,

        designCharge:

            order.breakdown.designCharge,

        quantity:

            order.quantity,

        bulkDiscount:

            order.breakdown.bulkDiscount,

        couponDiscount:

            order.breakdown.couponDiscount,

        gst:

            order.breakdown.gst,

        shipping:

            order.shipping.charge,

        total:

            order.grandTotal

    };

}

/* ===========================================================
   LIVE PRICE UI
=========================================================== */

function updatePricingUI(order) {

    if (!order) return;

    const set = (

        id,

        value

    ) => {

        const element =

            document.getElementById(id);

        if (!element) return;

        element.textContent =

            formatCurrency(value);

    };

    set(

        "priceBase",

        order.breakdown.base

    );

    set(

        "priceFront",

        order.breakdown.front

    );

    set(

        "priceBack",

        order.breakdown.back

    );

    set(

        "priceLeftSleeve",

        order.breakdown.leftSleeve

    );

    set(

        "priceRightSleeve",

        order.breakdown.rightSleeve

    );

    set(

        "priceDesign",

        order.breakdown.designCharge

    );

    set(

        "priceGST",

        order.breakdown.gst

    );

    set(

        "priceShipping",

        order.shipping.charge

    );

    set(

        "priceTotal",

        order.grandTotal

    );

}

/* ===========================================================
   LIVE CALCULATOR
=========================================================== */

function refreshPricing() {

    if (

        !window.designState ||

        !window.activeProduct

    ) {

        return;

    }

    const quantity =

        Number(

            document.getElementById(

                "quantity"

            )?.value || 1

        );

    const coupon =

        document.getElementById(

            "coupon"

        )?.value || "";

    const method =

        document.getElementById(

            "printMethod"

        )?.value || "dtf";

    const shipping =

        document.getElementById(

            "shippingMethod"

        )?.value || "standard";

    let order =

        calculateOrder(

            activeProduct,

            designState,

            {

                quantity,

                coupon,

                printMethod: method

            }

        );

    order =

        calculateGrandTotal(

            order,

            shipping

        );

    updatePricingUI(order);

    return order;

}

/* ===========================================================
   EVENT BINDINGS
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        [

            "quantity",

            "coupon",

            "printMethod",

            "shippingMethod"

        ].forEach(id => {

            const element =

                document.getElementById(id);

            if (!element) return;

            element.addEventListener(

                "change",

                refreshPricing

            );

            element.addEventListener(

                "input",

                refreshPricing

            );

        });

    }

);

/* ===========================================================
   INVOICE DATA
=========================================================== */

function generateInvoiceData(order) {

    return {

        invoiceNo:

            "INV-" +

            Date.now(),

        orderDate:

            new Date()

            .toLocaleDateString(),

        currency:

            PricingEngine.currency,

        symbol:

            PricingEngine.symbol,

        items: [

            {

                name:

                    order.product.name,

                quantity:

                    order.quantity,

                unitPrice:

                    order.breakdown.base,

                total:

                    order.breakdown.base *

                    order.quantity

            }

        ],

        pricing:

            generatePriceSummary(order)

    };

}

/* ===========================================================
   PRICE VALIDATION
=========================================================== */

function validatePricing(order) {

    if (!order)

        return false;

    if (

        order.grandTotal < 0

    )

        return false;

    if (

        !order.product

    )

        return false;

    if (

        order.quantity < 1

    )

        return false;

    return true;

}

