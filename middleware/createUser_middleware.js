const errorhandler = require ('../utils/errorhandler');


function validation (req, res, next ) {
 
    if (!req.body.name || !req.body.age){
        return res.status(400).send('Name and age are required');
    }
    if(req.body.name  > 3 && req.body.name < 50){
        return res.status(400).send('Name must be between 3 and 50 characters');
    }
    
    
    next();
}


// errorhandler(async function checkUniqName(req, res, next) {
//         const checkUniq = await User.find({name : req.body.name});
//            if(checkUniq){
//                return res.status(400).send('Name must be unique');
//            }
// })
async function checkUniqName(req, res, next) {
    try {
      const checkUniq = await User.find({name : req.body.name});
       if(checkUniq){
           return res.status(400).send('Name must be unique');
       }  
    } catch (error) {
        res.send(error);
    }
    
}

module.exports = {
    validation,
    checkUniqName
}