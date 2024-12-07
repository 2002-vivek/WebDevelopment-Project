import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import styles from '../styles/Contact_Us.module.css';
import Header from "../components/Header";
import SubscribePage from "../components/SubscribePage";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";


const ContactUs: React.FC = () => {
  const handleFormSubmit = async (formData: { name: string; email: string; message: string; phone: string }) => {
    try {
      const BASE_URL = "http://localhost:3000";
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header/>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid className={styles.container}>
          <IonRow className={styles.form_container}>

            <IonCol size="12" sizeMd="6" >
              <ContactForm onSubmit={handleFormSubmit} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <SubscribePage />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ContactUs;
