document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    if (productId) {
      fetchProductDetails(productId);
    } else {
      console.error('No product ID found in URL');
    }
  });
  
  async function fetchProductDetails(productId) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      const product = response.data;
      displayProductDetails(product);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }
  
  function displayProductDetails(product) {
    const productDetailsSection = document.getElementById('product-details');
    if (productDetailsSection) {
      productDetailsSection.innerHTML = `
        <div class="product-detail">
          <img src="${product.image}" alt="${product.title}" style="max-width: 300px;">
          <h2>${product.title}</h2>
          <p><strong>Price:</strong> $${product.price}</p>
          <p><strong>Category:</strong> ${product.category}</p>
          <p><strong>Description:</strong> ${product.description}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      `;
    }
  }
  
  
  async function addToCart(productId) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
      const product = response.data;
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }