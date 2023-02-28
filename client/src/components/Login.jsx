import React from 'react';
import googleSignIn from './Firebase';
import styles from '../styles/Login.module.scss';

const Login = ({ setUser }) => {
  const handleSignIn = async () => {
    const userCredential = await googleSignIn();
    setUser(userCredential.user);
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
