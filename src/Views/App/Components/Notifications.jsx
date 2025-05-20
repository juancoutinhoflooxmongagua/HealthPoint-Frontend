import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Services/Context/authContext";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isHospital = !!hospital;
  const id = isHospital ? hospital?.hospital_id : user?.user_id;

  useEffect(() => {
    if (id) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [id, isHospital]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = isHospital
        ? `https://healthpoint-backend-production.up.railway.app/notifications/hospitals/${id}`
        : `https://healthpoint-backend-production.up.railway.app/notifications/users/${id}`;

      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError("Não foi possível carregar as notificações.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const endpoint = isHospital
        ? `https://healthpoint-backend-production.up.railway.app/notifications/hospitals/${id}/unread/count`
        : `https://healthpoint-backend-production.up.railway.app/notifications/users/${id}/unread/count`;

      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar contador");

      const data = await response.json();
      setUnreadCount(data.unreadCount);
    } catch (err) {
      console.error("Erro ao buscar contador:", err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const endpoint = isHospital
        ? `https://healthpoint-backend-production.up.railway.app/notifications/hospitals/${notificationId}/read`
        : `https://healthpoint-backend-production.up.railway.app/notifications/users/${notificationId}/read`;

      const token = localStorage.getItem("token");

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao marcar como lida");

      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error("Erro ao marcar como lida:", err);
    }
  };

  if (loading) return <p>Carregando notificações...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>
        Notificações{" "}
        {unreadCount > 0 && (
          <span>({unreadCount} nova{unreadCount > 1 ? "s" : ""})</span>
        )}
      </h2>

      {notifications.length === 0 ? (
        <p>Sem notificações por enquanto.</p>
      ) : (
        <div>
          {notifications.map((notif) => (
            <div key={notif.notification_id} style={{ marginBottom: "1rem" }}>
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
              <small>{new Date(notif.created_at).toLocaleString()}</small>
              <div>
                {notif.is_read ? (
                  <span style={{ color: "green" }}>✔ Lida</span>
                ) : (
                  <button onClick={() => markAsRead(notif.notification_id)}>
                    📩 Marcar como lida
                  </button>
                )}
              </div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
