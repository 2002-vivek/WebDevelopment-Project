import React from "react";
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from "@ionic/react";
import styles from '../../styles/Portfolio.module.css';

const Card: React.FC<{ imageSrc: string; heading: string }> = ({ imageSrc, heading }) => {
  return (
    <IonCard >
        
            <IonImg src={imageSrc} />
        
      <IonCardContent >
        <IonCardSubtitle className={styles.card_heading}>{heading}</IonCardSubtitle>
      </IonCardContent>
    </IonCard>
  );
};

export default Card;
