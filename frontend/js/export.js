/* ===========================================================
   AURØGANT STUDIO
   EXPORT ENGINE
   PART 1
   Core Engine • Canvas Export • PNG • JPG • SVG
=========================================================== */

const Export = {

    version: "1.0.0",

    canvas: null,

    defaultScale: 2,

    defaultQuality: 1,

    initialized: false

};

/* ===========================================================
   INITIALIZATION
=========================================================== */

function initializeExportEngine() {

    if (Export.initialized) return;

    if (typeof fabricCanvas !== "undefined") {

        Export.canvas = fabricCanvas;

    }

    else if (typeof canvas !== "undefined") {

        Export.canvas = canvas;

    }

    Export.initialized = true;

}

document.addEventListener(

    "DOMContentLoaded",

    initializeExportEngine

);

/* ===========================================================
   CANVAS GETTER
=========================================================== */

function getExportCanvas() {

    if (Export.canvas) {

        return Export.canvas;

    }

    if (typeof fabricCanvas !== "undefined") {

        Export.canvas = fabricCanvas;

    }

    if (typeof canvas !== "undefined") {

        Export.canvas = canvas;

    }

    return Export.canvas;

}

/* ===========================================================
   FILE DOWNLOAD
=========================================================== */

function downloadFile(

    blob,

    filename

) {

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}

/* ===========================================================
   DATA URL DOWNLOAD
=========================================================== */

