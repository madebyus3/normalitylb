/* =========================
   HAMBURGER MENU (MOBILE)
========================= */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

/* =========================
   CART INIT
========================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.querySelector(".cart-count");
  if (countEl) countEl.textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

/* =========================
   PRODUCT LIST & ADD TO CART
========================= */
document.addEventListener("click", (e) => {

  const card = e.target.closest(".product-item");
  if (!card) return;

  /* ADD TO CART */
  if (e.target.classList.contains("btn-add-cart")) {
    e.stopPropagation();

    const stock = card.dataset.stock || "available";
    if (stock === "out") {
      alert("❌ This product is out of stock");
      return;
    }

    const name = card.querySelector(".product-name")?.textContent || "";
    const price = card.querySelector(".product-price")?.textContent || "";
    const image = card.querySelector("img")?.src || "";

    cart.push({ name, price, image });
    saveCart();
    updateCartCount();

    e.target.textContent = "Added ✓";
    setTimeout(() => {
      e.target.textContent = "Add to Cart";
    }, 800);

    return;
  }

  /* =========================
     OPEN PRODUCT DETAILS
  ========================= */
  const productData = {
    name: card.querySelector(".product-name")?.textContent || "",
    description: card.querySelector(".product-description")?.textContent || "",
    price: card.querySelector(".product-price")?.textContent || "",
    image: card.querySelector("img")?.src || "",
    stock: card.dataset.stock || "available",
    howToUse: card.dataset.howtouse || "",
    ingredients: card.dataset.ingredients || "",
    benefits: card.dataset.benefits || ""
  };

  /* SPECIAL VARIANTS */
  if (card.classList.contains("special-product")) {
    productData.variants = [
      { name: "Baby Powder", image: "product1.jpeg", stock: "available" },
      { name: "Oud", image: "product1.jpeg", stock: "out" },
      { name: "CocoVanilla", image: "product1.jpeg", stock: "available" },
      { name: "Musk", image: "product1.jpeg", stock: "out" }
    ];
  }

  localStorage.setItem("selectedProduct", JSON.stringify(productData));
  window.location.href = "product-details.html";
});

/* =========================
   CART PAGE (OPTIONAL)
========================= */
function renderCart() {
  const cartContainer = document.querySelector(".cart-items");
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" width="80">
      <div>
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

renderCart();
