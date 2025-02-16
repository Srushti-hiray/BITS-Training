interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    quantity?: number;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetchProductDetailspro(parseInt(productId));
    } else {
        console.error('No product ID found in URL');
    }
});

async function fetchProductDetailspro(productId: number): Promise<void> {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product: Product = await response.json();
        displayProductDetailspro(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetailspro(product: Product): void {
    const productDetailsSection = document.getElementById('product-details');
    if (productDetailsSection) {
        productDetailsSection.innerHTML = `
            <div class="product-detail">
                <img src="${product.image}" alt="${product.title}" style="max-width: 300px;">
                <h2>${product.title}</h2>
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button onclick="addToCartpro(${product.id})">Add to Cart</button>
            </div>
        `;
    }
}

function addToCartpro(productId: number): void {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then((product: Product) => {
            let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingProduct = cart.find(item => item.id === product.id);
            if (existingProduct) {
                existingProduct.quantity! += 1;
            } else {
                product.quantity = 1;
                cart.push(product);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${product.title} added to cart!`);
        })
        .catch(error => console.error('Error adding to cart:', error));
}

