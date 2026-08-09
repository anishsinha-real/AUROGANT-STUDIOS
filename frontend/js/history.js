/* ===========================================================
   AURØGANT STUDIO
   ORDER HISTORY
   PART 1
   Initialization • Load Orders • Render History • Order Cards
=========================================================== */

const ORDER_HISTORY_KEY = "aurogant_orders";

/* ===========================================================
   HISTORY STATE
=========================================================== */

const History = {

    orders: [],

    filteredOrders: [],

    initialized: false

};

/* ===========================================================
   INITIALIZATION
=========================================================== */

function initializeHistory() {

    if (History.initialized) return;

    loadOrders();

    renderOrderHistory();

    updateHistoryStats();

    History.initialized = true;

}

document.addEventListener(

    "DOMContentLoaded",

    initializeHistory

);

/* ===========================================================
   LOAD ORDERS
=========================================================== */

function loadOrders() {

    History.orders = JSON.parse(

        localStorage.getItem(

            ORDER_HISTORY_KEY

        ) || "[]"

    );

    History.filteredOrders =

        [...History.orders];

}

/* ===========================================================
   GETTERS
=========================================================== */

function getOrders() {

    return History.orders;

}

function getOrderById(orderId) {

    return History.orders.find(

        order =>

            order.orderId === orderId

    );

}

/* ===========================================================
   RENDER HISTORY
=========================================================== */

function renderOrderHistory() {

    const container =

        document.getElementById(

            "historyContainer"

        );

    if (!container) return;

    container.innerHTML = "";

    if (

        !History.filteredOrders.length

    ) {

        container.innerHTML = `

            <div class="history-empty">

                <i class="bi bi-bag-x"></i>

                <h3>No Orders Yet</h3>

                <p>Your previous orders will appear here.</p>

            </div>

        `;

        return;

    }

    History.filteredOrders.forEach(order => {

        container.appendChild(

            createOrderCard(order)

        );

    });

}

/* ===========================================================
   ORDER CARD
=========================================================== */

function createOrderCard(order) {

    const card =

        document.createElement("div");

    card.className =

        "history-card";

    card.innerHTML = `

        <div class="history-header">

            <div>

                <h4>${order.orderId}</h4>

                <small>

                    ${formatHistoryDate(

                        order.orderDate

                    )}

                </small>

            </div>

            <span class="status status-${order.status.toLowerCase()}">

                ${order.status}

            </span>

        </div>

        <div class="history-body">

            <div>

                <strong>

                    ${order.items.length}

                </strong>

                Item(s)

            </div>

            <div>

                <strong>

                    ₹${order.totals.total.toFixed(2)}

                </strong>

            </div>

        </div>

        <div class="history-products">

            ${createProductPreview(

                order.items

            )}

        </div>

        <div class="history-actions">

            <button

                class="btn btn-primary"

                data-view="${order.orderId}">

                View Details

            </button>

            <button

                class="btn btn-outline"

                data-reorder="${order.orderId}">

                Reorder

            </button>

        </div>

    `;

    return card;

}

/* ===========================================================
   PRODUCT PREVIEW
=========================================================== */

function createProductPreview(items) {

    return items

        .slice(0,3)

        .map(item => `

            <div class="history-product">

                <img

                    src="${item.design.preview || ""}"

                    alt="${item.name}"

                >

                <div>

                    <strong>

                        ${item.name}

                    </strong>

                    <small>

                        Qty : ${item.quantity}

                    </small>

                </div>

            </div>

        `)

        .join("");

}

/* ===========================================================
   STATS
=========================================================== */

function updateHistoryStats() {

    setHistoryStat(

        "historyOrders",

        History.orders.length

    );

    setHistoryStat(

        "historySpent",

        PricingEngine.formatCurrency(

            getTotalSpent()

        )

    );

}

function setHistoryStat(

    id,

    value

) {

    const element =

        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}

function getTotalSpent() {

    return History.orders.reduce(

        (total, order) =>

            total +

            order.totals.total,

        0

    );

}

/* ===========================================================
   UTILITIES
=========================================================== */

function formatHistoryDate(date) {

    return new Date(date)

        .toLocaleDateString(

            "en-IN",

            {

                day: "numeric",

                month: "short",

                year: "numeric"

            }

        );

}

