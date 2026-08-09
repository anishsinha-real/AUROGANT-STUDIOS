/* ===========================================================
   AURØGANT
   UTILITY LIBRARY
   PART 1
   DOM Helpers • Selectors • Classes • Events
=========================================================== */

const Utils = {

    version: "1.0.0",

    initialized: false

};

/* ===========================================================
   INITIALIZATION
=========================================================== */

function initializeUtils() {

    if (Utils.initialized) return;

    Utils.initialized = true;

}

document.addEventListener(

    "DOMContentLoaded",

    initializeUtils

);

/* ===========================================================
   DOM SELECTORS
=========================================================== */

function $(selector, parent = document) {

    return parent.querySelector(selector);

}

function $all(selector, parent = document) {

    return [

        ...parent.querySelectorAll(selector)

    ];

}

function byId(id) {

    return document.getElementById(id);

}

function createElement(tag) {

    return document.createElement(tag);

}

/* ===========================================================
   DOM MANIPULATION
=========================================================== */

function removeElement(element) {

    if (element) {

        element.remove();

    }

}

function empty(element) {

    if (element) {

        element.innerHTML = "";

    }

}

function append(parent, child) {

    if (

        parent &&

        child

    ) {

        parent.appendChild(child);

    }

}

function prepend(parent, child) {

    if (

        parent &&

        child

    ) {

        parent.prepend(child);

    }

}

/* ===========================================================
   CLASS HELPERS
=========================================================== */

function addClass(

    element,

    className

) {

    element?.classList.add(

        className

    );

}

function removeClass(

    element,

    className

) {

    element?.classList.remove(

        className

    );

}

function toggleClass(

    element,

    className

) {

    element?.classList.toggle(

        className

    );

}

function hasClass(

    element,

    className

) {

    return element?.classList.contains(

        className

    );

}

/* ===========================================================
   VISIBILITY
=========================================================== */

function show(element) {

    if (!element) return;

    element.style.display = "";

}

function hide(element) {

    if (!element) return;

    element.style.display = "none";

}

function toggle(element) {

    if (!element) return;

    element.style.display =

        element.style.display === "none"

            ? ""

            : "none";

}

/* ===========================================================
   ATTRIBUTES
=========================================================== */

function setAttribute(

    element,

    attribute,

    value

) {

    element?.setAttribute(

        attribute,

        value

    );

}

function getAttribute(

    element,

    attribute

) {

    return element?.getAttribute(

        attribute

    );

}

function removeAttribute(

    element,

    attribute

) {

    element?.removeAttribute(

        attribute

    );

}

/* ===========================================================
   EVENTS
=========================================================== */

function on(

    element,

    event,

    callback,

    options = false

) {

    element?.addEventListener(

        event,

        callback,

        options

    );

}

function off(

    element,

    event,

    callback,

    options = false

) {

    element?.removeEventListener(

        event,

        callback,

        options

    );

}

function once(

    element,

    event,

    callback

) {

    element?.addEventListener(

        event,

        callback,

        {

            once: true

        }

    );

}

function delegate(

    parent,

    selector,

    event,

    callback

) {

    if (!parent) return;

    parent.addEventListener(

        event,

        e => {

            const target =

                e.target.closest(

                    selector

                );

            if (!target) return;

            callback(

                e,

                target

            );

        }

    );

}

/* ===========================================================
   HTML
=========================================================== */

function setHTML(

    element,

    html

) {

    if (!element) return;

    element.innerHTML = html;

}

function getHTML(element) {

    return element?.innerHTML;

}

function setText(

    element,

    text

) {

    if (!element) return;

    element.textContent = text;

}

function getText(element) {

    return element?.textContent;

}

/* ===========================================================
   DOM READY
=========================================================== */

function ready(callback) {

    if (

        document.readyState ===

        "loading"

    ) {

        document.addEventListener(

            "DOMContentLoaded",

            callback

        );

    } else {

        callback();

    }

}

/* ===========================================================
   ELEMENT EXISTS
=========================================================== */

function exists(selector) {

    return !!$(selector);

}

/* ===========================================================
   QUERY HELPERS
=========================================================== */

function closest(

    element,

    selector

) {

    return element?.closest(

        selector

    );

}

function next(element) {

    return element?.nextElementSibling;

}

function previous(element) {

    return element?.previousElementSibling;

}

function parent(element) {

    return element?.parentElement;

}
/* ===========================================================
   AURØGANT
   UTILITY LIBRARY
   PART 2
   Storage Helpers • Session Helpers • Cookies • Cache
=========================================================== */

