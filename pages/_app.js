import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { UserContext } from '../lib/context';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';




function MyApp({ Component, pageProps }) {

  //grab current user from firebase
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    //turn off real-time subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user])

  return (
    <UserContext.Provider value={{ user, username: 'charles' }}>
      <>
        <Navbar />
        <Component {...pageProps} />
        <Toaster />
      </>
    </UserContext.Provider>
    
  
  )
}

export default MyApp
