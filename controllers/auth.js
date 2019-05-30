exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[0].trim().split('=')[1] === 'true' ? true : false;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: true
  })
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
  res.redirect('/');
};
