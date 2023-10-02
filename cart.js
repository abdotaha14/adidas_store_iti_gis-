var productsInLocalStorage = JSON.parse(localStorage.getItem('products'));
var cartContainer = document.getElementById('cart-list');
// add cart

function rendercartitems() {


if (productsInLocalStorage) {
    cartContainer.innerHTML = ''; //clear card
    productsInLocalStorage.forEach(item => {
        cartContainer.innerHTML += `  <div class="Cart-Items">
        <div class="image-box">
            <img  src="${item.image}" style="height: 150px" width="145px" id="imgcart" />
        </div>
        <div class="about">
            <h1 class="title" id="title">${item.name}</h1>
            <h3 class="subtitle">description</h3>
        </div>
        <div class="counter"></div>
        <div class="prices"></div>
        <div class="counter">
            <div class="btn" onclick="changenumberofunits('plus',${item.id})">+</div>
            <div class="count">${item.numberofunits}</div>
            <div class="btn" onclick="changenumberofunits('minus',${item.id})">-</div>
        </div>
        <div class="prices">
            <div class="amount" id="p.item">price : ${item.price} $</div>
            <div class="remove" onclick="removeitemfromcard(${item.id})"><u>Remove</u></div>
        </div>`
    });
} else {
    cartContainer.innerHTML = `<div class="noproducts">
        There is no product in cart, please add to cart
    </div>`
}

}
updatecart()
// change number of units for an item

function changenumberofunits(action, id) {

    productsInLocalStorage = productsInLocalStorage.map((item) => {
        var numberofunits = item.numberofunits;
        if (item.id === id) {
            if (action === "minus" && numberofunits > 1) {
                numberofunits--
            }
            else if (action === "plus"  ){     //&& numberofunits < item.stock
                numberofunits++
            }
        }
        return { ...item, numberofunits } ;
        console.log(productsInLocalStorage)
    })
    updatecart()
}

function updatecart() {
    rendercartitems()

    rendersubtotal()
}



//total prices and items

function rendersubtotal(){
    var checkout0 =document.getElementById("checkout1")
   
    var totalitmes11=document.getElementById("cart-item-count1")

    var totalprice1 = 0
    var totalitmes0 = 0

    productsInLocalStorage.forEach((item) => {
        totalprice1 += item.price * item.numberofunits;
        totalitmes0 += item.numberofunits
        console.log(totalprice1)
    })
    checkout0.innerHTML=`
    <div class="total">
                <div>
                    <div class="Subtotal">Sub-Total</div>
                    <div class="items" id="items1" >${totalitmes0}  items</div>
                </div>
                <div class="total-amount" id="total-amount1" >${totalprice1.toFixed(2)}  $</div>
            </div>
            <a href=https://www.paypal.com/eg/home target="_blank"><button class="button"
                    onclick="">Checkout</button></a>
    `
    totalitmes11.innerHTML=totalitmes0
}


// remove product
function removeitemfromcard(id){
   productsInLocalStorage = productsInLocalStorage.filter((item)=> item.id !== id)

    updatecart()
}

// remove all products 
function removeallproducts()
{
    productsInLocalStorage.length=0
    localStorage.clear()
    cartContainer.innerHTML = `<div class="noproducts">
    There is no product in cart, please add to cart
</div>`

    updatecart()

}