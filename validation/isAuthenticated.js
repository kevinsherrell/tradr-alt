const isAuthenticated = ((req, res, next)=>{
    if(req.session.currentUser){
        console.log("Req.Session: ")
        console.log(req.session.currentUser)
        return next();
    }else{
        return res.send("must be logged in to perfom this action!");
    }
});

module.exports = isAuthenticated;