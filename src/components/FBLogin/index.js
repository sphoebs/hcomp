import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FBLogin extends React.Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <FacebookLogin
        appId="157962001476723"
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile"
        callback={this.responseFacebook}
      />
    )
  }
}

export default FBLogin;
