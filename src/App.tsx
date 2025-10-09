import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import HospitalLayout from "./components/HospitalLayout";
import PatientList from "./pages/PatientList";
import PatientRegistration from "./pages/PatientRegistration";
import PatientProfile from "./pages/PatientProfile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected routes with layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Doctor", "Nurse"]}>
                <HospitalLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Patient Management routes */}
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/register" element={<PatientRegistration />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            <Route
              path="patients/search"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Patient Search</h1>
                  <p>Patient search coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="staff"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">All Staff</h1>
                  <p>Staff management coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="staff/doctors"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Doctors</h1>
                  <p>Doctor management coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="staff/nurses"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Nurses</h1>
                  <p>Nurse management coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="appointments"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Appointments</h1>
                  <p>Appointment management coming in Phase 3</p>
                </div>
              }
            />
            <Route
              path="laboratory"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Laboratory</h1>
                  <p>Laboratory management coming in Phase 5</p>
                </div>
              }
            />
            <Route
              path="pharmacy"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Pharmacy</h1>
                  <p>Pharmacy management coming in Phase 6</p>
                </div>
              }
            />
            <Route
              path="billing"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Billing</h1>
                  <p>Billing system coming in Phase 7</p>
                </div>
              }
            />

            {/* Doctor routes */}
            <Route
              path="doctor/patients"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">My Patients</h1>
                  <p>Doctor patient management coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="doctor/appointments"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">My Appointments</h1>
                  <p>Doctor appointments coming in Phase 3</p>
                </div>
              }
            />
            <Route
              path="doctor/encounters"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Clinical Encounters</h1>
                  <p>Clinical encounters coming in Phase 4</p>
                </div>
              }
            />
            <Route
              path="doctor/prescriptions"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Prescriptions</h1>
                  <p>Prescription management coming in Phase 6</p>
                </div>
              }
            />
            <Route
              path="doctor/lab-orders"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Lab Orders</h1>
                  <p>Lab orders coming in Phase 5</p>
                </div>
              }
            />
            <Route
              path="doctor/imaging"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Imaging Orders</h1>
                  <p>Imaging orders coming in Phase 5</p>
                </div>
              }
            />

            {/* Nurse routes */}
            <Route
              path="nurse/patients"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">My Patients</h1>
                  <p>Nurse patient management coming in Phase 2</p>
                </div>
              }
            />
            <Route
              path="nurse/triage"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Triage</h1>
                  <p>Triage system coming in Phase 4</p>
                </div>
              }
            />
            <Route
              path="nurse/vitals"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Vital Signs</h1>
                  <p>Vital signs capture coming in Phase 4</p>
                </div>
              }
            />
            <Route
              path="nurse/medications"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">
                    Medication Administration
                  </h1>
                  <p>Medication administration coming in Phase 6</p>
                </div>
              }
            />
            <Route
              path="nurse/monitoring"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Patient Monitoring</h1>
                  <p>Patient monitoring coming in Phase 4</p>
                </div>
              }
            />

            {/* Common routes */}
            <Route
              path="reports"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p>Reporting system coming in Phase 8</p>
                </div>
              }
            />
            <Route
              path="settings"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p>Settings page coming soon</p>
                </div>
              }
            />
            <Route
              path="support"
              element={
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Help & Support</h1>
                  <p>Support system coming soon</p>
                </div>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
