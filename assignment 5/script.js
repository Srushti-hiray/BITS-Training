// let cart = [];
// let filteredProducts = [];

// // Fetch all products
// async function fetchProducts() {
//   try {
//     const response = await axios.get('https://fakestoreapi.com/products');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }

// // Fetch categories
// async function fetchCategories() {
//   try {
//     const response = await axios.get('https://fakestoreapi.com/products/categories');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching categories:', error);
//     return [];
//   }
// }

// // Display products
// function displayProducts(products) {
//   const productsSection = document.getElementById('products');
//   if (productsSection) {
//     productsSection.innerHTML = '';
//     products.forEach(product => {
//       const productDiv = document.createElement('div');
//       productDiv.className = 'product';
//       productDiv.innerHTML = `
//         <img src="${product.image}" alt="${product.title}">
//         <h3>${product.title}</h3>
//         <p>$${product.price}</p>
//         <button onclick="addToCart(${product.id})">Add to Cart</button>
//       `;
//       productsSection.appendChild(productDiv);
//     });
//   }
// }

// // Add to cart
// async function addToCart(productId) {
//   try {
//     const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
//     const product = response.data;

//     // Check if the product is already in the cart
//     const existingProduct = cart.find(item => item.id === product.id);
//     if (existingProduct) {
//       existingProduct.quantity += 1; // Increment quantity if already in cart
//     } else {
//       product.quantity = 1; // Add quantity property to the product
//       cart.push(product); // Add the product to the cart
//     }

//     // Save the updated cart to localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));

//     // Log the cart to the console for debugging
//     console.log('Cart:', cart);

//     // Show a success message (optional)
//     alert(`${product.title} added to cart!`);
//   } catch (error) {
//     console.error('Error adding to cart:', error);
//   }
// }

// // Update cart display
// function updateCart() {
//   const cartItems = document.getElementById('cart-items');
//   if (cartItems) {
//     cartItems.innerHTML = ''; // Clear the current cart items

//     cart.forEach((item) => {
//       const li = document.createElement('li');
//       li.innerHTML = `
//         <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
//         <span>${item.title} - $${item.price} (Qty: ${item.quantity || 1})</span>
//         <button onclick="removeFromCart(${item.id})">Remove</button>
//       `;
//       cartItems.appendChild(li);
//     });

//     // Add a total price display (optional)
//     const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
//     const totalElement = document.createElement('li');
//     totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
//     cartItems.appendChild(totalElement);
//   }
// }

// // Remove from cart
// async function removeFromCart(productId) {
//   try {
//     // Remove the item from the local cart
//     cart = cart.filter(item => item.id !== productId);

//     // Update localStorage
//     localStorage.setItem('cart', JSON.stringify(cart));

//     // Make an API call to delete the item from the server cart
//     const response = await axios.delete(`https://fakestoreapi.com/carts/6`);
//     console.log('Item removed from server cart:', response.data);

//     // Update the cart display
//     updateCart();
//     alert("removed from cart!");
//   } catch (error) {
//     console.error('Error removing item from cart:', error);
//   }
// }

// // Clear cart
// document.getElementById('clear-cart')?.addEventListener('click', () => {
//   cart = [];
//   localStorage.removeItem('cart');
//   updateCart();
// });

// // Load cart from localStorage on page load
// function loadCart() {
//   const savedCart = localStorage.getItem('cart');
//   if (savedCart) {
//     cart = JSON.parse(savedCart);
//     updateCart();
//   }
// }

// // Search products
// document.getElementById('search')?.addEventListener('input', async (e) => {
//   const searchTerm = e.target.value.toLowerCase();
//   try {
//     let products = await fetchProducts();
//     if (searchTerm) {
//       products = products.filter(product => 
//         product.title.toLowerCase().includes(searchTerm)
//       );
//     }
//     filteredProducts = products;
//     displayProducts(products);
//   } catch (error) {
//     console.error('Error searching products:', error);
//   }
// });

// // Filter by category
// document.getElementById('category-filter')?.addEventListener('change', async (e) => {
//   const category = e.target.value;
//   try {
//     let products = await fetchProducts();
//     if (category) {
//       filteredProducts = products.filter(product => product.category === category);
//     } else {
//       filteredProducts = products; // Reset to all products if no category is selected
//     }
//     displayProducts(filteredProducts);
//   } catch (error) {
//     console.error('Error filtering products:', error);
//   }
// });

// // Sort products
// document.getElementById('sort')?.addEventListener('change', async (e) => {
//   const order = e.target.value;
//   try {
//     let products = filteredProducts.length ? filteredProducts : await fetchProducts();
//     products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
//     displayProducts(products);
//   } catch (error) {
//     console.error('Error sorting products:', error);
//   }
// });

