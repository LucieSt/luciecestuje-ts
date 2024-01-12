import React, { useState } from 'react';
import { db } from './../firebase';
import { collection, addDoc } from 'firebase/firestore';
import "./../styles/newsletterForm.sass";
import "./../App.sass"
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const sendEmail = (token: string) => {
    const templateParams = {
      to_email: email,
      message_to_customer: "Tohle je dynamicky vlozeny text",
      // unsubscribe_link: `https://luciecestuje.cz/odhlasit-odber?token=${token}`
      unsubscribe_link: `http://localhost:5173/odhlasit-odber?token=${token}`
    };

    const servisId = import.meta.env.VITE_EMAILJS_SERVIS_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;
    const welcomeTemplateId = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID;
  
    emailjs.send(servisId, welcomeTemplateId, templateParams, userId)
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
      }, (error) => {
        console.log('Failed to send email.', error);
      });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setMessage('Prosím zadejte validní emailovou adresu.');
      return;
    }
    const token = uuidv4();
    console.log(token);
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), { email, token });
      sendEmail(token);
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