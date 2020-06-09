'use strict'
const { validateAll } = use('Validator')
var firebase = require('firebase');
class UserController {

    //Login with firebase
    async login({ request, response }) {

        const rules = {
            email: 'required|email',
            password: 'required'
        }

        const validation = await validateAll(request.all(), rules);

        //Check Validation
        if (validation.fails()) {
            return validation.messages();
        }
        let data = request.all();

        //Sign in with firebase
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((res) => {
                response.send(res);
            }).catch((error) => {
                response.send(error);
            });
    }
}

module.exports = UserController
