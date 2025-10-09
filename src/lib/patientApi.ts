import api from "./api";
import {
  Patient,
  PatientFormData,
  PatientSearchParams,
  PatientSearchResult,
  PatientStatistics,
  EmergencyContact,
  PatientIdentifier,
} from "../types/patient";

export const patientApi = {
  /**
   * Create a new patient
   */
  createPatient: async (data: PatientFormData): Promise<Patient> => {
    const response = await api.post("/patients", data);
    return response.data.data;
  },

  /**
   * Get patient by ID
   */
  getPatientById: async (id: string): Promise<Patient> => {
    const response = await api.get(`/patients/${id}`);
    return response.data.data;
  },

  /**
   * Get patient by MRN
   */
  getPatientByMRN: async (mrn: string): Promise<Patient> => {
    const response = await api.get(`/patients/mrn/${mrn}`);
    return response.data.data;
  },

  /**
   * Get all patients with filters
   */
  getPatients: async (
    params: PatientSearchParams
  ): Promise<PatientSearchResult> => {
    const response = await api.get("/patients", { params });
    return response.data.data;
  },

  /**
   * Search patients (alias for getPatients)
   */
  searchPatients: async (
    params: PatientSearchParams
  ): Promise<PatientSearchResult> => {
    const response = await api.get("/patients", { params });
    return response.data.data;
  },

  /**
   * Update patient
   */
  updatePatient: async (
    id: string,
    data: Partial<PatientFormData>
  ): Promise<Patient> => {
    const response = await api.put(`/patients/${id}`, data);
    return response.data.data;
  },

  /**
   * Deactivate patient
   */
  deactivatePatient: async (id: string): Promise<Patient> => {
    const response = await api.put(`/patients/${id}/deactivate`);
    return response.data.data;
  },

  /**
   * Mark patient as active
   */
  markPatientAsActive: async (id: string): Promise<Patient> => {
    const response = await api.put(`/patients/${id}/active`);
    return response.data.data;
  },

  /**
   * Mark patient as deceased
   */
  markAsDeceased: async (id: string): Promise<Patient> => {
    const response = await api.put(`/patients/${id}/deceased`);
    return response.data.data;
  },

  /**
   * Mark patient as deceased (alias)
   */
  markPatientAsDeceased: async (id: string): Promise<Patient> => {
    const response = await api.put(`/patients/${id}/deceased`);
    return response.data.data;
  },

  /**
   * Add patient identifier
   */
  addPatientIdentifier: async (
    patientId: string,
    data: Partial<PatientIdentifier>
  ): Promise<PatientIdentifier> => {
    const response = await api.post(`/patients/${patientId}/identifiers`, data);
    return response.data.data;
  },

  /**
   * Add emergency contact
   */
  addEmergencyContact: async (
    patientId: string,
    data: Partial<EmergencyContact>
  ): Promise<EmergencyContact> => {
    const response = await api.post(
      `/patients/${patientId}/emergency-contacts`,
      data
    );
    return response.data.data;
  },

  /**
   * Update emergency contact
   */
  updateEmergencyContact: async (
    contactId: string,
    data: Partial<EmergencyContact>
  ): Promise<EmergencyContact> => {
    const response = await api.put(
      `/patients/emergency-contacts/${contactId}`,
      data
    );
    return response.data.data;
  },

  /**
   * Delete emergency contact
   */
  deleteEmergencyContact: async (contactId: string): Promise<void> => {
    await api.delete(`/patients/emergency-contacts/${contactId}`);
  },

  /**
   * Get patient statistics
   */
  getStatistics: async (): Promise<PatientStatistics> => {
    const response = await api.get("/patients/statistics");
    return response.data.data;
  },

  /**
   * Get patient statistics (alias)
   */
  getPatientStatistics: async (): Promise<PatientStatistics> => {
    const response = await api.get("/patients/statistics");
    return response.data.data;
  },
};
