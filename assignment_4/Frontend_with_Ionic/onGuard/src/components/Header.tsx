import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, IonTitle } from '@ionic/react';
import { arrowBackOutline, logInOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from '../pages/UserContext';



const Header: React.FC = () => {
  const { token, logout   } = useUser();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const handleLoginRedirect = () => {
    console.log(token);
    history.push('/login');
  };

  return (
    <IonHeader>
      <IonToolbar>
        {/* Back Button */}
        <IonButtons slot="start">
          <IonButton onClick={() => history.goBack()}>
            <IonIcon slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
        </IonButtons>

        {/* Logo in the Center */}
        <IonTitle className="ion-text-center">
          <img src="/logoq.png" alt="ON GUARD 24/7 Logo" style={{ height: '40px' }} />
        </IonTitle>

        {/* Login/Logout Button */}
        <IonButtons slot="end">
          {token ? (
            <IonButton onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              Logout
            </IonButton>
          ) : (
            <IonButton onClick={handleLoginRedirect}>
              <IonIcon slot="start" icon={logInOutline} />
              Login
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
