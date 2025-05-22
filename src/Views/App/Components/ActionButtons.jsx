import { useTheme } from "../../../Services/Context/themeContext";

const ActionButtons = () => {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (theme) {
      case "dark":
        return "#0dcaf0";
      case "frutiger":
        return "#ff6f00";
      default:
        return "#0d6efd"; 
    }
  };

  const getTextColor = () => {
    return "#fff"; 
  };

  return (
    <>
      <button
        className="position-fixed bottom-0 start-0 m-3 rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#25d366", 
          color: "white",
          border: "none",
        }}
        onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
      >
        <i className="bi bi-whatsapp" style={{ fontSize: "24px" }}></i>
      </button>

      <button
        className="position-fixed bottom-0 end-0 m-3 rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: getBackgroundColor(),
          color: getTextColor(),
          border: "none",
          fontSize: "28px",
          transition: "transform 0.3s",
        }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </>
  );
};

export default ActionButtons;
