import { setDates } from "./date.mjs";
import { setNavigation } from './navigation.mjs';
import { getProductsData } from './getProducts.mjs';

setNavigation();
setDates();

const catalogContainer = document.querySelector("#catalogContainer");
const filterButtons = document.querySelectorAll(".filter-btn");

let favorites = JSON.parse(localStorage.getItem("ready3d-favorites")) || [];

async function initCatalog() {
    const products = await getProductsData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get("category");

    let initialProducts = products;
    if (urlCategory) {
        initialProducts = products.filter(product => product.category === urlCategory);
    }
    
    displayProducts(initialProducts);

    filterButtons.forEach(button => {
        const buttonCategory = button.dataset.category;
        if (urlCategory && buttonCategory === urlCategory) {
            button.classList.add("active");
        } else if (!urlCategory && buttonCategory === "all") {
            button.classList.add("active");
        }

        button.addEventListener("click", (e) => {
            filterButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            const category = e.target.dataset.category;
            let filteredProducts = products;
            
            if (category !== "all") {
                filteredProducts = products.filter(product => product.category === category);
            }
            displayProducts(filteredProducts);
            
            const newUrl = category === "all" ? window.location.pathname : `?category=${category}`;
            window.history.pushState({}, '', newUrl);
        });
    });
}

initCatalog();

const displayProducts = (products) => {
    catalogContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();
    products.forEach(product => {
        let card = document.createElement("section");
        card.setAttribute("class", "product-card card");

        const isFavorite = favorites.includes(product.id);

        let productImage = document.createElement("img");
        productImage.setAttribute("src", `images/${product.image}`);
        productImage.setAttribute("alt", `${product.name}`);
        productImage.setAttribute("loading", "lazy");
        productImage.setAttribute("height", "300");
        productImage.setAttribute("width", "400");

        let productInfo = document.createElement("div");
        productInfo.setAttribute("class", "product-info");

        let productCategory = document.createElement("span");
        productCategory.setAttribute("class", `product-category ${product.category.toLowerCase()}`);
        productCategory.textContent = product.category;

        let productTitle = document.createElement("h2");
        productTitle.setAttribute("class", "product-title");
        productTitle.textContent = product.name;

        let productPrice = document.createElement("div");
        productPrice.setAttribute("class", "product-price");
        productPrice.textContent = `$${product.price.toFixed(2)}`;

        let productActions = document.createElement("div");
        productActions.setAttribute("class", "product-actions");

        let buttonDetails = document.createElement("button");
        buttonDetails.setAttribute("class", "button-details btn");
        buttonDetails.setAttribute("data-id", `${product.id}`);
        buttonDetails.textContent = "View Details";
        buttonDetails.addEventListener("click", () => openModal(product));

        let buttonFavorite = document.createElement("label");
        buttonFavorite.setAttribute("class", "fav-button");

        buttonFavorite.innerHTML = `
            <input type="checkbox" ${isFavorite ? "checked" : ""}>
            <svg class="heart-icon" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>`
        ;

        const checkbox = buttonFavorite.querySelector("input");
        checkbox.addEventListener("change", (e) => {
            toggleFavorite(product.id, e.target.checked);
        });

        productActions.appendChild(buttonDetails);
        productActions.appendChild(buttonFavorite);

        productInfo.appendChild(productCategory);
        productInfo.appendChild(productTitle);
        productInfo.appendChild(productPrice);
        productInfo.appendChild(productActions);

        card.appendChild(productImage);
        card.appendChild(productInfo);

        fragment.appendChild(card);
    });
    catalogContainer.appendChild(fragment);
}

function toggleFavorite(id, isFavorite) {
    if (isFavorite) {
        if (!favorites.includes(id)) {
            favorites.push(id);
        }
    } else {
        favorites = favorites.filter(favId => favId !== id);
    }
    showToast(isFavorite);
    localStorage.setItem("ready3d-favorites", JSON.stringify(favorites));
}

const toast = document.querySelector("#favoriteToast");
const toastMessage = document.querySelector("#toastMessage");
const closeBtn = document.querySelector("#closeToast");

let autoCloseTimer;

function showToast(saved) {
    toastMessage.textContent = saved ? "Saved to favorites!" : "Removed from favorites.";
    setTimeout(() => {
        toast.style.display = "flex";
        setTimeout(() => {
            toast.classList.add("show");
        }, 20);
    }, 400);

    autoCloseTimer = setTimeout(dismissToast, 6400);
}

const dismissToast = () => {
	toast.classList.remove("show");
	if (autoCloseTimer) {
		clearTimeout(autoCloseTimer);
	}
	setTimeout(() => {
        toast.style.display = "none";
    }, 400);
};

closeBtn.addEventListener("click", dismissToast);

const dialog = document.querySelector("#productDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDesc = document.querySelector("#dialogDesc");
const dialogClose = document.querySelector("#dialogClose");

dialogClose.addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

function openModal(product) {
    dialogTitle.textContent = product.name;
    dialogDesc.textContent = product.description;
    dialog.showModal();
}