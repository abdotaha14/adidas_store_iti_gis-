var products = undefined;

function getProducts() {
    var xpro = new XMLHttpRequest()
    xpro.open("GET", "jordan JSON.json")
    xpro.send()



    xpro.addEventListener("readystatechange", function () {
        if (xpro.readyState == 4) {
            products = JSON.parse(xpro.response)
            console.log(products)
            for (var i = 0; i < products.length; i++) {
                var pro = products[i]
                // console.log(pro)
                var title = pro.name
                var image0 = pro.image
                var price = pro.price
                var id0 = pro.id

                var div = document.getElementById("products")
                div.innerHTML += `
                <p class="item">${title + " price:" + price + "$"}
                <img src="${image0}" alt="adidas" class="img0">
                <button class="button" onclick="addcart(${id0})">add card</button></p>
                `

            }
        }

    }
    )
}

getProducts()
var div1 = document.getElementById("Cart-Container1")
var cart = []
function addcart(id) {
    var productsInLocalStorage = JSON.parse(localStorage.getItem('products'));      // [{ID:0, NAME:'ASD'}]
    if (productsInLocalStorage && productsInLocalStorage.find((item) => item.id === id)) {
        alert("product already in cart")
    }
    else {

        var item = products.find((product) => product.id === id);
        cart.push({ ...item, numberofunits: 1 });
 
        //check if localstorage has stored products 

        if(productsInLocalStorage){
            productsInLocalStorage.push({ ...item, numberofunits: 1, });

            localStorage.setItem('products',JSON.stringify(productsInLocalStorage))
        }else{
            //there isn't any product in cart 
            productsInLocalStorage = [{...item, numberofunits:1}];
            localStorage.setItem('products',JSON.stringify(productsInLocalStorage))
        }
        var itemincart = document.getElementById("cart-item-count1")
        itemincart.innerHTML=productsInLocalStorage.length
    }
   
}
