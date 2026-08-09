/* ===========================================================
   AURØGANT STUDIO
   FABRIC ENGINE
   PART 1 + ARCHITECTURE UPDATE
=========================================================== */

let canvas;

let currentView = "front";

let zoomLevel = 1;

let activeProduct = null;

/* ===========================================================
   SINGLE SOURCE OF TRUTH
=========================================================== */

const designState = {

    product: null,

    color: "Black",

    size: "M",

    views: {

        front: null,

        back: null,

        leftSleeve: null,

        rightSleeve: null

    },

    pricing: {

        base: 0,

        front: 0,

        back: 0,

        sleeve: 0,

        total: 0

    },

    history: [],

    historyIndex: -1,

    lastSaved: null

};

const printAreas = {};

let printAreaRect = null;

/* ===========================================================
   INITIALIZE
=========================================================== */

function initializeCanvas() {

    canvas = new fabric.Canvas("designCanvas", {

        preserveObjectStacking: true,

        selection: true,

        backgroundColor: "transparent"

    });

    canvas.setWidth(900);

    canvas.setHeight(900);

    fabric.Object.prototype.transparentCorners = false;

    fabric.Object.prototype.cornerStyle = "circle";

    fabric.Object.prototype.cornerColor = "#D4AF37";

    fabric.Object.prototype.cornerStrokeColor = "#ffffff";

    fabric.Object.prototype.borderColor = "#D4AF37";

    fabric.Object.prototype.borderScaleFactor = 2;

    fabric.Object.prototype.padding = 8;

    fabric.Object.prototype.rotatingPointOffset = 30;

    registerCanvasEvents();

    updateZoomLabel();

}

/* ===========================================================
   EVENTS
=========================================================== */

function registerCanvasEvents() {

    canvas.on("selection:created", updateLayerPanel);

    canvas.on("selection:updated", updateLayerPanel);

    canvas.on("selection:cleared", updateLayerPanel);

    canvas.on("object:added", () => {

        updateLayerPanel();

        updatePricing();

        autoSaveDesign();

    });

    canvas.on("object:removed", () => {

        updateLayerPanel();

        updatePricing();

        autoSaveDesign();

    });

    canvas.on("object:modified", () => {

        saveHistory();

        updateLayerPanel();

        updatePricing();

        autoSaveDesign();

    });

}

/* ===========================================================
   SAVE CURRENT VIEW
=========================================================== */

function saveCurrentView() {

    if (!canvas) return;

    designState.views[currentView] = canvas.toJSON();

}

/* ===========================================================
   LOAD VIEW
=========================================================== */

function loadView(viewName) {

    saveCurrentView();

    currentView = viewName;

    canvas.clear();

    if (designState.views[viewName]) {

        canvas.loadFromJSON(

            designState.views[viewName],

            function () {

                if (

                    activeProduct &&

                    activeProduct.printAreas &&

                    activeProduct.printAreas[viewName]

                ) {

                    drawPrintArea(

                        activeProduct.printAreas[viewName]

                    );

                }

                canvas.renderAll();

            }

        );

    }

    else {

        if (

            activeProduct &&

            activeProduct.printAreas &&

            activeProduct.printAreas[viewName]

        ) {

            drawPrintArea(

                activeProduct.printAreas[viewName]

            );

        }

    }

    document

        .querySelectorAll(".view-btn")

        .forEach(btn => {

            btn.classList.toggle(

                "active",

                btn.dataset.view === viewName

            );

        });

}

/* ===========================================================
   AUTO SAVE
=========================================================== */

function autoSaveDesign() {

    saveCurrentView();

    designState.lastSaved = new Date().toISOString();

    localStorage.setItem(

        "aurogant_design",

        JSON.stringify(designState)

    );

}

/* ===========================================================
   RESTORE DESIGN
=========================================================== */

function restoreDesign() {

    const saved = localStorage.getItem(

        "aurogant_design"

    );

    if (!saved) return;

    try {

        const data = JSON.parse(saved);

        Object.assign(designState, data);

        loadView(currentView);

    }

    catch (error) {

        console.error(

            "Unable to restore saved design",

            error

        );

    }

}

/* ===========================================================
   IMAGE UPLOAD
=========================================================== */

function uploadArtwork(file) {

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        fabric.Image.fromURL(event.target.result, function (img) {

            const maxWidth = 320;

            const scale = Math.min(

                maxWidth / img.width,

                maxWidth / img.height

            );

            img.scale(scale);

            img.set({

                left: canvas.width / 2,

                top: canvas.height / 2,

                originX: "center",

                originY: "center"

            });

            canvas.add(img);

            canvas.setActiveObject(img);

            canvas.renderAll();

            saveHistory();

            autoSaveDesign();

        });

    };

    reader.readAsDataURL(file);

}

