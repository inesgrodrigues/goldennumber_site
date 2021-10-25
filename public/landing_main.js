// let carts = document.querySelectorAll('.add-cart');
// let stage = 'prod';
let landing_products = [];


async function getProducts(){
    const response = await axios.get('http://localhost:5000/landing');
    console.log(response.data);
    console.log(response.data.landing_products);
    
    products = response.data.landing_products

    populateProducts()
}
getProducts();


function populateProducts() {
    const container = document.querySelector('.produtos');

    const productsHtml = products.map((product, i) => {
			return (
					`
                
				<div class="aligned">
				<div class="image">
                <a href="/explicacoes"><img src="${product.image}" style="float: left;"></a>
                <a href="/explicacoes"><h4>${product.name}</h4></a>
				</div>
				</div>
                
					`
			)
    })

		if(container) {
			container.innerHTML += productsHtml.toString().replaceAll(',', '');
			// addCartActions()
		}
}

// function addCartActions() {
// 	const hoverProducts = document.getElementsByClassName('image');
// 	let carts = document.querySelectorAll('.add-cart');

// 	for(let i=0; i < hoverProducts.length; i++) {
// 		hoverProducts[i].addEventListener('mouseover', () => {
// 			carts[i].classList.add('showAddCart');
// 		})

// 		hoverProducts[i].addEventListener('mouseout', () => {
// 			carts[i].classList.remove('showAddCart');
// 		})
// 	}

// 	for(let i=0; i < carts.length; i++) {
// 		carts[i].addEventListener('click', () => {
// 			cartNumbers(products[i]);
// 			totalCost(products[i]);
// 		})
// 	}
// }

// for (let i=0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products[i]);
//         totalCost(products[i])
//     })
// }

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if(productNumbers) {
//         document.querySelector('.cart span').textContent = productNumbers;
//     }
// }

// function cartNumbers(product, action) {
//     let productNumbers = localStorage.getItem('cartNumbers');
//     productNumbers = parseInt(productNumbers);

//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if( action == "decrease") {
//         localStorage.setItem('cartNumbers', productNumbers - 1);
//         document.querySelector('.cart span').textContent = productNumbers - 1;
//     } else if( productNumbers ) {
//         localStorage.setItem("cartNumbers", productNumbers + 1 );
//         document.querySelector('.cart span').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem('cartNumbers', 1);
//         document.querySelector('.cart span').textContent = 1;
//     }

//     setItems(product);
// }

// function setItems(product) {
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);

//     if(cartItems != null) {
//         if(cartItems[product.tag] == undefined) {
//             cartItems = {
//                 ...cartItems,
//                 [product.tag]: product
//             }
//         }
//         cartItems[product.tag].inCart += 1; 
//     } else {
//         product.inCart = 1;
//         cartItems = {
//             [product.tag]: product
//         }
//     }
//     localStorage.setItem("productsInCart", JSON.stringify(cartItems));
// }

// function totalCost(product, action) {
//     let cartCost = localStorage.getItem('totalCost');
    
//     console.log("O custo:", cartCost);
//     console.log("Os produtos:",product.inCart)
//     console.log(typeof cartCost );
//     if( action == "decrease") {
//         cartCost = parseInt(cartCost);
//         console.log("Os produtos:",product.inCart)
//          if (product.inCart>=20){
//             localStorage.setItem('totalCost',cartCost);
//         }
//         else if(product.inCart==3 ) {
//             localStorage.setItem("totalCost", cartCost-product.price+1);
//             console.log("Custo Total",cartCost)
//             console.log("Custo Total",product.inCart)
//         }   
//         else if(product.inCart>=4 && product.inCart<=6){
//             localStorage.setItem("totalCost", cartCost - product.price);
//         }
//         else if(product.inCart==7) {
//             localStorage.setItem("totalCost", cartCost -product.price+3);
//         }
//         else if(product.inCart>=8 && product.inCart<=10){
//             localStorage.setItem("totalCost", cartCost - product.price);
//         }
//         else if(product.inCart==11){
//             localStorage.setItem("totalCost", cartCost - product.price+5);   
//         }
//         else if(product.inCart>=12 && product.inCart<=14){
//             localStorage.setItem("totalCost", cartCost - product.price);
//         }
//         else if(product.inCart==15){
//             localStorage.setItem("totalCost", cartCost - product.price+7);   
//         }
//         else if(product.inCart>=16 && product.inCart<=19){
//             localStorage.setItem("totalCost", cartCost - product.price);
//         }  
//         else{
//             localStorage.setItem('totalCost',cartCost - product.price);
//         }
//     } else if(cartCost != null) {
//         cartCost = parseInt(cartCost);
//         if (product.inCart>=20+1){
//             localStorage.setItem("totalCost", cartCost);

