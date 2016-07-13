var UserDbAbstraction = require(__dirname+'/'+"abstract");

var UserLogic = {};

/**
 * Creates user with username and secret
 * @param username username
 * @param secret password
 */
UserLogic.createUser = function ( username, secret ) {
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
 * @param username user name
 * @param updatedFields object with updated fields and its values
 */
UserLogic.updateUser = function (username, updatedFields) {
    return new Promise(function (resolve, reject) {
        UserDbAbstraction.findOne({ username: username }, function (error, doc){
            if (!error&&doc) {
                updatedFields.username ? doc.username = updatedFields.username : false;
                updatedFields.password   ? doc.password = updatedFields.password : false;
                doc.save( function (error, doc, affected) {
                    if (!error) {
                        if (process.env.NODE_ENV == 'development') {
                            console.log('UserController: successfully updated user "'+doc.username+'"\naffected: '+affected);
                        }
                        resolve(doc);
                    } reject(error);
                });
            } else reject(error||{errmsg:'no such user'});
        });
    });
    
};

/**
 * Deletes user by username
 * @param username user name
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
 * @returns {Promise} returns docs in resolve or error in reject
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
 * @param id user id
 * @returns {Promise} returns user doc in resolve or error in reject
 */

UserLogic.getUserById = function (id) {
  return new Promise(function (resolve, reject) {
      UserDbAbstraction.find({_id:id}, function (error, doc) {
          if (error) {reject(error);} else 
              resolve(doc);
      })
  })
};

/**
 * Returns user by name
 * @param username user name
 * @returns {Promise} returns doc in resolve or error in reject
 */

UserLogic.getUserByName = function (username) {
    return new Promise(function (resolve, reject) {
        UserDbAbstraction.find({username:username}, function (error, doc) {
            if (error) {reject(error);} else
                resolve(doc);
        })
    })
};

module.exports = UserLogic;