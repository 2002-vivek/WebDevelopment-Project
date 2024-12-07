import React from "react";
import { IonCard, IonImg } from "@ionic/react";
import styles from '../../styles/Portfolio.module.css';

const RestrictedCard: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <IonCard className={styles.cards}>
      <div className={styles.restricted_card_img}>
        <IonImg src={imageSrc} className={styles.restricted_image} />
        <div className={styles.overlay}>Restricted Content</div>
      </div>
    </IonCard>
  );
};

export default RestrictedCard;