/* ===========================================================
   ADD TEXT
=========================================================== */

function addText(text) {

    if (!text.trim()) return;

    const textbox = new fabric.Textbox(text, {

        left: canvas.width / 2,

        top: canvas.height / 2,

        originX: "center",

        originY: "center",

        fontFamily: "Inter",

        fontSize: 42,

        fill: "#FFFFFF",

        fontWeight: "600",

        editable: true

    });

    canvas.add(textbox);

    canvas.setActiveObject(textbox);

    canvas.renderAll();

    saveHistory();

    autoSaveDesign();

}

/* ===========================================================
   DELETE
=========================================================== */

function deleteSelectedObject() {

    const object = canvas.getActiveObject();

    if (!object) return;

    canvas.remove(object);

    canvas.renderAll();

    saveHistory();

    autoSaveDesign();

}

/* ===========================================================
   DUPLICATE
=========================================================== */

function duplicateSelectedObject() {

    const object = canvas.getActiveObject();

    if (!object) return;

    object.clone(function (clone) {

        clone.set({

            left: object.left + 25,

            top: object.top + 25

        });

        canvas.add(clone);

        canvas.setActiveObject(clone);

        canvas.renderAll();

        saveHistory();

        autoSaveDesign();

    });

}

/* ===========================================================
   STARTUP
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCanvas();

    restoreDesign();

    document

        .getElementById("imageUpload")

        ?.addEventListener("change", e => {

            uploadArtwork(e.target.files[0]);

        });

    document

        .getElementById("addTextButton")

        ?.addEventListener("click", () => {

            addText(

                document

                    .getElementById("customText")

                    .value

            );

        });

    document

        .getElementById("deleteObjectBtn")

        ?.addEventListener(

            "click",

            deleteSelectedObject

        );

    document

        .getElementById("duplicateObjectBtn")

        ?.addEventListener(

            "click",

            duplicateSelectedObject

        );

});
/* ===========================================================
   FABRIC ENGINE
   PART 3
   History • Layers • Keyboard Shortcuts • Alignment
=========================================================== */

/* ===========================================================
   HISTORY
=========================================================== */

function saveHistory() {

    if (!canvas) return;

    const state = JSON.stringify(canvas.toJSON());

    if (

        designState.history.length &&
        designState.history[designState.historyIndex] === state

    ) {

        return;

    }

    designState.history = designState.history.slice(

        0,

        designState.historyIndex + 1

    );

    designState.history.push(state);

    designState.historyIndex++;

    updateHistoryPanel();

}

function undoHistory() {

    if (designState.historyIndex <= 0) return;

    designState.historyIndex--;

    canvas.loadFromJSON(

        JSON.parse(

            designState.history[designState.historyIndex]

        ),

        function () {

            canvas.renderAll();

            updateLayerPanel();

        }

    );

}

function redoHistory() {

    if (

        designState.historyIndex >=

        designState.history.length - 1

    )

        return;

    designState.historyIndex++;

    canvas.loadFromJSON(

        JSON.parse(

            designState.history[designState.historyIndex]

        ),

        function () {

            canvas.renderAll();

            updateLayerPanel();

        }

    );

}

/* ===========================================================
   HISTORY PANEL
=========================================================== */

function updateHistoryPanel() {

    const panel = document.getElementById(

        "historyTimeline"

    );

    if (!panel) return;

    panel.innerHTML = "";

    designState.history.forEach((state, index) => {

        const item = document.createElement("div");

        item.className = "history-item";

        if (index === designState.historyIndex) {

            item.classList.add("active");

        }

        item.innerHTML = `

            <strong>Step ${index + 1}</strong>

        `;

        item.onclick = () => {

            designState.historyIndex = index;

            canvas.loadFromJSON(

                JSON.parse(state),

                () => {

                    canvas.renderAll();

                    updateLayerPanel();

                }

            );

        };

        panel.appendChild(item);

    });

}

/* ===========================================================
   LAYER PANEL
=========================================================== */

function updateLayerPanel() {

    const list = document.getElementById(

        "layerList"

    );

    if (!list) return;

    list.innerHTML = "";

    const objects = canvas

        .getObjects()

        .slice()

        .reverse();

    objects.forEach((object, index) => {

        if (object === printAreaRect) return;

        const row = document.createElement("div");

        row.className = "layer-item";

        if (object === canvas.getActiveObject()) {

            row.classList.add("active");

        }

        let label = "Layer";

        if (object.type === "textbox") {

            label = "Text";

        }

        if (object.type === "image") {

            label = "Image";

        }

        row.innerHTML = `

            <div class="layer-name">

                <i class="bi bi-layers"></i>

                ${label} ${objects.length - index}

            </div>

        `;

        row.onclick = () => {

            canvas.setActiveObject(object);

            canvas.renderAll();

            updateLayerPanel();

        };

        list.appendChild(row);

    });

}

