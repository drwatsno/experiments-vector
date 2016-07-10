var UserDbAbstraction = require(__dirname+'/'+"abstract");

var UserLogic = {};

/**
 * Creates user with username and secret
 * @param username
 * @param secret
 */
UserLogic.createUser = function ( username,secret ) {
    return new Promise(function (resolve, reject) {
        var user = new UserDbAbstraction({
            username : username,
            password   : secret
        });

        user.save(function (error, user, affected) {
            if (!error) {
                if (process.env.NODE_ENV == 'development') {
                    console.log('UserController: successfully added user "'+user.username+'"\n hash:'+user.secret+'\naffected: '+affected);
                }
                resolve(user);
            } else reject(error);
        })
    });
   
};

/**
 * Updates user with new fields
 * @param user
 * @param updatedFields
 */
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

/**
 * Deletes user by username
 * @param username
 */
UserLogic.deleteUser = function( username ) {
    return new Promise(function (resolve, reject) {
        UserDbAbstraction.find({username:username}).remove (function (error,docs) {
            if (!error) {
                if (process.env.NODE_ENV == 'development') {
                    console.log('UserController: successfully updated user');
                }
                resolve(docs);
            } else reject(error);
        })
    });
   
};

/**
 * Get all users
 * @returns {Promise}
 */

UserLogic.getUsers = function () {
    return new Promise(function (resolve, reject) {
        UserDbAbstraction.find({}, function (error, docs) {
            if (error) {reject(error);} else
                resolve(docs);
        });
    });
};

/**
 * Returns user by id
 * @param id
 * @returns {Promise}
 */

UserLogic.getUserById = function (id) {
  return new Promise(function (resolve, reject) {
      UserDbAbstraction.find({_id:id}, function (error, doc) {
          if (error) {reject(error);} else 
              resolve(doc);
      })
  })
};

module.exports = UserLogic;