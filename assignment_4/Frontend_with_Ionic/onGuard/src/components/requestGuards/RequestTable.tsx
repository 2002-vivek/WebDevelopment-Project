import React from "react";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import { colorFill, createOutline, trashOutline } from "ionicons/icons";

interface RequestTableProps {
  requests: any[];
  onDelete: (id: string) => void;
  onSelectForEdit: (data: any) => void;
}

const RequestTable: React.FC<RequestTableProps> = ({
  requests,
  onDelete,
  onSelectForEdit,
}) => {
  return (
    <IonList>
      {/* Header Row */}
      <IonGrid >
        <IonRow style={{textAlign: "center"}}>
          <IonCol  style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>No</strong></IonCol>
          <IonCol  style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>Event Guards</strong></IonCol>
          <IonCol  style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>Residential Guards</strong></IonCol>
          <IonCol style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>Site Guards</strong></IonCol>
          <IonCol  style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>Total Cost ($)</strong></IonCol>
          <IonCol  style={{fontWeight: "bold", textAlign: "center",fontSize: "0.7rem"}}><strong>Actions</strong></IonCol>
        </IonRow>
      </IonGrid>

      {/* Data Rows */}
      {requests.map((request, index) => {
        const eventGuards =
          request.services.find(
            (s: any) => s.service === "Event Security Guard"
          )?.count_of_guards || 0;
        const residentialGuards =
          request.services.find(
            (s: any) => s.service === "Residential Security Guard"
          )?.count_of_guards || 0;
        const siteGuards =
          request.services.find(
            (s: any) => s.service === "Site Security Guard"
          )?.count_of_guards || 0;

        return (
          <IonGrid key={request._id}>
            <IonRow>
              <IonCol style={{textAlign: "center"}}>{index + 1}</IonCol>
              <IonCol>{eventGuards}</IonCol>
              <IonCol >{residentialGuards}</IonCol>
              <IonCol >{siteGuards}</IonCol>
              <IonCol >${request.total_cost.toFixed(2)}</IonCol>
              <IonRow >
                  <IonIcon size="small" icon={createOutline} color="primary" onClick={() => onSelectForEdit(request)} />
                  <IonIcon size="small" icon={trashOutline} color="danger" onClick={() => onDelete(request._id)}/>
              </IonRow>
            </IonRow>
          </IonGrid>
        );
      })}
    </IonList>
  );
};

export default RequestTable;
