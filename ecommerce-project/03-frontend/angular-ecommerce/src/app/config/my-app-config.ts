export default {
    //openidconnect
    oidc:{
        clientId:'0oagikbx6ifzl95rI5d7', //from okta
        //issuer of tokens, url when authorizing with okta Authorization Server
        issuer: 'https://dev-90440130.okta.com/oauth2/default', //dev-90440130.okta.com from okta 
        //send to this uri once logged
        redirectUri: 'http://localhost:4200/login/callback',
        //scopes provide access to information about a user
        //openid: required for authentication requests
        //profile: user's first name, last name, phone etc
        //email: user's email address
        scopes: ['openid', 'profile','email']
    }
}
