import React, { useState, useEffect } from 'react';
import { IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardContent, IonInput, IonLabel, IonText } from '@ionic/react';
import CartItem from './CartItem';
import styles from '../../styles/requestGuards.module.css';

interface CartFormProps {
  token: string;
  userId: string;
  onSubmit: (data: any) => void;
  editData?: any;
}

const CartForm: React.FC<CartFormProps> = ({ userId, onSubmit, editData }) => {
  const [quantities, setQuantities] = useState({
    event: 0,
    residential: 0,
    site: 0,
  });
  const [totalCost, setTotalCost] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (editData) {
      setQuantities({
        event: editData.services.find((s: any) => s.service === "Event Security Guard")?.count_of_guards || 0,
        residential: editData.services.find((s: any) => s.service === "Residential Security Guard")?.count_of_guards || 0,
        site: editData.services.find((s: any) => s.service === "Site Security Guard")?.count_of_guards || 0,
      });
    }
  }, [editData]);

  useEffect(() => {
    const total =
      quantities.event * 10 +
      quantities.residential * 10 +
      quantities.site * 10;
    setTotalCost(total);
  }, [quantities]);

  const handleSubmit = async () => {
    const payload = {
      services: [
        {
          service: "Event Security Guard",
          count_of_guards: quantities.event,
          cost: quantities.event * 10,
        },
        {
          service: "Residential Security Guard",
          count_of_guards: quantities.residential,
          cost: quantities.residential * 10,
        },
        {
          service: "Site Security Guard",
          count_of_guards: quantities.site,
          cost: quantities.site * 10,
        },
      ],
      total_cost: totalCost,
      userId: userId,
    };

    onSubmit(payload);
    setMessage(editData ? "Request updated successfully!" : "Request submitted successfully!");
    clearForm();
  };

  const clearForm = () => {
    setQuantities({ event: 0, residential: 0, site: 0 });
  };

  return (
    <IonCard style={{ marginTop: '100px' }}>
      <IonCardContent >
        <IonGrid>
          
          <CartItem
            title="Event Security Guard"
            price={10}
            count={quantities.event}
            setCount={(value: number) => setQuantities((prev) => ({ ...prev, event: value }))}
            imageSrc="/event-security.jpg"
          />
          <CartItem
            title="Residential Security Guard"
            price={10}
            count={quantities.residential}
            setCount={(value: number) => setQuantities((prev) => ({ ...prev, residential: value }))}
            imageSrc="/Residential-Security-Services.jpg"
          />
          <CartItem
            title="Site Security Guard"
            price={10}
            count={quantities.site}
            setCount={(value: number) => setQuantities((prev) => ({ ...prev, site: value }))}
            imageSrc="/site-security.jpg"
          />
          <IonRow>
            <IonCol className={styles.subtotal}>
              <h4>Total Cost:</h4>
            </IonCol>
            <IonCol className={styles.subtotal}>
              <h4>${totalCost.toFixed(2)}</h4>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleSubmit} color="warning">
                {editData ? "Update Request" : "Submit Request"}
              </IonButton>
            </IonCol>
          </IonRow>
          {message && (
            <IonRow>
              <IonCol>
                <IonText color="success">{message}</IonText>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default CartForm;
