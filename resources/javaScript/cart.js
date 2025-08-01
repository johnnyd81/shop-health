 //required variables to dynamically alter the DOM
const productsCatalogue = document.querySelector(".catalogueList");
const burgerMenu = document.querySelector(".hamburger-menu");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
const hamLinks = document.querySelector(".ham-links");
const closeLinks = document.querySelector(".bx-x");
const confirmMsgBox = document.querySelector(".confirmation-wrapper");
const confirmMsgModal = document.querySelector(".confirmation-msg");
const thankMsg = document.querySelector(".thank-box");
const cancelMsg = document.querySelector(".cancel-box");
const payBtn = document.querySelector(".btn-buy");
const proceedBtn = document.querySelector(".ok-btn");
const cancelBtn = document.querySelector(".cancel-btn");

//closes the cart by removing the active class from the element
function closeCart() {
  hamLinks.classList.remove("active");
}

// when the burger menu is clicked then the active class is added to it's classList which opens the hamlinks element
burgerMenu.onclick = () => {
  hamLinks.classList.add("active");
};

//adds an eventListener to close the cart
closeLinks.onclick = () => {
  closeCart(); // closeCart function is invoked when the closeLinks element is clicked
};

//by clicking the pay button the cart container closes and a confirmation message box descends from the top of the viewport
//the addClass function adds the showModal class but only does so after a delay of 1500 milliseconds or 1 and a half seconds
payBtn.onclick = () => {
  confirmMsgBox.classList.remove("hide");
  cartContainer.classList.remove("show");
  addClass(confirmMsgModal, "showModal", 1500);
  confirmItems();
};

// clears the cart data i.e. removes all the products from the cart
function clearCartCloseModal() {
  confirmMsgBox.classList.add("hide");
  confirmMsgModal.classList.remove("showModal");
  sessionStorage.clear();
  cartContent.innerHTML = "";
  checkCart();
}

function addClass(element, className, delay) {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
}

//the function below removes a class from an element with a specific delay
function removeClass(element, className, delay) {
  setTimeout(() => {
    element.classList.remove(className);
  }, delay);
}

cancelBtn.onclick = () => {
  clearCartCloseModal();
  addClass(cancelMsg, "confirmShow", 2000);
  removeClass(cancelMsg, "confirmShow", 5500);
  document.querySelectorAll(".count")[1].textContent = 0;
};

proceedBtn.onclick = () => {
  clearCartCloseModal();
  addClass(thankMsg, "confirmShow", 2000);
  removeClass(thankMsg, "confirmShow", 5500);
  document.querySelectorAll(".count")[1].textContent = 0;
};

//the health products are stored as objects in an array called products
let products = [
  {
    name: "Abdominal wheel",
    tag: "ab_wheel",
    price: 350,
    image: "resources/images/ab-wheel.jpeg",
    quantity: 0,
  },

  {
    name: "Exercise bands",
    tag: "exercise_bands",
    price: 550,
    image: "resources/images/bands.jpeg",
    quantity: 0,
  },

  {
    name: "Ezbar",
    tag: "ezbar",
    price: 890,
    image: "resources/images/ez-bar.jpeg",
    quantity: 0,
  },

  {
    name: "Door pullup bar",
    tag: "door_pull_up_bar",
    price: 750,
    image: "resources/images/door-gym.jpeg",
    quantity: 0,
  },

  {
    name: "Gym bench",
    tag: "gym_bench",
    price: 1650,
    image: "resources/images/bench.jpeg",
    quantity: 0,
  },

  {
    name: "Baseball cap",
    tag: "baseball_cap",
    price: 490,
    image: "resources/images/new-york-cap.jpeg",
    quantity: 0,
  },

  {
    name: "Boxing and speed bag set",
    tag: "boxing_bag_set",
    price: 2490,
    image: "resources/images/boxing_combo.jpeg",
    quantity: 0,
  },

  {
    name: "Nutritech whey protein 2kg",
    tag: "nutritech_whey_protein",
    price: 990,
    image: "resources/images/nutritech_protein.jpeg",
    quantity: 0,
  },

  {
    name: "Nutritech protein bars",
    tag: "nutritech_protein_bars",
    price: 550,
    image: "resources/images/nutritech-whey-protein-bar.jpeg",
    quantity: 0,
  },

  {
    name: "RDX combat gloves",
    tag: "rdx_combat_gloves",
    price: 450,
    image: "resources/images/rdx_combat_gloves.jpeg",
    quantity: 0,
  },
];

