import React from 'react';
import { IonFooter, IonGrid, IonRow, IonCol, IonText } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Footer.module.css';
const Footer: React.FC = () => {
  const history = useHistory();

  const handleNavigation = (path: string) => {
    history.push(path);
  };

  return (
    <IonFooter className={styles.footer_section}>
      <IonGrid className={styles.footer_container}>
        {/* About Column */}
        <IonCol className={styles.footer_column}>
          <h3>About</h3>
          <ul>
            <li onClick={() => handleNavigation('/')}>Our Story</li>
            <li onClick={() => handleNavigation('/')}>Mission & Vision</li>
            <li onClick={() => handleNavigation('/')}>Leadership</li>
            <li onClick={() => handleNavigation('/')}>Careers</li>
          </ul>
        </IonCol>

        {/* Services Column */}
        <IonCol className={styles.footer_column}>
          <h3>Services</h3>
          <ul>
            <li onClick={() => handleNavigation('/')}>Residential Security</li>
            <li onClick={() => handleNavigation('/')}>Site Security</li>
            <li onClick={() => handleNavigation('/')}>Event Security</li>
            <li onClick={() => handleNavigation('/')}>Monitoring</li>
          </ul>
        </IonCol>

        {/* Products Column */}
        <IonCol className={styles.footer_column}>
          <h3>Products</h3>
          <ul>
            <li onClick={() => handleNavigation('/')}>Cameras</li>
            <li onClick={() => handleNavigation('/')}>Alarms</li>
            <li onClick={() => handleNavigation('/')}>Locks</li>
            <li onClick={() => handleNavigation('/')}>Systems</li>
          </ul>
        </IonCol>

        {/* Terms & Conditions Column */}
        <IonCol className={styles.footer_column}>
          <h3>Terms & Conditions</h3>
          <ul>
            <li onClick={() => handleNavigation('/')}>Privacy Policy</li>
            <li onClick={() => handleNavigation('/')}>Terms of Use</li>
            <li onClick={() => handleNavigation('/')}>Cookie Policy</li>
            <li onClick={() => handleNavigation('/')}>Refund Policy</li>
          </ul>
        </IonCol>
      </IonGrid>

      {/* Footer Bottom Section */}
      <IonText className={styles.footer_bottom}>
        <p>© 2024 ON GUARD 24/7. All Rights Reserved.</p>
      </IonText>
    </IonFooter>
  );
};

export default Footer;
