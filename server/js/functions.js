module.exports.passwordProtected = (req, res, next)=>  {
    res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"')
    //console.log(req.headers.authorization)
    if (req.headers.authorization == "Basic YWRtaW46MTIzNDU=") {
        next()
    } else {
        res.status(401).send('Authentication required')
    }
}