// // View Cart button functionality
// document.getElementById('view-cart')?.addEventListener('click', () => {
//   window.location.href = 'cart.html'; // Redirect to cart page
// });

// function displayProducts(products) {
//   const productsSection = document.getElementById('products');
//   if (productsSection) {
//     productsSection.innerHTML = '';
//     products.forEach(product => {
//       const productDiv = document.createElement('div');
//       productDiv.className = 'product';
//       productDiv.innerHTML = `
//         <a href="product-details.html?id=${product.id}" style="text-decoration: none; color: inherit;">
//           <img src="${product.image}" alt="${product.title}">
//           <h3>${product.title}</h3>
//           <p>$${product.price}</p>
//         </a>
//         <button onclick="addToCart(${product.id})">Add to Cart</button>
//       `;
//       productsSection.appendChild(productDiv);
//     });
//   }
// }


// // Initialize
// async function init() {
//   try {
//     const [products, categories] = await Promise.all([
//       fetchProducts(),
//       fetchCategories()
//     ]);
    
//     const categoryFilter = document.getElementById('category-filter');
//     if (categoryFilter) {
//       categories.forEach(category => {
//         const option = document.createElement('option');
//         option.value = category;
//         option.textContent = category;
//         categoryFilter.appendChild(option);
//       });
//     }
    
//     filteredProducts = products; // Initialize filtered products
//     displayProducts(products);
//     loadCart(); // Load cart from localStorage on page load
//   } catch (error) {
//     console.error('Error initializing app:', error);
//   }
// }

// // Load cart when the page loads
// loadCart();

// // Initialize the app if on the index page
// if (document.getElementById('products')) {
//   init();
// }


// Check for authentication token on page load
const authToken = localStorage.getItem('authToken');
if (!authToken) {
  window.location.href = 'login.html'; // Redirect to login if no token
}

let cart = [];
let filteredProducts = [];

// Logout functionality
document.getElementById('logout')?.addEventListener('click', () => {
  localStorage.removeItem('authToken'); // Clear the token
  window.location.href = 'login.html'; // Redirect to login
});

// Fetch all products
async function fetchProducts() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products', {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the token in the request
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch categories
async function fetchCategories() {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories', {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the token in the request
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Display products
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

// Add to cart
async function addToCart(productId) {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the token in the request
      }
    });
    const product = response.data;

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if already in cart
    } else {
      product.quantity = 1; // Add quantity property to the product
      cart.push(product); // Add the product to the cart
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Log the cart to the console for debugging
    console.log('Cart:', cart);

    // Show a success message (optional)
    alert(`${product.title} added to cart!`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
    cartItems.innerHTML = ''; // Clear the current cart items

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
        <span>${item.title} - $${item.price} (Qty: ${item.quantity || 1})</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(li);
    });

    // Add a total price display (optional)
    const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const totalElement = document.createElement('li');
    totalElement.innerHTML = `<strong>Total: $${totalPrice.toFixed(2)}</strong>`;
    cartItems.appendChild(totalElement);
  }
}

// Remove from cart
async function removeFromCart(productId) {
  try {
    // Remove the item from the local cart
    cart = cart.filter(item => item.id !== productId);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Make an API call to delete the item from the server cart
    const response = await axios.delete(`https://fakestoreapi.com/carts/6`, {
      headers: {
        Authorization: `Bearer ${authToken}` // Include the token in the request
      }
    });
    console.log('Item removed from server cart:', response.data);

    // Update the cart display
    alert("item removed from cart!");
    updateCart();
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
}

// Clear cart
document.getElementById('clear-cart')?.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
});

// Load cart from localStorage on page load
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Search products
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

// Filter by category
document.getElementById('category-filter')?.addEventListener('change', async (e) => {
  const category = e.target.value;
  try {
    let products = await fetchProducts();
    if (category) {
      filteredProducts = products.filter(product => product.category === category);
    } else {
      filteredProducts = products; // Reset to all products if no category is selected
    }
    displayProducts(filteredProducts);
  } catch (error) {
    console.error('Error filtering products:', error);
  }
});

// Sort products
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

// View Cart button functionality
document.getElementById('view-cart')?.addEventListener('click', () => {
  window.location.href = 'cart.html'; // Redirect to cart page
});

// Initialize
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
    
    filteredProducts = products; // Initialize filtered products
    displayProducts(products);
    loadCart(); // Load cart from localStorage on page load
  } catch (error) {
    console.error('Error initializing app:', error);
  }
}

// Load cart when the page loads
loadCart();

// Initialize the app if on the index page
if (document.getElementById('products')) {
  init();
}