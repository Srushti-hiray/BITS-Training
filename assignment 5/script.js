
const authToken = localStorage.getItem('authToken');
if (!authToken) {
  window.location.href = 'login.html';
}

let cart = [];
let filteredProducts = [];

document.getElementById('logout')?.addEventListener('click', () => {
  localStorage.removeItem('authToken'); 
  window.location.href = 'login.html';
});

async function fetchProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products', {
      headers: {
        Authorization: `Bearer ${authToken}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories', {
      headers: {
        Authorization: `Bearer ${authToken}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}


function displayProducts(products) {
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.innerHTML = '';
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <a href="product-details.html?id=${product.id}" style="text-decoration: none; color: inherit;">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
        </a>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productsSection.appendChild(productDiv);
    });
  }
}

async function addToCart(productId) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}` 
      }
    });
    const product = response.data;

    
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; 
    } else {
      cart.push(product); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart:', cart);
    alert(`${product.title} added to cart!`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}


function updateCart() {
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.innerHTML = '';

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
        <span>${item.title} - $${item.price} (Qty: ${item.quantity || 1})</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(li);
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const totalElement = document.createElement('li');
    totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    cartItems.appendChild(totalElement);
  }
}

async function removeFromCart(productId) {
  try {
  
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    const response = await axios.delete(`https://fakestoreapi.com/carts/6`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    console.log('Item removed from server cart:', response.data);
    alert("item removed from cart!");
    updateCart();
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}

document.getElementById('clear-cart')?.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
});

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

document.getElementById('search')?.addEventListener('input', async (e) => {
  const searchTerm = e.target.value.toLowerCase();
  try {
    let products = await fetchProducts();
    if (searchTerm) {
      products = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm)
      );
    }
    filteredProducts = products;
    displayProducts(products);
  } catch (error) {
    console.error('Error searching products:', error);
  }
});

document.getElementById('category-filter')?.addEventListener('change', async (e) => {
  const category = e.target.value;
  try {
    let products = await fetchProducts();
    if (category) {
      filteredProducts = products.filter(product => product.category === category);
    } else {
      filteredProducts = products; 
    }
    displayProducts(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
  }
});

document.getElementById('sort')?.addEventListener('change', async (e) => {
  const order = e.target.value;
  try {
    let products = filteredProducts.length ? filteredProducts : await fetchProducts();
    products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    displayProducts(products);
  } catch (error) {
    console.error('Error sorting products:', error);
  }
});

document.getElementById('view-cart')?.addEventListener('click', () => {
  window.location.href = 'cart.html'; // Redirect to cart page
});

async function init() {
  try {
    const [products, categories] = await Promise.all([
      fetchProducts(),
      fetchCategories()
    ]);
    
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
      });
    }
    
    filteredProducts = products; 
    displayProducts(products);
    loadCart(); 
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}


loadCart();


if (document.getElementById('products')) {
  init();
}