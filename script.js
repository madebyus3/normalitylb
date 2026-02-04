// ===============================
// CART SYSTEM
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
    const el = document.querySelector(".cart-count");
    if (el) el.textContent = cart.length;
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    cart.push(product);
    saveCart();
    updateCartCount();
}

// ===============================
// ADD TO CART BUTTON
// ===============================
document.addEventListener("click", e => {
    if (e.target.classList.contains("btn-add-cart")) {
        const card = e.target.closest(".product-card");
        if (!card) return;

        addToCart({
            name: card.querySelector(".product-name")?.textContent || "",
            price: card.querySelector(".product-price")?.textContent || "",
            image: card.querySelector("img")?.src || ""
        });

        e.target.textContent = "Added!";
        e.target.style.background = "#10b981";

        setTimeout(() => {
            e.target.textContent = "Add to Cart";
            e.target.style.background = "#c3026c";
        }, 800);
    }
});

// ===============================
// PRODUCT CLICK → SAVE TO LOCALSTORAGE
// ===============================
document.addEventListener("click", e => {
    const card = e.target.closest(".product-item");
    if (card && !e.target.classList.contains("btn-add-cart")) {

        let productData = {
            name: card.querySelector(".product-name")?.textContent || "",
            description: card.querySelector(".product-description")?.textContent || "",
            price: card.querySelector(".product-price")?.textContent || "",
            image: card.querySelector("img")?.src || "",
            category: card.querySelector(".product-category")?.textContent || "",
            howToUse: card.dataset.howtouse || "Instructions not available",
            ingredients: card.dataset.ingredients || "Ingredients not available",
            benefits: card.dataset.benefits || "benefits not available"
        };

        // إذا المنتج special-product، أضف Variants
        if (card.classList.contains("special-product")) {
            productData.variants = [
                { name: "Baby Powder", image: "product1.jpeg" },
                { name: "Oud", image: "product1.jpeg" },
                { name: "CocoVanilla", image: "product1.jpeg" }
            ];
        }

        localStorage.setItem("selectedProduct", JSON.stringify(productData));
        window.location.href = "product-details.html";
    }
});

// ===============================
// SCROLL REVEAL ANIMATIONS
// ===============================
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) {
            el.classList.add('active');
        }
    });
}
window.addEventListener('scroll', reveal);

// ===============================
// ACTIVE NAV LINK
// ===============================
function updateActiveNavLink() {
    const page = window.location.pathname.split('/').pop() || "index.html";
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === page);
    });
}

// ===============================
// INITIALIZATION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    updateActiveNavLink();
    updateCartCount();
    reveal();
});
// ===============================
// DISCOUNT POPUP SYSTEM
// ===============================

// Show popup once per visit
window.addEventListener("load", () => {

    if (!localStorage.getItem("discountShown")) {
        setTimeout(() => {
            document.getElementById("discount-popup").style.display = "flex";
            document.getElementById("discount-popup").classList.add("show");

            localStorage.setItem("discountShown", "true");
        }, 1200);
    }

});

// Close popup
function closeDiscount() {
    let popup = document.getElementById("discount-popup");
    popup.classList.remove("show");

    setTimeout(() => {
        popup.style.display = "none";
    }, 300);
}

// Go to shop
function goToShop() {
    window.location.href = "products.html";
}
// ===============================
// MOBILE MENU TOGGLE
// ===============================
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});
