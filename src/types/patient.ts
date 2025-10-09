export interface Patient {
  patient_id: string;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  national_id?: string;
  phone?: string;
  email?: string;
  address?: string;
  county?: string;
  sub_county?: string;
  ward?: string;
  village?: string;
  blood_group?: string;
  marital_status?: string;
  occupation?: string;
  insurance_provider?: string;
  insurance_number?: string;
  insurance_status?: "Active" | "Inactive" | "Pending";
  next_of_kin_name?: string;
  next_of_kin_relationship?: string;
  next_of_kin_phone?: string;
  next_of_kin_address?: string;
  allergies?: string;
  chronic_conditions?: string;
  photo_url?: string;
  status: "Active" | "Inactive" | "Deceased";
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  full_name?: string;
  age?: number;
  Identifiers?: PatientIdentifier[];
  EmergencyContacts?: EmergencyContact[];
}

export interface PatientIdentifier {
  identifier_id: string;
  patient_id: string;
  identifier_type: string;
  identifier_value: string;
  is_primary: boolean;
  issuing_authority?: string;
  issue_date?: string;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
}

export interface EmergencyContact {
  contact_id: string;
  patient_id: string;
  name: string;
  relationship: string;
  phone: string;
  alternate_phone?: string;
  email?: string;
  address?: string;
  is_primary: boolean;
  can_make_decisions: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientFormData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other";
  national_id?: string;
  phone?: string;
  email?: string;
  address?: string;
  county?: string;
  sub_county?: string;
  ward?: string;
  village?: string;
  blood_group?: string;
  marital_status?: string;
  occupation?: string;
  insurance_provider?: string;
  insurance_number?: string;
  insurance_status?: "Active" | "Inactive" | "Pending";
  next_of_kin_name?: string;
  next_of_kin_relationship?: string;
  next_of_kin_phone?: string;
  next_of_kin_address?: string;
  allergies?: string;
  chronic_conditions?: string;
}

// Alias for CreatePatientPayload
export type CreatePatientPayload = PatientFormData;

// Alias for UpdatePatientPayload
export type UpdatePatientPayload = Partial<PatientFormData>;

export interface PatientSearchParams {
  query?: string;
  national_id?: string;
  phone?: string;
  mrn?: string;
  status?: string;
  gender?: string;
  age_min?: number;
  age_max?: number;
  page?: number;
  limit?: number;
}

// Alias for PatientSearchQuery
export type PatientSearchQuery = PatientSearchParams;

export interface PatientSearchResult {
  patients: Patient[];
  total: number;
  page: number;
  pages: number;
}

export interface PatientStatistics {
  total: number;
  active: number;
  inactive: number;
  deceased: number;
  gender: {
    male: number;
    female: number;
    other: number;
  };
  registered_today: number;
}

export const GENDERS = ["Male", "Female", "Other"] as const;

export const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
] as const;

export const MARITAL_STATUSES = [
  "Single",
  "Married",
  "Divorced",
  "Widowed",
  "Separated",
] as const;

// Alias for backward compatibility
export const MARITAL_STATUS_OPTIONS = MARITAL_STATUSES;

export const RELATIONSHIPS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Relative",
  "Friend",
  "Guardian",
  "Other",
] as const;

// Alias for backward compatibility
export const RELATIONSHIP_OPTIONS = RELATIONSHIPS;

export const IDENTIFIER_TYPES = [
  "National ID",
  "Passport",
  "Birth Certificate",
  "NHIF",
  "Driving License",
  "Military ID",
  "Other",
] as const;

export const PATIENT_STATUSES = ["Active", "Inactive", "Deceased"] as const;

export const KENYAN_COUNTIES = [
  "Baringo",
  "Bomet",
  "Bungoma",
  "Busia",
  "Elgeyo-Marakwet",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kajiado",
  "Kakamega",
  "Kericho",
  "Kiambu",
  "Kilifi",
  "Kirinyaga",
  "Kisii",
  "Kisumu",
  "Kitui",
  "Kwale",
  "Laikipia",
  "Lamu",
  "Machakos",
  "Makueni",
  "Mandera",
  "Marsabit",
  "Meru",
  "Migori",
  "Mombasa",
  "Murang'a",
  "Nairobi",
  "Nakuru",
  "Nandi",
  "Narok",
  "Nyamira",
  "Nyandarua",
  "Nyeri",
  "Samburu",
  "Siaya",
  "Taita-Taveta",
  "Tana River",
  "Tharaka-Nithi",
  "Trans Nzoia",
  "Turkana",
  "Uasin Gishu",
  "Vihiga",
  "Wajir",
  "West Pokot",
];
