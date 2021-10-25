// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//const Stripe = require('stripe')
//const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//const stripe = Stripe('pk_live_51HjMU8G9ldgy8q0kh4I9UCfES4CzwcqYNLbnOsmUo1DqXvKGl0aw7dYsMPOX6WYg4GsuJcXZZPoNh0pVwQuH8sXy00yWobwIPz');
const stripe = Stripe('pk_test_51HjMU8G9ldgy8q0kaXKlZTyzCrB8BbM1idCsgYyLxgNglNOV8rTaJSTU7l6Lj3yxcOabcvQRAnPiitNEuu40ebeH009Xen5PHe');
stage = 'prod';
// const host = stage === 'dev' ? 'http://localhost:5000' : 'http://back.goldennumberacademy.pt';

//const stripe = Stripe('pk_test_51HjMU8G9ldgy8q0kaXKlZTyzCrB8BbM1idCsgYyLxgNglNOV8rTaJSTU7l6Lj3yxcOabcvQRAnPiitNEuu40ebeH009Xen5PHe');
//const stripe = Stripe('yourStripePublicKeyHere');
const startCheckout = document.getElementById('startCheckout');

startCheckout.addEventListener('click', () => {
  console.log("Buy btn clicked");
  // startCheckout.textContent = "A processar..."
  buyProducts(myProducts())
});

function myProducts() {
  const getProducts = JSON.parse(localStorage.getItem('productsInCart'));

  const products = [ ];

  console.log(getProducts);
  for( const property in getProducts) {
    products.push({
      tag: getProducts[property].tag,
      inCart: getProducts[property].inCart
    })
  }

  return products;
}

async function buyProducts(cartProducts) {
  try {
  
    const body = JSON.stringify({
      products: cartProducts
    })

    const response = await axios.post('http://localhost:5000/checkout', body, {
    //const response = await axios.post('http://back.goldennumberacademy.pt/checkout', body, {
    // const response = await axios.post(`${host}/checkout`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })

    console.log(response.data);

    localStorage.setItem('sessionId', response.data.session.id);

    await stripe.redirectToCheckout({
      sessionId: response.data.session.id
    })

  } catch (error) {
    console.log(error);
  }
}