import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircleOutline, addOutline, briefcaseOutline, callOutline, ellipse, folderOutline, homeOutline, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Tab2 from './pages/Services';
import Tab3 from './pages/Portfolio';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/login/Login';
import { AuthenticationProvider } from './providers/AuthenticationProvider';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contactus from './pages/contactus';

import { UserProvider, useUser } from './pages/UserContext';
import RequestGuards from './pages/requestGuards';




setupIonicReact();

const TabBar: React.FC = () => {
  const { token } = useUser(); 

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Home" href="/home">
        <IonIcon icon={homeOutline} style={{ color: 'black', fontSize: '24px' }} />
      </IonTabButton>
      {token ? (
        <IonTabButton tab="Users" href="/requestGuards">
          <IonIcon icon={addCircleOutline} style={{ color: 'black', fontSize: '30px' }} />
        </IonTabButton>
      ) : (
        <IonTabButton tab="Services" href="/services">
          <IonIcon icon={briefcaseOutline} style={{ color: 'black', fontSize: '30px' }} />
        </IonTabButton>
      )}
      <IonTabButton tab="Portfolio" href="/Portfolio">
        <IonIcon icon={folderOutline} style={{ color: 'black', fontSize: '30px' }} />
      </IonTabButton>
      <IonTabButton tab="contactus" href="/contactus">
        <IonIcon icon={callOutline} style={{ color: 'black', fontSize: '30px' }} />
      </IonTabButton>
    </IonTabBar>
  );
};

const App: React.FC = () => (
    <UserProvider>
      <IonApp>
        <AuthenticationProvider>
          <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/login">
                <Login />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/services">
                <Services />
              </Route>
              <Route path="/Portfolio">
                <Portfolio />
              </Route>
              <Route path="/contactus">
                <Contactus />
              </Route>
              <Route path="/requestGuards">
                <RequestGuards />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
            <TabBar/>
          </IonTabs>
          </IonReactRouter>
        </AuthenticationProvider>
    
      </IonApp>
    </UserProvider>
    
  
);

export default App;
