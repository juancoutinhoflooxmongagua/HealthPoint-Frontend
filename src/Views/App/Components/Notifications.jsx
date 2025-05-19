import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../Services/Context/authContext";
import { HospitalAuthContext } from "../../../Services/Context/hospitalContext";

export default function NotificationsPage() {
  const { user } = useContext(AuthContext);
  const { hospital } = useContext(HospitalAuthContext);

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isHospital = !!hospital;
  const id = isHospital ? hospital?.hospital_id : user?.user_id;

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!id) return;

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

    fetchNotifications();
  }, [id, isHospital]);

  if (loading) return <p>Carregando notificações...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Notificações</h2>
      {notifications.length === 0 ? (
        <p>Sem notificações por enquanto.</p>
      ) : (
        <div>
          {notifications.map((notif) => (
            <div key={notif.notification_id}>
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
              <small>{new Date(notif.created_at).toLocaleString()}</small>
              <div>{notif.is_read ? "✔ Lida" : "📩 Nova"}</div>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