/* ===========================================================
   OBJECT ORDER
=========================================================== */

function bringForward() {

    const object = canvas.getActiveObject();

    if (!object) return;

    canvas.bringForward(object);

    canvas.renderAll();

    saveHistory();

}

function sendBackward() {

    const object = canvas.getActiveObject();

    if (!object) return;

    canvas.sendBackwards(object);

    canvas.renderAll();

    saveHistory();

}

/* ===========================================================
   OBJECT LOCK
=========================================================== */

function toggleLockObject() {

    const object = canvas.getActiveObject();

    if (!object) return;

    const locked = !object.lockMovementX;

    object.set({

        lockMovementX: locked,

        lockMovementY: locked,

        lockScalingX: locked,

        lockScalingY: locked,

        lockRotation: locked,

        selectable: !locked

    });

    canvas.discardActiveObject();

    canvas.renderAll();

}

/* ===========================================================
   ALIGNMENT
=========================================================== */

function alignObject(position) {

    const object = canvas.getActiveObject();

    if (!object) return;

    switch (position) {

        case "left":

            object.left = 0;

            break;

        case "right":

            object.left =

                canvas.width -

                object.getScaledWidth();

            break;

        case "top":

            object.top = 0;

            break;

        case "bottom":

            object.top =

                canvas.height -

                object.getScaledHeight();

            break;

        case "center":

            object.center();

            break;

    }

    object.setCoords();

    canvas.renderAll();

    saveHistory();

}

/* ===========================================================
   KEYBOARD SHORTCUTS
=========================================================== */

document.addEventListener(

    "keydown",

    function (event) {

        if (

            event.target.tagName === "INPUT" ||

            event.target.tagName === "TEXTAREA"

        )

            return;

        if (event.ctrlKey && event.key === "z") {

            event.preventDefault();

            undoHistory();

        }

        if (event.ctrlKey && event.key === "y") {

            event.preventDefault();

            redoHistory();

        }

        if (event.key === "Delete") {

            deleteSelectedObject();

        }

        if (

            event.ctrlKey &&

            event.key.toLowerCase() === "d"

        ) {

            event.preventDefault();

            duplicateSelectedObject();

        }

        if (

            event.ctrlKey &&

            event.key.toLowerCase() === "k"

        ) {

            event.preventDefault();

            const modal = new bootstrap.Modal(

                document.getElementById(

                    "commandPalette"

                )

            );

            modal.show();

        }

    }

);

/* ===========================================================
   BUTTON EVENTS
=========================================================== */

document

    .getElementById("undoBtn")

    ?.addEventListener(

        "click",

        undoHistory

    );

document

    .getElementById("redoBtn")

    ?.addEventListener(

        "click",

        redoHistory

    );

document

    .getElementById("bringForwardBtn")

    ?.addEventListener(

        "click",

        bringForward

    );

document

    .getElementById("sendBackwardBtn")

    ?.addEventListener(

        "click",

        sendBackward

    );
/* ===========================================================
   FABRIC ENGINE
   PART 4
   Export • Pricing • Autosave • Product Loading
   Cart • Toast • Utilities
=========================================================== */

/* ===========================================================
   EXPORT PNG
=========================================================== */

function exportPNG() {

    saveCurrentView();

    const dataURL = canvas.toDataURL({

        format: "png",

        multiplier: 3,

        enableRetinaScaling: true

    });

    const link = document.createElement("a");

    link.download = "aurogant-design.png";

    link.href = dataURL;

    link.click();

}

/* ===========================================================
   EXPORT PDF
=========================================================== */

function exportPDF() {

    saveCurrentView();

    const image = canvas.toDataURL({

        format: "png",

        multiplier: 3

    });

    const pdf = new jspdf.jsPDF({

        orientation: "portrait",

        unit: "mm",

        format: "a4"

    });

    pdf.addImage(

        image,

        "PNG",

        10,

        15,

        190,

        190

    );

    pdf.save("aurogant-design.pdf");

}

/* ===========================================================
   LIVE PRICING
=========================================================== */

