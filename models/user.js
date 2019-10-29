const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    userId: String
})

const UserModel = mongoose.model('user', userSchema)

function addUser(userName, password) {
    let userId = new Date().getTime()
    var fluffy = new UserModel({ userName, password, userId })

    return fluffy.save().then(function () {
        return true
    }, function(err) {
        console.log('addUser => error')
        return false
    })
}

function getUsers() {
    return new Promise((resolve, reject) => {
        UserModel.find().select('userName password userId').exec(function (err, users) {
            if (err) {
                reject(err)
            }

            resolve(users)
        })
    })
}

module.exports = {
    addUser,
    getUsers
}