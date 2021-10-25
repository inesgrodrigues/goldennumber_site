exports.homeCtrlFunction = (req,res) =>{
  res.render('index');
  }
  exports.cartCtrlFunction = (req,res) =>{
      res.render('cart');
  }
  exports.paymentCtrlFunction = (req,res) =>{
    res.render('payment');
}
  exports.accountCtrlFunction = (req,res) =>{
      res.render('account');
  }
  exports.loginCtrlFunction = (req,res) =>{
    res.render('login');
}
exports.registoCtrlFunction = (req,res) =>{
    res.render('registo');
}
exports.obrigadaCtrlFunction = (req,res) =>{
  res.render('obrigada');
}
  exports.aboutCtrlFunction = (req,res) =>{
      res.render('about');
  }
  exports.contactCtrlFunction = (req,res) =>{
    res.render('contactform');
}
exports.formCtrlFunction = (req,res) =>{
  res.render('form');
}
  exports.precarioCtrlFunction = (req,res) =>{
      res.render('precario');
  }
  exports.thankCtrlFunction = (req,res) =>{
    res.render('thankyou');
}

  exports.userCtrlFunction = (req,res) =>{
    // res.render('user');
    res.render('user', {nome: req.user.name});
  }

 exports.checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login')
  }

  exports.checkNotAuthenticated = (req, res, next) => {
      if(req.isAuthenticated()){
        return res.redirect('/homepage')
      }
      next()
    }


// Landing Pages

exports.homepageCtrlFunction = (req,res) =>{
  res.render('homepage');
}
exports.explicacoesCtrlFunction = (req,res) =>{
  res.render('explicacoes');
}
exports.perfilCtrlFunction = (req,res) =>{
  res.render('perfil');
}
    