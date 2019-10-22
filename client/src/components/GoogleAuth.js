import React from 'react';
import { connect } from 'react-redux'
import { signIn, signOut} from '../actions'

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '197464278864-eg95rdnag9qcoo5p9o0ndnrpo0kr3od4.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    !isSignedIn ? this.props.signOut() : this.props.signIn(this.auth.currentUser.get().getId());
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.auth.signOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
          <button onClick={this.auth.signIn} className="ui red google button">
              <i className="google icon"/>
              Sign In with Google
          </button>
      )
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
    const isSignedIn = state.auth.isSignedIn  
    const Id = state.auth.Id
    return { isSignedIn, Id }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
