import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { HospitalAuthContext } from '../../../../../Context/hospitalContext';

export default function HospitalProfile() {
  const { hospital } = useContext(HospitalAuthContext); // Usando o contexto para pegar o hospital autenticado
  const [hospitalData, setHospitalData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hospital?.hospital_id) {
      return; // Se não tiver hospital_id no contexto, não faz requisição
    }

    const fetchHospitalProfile = async () => {
      try {
        const token = localStorage.getItem("hospitalToken"); // Pegando o token de forma segura

        // Verifique se o token está disponível antes de fazer a requisição
        if (!token) {
          setError('Token de autenticação não encontrado.');
          return;
        }

        const response = await axios.get(`https://healthpoint-backend-production.up.railway.app/profile/${hospital.hospital_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setHospitalData(response.data); // Atualizando os dados do hospital
      } catch (err) {
        setError('Erro ao carregar o perfil do hospital');
        console.error("Erro ao fazer a requisição:", err); // Exibe o erro completo no console para depuração
      }
    };

    fetchHospitalProfile();
  }, [hospital]); // A dependência do hospital vai disparar novamente se o hospital mudar

  // Exibindo erro
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  // Exibindo a tela de carregamento
  if (!hospitalData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="hospital-profile">
      <h1>{hospitalData.hospital_name}</h1>
      <p><strong>ID:</strong> {hospitalData.hospital_id}</p>
      <p><strong>Endereço:</strong> {hospitalData.hospital_address}</p>
      <p><strong>Telefone:</strong> {hospitalData.hospital_phone}</p>
    </div>
  );
}
