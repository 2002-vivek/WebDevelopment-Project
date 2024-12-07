import React, { useState } from "react";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonAlert,
  IonText,
} from "@ionic/react";
import styles from '../styles/Contact_Us.module.css';

interface ContactFormProps {
  onSubmit: (formData: { name: string; email: string; message: string; phone: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      setErrorMessage("Your name should be at least 3 characters long.");
      return;
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMessage("Phone number must be 10 digits and contain only numbers.");
      return;
    }
    const wordCount = formData.message.trim().split(/\s+/).length;
    if (wordCount <= 5) {
      setErrorMessage("Message must contain more than 5 words.");
      return;
    }
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("All fields are required.");
      return;
    }

    onSubmit(formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonText>
        <h2 className={styles.sm_view}>Let's Chat</h2>
      </IonText>

      
        <IonInput
          
          type="text"
          value={formData.name}
          className={styles.form_styles}
          onIonChange={(e) => handleChange("name", e.detail.value!)}
          placeholder="   Name *"
          required
        />
      

      
        <IonInput
          
          type="email"
          value={formData.email}
          className={styles.form_styles}
          onIonChange={(e) => handleChange("email", e.detail.value!)}
          placeholder="   Email *"
          required
        />

        <IonInput
          type="text"
          className={styles.form_styles}
          placeholder="   Company"
        />

        <IonInput
          type="tel"
          className={styles.form_styles}
          value={formData.phone}
          onIonChange={(e) => handleChange("phone", e.detail.value!)}
          placeholder="   Phone *"
          required
        />
      

      
        <IonTextarea
          value={formData.message}
          className={styles.form_styles}
          onIonChange={(e) => handleChange("message", e.detail.value!)}
          placeholder="Message"
          rows={4}
          required
        />
      

      {errorMessage && (
        <IonText color="danger">
          <p>{errorMessage}</p>
        </IonText>
      )}

      <IonButton expand="block" type="submit" className={styles.form_button} fill="outline" >
        Submit
      </IonButton>
    </form>
  );
};

export default ContactForm;