//         }
//         else if(product.inCart==4) {
//             localStorage.setItem("totalCost", cartCost +product.price-1);
//         }
//         else if(product.inCart>4 && product.inCart<8){
//             localStorage.setItem("totalCost", cartCost + product.price);
//         }
//         else if(product.inCart==8){
//             localStorage.setItem("totalCost", cartCost + product.price-3);   
//         }
//         else if(product.inCart>8 && product.inCart<12){
//             localStorage.setItem("totalCost", cartCost + product.price);
//         }
//         else if(product.inCart==12){
//             localStorage.setItem("totalCost", cartCost + product.price-5);   
//         }
//         else if(product.inCart>12 && product.inCart<16){
//             localStorage.setItem("totalCost", cartCost + product.price);
//         }
//         else if(product.inCart==16){
//             localStorage.setItem("totalCost", cartCost + product.price-7);   
//         }
//         else if(product.inCart>16 && product.inCart<20){
//             localStorage.setItem("totalCost", cartCost + product.price);
//         }
//         else {
//             localStorage.setItem("totalCost", cartCost + product.price);
//         }

//     } else {
//         localStorage.setItem("totalCost", product.price);
//     }
// }

// function displayCart() {
//     let cartItems = localStorage.getItem("productsInCart");
//     cartItems = JSON.parse(cartItems);
//     let productContainer = document.querySelector(".products");
//     let cartCost = localStorage.getItem('totalCost');

//     // console.log(cartItems);
//     if( cartItems && productContainer ) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item => {
//             productContainer.innerHTML += `
//             <div class="product">
//                 <ion-icon name="close-circle"></ion-icon>
                
//                 <span>${item.name}</span>
//             </div>
//             <div class="price">${item.price},00€</div>
            
//             `;

//             if (item.inCart==4) {
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//                 </div>
//                 <div class="total">
//                 ${item.inCart * item.price-1},00€
//                 </div>
//             `;
//             }
//             else if(item.inCart>4 && item.inCart<8){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//             <div class="total">
//                 ${4*item.price-1+(item.inCart-4)*item.price},00€
//             </div>
//             `;
//             }
//             else if(item.inCart==8){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//                 </div>
//                 <div class="total">
//                 ${item.inCart * item.price-4},00€
//             </div>
//             `;
//             }
//             else if(item.inCart>8 && item.inCart<12){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${8* item.price-4+(item.inCart-8)*item.price},00€
//             </div>
//             `;
//             }
//             else if(item.inCart==12){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${item.inCart * item.price-9},00€
//             </div>
//             `;
//             }
//             else if(item.inCart>12 && item.inCart<16){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${12* item.price-9+(item.inCart-12)*item.price},00€
//             </div>
//             `;
//             }
//             else if(item.inCart==16){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${item.inCart * item.price-16},00€
//             </div>
//             `;
//             }
//             else if(item.inCart>16 && item.inCart<=20){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${16* item.price-16+(item.inCart-16)*item.price},00€
//             </div>
//             `;
//             }
//             else if ( item.inCart>20){
//                 productContainer.innerHTML=productContainer.innerHTML+`
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${20}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//             </div>
//                 <div class="total">
//                 ${16* item.price-16+(20-16)*item.price},00€
//             </div>
//             `;            }
//             else{
//                 productContainer.innerHTML=productContainer.innerHTML+` 
//                 <div class="quantity">
//                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
//                 <span>${item.inCart}</span>
//                 <ion-icon class="increase" name="add-circle"></ion-icon>
//                 </div>
            
//                 <div class="total">
//                 ${item.inCart * item.price},00€
//             </div>
//             `;
//             }
//         });

