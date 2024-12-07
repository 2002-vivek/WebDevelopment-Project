import React from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";

import styles from '../styles/Subscribe.module.css';
import { SubscribeForm } from "./Subscribe/SubscribeForm";

const SubscribePage: React.FC = () => {
  const handleSubscribe = async (formData: { email: string }) => {
    const BASE_URL = "http://localhost:3000";
    try {
      const response = await fetch(`${BASE_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      console.log("Subscription successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
        <IonGrid className={styles.subscribe_follow_section}>
          <IonRow >
            {/* Stay Updated Section */}
            <IonCol size="12" sizeMd="6" className={styles.stay_updated}>
              <IonText>
                <h3>Stay Updated</h3>
                <p>Subscribe to our newsletter for the latest updates and news.</p>
              </IonText>
              <SubscribeForm onSubmit={handleSubscribe} />
            </IonCol>

            {/* Follow Us Section */}
            <IonCol size="12" sizeMd="6" className={styles.follow_us}>
              <IonText>
                <h3>Follow Us</h3>
                <p>Follow us on social media for the latest updates.</p>
              </IonText>
              <div className={styles.social_icons}>
                <IonButton fill="clear" href="https://www.facebook.com/">
                  <img src="/facebook.png" alt="Facebook" />
                </IonButton>
                <IonButton fill="clear" href="https://x.com/">
                  <img src="/twitter.png" alt="Twitter" />
                </IonButton>
                <IonButton fill="clear" href="https://www.instagram.com/">
                  <img src="/instagram.png" alt="Instagram" />
                </IonButton>
                <IonButton fill="clear" href="https://www.linkedin.com/home">
                  <img src="/linkedin.png" alt="LinkedIn" />
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>

  );
};

export default SubscribePage;
