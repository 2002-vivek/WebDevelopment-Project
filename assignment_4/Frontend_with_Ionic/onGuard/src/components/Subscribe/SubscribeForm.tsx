import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import styles from '../../styles/Subscribe.module.css'; 

interface SubscribeFormProps {
  onSubmit: (formData: { email: string }) => void;
}

export const SubscribeForm: React.FC<SubscribeFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: CustomEvent) => {
    setEmail(e.detail.value!);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }
    onSubmit({ email });
    setEmail(""); 
    setErrorMessage(null);
    setSuccessMessage("Subscription successful!");
  };

  return (
    <>
      <form className={styles.subscribe_form} onSubmit={handleSubmit}>
        <IonItem>
          <IonInput
            className={styles.forminput}
            type="email"
            value={email}
            onIonChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </IonItem>

        <IonButton type="submit" className={styles.form_button} expand="block" color="warning">
          Sign Up
        </IonButton>
      </form>

      {errorMessage && (
        <IonText color="danger">
          <p className="alert alert-danger">{errorMessage}</p>
        </IonText>
      )}
      {successMessage && (
        <IonText color="success">
          <p className="alert alert-success">{successMessage}</p>
        </IonText>
      )}
    </>
  );
};
