var UserDbAbstraction = require(".abstract");

var UserLogic = {};

UserLogic.createUser = function ( username,secret ) {
    var user = new UserDbAbstraction({
        username : username,
        password   : secret
    });

    user.save(function (error, user, affected) {
        if (!error) {
            if (process.env.NODE_ENV == 'development') {
                console.log('UserController: successfully added user "'+user.username+'"\n hash:'+user.secret+'\naffected: '+affected);
            }
        } else throw error;
    })
};

UserLogic.updateUser = function (user, updatedFields) {
    UserDbAbstraction.findOne({ username: username }, function (error, doc){
        if (!error) {
            updatedFields.username ? doc.username = updatedFields.username : false;
            updatedFields.password   ? doc.password = updatedFields.password : false;
            doc.save( function (error, doc, affected) {
                if (!error) {
                    if (process.env.NODE_ENV == 'development') {
                        console.log('UserController: successfully updated user "'+doc.username+'"\naffected: '+affected);
                    }
                } else throw error;
            });
        } else throw error;
    });
};

UserLogic.deleteUser = function( username ) {
    UserDbAbstraction.find({username:username}).remove (function (error) {
        if (!error) {
            if (process.env.NODE_ENV == 'development') {
                console.log('UserController: successfully updated user');
            }
        }
    })
};

module.exports = UserExport;