/* ===========================================================
   LOCAL STORAGE
=========================================================== */

function setStorage(

    key,

    value

) {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

        return true;

    }

    catch (error) {

        console.error(error);

        return false;

    }

}

function getStorage(

    key,

    defaultValue = null

) {

    try {

        const value =

            localStorage.getItem(key);

        return value

            ? JSON.parse(value)

            : defaultValue;

    }

    catch (error) {

        console.error(error);

        return defaultValue;

    }

}

function removeStorage(key) {

    localStorage.removeItem(key);

}

function clearStorage() {

    localStorage.clear();

}

function hasStorage(key) {

    return localStorage.getItem(key) !== null;

}

/* ===========================================================
   SESSION STORAGE
=========================================================== */

function setSession(

    key,

    value

) {

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getSession(

    key,

    defaultValue = null

) {

    const value =

        sessionStorage.getItem(key);

    return value

        ? JSON.parse(value)

        : defaultValue;

}

function removeSession(key) {

    sessionStorage.removeItem(key);

}

function clearSession() {

    sessionStorage.clear();

}

/* ===========================================================
   COOKIE HELPERS
=========================================================== */

function setCookie(

    name,

    value,

    days = 30

) {

    const expires =

        new Date(

            Date.now() +

            days *

            86400000

        ).toUTCString();

    document.cookie =

        `${name}=${encodeURIComponent(value)};expires=${expires};path=/`;

}

function getCookie(name) {

    const cookies =

        document.cookie.split(";");

    for (const cookie of cookies) {

        const item =

            cookie.trim();

        if (

            item.startsWith(

                name + "="

            )

        ) {

            return decodeURIComponent(

                item.substring(

                    name.length + 1

                )

            );

        }

    }

    return null;

}

function deleteCookie(name) {

    document.cookie =

        `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;

}

/* ===========================================================
   CACHE
=========================================================== */

const MemoryCache =

    new Map();

function cacheSet(

    key,

    value

) {

    MemoryCache.set(

        key,

        value

    );

}

function cacheGet(key) {

    return MemoryCache.get(key);

}

function cacheHas(key) {

    return MemoryCache.has(key);

}

function cacheDelete(key) {

    MemoryCache.delete(key);

}

function cacheClear() {

    MemoryCache.clear();

}

/* ===========================================================
   STORAGE SIZE
=========================================================== */

function getStorageSize() {

    let total = 0;

    for (

        let i = 0;

        i < localStorage.length;

        i++

    ) {

        const key =

            localStorage.key(i);

        total +=

            (

                localStorage.getItem(key)

                    ?.length || 0

            );

    }

    return total;

}

/* ===========================================================
   STORAGE EXPORT
=========================================================== */

function exportStorage() {

    const data = {};

    for (

        let i = 0;

        i < localStorage.length;

        i++

    ) {

        const key =

            localStorage.key(i);

        data[key] =

            getStorage(key);

    }

    return data;

}

/* ===========================================================
   STORAGE IMPORT
=========================================================== */

function importStorage(data) {

    Object.entries(data)

        .forEach(

            ([key, value]) => {

                setStorage(

                    key,

                    value

                );

            }

        );

}

/* ===========================================================
   STORAGE KEYS
=========================================================== */

function getStorageKeys() {

    return Object.keys(

        localStorage

    );

}

/* ===========================================================
   STORAGE CLEANUP
=========================================================== */

function cleanupStorage(prefix) {

    getStorageKeys()

        .forEach(key => {

            if (

                key.startsWith(prefix)

            ) {

                removeStorage(key);

            }

        });

}

/* ===========================================================
   TEMP STORAGE
=========================================================== */

function setTemporary(

    key,

    value,

    milliseconds

) {

    cacheSet(

        key,

        value

    );

    setTimeout(

        () =>

            cacheDelete(key),

        milliseconds

    );

}

function getTemporary(key) {

    return cacheGet(key);

}
/* ===========================================================
   AURØGANT
   UTILITY LIBRARY
   PART 3
   Date Helpers • Currency • Number • String • Validation
=========================================================== */

/* ===========================================================
   DATE HELPERS
=========================================================== */

function formatDate(

    date,

    locale = "en-IN"

) {

    return new Date(date)

        .toLocaleDateString(

            locale,

            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }

        );

}

function formatTime(

    date,

    locale = "en-IN"

) {

    return new Date(date)

        .toLocaleTimeString(

            locale,

            {

                hour: "2-digit",

                minute: "2-digit"

            }

        );

}

function formatDateTime(

    date,

    locale = "en-IN"

) {

    return new Date(date)

        .toLocaleString(locale);

}

function today() {

    return new Date()

        .toISOString()

        .split("T")[0];

}

function now() {

    return Date.now();

}

function daysBetween(

    start,

    end

) {

    return Math.floor(

        (

            new Date(end) -

            new Date(start)

        ) /

        86400000

    );

}

/* ===========================================================
   CURRENCY HELPERS
=========================================================== */

function formatCurrency(

    amount,

    currency = "INR"

) {

    return new Intl.NumberFormat(

        "en-IN",

        {

            style: "currency",

            currency

        }

    ).format(amount);

}

function parseCurrency(value) {

    return Number(

        String(value)

            .replace(/[^\d.-]/g, "")

    ) || 0;

}

/* ===========================================================
   NUMBER HELPERS
=========================================================== */

function randomNumber(

    min,

    max

) {

    return Math.floor(

        Math.random() *

        (max - min + 1)

    ) + min;

}

function clamp(

    value,

    min,

    max

) {

    return Math.min(

        Math.max(value, min),

        max

    );

}

function round(

    value,

    decimals = 2

) {

    return Number(

        value.toFixed(decimals)

    );

}

function percentage(

    value,

    total

) {

    if (!total) return 0;

    return round(

        (value / total) * 100

    );

}

/* ===========================================================
   STRING HELPERS
=========================================================== */

function capitalize(text) {

    if (!text) return "";

    return text.charAt(0)

        .toUpperCase() +

        text.slice(1);

}

function titleCase(text) {

    if (!text) return "";

    return text

        .toLowerCase()

        .split(" ")

        .map(capitalize)

        .join(" ");

}

function slugify(text) {

    return text

        .toLowerCase()

        .trim()

        .replace(/\s+/g, "-")

        .replace(/[^\w-]/g, "");

}

function truncate(

    text,

    length = 50

) {

    if (

        text.length <= length

    ) {

        return text;

    }

    return (

        text.substring(

            0,

            length

        ) + "..."

    );

}

/* ===========================================================
   VALIDATION
=========================================================== */

function isEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

function isPhone(phone) {

    return /^[6-9]\d{9}$/

        .test(phone);

}

function isPincode(pin) {

    return /^\d{6}$/

        .test(pin);

}

function isURL(url) {

    try {

        new URL(url);

        return true;

    }

    catch {

        return false;

    }

}

function isNumber(value) {

    return !isNaN(value);

}

function isEmpty(value) {

    return (

        value === null ||

        value === undefined ||

        String(value)

            .trim() === ""

    );

}

function isObject(value) {

    return (

        value !== null &&

        typeof value ===

        "object" &&

        !Array.isArray(value)

    );

}

function isArray(value) {

    return Array.isArray(value);

}

/* ===========================================================
   PASSWORD VALIDATION
=========================================================== */

function validatePassword(

    password

) {

    return {

        length:

            password.length >= 8,

        uppercase:

            /[A-Z]/.test(

                password

            ),

        lowercase:

            /[a-z]/.test(

                password

            ),

        number:

            /\d/.test(

                password

            ),

        special:

            /[!@#$%^&*(),.?":{}|<>]/

            .test(password)

    };

}

/* ===========================================================
   FILE HELPERS
=========================================================== */

function formatFileSize(

    bytes

) {

    if (bytes < 1024)

        return bytes + " B";

    if (

        bytes <

        1024 * 1024

    )

        return (

            round(

                bytes / 1024

            ) + " KB"

        );

    if (

        bytes <

        1024 * 1024 * 1024

    )

        return (

            round(

                bytes /

                (1024 * 1024)

            ) + " MB"

        );

    return (

        round(

            bytes /

            (1024 * 1024 * 1024)

        ) + " GB"

    );

}
/* ===========================================================
   AURØGANT
   UTILITY LIBRARY
   PART 4
   UUID • Performance • Clipboard • Notifications • UI • Public API
=========================================================== */

/* ===========================================================
   UUID GENERATORS
=========================================================== */

function uuid() {

    return crypto.randomUUID();

}

function randomCode(

    length = 8

) {

    const chars =

        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "";

    for (

        let i = 0;

        i < length;

        i++

    ) {

        code += chars.charAt(

            Math.floor(

                Math.random() *

                chars.length

            )

        );

    }

    return code;

}

function orderId() {

    return `ORD-${Date.now()}-${randomCode(4)}`;

}

function invoiceId() {

    return `INV-${Date.now()}-${randomCode(4)}`;

}

/* ===========================================================
   PERFORMANCE
=========================================================== */

function debounce(

    callback,

    delay = 300

) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(

            () => callback(...args),

            delay

        );

    };

}

function throttle(

    callback,

    delay = 300

) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(

            () => {

                waiting = false;

            },

            delay

        );

    };

}

function sleep(milliseconds) {

    return new Promise(

        resolve =>

            setTimeout(

                resolve,

                milliseconds

            )

    );

}

/* ===========================================================
   CLIPBOARD
=========================================================== */

async function copy(text) {

    try {

        await navigator.clipboard.writeText(

            text

        );

        toast(

            "Copied to clipboard"

        );

        return true;

    }

    catch {

        return false;

    }

}

/* ===========================================================
   TOAST
=========================================================== */

function toast(

    message,

    duration = 3000

) {

    const toast =

        createElement("div");

    toast.className =

        "aurogant-toast";

    toast.textContent =

        message;

    document.body.appendChild(

        toast

    );

    requestAnimationFrame(

        () =>

            addClass(

                toast,

                "show"

            )

    );

    setTimeout(() => {

        removeClass(

            toast,

            "show"

        );

        setTimeout(

            () =>

                removeElement(

                    toast

                ),

            300

        );

    }, duration);

}

/* ===========================================================
   LOADING
=========================================================== */

function showLoading(

    text = "Loading..."

) {

    let overlay =

        byId(

            "aurogantLoading"

        );

    if (!overlay) {

        overlay =

            createElement("div");

        overlay.id =

            "aurogantLoading";

        overlay.className =

            "loading-overlay";

        document.body.appendChild(

            overlay

        );

    }

    overlay.innerHTML = `

        <div class="loading-box">

            <div class="spinner"></div>

            <p>${text}</p>

        </div>

    `;

    show(overlay);

}

function hideLoading() {

    hide(

        byId(

            "aurogantLoading"

        )

    );

}

/* ===========================================================
   MODAL HELPERS
=========================================================== */

function openModal(id) {

    addClass(

        byId(id),

        "active"

    );

}

function closeModal(id) {

    removeClass(

        byId(id),

        "active"

    );

}

function toggleModal(id) {

    toggleClass(

        byId(id),

        "active"

    );

}

/* ===========================================================
   SCROLL
=========================================================== */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function scrollToElement(

    selector

) {

    $(selector)?.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

/* ===========================================================
   PUBLIC API
=========================================================== */

Object.assign(

    Utils,

    {

        $,

        $all,

        byId,

        createElement,

        removeElement,

        empty,

        append,

        prepend,

        addClass,

        removeClass,

        toggleClass,

        hasClass,

        show,

        hide,

        toggle,

        setAttribute,

        getAttribute,

        removeAttribute,

        on,

        off,

        once,

        delegate,

        setHTML,

        getHTML,

        setText,

        getText,

        ready,

        exists,

        closest,

        next,

        previous,

        parent,

        setStorage,

        getStorage,

        removeStorage,

        clearStorage,

        hasStorage,

        setSession,

        getSession,

        removeSession,

        clearSession,

        setCookie,

        getCookie,

        deleteCookie,

        cacheSet,

        cacheGet,

        cacheHas,

        cacheDelete,

        cacheClear,

        getStorageSize,

        exportStorage,

        importStorage,

        getStorageKeys,

        cleanupStorage,

        setTemporary,

        getTemporary,

        formatDate,

        formatTime,

        formatDateTime,

        today,

        now,

        daysBetween,

        formatCurrency,

        parseCurrency,

        randomNumber,

        clamp,

        round,

        percentage,

        capitalize,

        titleCase,

        slugify,

        truncate,

        isEmail,

        isPhone,

        isPincode,

        isURL,

        isNumber,

        isEmpty,

        isObject,

        isArray,

        validatePassword,

        formatFileSize,

        uuid,

        randomCode,

        orderId,

        invoiceId,

        debounce,

        throttle,

        sleep,

        copy,

        toast,

        showLoading,

        hideLoading,

        openModal,

        closeModal,

        toggleModal,

        scrollToTop,

        scrollToElement

    }

);

/* ===========================================================
   GLOBAL ACCESS
=========================================================== */

window.Utils = Utils;

/* ===========================================================
   INITIALIZATION
=========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        initializeUtils();

        console.log(

            "%cAURØGANT UTILITY LIBRARY READY",

            "color:#D4AF37;font-size:18px;font-weight:bold"

        );

    }

);

/* ===========================================================
   END OF FILE
=========================================================== */