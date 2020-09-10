initFirebaseAuthEventListener = function () {
var that = this;
    window.addEventListener('logout', function (e) {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    }, false);
    window.addEventListener('login-widget', function (e) {
        that.initFirebaseAuthStateHandler();
    }, false)
}

initFirebaseAuthStateHandler = function () {
    that = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.getIdToken().then(function(idToken) {
                const loginRequest = new CustomEvent('login-request', { 
                    detail: {
                        token: idToken
                    }
                });
                window.dispatchEvent(loginRequest);
            });
        } else {
            that.initFirebaseAuthUI();
        }
    }, function(error) {
    });
},

getUiConfig = function () {
    
    return {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            },
            uiShown: function() {
            }
        },
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
    };
},

initFirebaseAuthUI = function() {   
    firebaseUi.start('#firebaseui-auth-container', getUiConfig())
}

var firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());
this.initFirebaseAuthEventListener();