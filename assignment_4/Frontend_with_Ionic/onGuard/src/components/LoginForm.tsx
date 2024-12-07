"use client";

import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';
interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
    onSignup: (name: string, email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLogin) {
            
          if(!email.includes("@") || !email.includes(".")){
            setToastMessage('Please enter a valid email address.');
            setShowToast(true);
            return;
          }
          if (!email || !password) {
            setToastMessage('Please fill out all fields.');
            setShowToast(true);
            return;
          }
          onLogin(email, password);
        } else {
          if (!name || !email || !password) {
            setToastMessage('Please fill out all fields.');
            setShowToast(true);
            return;
          }
          onSignup(name, email, password);
        }

      };

      const loginToggleStyle = {
        backgroundColor: isLogin ? "#222" : "#fff",
        color: isLogin ? "#fff" : "#222",
        
        };
        const login_form_style={
            display: isLogin ? "block" : "none",
        };
        const signup_form_style={
            display: !isLogin ? "block" : "none",
        };
        const signupToggleStyle = {
            backgroundColor: !isLogin ? "#222" : "#fff",
            color: !isLogin ? "#fff" : "#222",
            // display: !isLogin ? "block" : "none",
        };

  return(
    <div>
        <div className={styles.form_toggle}>
            <IonButton 
            fill='outline'
            className={styles.ionbutton}
            style={loginToggleStyle}
            id={styles.login_toggle} 
             
            onClick={() => setIsLogin(true)} 
            >
                log in
            </IonButton>
            <IonButton
            fill='outline'
            className={styles.ionbutton} 
            style={signupToggleStyle}
            
            onClick={() => setIsLogin(false)} 
            >
                sign up
            </IonButton>
        </div>

        <div style={login_form_style} className={styles.login_form} onSubmit={handleSubmit}>
            <form>

                
                    
                    <IonInput
                    className={styles.ioninput}
                    type="email"
                    name="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    placeholder="Enter your email"
                    ></IonInput>
                
                
                    
                
                    


                
                    
                    <IonInput
                    className={styles.ioninput}
                    type="password"
                    name="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    placeholder="Create password"
                    ></IonInput>
                
                <IonButton   fill='outline'  type="submit" className={styles.login_btn}>login</IonButton>
                <p><a href="javascript:void(0)">Forgotten account</a></p>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    color="danger"
                />
                <hr/>
    
            </form>
        </div>
        <div style={signup_form_style} className={styles.signup_form} onSubmit={handleSubmit}>
            <form>
                <IonInput
                    className={styles.ioninput}
                    type="email"
                    name="email"
                    value={email}
                    onIonChange={(e) => setEmail(e.detail.value!)}
                    placeholder="Enter your email"
                    ></IonInput>

                
                <IonInput
                    className={styles.ioninput}
                    type="text"
                    name="name"
                    value={name}
                    onIonChange={(e) => setName(e.detail.value!)}
                    placeholder="Choose username"
                ></IonInput>
                

                <IonInput
                    className={styles.ioninput}
                    type="password"
                    name="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    placeholder="Create password"
                ></IonInput>

                <IonButton fill='outline' type="submit" className="btn signup">create account</IonButton>
                <p>Clicking <strong>create account</strong> means that you are agree to our <a href="javascript:void(0)">terms of services</a>.</p>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                    color="danger"
                />
                <hr/>
            
            </form>
        </div>
    </div>
  );

  
}
export default LoginForm;