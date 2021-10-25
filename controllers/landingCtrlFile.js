const { landingList } = require('../landing');

exports.landingCtrlFunction = (req, res) => {
  try {
    
    res.status(200).json({
      landing_products: landingList
    })

  } catch (error) {
    console.log(error);
  }
}