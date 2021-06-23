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

const authContainer = document.querySelector('.mdl-cell');
const authButton = document.querySelector('[data-value="show-auth"]');
authButton.addEventListener('click', () => {
  authContainer.classList.toggle('cell-hidden');
});

const authOutputField = document.querySelector('.auth-output');

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

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

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
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/wrong-password') {
          authNotify('Wrong password.');
        } else {
          authNotify(errorMessage);
        }

        document.querySelector('#auth-sign-in').disabled = false;
      });
  }

  document.querySelector('#auth-sign-in').disabled = true;
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

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
  const email = document.querySelector('#email').value;

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

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function (user) {
    document.querySelector('#auth-verify-email').disabled = true;

    if (user) {
      // User is signed in.
      const { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } = user;

      document.querySelector('#auth-sign-in-status').textContent = 'Signed in';
      document.querySelector('#auth-sign-in').textContent = 'Sign out';
      document.querySelector('#auth-account-details').textContent = JSON.stringify(
        user,
        null,
        '  ',
      );

      if (!emailVerified) {
        document.querySelector('#auth-verify-email').disabled = false;
      }
    } else {
      // User is signed out.
      document.querySelector('#auth-sign-in-status').textContent = 'Signed out';
      document.querySelector('#auth-sign-in').textContent = 'Sign in';
      document.querySelector('#auth-account-details').textContent = 'null';
    }
    document.querySelector('#auth-sign-in').disabled = false;
  });

  document.querySelector('#auth-sign-in').addEventListener('click', toggleSignIn);
  document.querySelector('#auth-sign-up').addEventListener('click', handleSignUp);
  document.querySelector('#auth-verify-email').addEventListener('click', sendEmailVerification);
  document.querySelector('#auth-password-reset').addEventListener('click', sendPasswordReset);
}

window.onload = function () {
  initApp();
};
