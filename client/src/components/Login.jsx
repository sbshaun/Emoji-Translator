import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './Firebase';
import styles from '../styles/Login.module.scss';

const Login = ({ setUser }) => {
  const handleSignIn = async () => {
    signInWithPopup(auth, provider)
      .then(userCredential => {
        // The signed-in user info
        const user = userCredential.user;
        console.log('Signed in user:', user);

        // set user
        setUser(user);

        // Additional user info (if available)
        const additionalUserInfo = userCredential.additionalUserInfo;
        console.log('Additional user info:', additionalUserInfo);
      })
      .catch(error => {
        // Handle sign-in errors
        console.error('Sign-in error:', error);
      });
  };

  return (
    <div className={styles.googleBtn} onClick={handleSignIn}>
      <div className={styles.googleIconWrapper}>
        <img
          className={styles.googleIcon}
          alt="google icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <p className={styles.btnText}>
        <b>Sign in with Google</b>
      </p>
    </div>
  );
};

export default Login;
