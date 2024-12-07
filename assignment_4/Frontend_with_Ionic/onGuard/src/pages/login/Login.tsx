import React from 'react';
import styles from '../../styles/login.module.css';
import { useHistory } from 'react-router';
import LoginForm from '../../components/LoginForm';
import { login, signup } from '../utilites/Authentication';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useUser } from '../UserContext';

const Login: React.FC = () => {
    console.log("Rendering");
    const history = useHistory();
    const { setToken, setUserId, setRoles } = useUser();


  
    const handleLogin = async (email: string, password: string) => {
      try {
        await login(email, password, setToken, setUserId, setRoles);
        history.push('/'); 
      } catch (error: any) {
        alert(error.message || 'An error occurred during login.');
      }
    };

    const handleSignup = async (name: string, email: string, password: string) => {
        try {
          const message = await signup(name, email, password);
          alert(message);
          history.push('/login'); 
        } catch (error: any) {
          alert(error.message || 'An error occurred during signup.');
        }
    };
  
    return (
      <IonPage>
        <IonContent>
            <Header />
            <div className={styles.form_modal}>
              <LoginForm onLogin={handleLogin} onSignup={handleSignup}/>
            </div>
            <Footer />
        </IonContent>
      </IonPage>
        
    );
  };
  
  export default Login;