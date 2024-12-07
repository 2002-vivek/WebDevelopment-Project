import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { useUser } from "./UserContext";
import styles from '../styles/requestGuards.module.css';
import Header from "../components/Header";
import RequestTable from "../components/requestGuards/RequestTable";
import 'bootstrap/dist/css/bootstrap.min.css';
import CartForm from "../components/requestGuards/CartForm";


const BASE_URL = "http://localhost:3000";
const apiUrl = `${BASE_URL}/requestGuards`;

const RequestGuards: React.FC = () => {
  const { token, userId, roles } = useUser(); 
  const [requests, setRequests] = useState<any[]>([]);
  const [editData, setEditData] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
      return;
    }

    const fetchRequests = async () => {
      const isAdmin = roles?.includes("admin");
      const url = isAdmin ? `${apiUrl}/admin` : `${apiUrl}/user`;

      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch requests");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [token, roles, history]);

  const handleEdit = async (id: string, data: any) => {
    const url = `${apiUrl}/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId }),
      });
      if (!response.ok) throw new Error("Failed to update request");
      const updatedRequests = requests.map((request) =>
        request._id === id ? { ...request, ...data } : request
      );
      setRequests(updatedRequests);
      setEditData(null); 
      console.log("Request updated successfully");
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const url = `${apiUrl}/${id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete request");
      const updatedRequests = requests.filter((request) => request._id !== id);
      setRequests(updatedRequests);
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const handleSubmit = async (data: any) => {
    if (editData) {
      handleEdit(editData._id, data);
      setEditData(null);
    } else {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data, userId }),
        });
        const responseData = await response.json();
        if (!response.ok) throw new Error("Failed to submit request");
        setRequests((prevRequests) => [...prevRequests, responseData.data]);
        console.log("Request submitted successfully");
      } catch (error) {
        console.error("Error submitting request:", error);
      }
    }
  };

  const handleSelectForEdit = (data: any) => {
    setEditData(data);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Header/>
        </IonToolbar>
        
      </IonHeader>
      <IonContent>
        <IonCard className="container mt-4">
          <IonCardHeader>
            <IonCardSubtitle className={styles.h2}>Manage <span className="text-primary">Guard Requests</span></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <RequestTable
              requests={requests}
              onDelete={handleDelete}
              onSelectForEdit={handleSelectForEdit}
            />
            <CartForm
              onSubmit={handleSubmit}
              editData={editData}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Link
              href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
              rel="stylesheet" to={""}      />
    </IonPage>
  );
};

export default RequestGuards;
