import React, { useState } from "react";

export default function Application() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospitalName: "",
    hospitalLicense: "",
    documents: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      documents: [...e.target.files]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <main className="container mt-5">
      <h1 className="text-center text-primary mb-4">Requerimento para se Tornar um Hospital</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome do Responsável:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hospitalName" className="form-label">Nome do Hospital:</label>
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="hospitalLicense" className="form-label">Número de Licença do Hospital:</label>
          <input
            type="text"
            id="hospitalLicense"
            name="hospitalLicense"
            value={formData.hospitalLicense}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="documents" className="form-label">Carregar Documentos:</label>
          <input
            type="file"
            id="documents"
            name="documents"
            multiple
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Enviar Requerimento</button>
        </div>
      </form>
    </main>
  );
}
