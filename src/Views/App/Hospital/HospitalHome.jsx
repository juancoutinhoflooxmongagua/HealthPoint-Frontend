import HospitalDashboard from "./HospitalDashboard"
import Patients from "./Patients"

export default function HospitalHome(){
    return (
        <main>
            <h1>Bem vindo ao Home do Hospital</h1>

            <HospitalDashboard></HospitalDashboard>
            <Patients></Patients>
        </main>
    )
}