/* ===========================================================
   EVENTS
=========================================================== */

document.addEventListener(

    "click",

    event => {

        const view =

            event.target.closest(

                "[data-view]"

            );

        if (view) {

            openOrderDetails(

                view.dataset.view

            );

            return;

        }

    }

);

/* ===========================================================
   ORDER DETAILS
=========================================================== */

function openOrderDetails(orderId) {

    const order =

        getOrderById(orderId);

    if (!order) return;

    localStorage.setItem(

        "aurogant_selected_order",

        JSON.stringify(order)

    );

    window.location.href =

        `order-details.html?id=${orderId}`;

}
/* ===========================================================
   AURØGANT STUDIO
   ORDER HISTORY
   PART 2
   Search • Filters • Sorting • Pagination
=========================================================== */

/* ===========================================================
   FILTER STATE
=========================================================== */

History.searchQuery = "";

History.statusFilter = "all";

History.sortBy = "newest";

History.currentPage = 1;

History.itemsPerPage = 8;

/* ===========================================================
   SEARCH
=========================================================== */

function searchOrders(query = "") {

    History.searchQuery =

        query.trim().toLowerCase();

    applyHistoryFilters();

}

function matchesSearch(order) {

    if (!History.searchQuery) return true;

    const search = History.searchQuery;

    const productNames =

        order.items

            .map(item =>

                `${item.name} ${item.productCode}`

            )

            .join(" ")

            .toLowerCase();

    return (

        order.orderId

            .toLowerCase()

            .includes(search) ||

        order.customer.firstName

            ?.toLowerCase()

            .includes(search) ||

        order.customer.lastName

            ?.toLowerCase()

            .includes(search) ||

        productNames.includes(search)

    );

}

/* ===========================================================
   STATUS FILTER
=========================================================== */

function filterOrders(status = "all") {

    History.statusFilter =

        status.toLowerCase();

    applyHistoryFilters();

}

function matchesStatus(order) {

    if (

        History.statusFilter ===

        "all"

    ) {

        return true;

    }

    return (

        order.status.toLowerCase() ===

        History.statusFilter

    );

}

/* ===========================================================
   SORTING
=========================================================== */

function sortOrders(sort = "newest") {

    History.sortBy = sort;

    applyHistoryFilters();

}

function sortHistory(list) {

    switch (History.sortBy) {

        case "oldest":

            list.sort(

                (a, b) =>

                    new Date(

                        a.orderDate

                    ) -

                    new Date(

                        b.orderDate

                    )

            );

            break;

        case "highest":

            list.sort(

                (a, b) =>

                    b.totals.total -

                    a.totals.total

            );

            break;

        case "lowest":

            list.sort(

                (a, b) =>

                    a.totals.total -

                    b.totals.total

            );

            break;

        default:

            list.sort(

                (a, b) =>

                    new Date(

                        b.orderDate

                    ) -

                    new Date(

                        a.orderDate

                    )

            );

    }

}

/* ===========================================================
   APPLY FILTERS
=========================================================== */

function applyHistoryFilters() {

    History.filteredOrders =

        History.orders.filter(order =>

            matchesSearch(order) &&

            matchesStatus(order)

        );

    sortHistory(

        History.filteredOrders

    );

    History.currentPage = 1;

    renderPaginatedHistory();

}

/* ===========================================================
   PAGINATION
=========================================================== */

function renderPaginatedHistory() {

    const start =

        (History.currentPage - 1) *

        History.itemsPerPage;

    const end =

        start +

        History.itemsPerPage;

    const original =

        History.filteredOrders;

    History.filteredOrders =

        original.slice(

            start,

            end

        );

    renderOrderHistory();

    History.filteredOrders =

        original;

    updatePagination();

}

function updatePagination() {

    const pages = Math.ceil(

        History.filteredOrders.length /

        History.itemsPerPage

    );

    const pageInfo =

        document.getElementById(

            "historyPageInfo"

        );

    if (pageInfo) {

        pageInfo.textContent =

            `${History.currentPage} / ${Math.max(

                pages,

                1

            )}`;

    }

}

function nextHistoryPage() {

    const totalPages = Math.ceil(

        History.filteredOrders.length /

        History.itemsPerPage

    );

    if (

        History.currentPage <

        totalPages

    ) {

        History.currentPage++;

        renderPaginatedHistory();

    }

}

