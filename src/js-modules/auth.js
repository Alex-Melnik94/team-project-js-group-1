import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC5XShaL3vp3Iinx35hfO3S-EImalXSgec',
  authDomain: 'filmoteka-22c14.firebaseapp.com',
  projectId: 'filmoteka-22c14',
  storageBucket: 'filmoteka-22c14.appspot.com',
  messagingSenderId: '870533390135',
  appId: '1:870533390135:web:cf3bd9ac90b024898544b2',
};

firebase.initializeApp(firebaseConfig);

////////////////

let timerId;

const authContainer = document.querySelector('.auth-backdrop');
const authOpenButton = document.querySelector('.auth-open');
const authCloseButton = document.querySelector('.auth-close');

authOpenButton.addEventListener('click', () => {
  authContainer.classList.remove('auth-hidden');
  document.body.classList.add('auth-modal-open');
});

authCloseButton.addEventListener('click', evt => {
  authContainer.classList.add('auth-hidden');
  document.body.classList.remove('auth-modal-open');
});

const authOutputField = document.querySelector('.auth-form .output');

const authNotify = (message, type = 'alert') => {
  authClearOutput();

  authOutputField.classList.add(type);
  authOutputField.textContent = message;
  authOutputField.classList.add('animate');

  setTimeout(() => authOutputField.classList.remove('animate'), 1000);
  timerId = setTimeout(() => authClearOutput(), 8000);
};

const authClearOutput = () => {
  clearTimeout(timerId);
  authOutputField.textContent = '\u00A0';
  authOutputField.classList.remove('alert', 'note', 'animate');
};

////////////////////////////////////////////////////////////////////////

/**
 * Handles the sign in button press.
 */

function handleLogIn() {
  clearsignUp();

  if (firebase.auth().currentUser) {
    firebase
      .auth()
      .signOut()
      .then(() => authNotify('You have signed out succesfully', 'note'));
  } else {
    const email = document.querySelector('#logemail').value;
    const password = document.querySelector('#logpass').value;

    if (email.length < 4) {
      authNotify('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      authNotify('Please enter a longer password.');
      return;
    }
    // Sign in with email and pass.
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => authNotify(`Signed to ${user.displayName || 'anonymous'}`, 'note'))
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          authNotify('Wrong password.');
        } else {
          authNotify(errorMessage);
        }
      });
  }
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  clearLogin();

  const email = document.querySelector('#signemail').value;
  const password = document.querySelector('#signpass').value;
  const userName = document.querySelector('#signname').value;

  if (email.length < 4) {
    authNotify('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    authNotify('Please enter a longer password.');
    return;
  }
  // Create user with email and pass.
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user.updateProfile({
        displayName: userName,
        photoURL: null,
      });
    })
    .then(() => {
      authNotify(`${userName}, wellcome to our Filmoteka!`, 'note');
      document.querySelector('#logheader').textContent = `Signed to: ${userName}`;
      document.querySelector('#logbtn').textContent = 'Sign out';
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        authNotify('The password is too weak.');
      } else {
        authNotify(errorMessage);
      }
    });
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(function () {
      // Email Verification sent!
      authNotify('Email Verification Sent!', 'note');
    });
}

function sendPasswordReset() {
  const email = document.querySelector('#logemail').value;

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(function () {
      // Password Reset Email Sent!
      authNotify('Password Reset Email Sent!', 'note');
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode == 'auth/invalid-email') {
        authNotify(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        authNotify(errorMessage);
      }
    });
}

const clearLogin = () => {
  document.querySelector('#logemail').value = '';
  document.querySelector('#logpass').value = '';
};

const clearsignUp = () => {
  document.querySelector('#signemail').value = '';
  document.querySelector('#signpass').value = '';
  document.querySelector('#signname').value = '';
};

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  //   // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      //       // User is signed in.
      const { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } = user;

      document.querySelector('#logheader').textContent = `Signed to: ${
        firebase.auth().currentUser.displayName || 'anonymous'
      }`;
      document.querySelector('#logbtn').textContent = 'Sign out';
    } else {
      //       // User is signed out.
      document.querySelector('#logheader').textContent = 'Sign in:';
      document.querySelector('#logbtn').textContent = 'Sign in';
    }
  });

  document.querySelector('#logbtn').addEventListener('click', handleLogIn);
  document.querySelector('#signbtn').addEventListener('click', handleSignUp);
  document.querySelector('#passreset').addEventListener('click', sendPasswordReset);
}

window.onload = function () {
  initApp();
};
