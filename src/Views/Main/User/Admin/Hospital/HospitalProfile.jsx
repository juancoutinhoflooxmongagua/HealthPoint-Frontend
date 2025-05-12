import { useContext } from "react";
import { HospitalAuthContext } from "../../../../../Context/hospitalContext";

export default function HospitalProfile() {
  const { hospital } = useContext(HospitalAuthContext);

  if (!hospital) return <div>Carregando...</div>;

  return (
    <div className="hospital-profile">
      <h1>{hospital.hospital_name}</h1>
      <p><strong>ID:</strong> {hospital.hospital_id}</p>
      <p><strong>Endereço:</strong> {hospital.hospital_address}</p>
      <p><strong>Telefone:</strong> {hospital.hospital_phone}</p>
    </div>
  );
}