function previousHistoryPage() {

    if (

        History.currentPage > 1

    ) {

        History.currentPage--;

        renderPaginatedHistory();

    }

}

/* ===========================================================
   EVENTS
=========================================================== */

document

    .getElementById(

        "historySearch"

    )

    ?.addEventListener(

        "input",

        event => {

            searchOrders(

                event.target.value

            );

        }

    );

document

    .getElementById(

        "historyFilter"

    )

    ?.addEventListener(

        "change",

        event => {

            filterOrders(

                event.target.value

            );

        }

    );

document

    .getElementById(

        "historySort"

    )

    ?.addEventListener(

        "change",

        event => {

            sortOrders(

                event.target.value

            );

        }

    );

document

    .getElementById(

        "historyPrev"

    )

    ?.addEventListener(

        "click",

        previousHistoryPage

    );

document

    .getElementById(

        "historyNext"

    )

    ?.addEventListener(

        "click",

        nextHistoryPage

    );

/* ===========================================================
   INITIAL FILTER
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    applyHistoryFilters

);
/* ===========================================================
   AURØGANT STUDIO
   ORDER HISTORY
   PART 3
   Reorder • Downloads • Tracking • Order Actions
=========================================================== */

/* ===========================================================
   REORDER
=========================================================== */

function reorderOrder(orderId) {

    const order = getOrderById(orderId);

    if (!order) return;

    if (typeof Cart === "undefined") {

        alert("Cart module not loaded.");

        return;

    }

    order.items.forEach(item => {

        Cart.add({

            product: ProductDB.getProductByCode(

                item.productCode

            ),

            color: item.color,

            size: item.size,

            quantity: item.quantity,

            design: item.design,

            pricing: item.pricing

        });

    });

    window.location.href = "cart.html";

}

/* ===========================================================
   DOWNLOAD INVOICE
=========================================================== */

