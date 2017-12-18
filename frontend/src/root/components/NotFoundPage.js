import React from 'react';
import {FaFrownO} from 'react-icons/lib/fa';

export default function NotFoundPage ({children}){

  return(
    <div style={styles.container}>
      <FaFrownO style={styles.icon} />
      <h1>{children}</h1>
    </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    padding: 100
  },
  icon: {
    fontSize: 300
  }
};