function updatePricing() {

    if (!activeProduct) return;

    const objects = canvas

        .getObjects()

        .filter(object => object !== printAreaRect);

    let printCost = 0;

    objects.forEach(object => {

        if (object.type === "image") {

            printCost += 120;

        }

        if (object.type === "textbox") {

            printCost += 60;

        }

    });

    designState.pricing.base = activeProduct.price;

    designState.pricing[currentView] = printCost;

    designState.pricing.total =

        designState.pricing.base +

        designState.pricing.front +

        designState.pricing.back +

        designState.pricing.leftSleeve +

        designState.pricing.rightSleeve;

    document.getElementById("basePrice").textContent =
        `₹${designState.pricing.base}`;

    document.getElementById("frontPrice").textContent =
        `₹${designState.pricing.front}`;

    document.getElementById("backPrice").textContent =
        `₹${designState.pricing.back}`;

    document.getElementById("sleevePrice").textContent =
        `₹${designState.pricing.leftSleeve +
           designState.pricing.rightSleeve}`;

    document.getElementById("totalPrice").textContent =
        `₹${designState.pricing.total}`;

}

/* ===========================================================
   PRODUCT LOADER
=========================================================== */

function loadProduct(product) {

    activeProduct = product;

    designState.product = product;

    document.getElementById(
        "selectedProductName"
    ).textContent = product.name;

    document.getElementById(
        "selectedProductCode"
    ).textContent = product.code;

    document.getElementById(
        "selectedProductImage"
    ).src = product.image;

    canvas.clear();

    designState.views = {

        front: null,

        back: null,

        leftSleeve: null,

        rightSleeve: null

    };

    if (product.printAreas) {

        drawPrintArea(

            product.printAreas.front

        );

    }

    updatePricing();

}

/* ===========================================================
   ADD TO CART
=========================================================== */

function addToCart() {

    saveCurrentView();

    const cart = JSON.parse(

        localStorage.getItem(

            "aurogant_cart"

        ) || "[]"

    );

    cart.push({

        id: Date.now(),

        product: designState.product,

        design: structuredClone(

            designState

        )

    });

    localStorage.setItem(

        "aurogant_cart",

        JSON.stringify(cart)

    );

    showToast(

        "Design added to cart."

    );

}

/* ===========================================================
   TOAST
=========================================================== */

function showToast(message) {

    const body = document.getElementById(

        "toastMessage"

    );

    body.textContent = message;

    const toast = new bootstrap.Toast(

        document.getElementById(

            "studioToast"

        )

    );

    toast.show();

}

/* ===========================================================
   SAVE INDICATOR
=========================================================== */

function showSaveIndicator() {

    const indicator = document.getElementById(

        "saveIndicator"

    );

    indicator.classList.add("show");

    clearTimeout(

        indicator.hideTimer

    );

    indicator.hideTimer = setTimeout(() => {

        indicator.classList.remove("show");

    }, 1800);

}

/* ===========================================================
   AUTOSAVE OVERRIDE
=========================================================== */

const originalAutoSave = autoSaveDesign;

autoSaveDesign = function () {

    originalAutoSave();

    showSaveIndicator();

};

/* ===========================================================
   LOADING SCREEN
=========================================================== */

window.addEventListener(

    "load",

    function () {

        const overlay = document.getElementById(

            "loadingOverlay"

        );

        if (!overlay) return;

        overlay.style.opacity = "0";

        setTimeout(() => {

            overlay.remove();

        }, 500);

    }

);

/* ===========================================================
   RESET DESIGN
=========================================================== */

function clearCanvasDesign() {

    if (

        !confirm(

            "Remove all artwork from this side?"

        )

    ) return;

    canvas.clear();

    if (

        activeProduct?.printAreas?.[currentView]

    ) {

        drawPrintArea(

            activeProduct.printAreas[currentView]

        );

    }

    saveHistory();

    autoSaveDesign();

}

/* ===========================================================
   DOWNLOAD JSON TEMPLATE
=========================================================== */

function exportTemplate() {

    saveCurrentView();

    const blob = new Blob(

        [

            JSON.stringify(

                designState,

                null,

                2

            )

        ],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(

        blob

    );

    const link = document.createElement("a");

    link.href = url;

    link.download =

        "aurogant-template.json";

    link.click();

    URL.revokeObjectURL(url);

}

/* ===========================================================
   BUTTON EVENTS
=========================================================== */

document

    .getElementById("downloadPNG")

    ?.addEventListener(

        "click",

        exportPNG

    );

document

    .getElementById("downloadPDF")

    ?.addEventListener(

        "click",

        exportPDF

    );

document

    .getElementById("saveTemplate")

    ?.addEventListener(

        "click",

        exportTemplate

    );

document

    .getElementById("addToCartButton")

    ?.addEventListener(

        "click",

        addToCart

    );

/* ===========================================================
   READY
=========================================================== */

console.log(

    "%cAURØGANT STUDIO READY",

    "color:#D4AF37;font-size:18px;font-weight:bold"

);

console.log(

    "Fabric Engine initialized successfully."

);