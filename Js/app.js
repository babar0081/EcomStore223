var Cartbtn = document.querySelector("#Cart-button");
var closebtn = document.querySelector("#close");
var Clearbtn = document.querySelector("#Clear-All");
var Proccedbtn = document.querySelector("#Procced-further");
var cartDom = document.querySelector("#cart");
var cartOverlay = document.querySelector("#cart-overlay");
var cartitem = document.querySelector("#cart-item");
var carttotal = document.querySelector("#cart-total");
// const productDom= document.querySelector(".Product");
const productDom = document.querySelector(".Product");
const button = document.querySelectorAll(".item-cart");

let cart = [];

class Products {
  async getProducts() {
    try {
      let data = await (await fetch("/app1.json")).json();
      // let result = await data.json();
      let product = data.items;
      product = product.map(function (item) {
        const { Brand, title, Price } = item.Fields;
        const { id } = item.sys;
        const Image = item.Fields.Image.Fields.file.url;
        return { Brand, title, Price, id, Image };
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }
}

class Ui {
  DisplayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <div class="item">
      <div class="product-img">
      <img src="${product.Image}" alt="">
      <div class="bag-btn"  > <a>
      <i class="fa-solid fa-cart-shopping"> Add To Cart</i>
      </a>
      </div>
      </div>
      <div class="item-detail">
      <div class="product-text">
      <h3>${product.title}</h3>
      <h5>${product.Brand}</h5>
      <p>$${product.Price}</p>
      </div>
      <button class="item-cart" data-id="${product.id}">
      <a class="cart-buy">
      <h4>Buy
      </h4>
      <i class="fa-solid fa-cart-shopping"></i>
      </a>
      </button>
      </div>
      </div>
  
      `;
    });
    productDom.innerHTML = result;
  }
  // getbagButtons() {
  //   const btn = [...document.querySelectorAll(".item-cart")];

  //   btn.forEach(function (button) {
  //     let id = button.dataset.id;
  //     let inCart = cart.find((item) => item.id === id);
  //     if (inCart) {
  //       // button.innerText = "In Cart";
  //       // button.disabled = true;
  //     }
  //     button.addEventListener("click", (event) => {
  //       event.target.innerText = "in Cart";
  //       event.target.disabled = true;
  //     });
  //   });
  // }
}

class Storage {
  static SaveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const product = new Products();
  const ui = new Ui();
  product
    .getProducts()
    .then(function (data) {
      ui.DisplayProducts(data);
      Storage.SaveProducts(data);
    })
    .then(function () {
      ui.getbagButtons();
    });
});

// let cart = [];

// class Products{
//   async getProducts(){
//   try {
//      const data= await fetch("/Js/app1.json");
//      const result = await data.json();
//      const product = result.items;
//      product=product.map( function(itm){
//       const {title,price} = itm.Fields;
//       const {id} = itm.sys;
//       const image = itm.Fields.Image.Fields.file.url;
// return {title,price,id,image};
// })

// return product
// } catch (error) {
//  console.log(error) 
// }

//    }
// }

// class Ui{
//   Display(){

//   }
// }


// document.addEventListener("DOMContentLoaded",function(){
//   const Product = new Products();
//   const ui = new Ui();
//   Product.getProducts().then(data=> console.log(data))

// });