//         productContainer.innerHTML += `
//             <div class="basketTotalContainer">
//                 <h4 class="basketTotalTitle">
//                     Valor Total
//                 </h4>
//                 <h4 class="basketTotal">
//                     ${cartCost},00€
//                 </h4>
//         `;

//     }

//     deleteButtons();
//     manageQuantity();
// }

// function deleteButtons() {
//     let deleteButtons = document.querySelectorAll('.product ion-icon');
//     let productName;
//     let productNumbers = localStorage.getItem('cartNumbers');
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     let cartCost = localStorage.getItem('totalCost');
    


//     for(let i=0; i < deleteButtons.length; i++) {
//         deleteButtons[i].addEventListener('click', () => {
//            // console.log(deleteButtons[0].parentElement.textContent)
//             productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
//              //console.log(cartItems); 
//              //console.log(cartItems[productName])
//              //console.log(productName);
//              //console.log(cartItems[productName].name);
//             // console.log(cartItems[productName].name + " " + cartItems[productName].inCart)
//             if (cartItems[productName].inCart==4){
//                 localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-1));
    
//             }
//             else if(cartItems[productName].inCart>4 && cartItems[productName].inCart<8){
//                 localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-1));
//             }
//             else if(cartItems[productName].inCart==8){
//                 localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-4));
//             }
                        
//                 else if(cartItems[productName].inCart>8 && cartItems[productName].inCart<12){
//                     localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-1));
//             }        
            
//             else if(cartItems[productName].inCart==12){
//                 localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-9));
//             }
//             else if(cartItems[productName].inCart>12 && cartItems[productName].inCart<=16){
//                     localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-1));
//             }        
            
//             else if(cartItems[productName].inCart==16){
//                 localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-16));
//             }
//             else if(cartItems[productName].inCart>16 && cartItems[productName].inCart<=20){
//                     localStorage.setItem('totalCost',  cartCost-( cartItems[productName].price * cartItems[productName].inCart-1));
//             }
//             else{
//                 localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
    

//             }
//             localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart );

            
//             delete cartItems[productName];
//             localStorage.setItem('productsInCart', JSON.stringify(cartItems));

//             displayCart();
//             onLoadCartNumbers();
            
//         });
//     }
// }

// function manageQuantity() {
//     let decreaseButtons = document.querySelectorAll('.decrease');
//     let increaseButtons = document.querySelectorAll('.increase');
//     let cartItems = localStorage.getItem('productsInCart');
//     let currentQuantity = 0;
//     let currentProduct = "";
//     cartItems = JSON.parse(cartItems);
//     console.log(cartItems);

//     for(let i=0; i < decreaseButtons.length; i++) {
//         decreaseButtons[i].addEventListener('click', () => {
//             currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
//             console.log(currentQuantity);
//             currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
//             console.log(currentProduct);

//             if( cartItems[currentProduct].inCart > 1 && cartItems[currentProduct].inCart<=20) {
//                 cartItems[currentProduct].inCart -= 1;
//                 cartNumbers( cartItems[currentProduct], "decrease" );
//                 totalCost( cartItems[currentProduct], "decrease" );
//                 localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//                 displayCart();
//             }
//             else{
//                 cartItems[currentProduct].inCart=20;
//                 cartNumbers( cartItems[currentProduct], "decrease" );
//                 totalCost( cartItems[currentProduct], "decrease" );
//                 localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//                 displayCart();
//             }
//         });
//     }

//     for(let i=0; i < increaseButtons.length; i++) {
//         increaseButtons[i].addEventListener('click', () => {
//             console.log("Increase button");
//             currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
//             console.log(currentQuantity);

//             currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
//             console.log(currentProduct);

//             if (cartItems[currentProduct].inCart<=20){
//                 cartItems[currentProduct].inCart += 1;
//                 cartNumbers( cartItems[currentProduct]);
//                 console.log(cartItems[currentProduct].inCart)
//                 totalCost( cartItems[currentProduct]);
//                 localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//                 displayCart();
//             }
//             else{
//                 cartItems[currentProduct].inCart=20;
//                 cartNumbers( cartItems[currentProduct] );
//                 totalCost( cartItems[currentProduct]);
//                 localStorage.setItem('productsInCart', JSON.stringify(cartItems));
//                 displayCart();
//             }
            
//         })
//     }
// }


// onLoadCartNumbers();
// displayCart();