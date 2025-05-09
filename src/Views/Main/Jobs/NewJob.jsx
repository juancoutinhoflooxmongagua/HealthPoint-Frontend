import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/authContext";

export default function NewJob() {
    return (
        <div>
            Cadastrar Novo Trabalho 

            <form action="https://healthpoint-backend-production.up.railway.app/job" method="POST">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="job_title" id="job_title" placeholder="Título do Trabalho" />
                    <label htmlFor="job_title">Título do Trabalho</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="job_description" id="job_description" placeholder="Descrição do Trabalho" />
                    <label htmlFor="job_description">Descrição do Trabalho</label>
                </div>

                <button type="submit" className="btn btn-primary">Cadastrar</button>    
            </form>
        </div>
    )
}