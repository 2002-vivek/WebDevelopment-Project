import React from 'react';
import { IonGrid, IonRow, IonCol, IonIcon, IonInput, IonButton } from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import styles from '../../styles/requestGuards.module.css';

interface CartItemProps {
  title: string;
  price: number;
  count: number;
  setCount: (value: number) => void;
  imageSrc: string;
}

const CartItem: React.FC<CartItemProps> = ({ title, price, count, setCount, imageSrc }) => {
  return (
    <div className={styles.cart_item}>
        <IonRow className={styles.product}>
            <IonCol className={styles.product_image}>
                <img
                src={imageSrc}
                alt={title}
                />
            </IonCol>
            <IonCol className={styles.product_info}><p>{title}</p></IonCol>
        </IonRow>
                
        
        <IonCol className={styles.quantity_selector}>
            <button className="btn btn-outline-danger decrement"  onClick={() => setCount(Math.max(0, count - 1))}>
                -
            </button>
            <IonInput
                type="text"
                value={count}
                onIonChange={(e) => setCount(Number(e.detail.value!))}
                style={{ width: '50px', textAlign: 'center', color: "#000", fontSize: "large" }}
            />
            <button className="btn btn-outline-success increment" onClick={() => setCount(count + 1)}>
                +
            </button>
        </IonCol>
            
            <IonCol className={styles.total} >${(count * price).toFixed(2)}</IonCol>
        
            
        
    </div>
    
  );
};

export default CartItem;
