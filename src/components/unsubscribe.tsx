import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './../firebase';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

const Unsubscribe = () => {
  const location = useLocation();
  const [message, setMessage] = useState<string>('');

  const handleUnsubscribe = async () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    if (!token) {
      console.log('No token provided');
      return;
    }

    try {
      const q = query(collection(db, 'newsletter_subscribers'), where('token', '==', token));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
        setMessage('Úspěšně jsme vás odhlásili z odběru našeho newsletteru');
        console.log('Unsubscribed successfully');
      } else {
        setMessage('Bohužel se nám nepodařilo odhlásit vás z odběru našeho newsletteru. Prosím, kontaktujte nás a vyřešíme to.');
        console.log('Token not found');
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  return (
    <div>
      <br />
      <h1>Odhlášení z odběru novinek</h1>
      <button onClick={handleUnsubscribe}>ODHLÁSIT</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Unsubscribe;