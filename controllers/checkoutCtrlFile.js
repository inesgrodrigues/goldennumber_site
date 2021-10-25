const stripe = require('stripe')('sk_test_51HjMU8G9ldgy8q0ki7AV5hqwXenWwrXTGT6SGEeqLhDhH6KI4ieNqzoKjZCtjv5TJYtFY90CSGixe64JMiADC6Q4000pW1yW7H');
//const stripe = require('stripe')('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');
const { productList } = require('../products');
const Email = require('../utils/email');
const Order = require('../models/orderModel');

exports.checkoutCtrlFunction = async (req, res) => {
  try {
    const productsFromFrontend = req.body.products;
    // console.log(productList);

    function productsToBuy() {
      let products = [];
      
      productList.forEach( singleProductList => {
        productsFromFrontend.forEach(singleProductFrontend => {
          if( singleProductList.tag === singleProductFrontend.tag ) {
            if (singleProductFrontend.inCart===4){
            products.push({
              name: singleProductList.name,
              description: singleProductList.description,
              images: [singleProductList.image],
              amount: (singleProductList.price-0.25) * 100,
              currency: 'eur',
              quantity: singleProductFrontend.inCart
            })
            } 
            else if (singleProductFrontend.inCart>4 & singleProductFrontend.inCart<8){
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round(((singleProductList.price*(singleProductFrontend.inCart-4))/singleProductFrontend.inCart+(4/singleProductFrontend.inCart)*(singleProductList.price-0.25)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart==8){
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round((singleProductList.price-0.5) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart>8 & singleProductFrontend.inCart<12){
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(8/singleProductFrontend.inCart)*(singleProductList.price-0.5)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if ( singleProductFrontend.inCart==12){
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round((singleProductList.price-0.75) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart>12 & singleProductFrontend.inCart<16){
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(12/singleProductFrontend.inCart)*(singleProductList.price-0.75)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              else if (singleProductFrontend.inCart==16){
                products.push({
                  name: singleProductList.name,
                  description: singleProductList.description,
                  images: [singleProductList.image],
                  amount: Math.round((singleProductList.price-1) * 100),
                  currency: 'eur',
                  quantity: singleProductFrontend.inCart
                })
                } 
                else if (singleProductFrontend.inCart>16 & singleProductFrontend.inCart<=20){
                  products.push({
                    name: singleProductList.name,
                    description: singleProductList.description,
                    images: [singleProductList.image],
                    amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(16/singleProductFrontend.inCart)*(singleProductList.price-1)) * 100),
                    currency: 'eur',
                    quantity: singleProductFrontend.inCart
                  })
                  }
            else {
              products.push({
                name: singleProductList.name,
                description: singleProductList.description,
                images: [singleProductList.image],
                amount: Math.round(singleProductList.price * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
            }
          }
        })
      })

      return products
    }

    console.log(productsToBuy())

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/checkout/success`,
      cancel_url: `${req.protocol}://${req.get('host')}/cart`,
      shipping_address_collection: {
        allowed_countries: ['PT', 'DE']
      },
      line_items: productsToBuy()
    });

    res.status(200).json({
      status: "success",
      session: session
    })
  } catch (error) {
    console.log(error);
  }
}

exports.cartSuccessFunction = (req, res) => {
  res.render('thankyouPage');
}


  
exports.finishOrder = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.params.id,{
      expand:['line_items'],
    }
  )
  
  console.log("My payment was: ");
  console.log(session);

  if(session.payment_status === "paid") {
    session_item=session.line_items.data
    const purchasedProducts = session_item.map(product=>(
      {
        productName: product.description,
        price: product.amount_total / 100,
        quantity: product.quantity
}
    
    ))
    
  //   if(session.payment_status === "paid") {
  //     const purchasedProducts = session.display_items.map(product => (
  //       {
  //         productName: product.custom.name,
  //         price: product.amount / 100,
  //         quantity: product.quantity
  // }
  //     ))

    console.log("teste 2 ")
    //save transaction into the database
    await Order.create(
      {
      userName: session.shipping.name,
      userEmail: session.customer_details.email,
      products: purchasedProducts,
      totalPrice: session.amount_total / 100
    })

    console.log("Purchased saved on Database");

    console.log("products are:");
    console.log(purchasedProducts);
    //send an email
    await new Email({
      name: session.shipping.name,
      email: session.customer_details.email
    }, purchasedProducts, session.amount_total).sendThankYou();

    return res.status(200).json({
      success: true
    })
  }

  res.status(200).json({
    success: false
  })
}