//add catalogue items dynamically to the webpage
products.forEach((product) => {
  let html = `
     <div class="catalogueItem" >
       <img src=${product.image} class="gym-img" alt="exercise-item" />
       <div class="catalogueDetails">
        <p class="p-name">${product.name}</p>
        <p class="p-price">R ${product.price},00</>
       </div>
       <div class="action">
         <abbr title="Adds the product to the cart"><i class='bx bxs-cart-add'></i></abbr>
       </div>
     </div>
  `;
  productsCatalogue.innerHTML += html;
});

//a nodelist is created below by getting all the add to cart buttons from the catalogue page
const items = document.querySelectorAll(".bxs-cart-add");
const confirmMessage = document.querySelector(".add-msg");

//the nodelist is then looped over and an event handler is added to each button
//when an item is clicked and added to the cart, details about each item can found by it's index i.e. products[i]
for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", function () {
    cartNumbers(products[i]);
    totalCost(products[i]);
    addMsg();
  });
}

function addMsg() {
  addClass(confirmMessage, "reveal", 0);
  removeClass(confirmMessage, "reveal", 3000);
}

//the cartNumbers function updates the amount of items in the cart that is held in sessionStorage
function cartNumbers(item) {
  let cartCmount = sessionStorage.getItem("cartCount");
  cartCmount = parseInt(cartCmount);

  if (cartCmount) {
    sessionStorage.setItem("cartCount", cartCmount + 1);
    //the number of items in the cart is reflected in the user interface dynamically
    let displayCarts = document.querySelectorAll(".count");
    for (let cart of displayCarts) {
      cart.textContent = cartCmount + 1;
    }
  } else {
    //if no items are in the cart, the initial values are created
    sessionStorage.setItem("cartCount", 1);
    let displayCarts = document.querySelectorAll(".count");
    for (let cart of displayCarts) {
      cart.textContent = 1;
    }
  }

  //the setItem function adds the correct product to be stored in the cartItems object
  setItem(item);
}

function setItem(product) {
  //cartItems are retrieved from sessionStorage
  let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));

  //a condition checks that a value is present in cartItems
  //if so then a new product can be added to the existing cartItems
  if (cartItems !== null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        //product.tag is used as the key to access the relevant product value
        [product.tag]: product,
      };
      //the line below makes sure that the initial in-cart quantity amount for the product is 0
      cartItems[product.tag].quantity = 0;
    }
    cartItems[product.tag].quantity += 1; //if the product was already present in the cartItems object then it's quantity is incremented by 1
  } else {
    //if no cartItems are present then the initial values are created
    product.quantity = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  //sessionStorage is updated to always have the most up to date values
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
}

//when the page loads then the checkCart function updates the user interface to show the amount of items in the cart
function checkCart() {
  let cartAmount = sessionStorage.getItem("cartCount");
  cartAmount = parseInt(cartAmount);

  if (cartAmount) {
    let displayCarts = document.querySelectorAll(".count");
    for (let cart of displayCarts) {
      cart.textContent = cartAmount;
    }
  } else {
    document.querySelector(".count").textContent = 0;
  }
}

//the correct cost of the cart is calculated using the totalCost function
function totalCost(product) {
  let cartCost = sessionStorage.getItem("cartCost");//get the cartCost from sessionStorage
  cartCost = parseInt(cartCost);

  if (cartCost) {
    cartCost = cartCost + product.price;
  } else {
    cartCost = product.price;
  }
  sessionStorage.setItem("cartCost", JSON.stringify(cartCost));
}

checkCart(); //displays the correct amount of items in the cart when the page loads
                                                                                                                                                 
