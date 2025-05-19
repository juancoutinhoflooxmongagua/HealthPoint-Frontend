import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Services/Context/authContext";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const isHospital = !!hospital;
  const id = isHospital ? hospital.hospital_id : user?.user_id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const endpoint = isHospital
          ? `/api/notifications/hospitals/${id}`
          : `/api/notifications/users/${id}`;

        const response = await fetch(endpoint);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNotifications();
  }, [id, isHospital]);

  const markAsRead = async (notificationId) => {
    try {
      const endpoint = isHospital
        ? `/api/notifications/hospitals/${notificationId}/read`
        : `/api/notifications/users/${notificationId}/read`;

      await fetch(endpoint, { method: "PATCH" });

      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notificationId ? { ...n, is_read: 1 } : n
        )
      );
    } catch (error) {
      console.error("Erro ao marcar como lida:", error);
    }
  };

  if (loading) return <p>Carregando notificações...</p>;

  return (
    <div>
      <h2>Notificações</h2>
      {notifications.length === 0 ? (
        <p>Sem notificações por enquanto.</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.notification_id} style={{ marginBottom: "20px" }}>
              <h4>{notif.title}</h4>
              <p>{notif.message}</p>
              <small>{new Date(notif.created_at).toLocaleString()}</small>
              <br />
              {!notif.is_read && (
                <button onClick={() => markAsRead(notif.notification_id)}>
                  Marcar como lida
                </button>
              )}
              {notif.is_read && <span style={{ color: "green" }}>✔ Lida</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
