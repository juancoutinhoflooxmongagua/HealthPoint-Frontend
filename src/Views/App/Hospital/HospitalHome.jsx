import HospitalDashboard from "./HospitalDashboard"
import Patients from "./Patient/Patients"

export default function HospitalHome(){
    return (
        <main>
            <HospitalDashboard></HospitalDashboard>
            <Patients></Patients>
        </main>
    )
}