function downloadDataURL(

    dataURL,

    filename

) {

    const link =

        document.createElement("a");

    link.href = dataURL;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

/* ===========================================================
   PNG EXPORT
=========================================================== */

function exportPNG(options = {}) {

    const canvas =

        getExportCanvas();

    if (!canvas) return null;

    const dataURL =

        canvas.toDataURL({

            format: "png",

            multiplier:

                options.scale ||

                Export.defaultScale

        });

    if (

        options.download !== false

    ) {

        downloadDataURL(

            dataURL,

            options.filename ||

            "design.png"

        );

    }

    return dataURL;

}

/* ===========================================================
   JPG EXPORT
=========================================================== */

function exportJPG(options = {}) {

    const canvas =

        getExportCanvas();

    if (!canvas) return null;

    const dataURL =

        canvas.toDataURL({

            format: "jpeg",

            quality:

                options.quality ||

                Export.defaultQuality,

            multiplier:

                options.scale ||

                Export.defaultScale

        });

    if (

        options.download !== false

    ) {

        downloadDataURL(

            dataURL,

            options.filename ||

            "design.jpg"

        );

    }

    return dataURL;

}

/* ===========================================================
   SVG EXPORT
=========================================================== */

function exportSVG(options = {}) {

    const canvas =

        getExportCanvas();

    if (!canvas) return null;

    const svg =

        canvas.toSVG();

    const blob =

        new Blob(

            [svg],

            {

                type: "image/svg+xml"

            }

        );

    if (

        options.download !== false

    ) {

        downloadFile(

            blob,

            options.filename ||

            "design.svg"

        );

    }

    return svg;

}

/* ===========================================================
   HIGH RES EXPORT
=========================================================== */

function exportHighResolutionPNG(

    scale = 4

) {

    return exportPNG({

        scale,

        filename:

            `design-${scale}x.png`

    });

}

/* ===========================================================
   TRANSPARENT PNG
=========================================================== */

function exportTransparentPNG() {

    return exportPNG({

        filename:

            "design-transparent.png"

    });

}

/* ===========================================================
   PREVIEW EXPORT
=========================================================== */

function exportPreview() {

    return exportPNG({

        scale: 1,

        filename:

            "preview.png"

    });

}

/* ===========================================================
   CANVAS SNAPSHOT
=========================================================== */

function getCanvasImage() {

    return exportPNG({

        download: false,

        scale: 1

    });

}

/* ===========================================================
   CANVAS DIMENSIONS
=========================================================== */

function getCanvasSize() {

    const canvas =

        getExportCanvas();

    if (!canvas) return null;

    return {

        width: canvas.getWidth(),

        height: canvas.getHeight()

    };

}

/* ===========================================================
   EXPORT INFO
=========================================================== */

function getExportInfo() {

    const size =

        getCanvasSize();

    return {

        version:

            Export.version,

        canvas: size,

        initialized:

            Export.initialized,

        timestamp:

            new Date().toISOString()

    };

}
/* ===========================================================
   AURØGANT STUDIO
   EXPORT ENGINE
   PART 2
   Design Export • Order Export • Cart Export • Session Backup
=========================================================== */

/* ===========================================================
   JSON EXPORT
=========================================================== */

function exportJSON(

    data,

    filename

) {

    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    downloadFile(

        blob,

        filename

    );

}

/* ===========================================================
   DESIGN JSON
=========================================================== */

function exportDesignJSON(

    design =

        typeof getDesignState ===

        "function"

            ? getDesignState()

            : {}

) {

    exportJSON(

        {

            type: "design",

            version:

                Export.version,

            exportedAt:

                new Date()

                .toISOString(),

            product:

                Studio?.product?.code ||

                null,

            design

        },

        "design.json"

    );

}

/* ===========================================================
   DESIGN BACKUP
=========================================================== */

function backupDesign() {

    exportJSON(

        {

            studio:

                Studio?.state ||

                {},

            design:

                typeof getDesignState ===

                "function"

                    ? getDesignState()

                    : {},

            exportedAt:

                new Date()

                .toISOString()

        },

        "design-backup.json"

    );

}

/* ===========================================================
   ORDER JSON
=========================================================== */

function exportOrderJSON(

    order

) {

    if (!order) {

        order = JSON.parse(

            localStorage.getItem(

                "aurogant_last_order"

            ) || "null"

        );

    }

    if (!order) return;

    exportJSON(

        order,

        `${order.orderId}.json`

    );

}

/* ===========================================================
   ORDER HISTORY
=========================================================== */

function exportOrderHistory() {

    const history = JSON.parse(

        localStorage.getItem(

            "aurogant_orders"

        ) || "[]"

    );

    exportJSON(

        history,

        "order-history.json"

    );

}

/* ===========================================================
   CART JSON
=========================================================== */

function exportCartJSON() {

    const cart = JSON.parse(

        localStorage.getItem(

            "aurogant_cart"

        ) || "[]"

    );

    exportJSON(

        cart,

        "cart.json"

    );

}

/* ===========================================================
   CHECKOUT SESSION
=========================================================== */

function exportCheckoutSession() {

    const checkout = JSON.parse(

        localStorage.getItem(

            "aurogant_checkout"

        ) || "{}"

    );

    exportJSON(

        checkout,

        "checkout-session.json"

    );

}

/* ===========================================================
   STUDIO SESSION
=========================================================== */

function exportStudioSession() {

    const session = JSON.parse(

        localStorage.getItem(

            "aurogant_studio_session"

        ) || "{}"

    );

    exportJSON(

        session,

        "studio-session.json"

    );

}

/* ===========================================================
   SETTINGS BACKUP
=========================================================== */

function exportSettings() {

    const settings = {

        customer:

            JSON.parse(

                localStorage.getItem(

                    "aurogant_customer"

                ) || "{}"

            ),

        coupons:

            JSON.parse(

                localStorage.getItem(

                    "aurogant_coupon"

                ) || "{}"

            ),

        exportedAt:

            new Date()

            .toISOString()

    };

    exportJSON(

        settings,

        "settings-backup.json"

    );

}

/* ===========================================================
   FULL BACKUP
=========================================================== */

function exportFullBackup() {

    exportJSON(

        {

            exportedAt:

                new Date()

                .toISOString(),

            version:

                Export.version,

            customer:

                JSON.parse(

                    localStorage.getItem(

                        "aurogant_customer"

                    ) || "{}"

                ),

            cart:

                JSON.parse(

                    localStorage.getItem(

                        "aurogant_cart"

                    ) || "[]"

                ),

            checkout:

                JSON.parse(

                    localStorage.getItem(

                        "aurogant_checkout"

                    ) || "{}"

                ),

            orders:

                JSON.parse(

                    localStorage.getItem(

                        "aurogant_orders"

                    ) || "[]"

                ),

            studio:

                JSON.parse(

                    localStorage.getItem(

                        "aurogant_studio_session"

                    ) || "{}"

                )

        },

        "aurogant-backup.json"

    );

}
/* ===========================================================
   AURØGANT STUDIO
   EXPORT ENGINE
   PART 3
   PDF • Invoice • Reports • CSV • Print Documents
=========================================================== */

/* ===========================================================
   TEXT FILE EXPORT
=========================================================== */

function exportTextFile(

    content,

    filename,

    type = "text/plain"

) {

    const blob = new Blob(

        [content],

        {

            type

        }

    );

    downloadFile(

        blob,

        filename

    );

}

/* ===========================================================
   INVOICE PDF
=========================================================== */

function exportInvoice(order) {

    if (!order) {

        order = JSON.parse(

            localStorage.getItem(

                "aurogant_last_order"

            ) || "null"

        );

    }

    if (!order) return;

    const invoice = `

==================================================
                 AURØGANT STUDIO
==================================================

Invoice No : INV-${order.orderId}

Order ID   : ${order.orderId}

Date       : ${new Date(order.orderDate).toLocaleString()}

Customer   : ${order.customer.firstName} ${order.customer.lastName}

Email      : ${order.customer.email}

Phone      : ${order.customer.phone}

--------------------------------------------------

ITEMS

${order.items.map(item => `

${item.name}

Color : ${item.color}

Size  : ${item.size}

Qty   : ${item.quantity}

Price : ₹${item.pricing.breakdown.total}

`).join("")}

--------------------------------------------------

Subtotal : ₹${order.totals.subtotal}

GST      : ₹${order.totals.gst}

Shipping : ₹${order.totals.shipping}

Total    : ₹${order.totals.total}

==================================================

Thank you for shopping with AURØGANT.

`;

    exportTextFile(

        invoice,

        `${order.orderId}-invoice.txt`

    );

}

/* ===========================================================
   ORDER REPORT
=========================================================== */

function exportOrderReport() {

    const orders = JSON.parse(

        localStorage.getItem(

            "aurogant_orders"

        ) || "[]"

    );

    let report =

`AURØGANT ORDER REPORT

==============================

`;

    orders.forEach(order => {

        report +=

`Order : ${order.orderId}

Customer : ${order.customer.firstName} ${order.customer.lastName}

Status : ${order.status}

Amount : ₹${order.totals.total}

Date : ${new Date(order.orderDate).toLocaleDateString()}

------------------------------------

`;

    });

    exportTextFile(

        report,

        "order-report.txt"

    );

}

/* ===========================================================
   PACKING SLIP
=========================================================== */

function exportPackingSlip(order) {

    if (!order) return;

    let slip =

`PACKING SLIP

============================

Order : ${order.orderId}

`;

    order.items.forEach(item => {

        slip +=

`${item.quantity} x ${item.name}

Color : ${item.color}

Size : ${item.size}

--------------------------

`;

    });

    exportTextFile(

        slip,

        `${order.orderId}-packing-slip.txt`

    );

}

/* ===========================================================
   PRODUCTION SHEET
=========================================================== */

function exportProductionSheet(order) {

    if (!order) return;

    let sheet =

`PRODUCTION SHEET

==========================

Order : ${order.orderId}

`;

    order.items.forEach(item => {

        sheet +=

`

Product : ${item.name}

Code : ${item.productCode}

Front : ${item.design.views?.front?.objects?.length || 0}

Back : ${item.design.views?.back?.objects?.length || 0}

Left Sleeve : ${item.design.views?.leftSleeve?.objects?.length || 0}

Right Sleeve : ${item.design.views?.rightSleeve?.objects?.length || 0}

-----------------------------------

`;

    });

    exportTextFile(

        sheet,

        `${order.orderId}-production.txt`

    );

}

/* ===========================================================
   CSV EXPORT
=========================================================== */

function exportOrdersCSV() {

    const orders = JSON.parse(

        localStorage.getItem(

            "aurogant_orders"

        ) || "[]"

    );

    let csv =

"Order ID,Date,Customer,Status,Items,Total\n";

    orders.forEach(order => {

        csv +=

`"${order.orderId}",

"${order.orderDate}",

"${order.customer.firstName} ${order.customer.lastName}",

"${order.status}",

"${order.items.length}",

"${order.totals.total}"

`;

    });

    exportTextFile(

        csv,

        "orders.csv",

        "text/csv"

    );

}

/* ===========================================================
   CUSTOMER CSV
=========================================================== */

function exportCustomersCSV() {

    const orders = JSON.parse(

        localStorage.getItem(

            "aurogant_orders"

        ) || "[]"

    );

    let csv =

"Name,Email,Phone,Orders,Total Spend\n";

    const customers = {};

    orders.forEach(order => {

        const key =

            order.customer.email;

        if (!customers[key]) {

            customers[key] = {

                name:

                    order.customer.firstName +

                    " " +

                    order.customer.lastName,

                email:

                    order.customer.email,

                phone:

                    order.customer.phone,

                orders: 0,

                spend: 0

            };

        }

        customers[key].orders++;

        customers[key].spend +=

            order.totals.total;

    });

    Object.values(customers).forEach(customer => {

        csv +=

`${customer.name},

${customer.email},

${customer.phone},

${customer.orders},

${customer.spend}

`;

    });

    exportTextFile(

        csv,

        "customers.csv",

        "text/csv"

    );

}
/* ===========================================================
   AURØGANT STUDIO
   EXPORT ENGINE
   PART 4
   Batch Export • Download Manager • Analytics • Public API
=========================================================== */

/* ===========================================================
   DOWNLOAD QUEUE
=========================================================== */

Export.queue = [];

function queueDownload(

    callback,

    delay = 400

) {

    Export.queue.push({

        callback,

        delay

    });

}

async function processDownloadQueue() {

    while (

        Export.queue.length

    ) {

        const job =

            Export.queue.shift();

        job.callback();

        await new Promise(

            resolve =>

                setTimeout(

                    resolve,

                    job.delay

                )

        );

    }

}

/* ===========================================================
   FILE NAME HELPERS
=========================================================== */

function createFileName(

    prefix,

    extension

) {

    const now =

        new Date();

    const timestamp =

        `${now.getFullYear()}${String(

            now.getMonth() + 1

        ).padStart(2,"0")}${String(

            now.getDate()

        ).padStart(2,"0")}-${String(

            now.getHours()

        ).padStart(2,"0")}${String(

            now.getMinutes()

        ).padStart(2,"0")}${String(

            now.getSeconds()

        ).padStart(2,"0")}`;

    return `${prefix}-${timestamp}.${extension}`;

}

/* ===========================================================
   BATCH EXPORT
=========================================================== */

function batchExport(order = null) {

    if (!order) {

        order = JSON.parse(

            localStorage.getItem(

                "aurogant_last_order"

            ) || "null"

        );

    }

    queueDownload(() =>

        exportPNG({

            filename:

                createFileName(

                    "preview",

                    "png"

                )

        })

    );

    queueDownload(() =>

        exportSVG({

            filename:

                createFileName(

                    "design",

                    "svg"

                )

        })

    );

    queueDownload(() =>

        exportDesignJSON()

    );

    if (order) {

        queueDownload(() =>

            exportInvoice(order)

        );

        queueDownload(() =>

            exportPackingSlip(order)

        );

        queueDownload(() =>

            exportProductionSheet(order)

        );

        queueDownload(() =>

            exportOrderJSON(order)

        );

    }

    processDownloadQueue();

}

/* ===========================================================
   EXPORT ANALYTICS
=========================================================== */

function getExportStatistics() {

    const history = JSON.parse(

        localStorage.getItem(

            "aurogant_orders"

        ) || "[]"

    );

    return {

        version:

            Export.version,

        totalOrders:

            history.length,

        totalExports:

            history.length,

        queueLength:

            Export.queue.length,

        lastExport:

            new Date()

            .toISOString()

    };

}

/* ===========================================================
   CLEAR QUEUE
=========================================================== */

function clearExportQueue() {

    Export.queue = [];

}

/* ===========================================================
   EXPORT HEALTH
=========================================================== */

function getExportHealth() {

    return {

        initialized:

            Export.initialized,

        canvasReady:

            !!getExportCanvas(),

        queue:

            Export.queue.length,

        browser:

            navigator.userAgent,

        timestamp:

            new Date()

            .toISOString()

    };

}

/* ===========================================================
   PUBLIC API
=========================================================== */

window.Export = {

    initialize:

        initializeExportEngine,

    exportPNG,

    exportJPG,

    exportSVG,

    exportPreview,

    exportTransparentPNG,

    exportHighResolutionPNG,

    exportDesignJSON,

    backupDesign,

    exportOrderJSON,

    exportOrderHistory,

    exportCartJSON,

    exportCheckoutSession,

    exportStudioSession,

    exportSettings,

    exportFullBackup,

    exportInvoice,

    exportOrderReport,

    exportPackingSlip,

    exportProductionSheet,

    exportOrdersCSV,

    exportCustomersCSV,

    batchExport,

    queueDownload,

    processQueue:

        processDownloadQueue,

    clearQueue:

        clearExportQueue,

    getCanvasImage,

    getCanvasSize,

    getExportInfo,

    getExportHealth,

    getStatistics:

        getExportStatistics,

    downloadFile,

    downloadDataURL,

    state: Export

};

/* ===========================================================
   INITIALIZATION
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeExportEngine();

        console.log(

            "%cAURØGANT EXPORT ENGINE READY",

            "color:#D4AF37;font-size:18px;font-weight:bold"

        );

    }

);

/* ===========================================================
   END OF FILE
=========================================================== */