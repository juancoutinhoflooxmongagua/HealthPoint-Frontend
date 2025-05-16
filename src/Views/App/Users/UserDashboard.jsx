export default function UserDashboard({ user }) {
  return (
    <>
      <h3 style={{ marginTop: "0.5rem", fontFamily: "Arial, sans-serif" }}>Painel De Usuário</h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {[{
          icon: "📋",
          title: "Ver Vagas",
          description: "Confira as vagas disponíveis para voluntários em hospitais.",
          link: "/Jobs",
          linkText: "Ver vagas",
        }, {
          icon: "🏥",
          title: "Se tornar um hospital",
          description: "Registre seu hospital na plataforma e receba voluntários.",
          link: "/DashboardAdmin",
          linkText: "Quero ser hospital",
        }].map(({ icon, title, description, link, linkText }, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: 12,
              boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              minHeight: "200px",
              justifyContent: "space-between",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "1rem" }}>
              {icon}
            </div>
            <h5 style={{ fontWeight: "600", textAlign: "center", marginBottom: "0.75rem" }}>
              {title}
            </h5>
            <p style={{ color: "#dbe9ff", textAlign: "center", marginBottom: "1.25rem" }}>
              {description}
            </p>
            <div style={{ textAlign: "center" }}>
              <a
                href={link}
                style={{
                  display: "inline-block",
                  padding: "0.5rem 2rem",
                  borderRadius: 50,
                  border: "2px solid white",
                  color: "white",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "background-color 0.3s, color 0.3s",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#007bff";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "white";
                }}
              >
                {linkText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
