const RESOURCE_PATH = '/log'
const viewController = {
  index(req, res, next){
    res.render('Log/Index', res.locals.data)
  },
  show(req, res, next){
    res.render('Log/Show', res.locals.data)
  },
  edit(req, res, next){
    res.render('Log/Edit', res.locals.data)
  },
  newView(req, res, next){
    res.render('Log/New')
  },
  redirectHome(req, res, next){
    res.redirect(RESOURCE_PATH)
  },
  redirectShow(req, res, next){
    res.redirect(RESOURCE_PATH + `/${req.params.id}`)
  }
}

module.exports = viewController