import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import styles from '../styles/Portfolio.module.css';
import Card from "../components/Portfolio/Card";
import SubscribePage from "../components/SubscribePage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RestrictedCard from "../components/Portfolio/RestrictedCard";

const Portfolio: React.FC = () => {
  const condominiums = [
    { imageSrc: "/1551Riverside.jpg", heading: "1551 RiverSide" },
    { imageSrc: "/Belkin Industry.jpg", heading: "Belkin Industry" },
    { imageSrc: "/Carlingtontowers.avif", heading: "Brant Hospital" },
    { imageSrc: "/HolidayInn.jpg", heading: "Carlington Towers" },
    { imageSrc: "/Novotel.jpg", heading: "Holiday Inn" },
    { imageSrc: "/1551Riverside.jpg", heading: "Novotel" },
  ];

  const embassies = [
    { imageSrc: "/Waterfield square.webp" },
    { imageSrc: "/omaxe lands.jpg" },
    { imageSrc: "/Miller place.jpg" },
    { imageSrc: "/imax.jpg" },
    { imageSrc: "/Douglasbuilding.jpg" },
  ];

  return (
    <IonPage >
      <IonHeader>
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>
      <IonContent className={styles.body}>
        {/* Page Heading */}
        <IonGrid>
          <IonRow>
            <IonCol className={styles.heading_container}>
              <div className={styles.heading}><h1>Portfolio</h1></div>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Condominiums Section */}
        <IonGrid className={styles.main_content}>
          <IonRow >
            <IonCol size="12" >
              <h2 className={styles.side_heading}>Condominiums</h2>
            </IonCol>
          </IonRow>
          <IonRow className={styles.photo_grid}>
            {condominiums.map((item, index) => (
              <IonCol size="12" sizeMd="6" key={index}>
                <Card imageSrc={item.imageSrc} heading={item.heading} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Embassies Section */}
        <IonGrid className={styles.restricted_content}>
          <IonRow>
            <IonCol size="12" >
              <h2 className={styles.side_heading}>Embassies</h2>
            </IonCol>
          </IonRow>
          <IonRow className={styles.photo_grid}>
            {embassies.map((item, index) => (
              <IonCol size="12" sizeMd="6" key={index}>
                <RestrictedCard imageSrc={item.imageSrc} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Subscribe and Footer */}
        <SubscribePage />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;