function downloadInvoice(orderId) {

    const order = getOrderById(orderId);

    if (!order) return;

    if (

        typeof Export !== "undefined" &&

        Export.exportInvoice

    ) {

        Export.exportInvoice(order);

        return;

    }

    const blob = new Blob(

        [

            JSON.stringify(

                order,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${order.orderId}-invoice.json`;

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================================
   DOWNLOAD DESIGN
=========================================================== */

function downloadDesign(orderId) {

    const order = getOrderById(orderId);

    if (!order) return;

    const designs = order.items.map(item => ({

        product: item.name,

        code: item.productCode,

        design: item.design

    }));

    const blob = new Blob(

        [

            JSON.stringify(

                designs,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${order.orderId}-design.json`;

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================================
   TRACK ORDER
=========================================================== */

const ORDER_TIMELINE = [

    "Pending",

    "Confirmed",

    "Production",

    "Printing",

    "Quality Check",

    "Packed",

    "Shipped",

    "Delivered"

];

function getOrderTracking(orderId) {

    const order = getOrderById(orderId);

    if (!order) return [];

    const currentIndex =

        ORDER_TIMELINE.indexOf(

            order.status

        );

    return ORDER_TIMELINE.map(

        (step, index) => ({

            title: step,

            completed:

                index < currentIndex,

            current:

                index === currentIndex

        })

    );

}

function showTracking(orderId) {

    const timeline =

        getOrderTracking(orderId);

    const container =

        document.getElementById(

            "trackingTimeline"

        );

    if (!container) return;

    container.innerHTML = timeline

        .map(step => `

            <div class="tracking-step
                ${step.completed ? "completed" : ""}
                ${step.current ? "current" : ""}">

                <span class="tracking-dot"></span>

                <div>

                    <strong>${step.title}</strong>

                </div>

            </div>

        `)

        .join("");

}

/* ===========================================================
   ORDER SUMMARY
=========================================================== */

function getOrderSummary(orderId) {

    const order = getOrderById(orderId);

    if (!order) return null;

    return {

        orderId: order.orderId,

        date: order.orderDate,

        items: order.items.length,

        quantity:

            order.items.reduce(

                (total, item) =>

                    total + item.quantity,

                0

            ),

        total: order.totals.total,

        payment:

            order.payment.status,

        shipping:

            order.shipping.method,

        status: order.status

    };

}

/* ===========================================================
   ORDER ACTIONS
=========================================================== */

document.addEventListener(

    "click",

    event => {

        const reorder =

            event.target.closest(

                "[data-reorder]"

            );

        if (reorder) {

            reorderOrder(

                reorder.dataset.reorder

            );

            return;

        }

        const invoice =

            event.target.closest(

                "[data-invoice]"

            );

        if (invoice) {

            downloadInvoice(

                invoice.dataset.invoice

            );

            return;

        }

        const design =

            event.target.closest(

                "[data-design]"

            );

        if (design) {

            downloadDesign(

                design.dataset.design

            );

            return;

        }

        const tracking =

            event.target.closest(

                "[data-track]"

            );

        if (tracking) {

            showTracking(

                tracking.dataset.track

            );

        }

    }

);
/* ===========================================================
   AURØGANT STUDIO
   ORDER HISTORY
   PART 4
   Analytics • Export • Local Storage • Public API
=========================================================== */

/* ===========================================================
   ANALYTICS
=========================================================== */

function getHistoryAnalytics() {

    const orders = History.orders;

    const analytics = {

        totalOrders: orders.length,

        totalSpent: 0,

        averageOrderValue: 0,

        totalProducts: 0,

        lastOrder: null,

        favoriteProduct: null

    };

    if (!orders.length) {

        return analytics;

    }

    const productCounter = {};

    orders.forEach(order => {

        analytics.totalSpent +=

            order.totals.total;

        analytics.totalProducts +=

            order.items.reduce(

                (total, item) =>

                    total + item.quantity,

                0

            );

        order.items.forEach(item => {

            productCounter[item.name] =

                (productCounter[item.name] || 0) +

                item.quantity;

        });

    });

    analytics.averageOrderValue =

        analytics.totalSpent /

        analytics.totalOrders;

    analytics.lastOrder =

        orders[0];

    analytics.favoriteProduct =

        Object.entries(productCounter)

            .sort(

                (a, b) =>

                    b[1] - a[1]

            )[0]?.[0] || null;

    return analytics;

}

/* ===========================================================
   EXPORT HISTORY
=========================================================== */

function exportHistoryJSON() {

    const blob = new Blob(

        [

            JSON.stringify(

                History.orders,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    const url =

        URL.createObjectURL(blob);

    const link =

        document.createElement("a");

    link.href = url;

    link.download =

        "aurogant-order-history.json";

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================================
   CLEAR HISTORY
=========================================================== */

function clearHistory() {

    if (

        !confirm(

            "Delete entire order history?"

        )

    ) {

        return;

    }

    localStorage.removeItem(

        ORDER_HISTORY_KEY

    );

    History.orders = [];

    History.filteredOrders = [];

    renderOrderHistory();

    updateHistoryStats();

}

/* ===========================================================
   REFRESH
=========================================================== */

function refreshHistory() {

    loadOrders();

    applyHistoryFilters();

    updateHistoryStats();

}

/* ===========================================================
   STORAGE HELPERS
=========================================================== */

function saveHistory() {

    localStorage.setItem(

        ORDER_HISTORY_KEY,

        JSON.stringify(

            History.orders

        )

    );

}

function addOrder(order) {

    History.orders.unshift(order);

    saveHistory();

    refreshHistory();

}

function removeOrder(orderId) {

    History.orders =

        History.orders.filter(

            order =>

                order.orderId !==

                orderId

        );

    saveHistory();

    refreshHistory();

}

/* ===========================================================
   PUBLIC API
=========================================================== */

window.History = {

    initialize:

        initializeHistory,

    load:

        loadOrders,

    refresh:

        refreshHistory,

    getOrders,

    getOrderById,

    search:

        searchOrders,

    filter:

        filterOrders,

    sort:

        sortOrders,

    reorder:

        reorderOrder,

    track:

        showTracking,

    summary:

        getOrderSummary,

    analytics:

        getHistoryAnalytics,

    exportJSON:

        exportHistoryJSON,

    addOrder,

    removeOrder,

    clear:

        clearHistory,

    state: History

};

/* ===========================================================
   INITIALIZATION
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeHistory();

        console.log(

            "%cAURØGANT HISTORY READY",

            "color:#D4AF37;font-size:18px;font-weight:bold"

        );

    }

);

/* ===========================================================
   END OF FILE
=========================================================== */