exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true' ? true : false;
  console.log(req.session)
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: true
  })
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
};
