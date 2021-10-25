const express= require('express');
const { builtinModules } = require('module');
const {thankCtrlFunction,paymentCtrlFunction,homeCtrlFunction,homepageCtrlFunction,explicacoesCtrlFunction,perfilCtrlFunction,checkAuthenticated,checkNotAuthenticated, userCtrlFunction,obrigadaCtrlFunction, accountCtrlFunction, loginCtrlFunction, registoCtrlFunction, cartCtrlFunction, aboutCtrlFunction,contactCtrlFunction, precarioCtrlFunction,formCtrlFunction,} = require('../controllers/pagesCtrlFile.js');

const router = express.Router();

router.get('/',homeCtrlFunction);
router.get('/account',accountCtrlFunction);
router.get('/login',checkNotAuthenticated, loginCtrlFunction);
router.get('/registo',checkNotAuthenticated, registoCtrlFunction);
router.get('/about',aboutCtrlFunction);
router.get('/cart',cartCtrlFunction);
router.get('/payment',paymentCtrlFunction);
router.get('/contactform',contactCtrlFunction);
router.get('/form',formCtrlFunction);
router.get('/obrigada',obrigadaCtrlFunction);
router.get('/precario',precarioCtrlFunction);
router.get('/user', checkAuthenticated, userCtrlFunction);
// router.get('/user', userCtrlFunction);
router.get('/thankyou',thankCtrlFunction);

// Landing Pages

router.get('/homepage',homepageCtrlFunction);
router.get('/explicacoes',explicacoesCtrlFunction);
router.get('/perfil',perfilCtrlFunction);

module.exports = router;