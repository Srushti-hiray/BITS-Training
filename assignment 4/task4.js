const products = [
    {name: "lipstick", price: 1200, category: "makeup" },
    {name: "cordset", price: 2500, category: "clothing" },
    {name: "blush", price: 800, category: "makeup" },
    {name: "shoes", price: 1600, category: "clothing" },
    {name: "laptop", price: 70000, category: "electronic"}
  ];
  
  const productNamesUppercase = products.map(product => product.name.toUpperCase());
  
  console.log(productNamesUppercase);

  const electronicsProducts = products.filter(product => product.category === "electronic");

console.log(electronicsProducts);

const totalPrice = products.reduce((total, product) => total + product.price, 0);

console.log(totalPrice);

function calculateTotalPriceByCategory(products, category) {
    return products
      .filter(product => product.category === category) 
      .map(product => product.price) 
      .reduce((total, price) => total + price, 0); 
  }
  
  const totalElectronicsPrice = calculateTotalPriceByCategory(products, "makeup");
  console.log(totalElectronicsPrice);

  const totalClothingPrice = calculateTotalPriceByCategory(products, "clothing");
  console.log(totalClothingPrice);

//   Output:
//   [ 'LIPSTICK', 'CORDSET', 'BLUSH', 'SHOES', 'LAPTOP' ]
// [ { name: 'laptop', price: 70000, category: 'electronic' } ]
// 76100
// 2000
// 4100