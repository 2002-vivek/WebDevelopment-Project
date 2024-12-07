import React, { useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
} from "@ionic/react";
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SubscribePage from "../components/SubscribePage";


const Home: React.FC = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <IonPage>
      
      <IonHeader>
        
        <IonToolbar>
          <Header />
        </IonToolbar>
      </IonHeader>

      <IonContent >
        {/* Main Content */}
        <div className={styles.ref}>
          <section className={styles.main_content}>
            <IonText>
              <h1>
                Delivering Reliable{" "}
                <span className={styles.main_content_span}>
                  Residential, Site, and Event Security
                </span>{" "}
                with On-Demand Flexibility
              </h1>
            </IonText>
          </section>
          {/* Services Section */}
          <section className={styles.services_section}>
            <IonGrid className={styles.flex_container}>
              {/* Flex Item 1 */}
              <IonCol className={styles.flex_item}>
                <img src="/residential-security.svg" alt="Service 1 Logo" />
                <h2>Residential Security</h2>
                <p>
                  Comprehensive residential security solutions designed to
                  safeguard your condo with 24/7 protection and rapid response.
                </p>
                <IonButton
                  href="/services"
                  className={styles.linkattribute}
                  fill="outline"
                >
                  Learn more
                </IonButton>
              </IonCol>

              {/* Flex Item 2 */}
              <IonCol className={styles.flex_item}>
                <img src="/site-security.png" alt="Service 2 Logo" />
                <h2>Site Security</h2>
                <p>
                  Tailored site security solutions offering real-time protection
                  and proactive measures to secure your site around the clock.
                </p>
                <IonButton
                  href="/services"
                  className={styles.linkattribute}
                  fill="outline"
                >
                  Learn more
                </IonButton>
              </IonCol>

              {/* Flex Item 3 */}
              <IonCol className={styles.flex_item}>
                <img src="/event-security.png" alt="Service 3 Logo" />
                <h2>Event Security</h2>
                <p>
                  Expert event security services providing seamless crowd
                  management, threat prevention, and 24/7 on-site protection for
                  a safe experience.
                </p>
                <IonButton
                  href="/services"
                  className={styles.linkattribute}
                  fill="outline"
                >
                  Learn more
                </IonButton>
              </IonCol>
            </IonGrid>
          </section>

        </div>
        

        {/* Who Are We Section */}
        <section className={styles.who_section}>
          <IonGrid className={styles.who_container}>
            <IonRow>
              <IonRow className={styles.who_content}>
                <h2>Who Are We?</h2>
                <p>
                  OnGuard 24/7 delivers top-tier residential, site, and event
                  security with over 5 years of experience. Serving 50+ sites
                  with 1,500+ professionals, we provide on-demand, 24/7
                  protection through our advanced, real-time service platform
                  for maximum transparency.
                </p>
              </IonRow>
              <IonCol className={styles.who_image}>
                <img src="/who-are-we.jpeg" alt="Who Are We Image" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.why_section}>
          <IonGrid className={styles.why_container}>
            <IonRow>
              <IonRow className={styles.why_content}>
                <h2 >Why Choose Us?</h2>
                <p>
                  Choose OnGuard 24/7 for a cutting-edge, on-demand security
                  solution that sets us apart from traditional security
                  providers. Our unique platform allows clients to instantly
                  request, scale, and manage security services 24/7, ensuring
                  unmatched flexibility, efficiency, and real-time
                  accountability.
                </p>
              </IonRow>
              <IonCol className={styles.why_image}>
                <img src="/why-choose-us.jpg" alt="Why Choose Us Image" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Quality and Assurance Section */}
        <section className={styles.quality_section}>
          <IonGrid className={styles.quality_container}>
            <IonRow>
              <IonRow className={styles.quality_content}>
                <h2>
                  <strong>Quality</strong> and <strong>Assurance</strong> in all
                  our services
                </h2>
                <p>
                  We provide unparalleled quality and assurance in all our
                  services, ensuring reliability, professionalism, and customer
                  satisfaction. Our dedicated team delivers top-tier solutions
                  tailored to meet your security and safety needs 24/7.
                </p>
              </IonRow>
              <IonCol className={styles.quality_image}>
                <img src="/quality.jpg" alt="CCTV" />
              </IonCol>
            </IonRow>
          </IonGrid>
        </section>

        {/* Contact Us Section */}
        <section className={styles.contactus_section}>
          <h2>Contact Us</h2>
          <IonGrid className={styles.contactus_container}>
            <IonRow>
              <IonCol className={styles.contact_item}>
                <div className={styles.contact_icon}>
                  <img src="/phone-call.png" alt="Phone Icon" />
                </div>
                <div className={styles.contact_content}>
                  <h3>Call</h3>
                  <p>For Technical support, you can reach us on Toll No.</p>
                  <p className={styles.contact_info}>+1 123-456-7890</p>
                </div>
              </IonCol>

              <IonCol className={styles.contact_item}>
                <div className={styles.contact_icon}>
                  <img src="/mail.png" alt="Email Icon" />
                </div>
                <div className={styles.contact_content}>
                  <h3>Email</h3>
                  <p>For any type of support or query, you can email us at</p>
                  <p className={styles.contact_info}>support@security.com</p>
                </div>
              </IonCol>

              <IonCol className={styles.contact_item}>
                <div className={styles.contact_icon}>
                  <img src="/write_us.png" alt="Write Us Icon" />
                </div>
                <div className={styles.contact_content}>
                  <h3>Write Us</h3>
                  <p>Have queries, doubts, or suggestions? Raise an entry by filling
                  out the form, and we'll be more than happy to help.</p>
                </div>
                <div className={styles.contact_button}>
                  <a href="/contact-us.html" className={styles.contact_link}>Click here</a>
                </div>
              </IonCol>

              <IonCol className={styles.contact_item}>
                <div className={styles.contact_icon}>
                  <img src="/live-chat.png" alt="Live Chat Icon" />
                </div>
                <div className={styles.contact_content}>
                  <h3>Live Chat</h3>
                  <p>Need assistance regarding booking? We'll get you the help you need.</p>
                </div>
                <div className={styles.contact_button}>
                  <a href="/contact-us.html" className={styles.contact_link}>Click here</a>
                </div>
              </IonCol>

            </IonRow>
          </IonGrid>
        </section>
        <SubscribePage />
        <Footer />
      </IonContent>

    </IonPage>
  );
};

export default Home;
