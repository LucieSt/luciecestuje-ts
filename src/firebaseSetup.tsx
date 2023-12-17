// firebase setup
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useRef } from "react";

const FirebaseSetup = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value;

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: inputValue,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <h2>firebase</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder="Enter something" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FirebaseSetup;
