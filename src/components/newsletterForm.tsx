import React, { useState } from 'react';
import { db } from './../firebase';
import { collection, addDoc } from 'firebase/firestore';
import "./../styles/newsletterForm.sass";
import "./../App.sass"

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setMessage('Prosím zadejte validní emailovou adresu.');
      return;
    }
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), { email });
      setEmail('');
      setMessage('Děkujeme! Váš email jsme si uložili.');
    } catch (error) {
      setMessage('Nepodařilo se. Prosím, zkuste to znovu.');
    }
  };

  return (
    <div className="email-form-container">
      <form onSubmit={handleSubmit} className='email-form'>
        <input
          className="email-input"
          type="email"
          placeholder="Zadejte váš email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Potvrdit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewsletterForm;