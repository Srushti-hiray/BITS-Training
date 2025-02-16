var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d, _e, _f;
var _this = this;
var authToken = localStorage.getItem('authToken');
if (!authToken) {
    window.location.href = 'login.html';
}
var cart = [];
var filteredProducts = [];
// Logout functionality
(_a = document.getElementById('logout')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
});
// Fetch products from the API
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('https://fakestoreapi.com/products', {
                            headers: {
                                Authorization: "Bearer ".concat(authToken),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching products:', error_1);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Fetch categories from the API
function fetchCategories() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get('https://fakestoreapi.com/products/categories', {
                            headers: {
                                Authorization: "Bearer ".concat(authToken),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching categories:', error_2);
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Display products on the page
function displayProducts(products) {
    var productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.innerHTML = '';
        products.forEach(function (product) {
            var productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = "\n          <a href=\"product-details.html?id=".concat(product.id, "\" style=\"text-decoration: none; color: inherit;\">\n            <img src=\"").concat(product.image, "\" alt=\"").concat(product.title, "\">\n            <h3>").concat(product.title, "</h3>\n            <p>$").concat(product.price, "</p>\n          </a>\n          <button onclick=\"addToCart(").concat(product.id, ")\">Add to Cart</button>\n        ");
            productsSection.appendChild(productDiv);
        });
    }
}
// Add a product to the cart
function addToCart(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, product_1, existingProduct, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get("https://fakestoreapi.com/products/".concat(productId), {
                            headers: {
                                Authorization: "Bearer ".concat(authToken),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    product_1 = response.data;
                    existingProduct = cart.find(function (item) { return item.id === product_1.id; });
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    }
                    else {
                        cart.push(__assign(__assign({}, product_1), { quantity: 1 }));
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    console.log('Cart:', cart);
                    alert("".concat(product_1.title, " added to cart!"));
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error adding to cart:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Update the cart display
function updateCart() {
    var cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach(function (item) {
            var li = document.createElement('li');
            li.innerHTML = "\n          <img src=\"".concat(item.image, "\" alt=\"").concat(item.title, "\" style=\"width: 50px; height: auto;\">\n          <span>").concat(item.title, " - $").concat(item.price, " (Qty: ").concat(item.quantity || 1, ")</span>\n          <button onclick=\"removeFromCart(").concat(item.id, ")\">Remove</button>\n        ");
            cartItems.appendChild(li);
        });
        var totalPrice = cart.reduce(function (sum, item) { return sum + item.price * (item.quantity || 1); }, 0);
        var totalElement = document.createElement('li');
        totalElement.innerHTML = "<strong>Total: $".concat(totalPrice.toFixed(2), "</strong>");
        cartItems.appendChild(totalElement);
    }
}
// Remove a product from the cart
function removeFromCart(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    cart = cart.filter(function (item) { return item.id !== productId; });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    return [4 /*yield*/, axios.delete("https://fakestoreapi.com/carts/6", {
                            headers: {
                                Authorization: "Bearer ".concat(authToken),
                            },
                        })];
                case 1:
                    response = _a.sent();
                    console.log('Item removed from server cart:', response.data);
                    alert('Item removed from cart!');
                    updateCart();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error('Error removing item from cart:', error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Clear the cart
(_b = document.getElementById('clear-cart')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
});
// Load the cart from localStorage
function loadCart() {
    var savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}
// Search functionality
(_c = document.getElementById('search')) === null || _c === void 0 ? void 0 : _c.addEventListener('input', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var searchTerm, products, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = e.target.value.toLowerCase();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchProducts()];
            case 2:
                products = _a.sent();
                if (searchTerm) {
                    products = products.filter(function (product) {
                        return product.title.toLowerCase().includes(searchTerm);
                    });
                }
                filteredProducts = products;
                displayProducts(products);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                console.error('Error searching products:', error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Category filter functionality
(_d = document.getElementById('category-filter')) === null || _d === void 0 ? void 0 : _d.addEventListener('change', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var category, products, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                category = e.target.value;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetchProducts()];
            case 2:
                products = _a.sent();
                if (category) {
                    filteredProducts = products.filter(function (product) { return product.category === category; });
                }
                else {
                    filteredProducts = products;
                }
                displayProducts(filteredProducts);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                console.error('Error filtering products:', error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Sort functionality
(_e = document.getElementById('sort')) === null || _e === void 0 ? void 0 : _e.addEventListener('change', function (e) { return __awaiter(_this, void 0, void 0, function () {
    var order, products, _a, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                order = e.target.value;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                if (!filteredProducts.length) return [3 /*break*/, 2];
                _a = filteredProducts;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, fetchProducts()];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                products = _a;
                products.sort(function (a, b) { return (order === 'asc' ? a.price - b.price : b.price - a.price); });
                displayProducts(products);
                return [3 /*break*/, 6];
            case 5:
                error_7 = _b.sent();
                console.error('Error sorting products:', error_7);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Redirect to cart page
(_f = document.getElementById('view-cart')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () {
    window.location.href = 'cart.html';
});
// Initialize the app
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, products, categories, categoryFilter_1, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([
                            fetchProducts(),
                            fetchCategories(),
                        ])];
                case 1:
                    _a = _b.sent(), products = _a[0], categories = _a[1];
                    categoryFilter_1 = document.getElementById('category-filter');
                    if (categoryFilter_1) {
                        categories.forEach(function (category) {
                            var option = document.createElement('option');
                            option.value = category;
                            option.textContent = category;
                            categoryFilter_1.appendChild(option);
                        });
                    }
                    filteredProducts = products;
                    displayProducts(products);
                    loadCart();
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    console.error('Error initializing app:', error_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Load cart and initialize app
loadCart();
if (document.getElementById('products')) {
    init();
}
