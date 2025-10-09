import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TbArrowLeft,
  TbEdit,
  TbUser,
  TbPhone,
  TbMail,
  TbMapPin,
  TbHeartbeat,
  TbShieldCheck,
  TbAlertCircle,
  TbUserCheck,
  TbCalendar,
  TbId,
  TbGenderMale,
  TbGenderFemale,
} from "react-icons/tb";
import { patientApi } from "../lib/patientApi";
import { Patient } from "../types/patient";
import { PatientProfileSkeleton } from "../components/LoadingSkeletons";
import NotificationModal from "../components/NotificationModal";
import { useNotification } from "../hooks/useNotification";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    notification,
    closeNotification,
    success,
    error: showError,
    confirm,
    deleteConfirm,
  } = useNotification();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "medical" | "contacts" | "identifiers"
  >("overview");

  useEffect(() => {
    if (id) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getPatientById(id!);
      setPatient(response);
    } catch (err: any) {
      showError(
        "Failed to Load Patient",
        err.response?.data?.message ||
          "An error occurred while loading patient data"
      );
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Active:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      Inactive:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
      Deceased: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    };
    return styles[status as keyof typeof styles] || styles.Active;
  };

  const handleDeactivate = () => {
    deleteConfirm(
      "Deactivate Patient",
      "Are you sure you want to deactivate this patient? This action can be reversed.",
      async () => {
        try {
          await patientApi.deactivatePatient(id!);
          success(
            "Patient Deactivated",
            "Patient has been deactivated successfully"
          );
          fetchPatient();
        } catch (err: any) {
          showError(
            "Deactivation Failed",
            err.response?.data?.message || "Failed to deactivate patient"
          );
        }
      },
      "Deactivate"
    );
  };

  const handleMarkActive = () => {
    confirm(
      "Mark Patient as Active",
      "Are you sure you want to mark this patient as active? This action can be reversed.",
      async () => {
        try {
          await patientApi.markPatientAsActive(id!);
          success(
            "Patient Marked as Active",
            "Patient status has been updated"
          );
          fetchPatient();
        } catch (err: any) {
          showError(
            "Update Failed",
            err.response?.data?.message || "Failed to update patient status"
          );
        }
      },
      "Mark as Active"
    );
  };

  const handleMarkDeceased = () => {
    deleteConfirm(
      "Mark Patient as Deceased",
      "Are you sure you want to mark this patient as deceased? This action is permanent.",
      async () => {
        try {
          await patientApi.markPatientAsDeceased(id!);
          success(
            "Patient Marked as Deceased",
            "Patient status has been updated"
          );
          fetchPatient();
        } catch (err: any) {
          showError(
            "Update Failed",
            err.response?.data?.message || "Failed to update patient status"
          );
        }
      },
      "Mark as Deceased"
    );
  };

  if (loading) {
    return <PatientProfileSkeleton />;
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <TbUser size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Patient Not Found
        </h2>
        <button
          onClick={() => navigate("/patients")}
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          Back to Patients List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-start justify-between">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate("/patients")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            <TbArrowLeft size={24} />
          </button>

          <div className="flex gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/30">
              {patient.first_name[0]}
              {patient.last_name[0]}
            </div>

            {/* Patient Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {patient.first_name} {patient.last_name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-900/40 text-xs font-mono text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  MRN: {patient.mrn}
                </span>
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-5 mt-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  {patient.gender === "Male" ? (
                    <TbGenderMale size={18} />
                  ) : (
                    <TbGenderFemale size={18} />
                  )}
                  {patient.gender}
                </div>
                <div className="flex items-center gap-2">
                  <TbCalendar size={18} />
                  {calculateAge(patient.date_of_birth)} years old
                </div>
                {patient.blood_group && (
                  <div className="flex items-center gap-2">
                    <TbHeartbeat size={18} />
                    Blood: {patient.blood_group}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/patients/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <TbEdit size={20} />
            Edit Profile
          </button>
          {patient.status === "Active" && (
            <>
              <button
                onClick={handleDeactivate}
                className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-sm"
              >
                Deactivate
              </button>
              <button
                onClick={handleMarkDeceased}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors shadow-sm"
              >
                Mark Deceased
              </button>
            </>
          )}
          {patient.status === "Inactive" && (
            <button
              onClick={handleMarkActive}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-sm"
            >
              Mark Active
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "overview", label: "Overview", icon: TbUser },
            { key: "medical", label: "Medical Info", icon: TbHeartbeat },
            { key: "contacts", label: "Contacts", icon: TbPhone },
            { key: "identifiers", label: "Identifiers", icon: TbId },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-colors ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white dark:bg-blue-500"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <TabIcon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TbUser size={20} />
                Personal Information
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label="Full Name"
                  value={`${patient.first_name} ${patient.last_name}`}
                />
                <InfoRow
                  label="Date of Birth"
                  value={formatDate(patient.date_of_birth)}
                />
                <InfoRow
                  label="Age"
                  value={`${calculateAge(patient.date_of_birth)} years`}
                />
                <InfoRow label="Gender" value={patient.gender} />
                <InfoRow
                  label="National ID"
                  value={patient.national_id || "Not provided"}
                />
                <InfoRow
                  label="Marital Status"
                  value={patient.marital_status || "Not specified"}
                />
                <InfoRow
                  label="Occupation"
                  value={patient.occupation || "Not specified"}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TbPhone size={20} />
                Contact Information
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label="Phone"
                  value={patient.phone || "Not provided"}
                  icon={<TbPhone size={16} />}
                />
                <InfoRow
                  label="Email"
                  value={patient.email || "Not provided"}
                  icon={<TbMail size={16} />}
                />
                <InfoRow
                  label="Address"
                  value={patient.address || "Not provided"}
                  icon={<TbMapPin size={16} />}
                />
                {patient.county && (
                  <>
                    <InfoRow label="County" value={patient.county} />
                    {patient.sub_county && (
                      <InfoRow label="Sub-County" value={patient.sub_county} />
                    )}
                    {patient.ward && (
                      <InfoRow label="Ward" value={patient.ward} />
                    )}
                    {patient.village && (
                      <InfoRow label="Village" value={patient.village} />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Next of Kin */}
            {patient.next_of_kin_name && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TbUserCheck size={20} />
                  Next of Kin
                </h3>
                <div className="space-y-3">
                  <InfoRow label="Name" value={patient.next_of_kin_name} />
                  <InfoRow
                    label="Relationship"
                    value={patient.next_of_kin_relationship || "Not specified"}
                  />
                  <InfoRow
                    label="Phone"
                    value={patient.next_of_kin_phone || "Not provided"}
                  />
                  <InfoRow
                    label="Address"
                    value={patient.next_of_kin_address || "Not provided"}
                  />
                </div>
              </div>
            )}

            {/* Insurance */}
            {patient.insurance_provider && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TbShieldCheck size={20} />
                  Insurance Information
                </h3>
                <div className="space-y-3">
                  <InfoRow
                    label="Provider"
                    value={patient.insurance_provider}
                  />
                  <InfoRow
                    label="Policy Number"
                    value={patient.insurance_number || "Not provided"}
                  />
                  <InfoRow
                    label="Status"
                    value={
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          patient.insurance_status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            : patient.insurance_status === "Inactive"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        }`}
                      >
                        {patient.insurance_status}
                      </span>
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "medical" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Medical Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TbHeartbeat size={20} />
                Medical Details
              </h3>
              <div className="space-y-3">
                <InfoRow
                  label="Blood Group"
                  value={patient.blood_group || "Not specified"}
                />
              </div>
            </div>

            {/* Allergies */}
            {patient.allergies && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TbAlertCircle size={20} className="text-red-500" />
                  Known Allergies
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {patient.allergies}
                </p>
              </div>
            )}

            {/* Chronic Conditions */}
            {patient.chronic_conditions && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <TbHeartbeat size={20} />
                  Chronic Conditions
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {patient.chronic_conditions}
                </p>
              </div>
            )}

            {!patient.allergies &&
              !patient.chronic_conditions &&
              !patient.blood_group && (
                <div className="md:col-span-2 text-center py-12 text-gray-500 dark:text-gray-400">
                  <TbHeartbeat size={48} className="mx-auto mb-2" />
                  <p>No medical information recorded yet</p>
                </div>
              )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Emergency Contacts
            </h3>
            {patient.EmergencyContacts &&
            patient.EmergencyContacts.length > 0 ? (
              <div className="space-y-4">
                {patient.EmergencyContacts.map((contact) => (
                  <div
                    key={contact.contact_id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </h4>
                          {contact.is_primary && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                              Primary
                            </span>
                          )}
                          {contact.can_make_decisions && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded">
                              Medical Decisions
                            </span>
                          )}
                        </div>
                        <InfoRow
                          label="Relationship"
                          value={contact.relationship}
                        />
                        <InfoRow label="Phone" value={contact.phone} />
                        {contact.alternate_phone && (
                          <InfoRow
                            label="Alternate Phone"
                            value={contact.alternate_phone}
                          />
                        )}
                        {contact.email && (
                          <InfoRow label="Email" value={contact.email} />
                        )}
                        {contact.address && (
                          <InfoRow label="Address" value={contact.address} />
                        )}
                        {contact.notes && (
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {contact.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <TbPhone size={48} className="mx-auto mb-2" />
                <p>No emergency contacts added yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "identifiers" && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Patient Identifiers
            </h3>
            {patient.Identifiers && patient.Identifiers.length > 0 ? (
              <div className="space-y-4">
                {patient.Identifiers.map((identifier) => (
                  <div
                    key={identifier.identifier_id}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {identifier.identifier_type}
                          </h4>
                          {identifier.is_primary && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                        <InfoRow
                          label="Value"
                          value={identifier.identifier_value}
                        />
                        {identifier.issuing_authority && (
                          <InfoRow
                            label="Issuing Authority"
                            value={identifier.issuing_authority}
                          />
                        )}
                        {identifier.issue_date && (
                          <InfoRow
                            label="Issue Date"
                            value={formatDate(identifier.issue_date)}
                          />
                        )}
                        {identifier.expiry_date && (
                          <InfoRow
                            label="Expiry Date"
                            value={formatDate(identifier.expiry_date)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <TbId size={48} className="mx-auto mb-2" />
                <p>No additional identifiers added yet</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification Modal */}
      <NotificationModal {...notification} onClose={closeNotification} />
    </div>
  );
};

// Helper component for displaying info rows
const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
      {icon}
      {label}
    </span>
    <span className="text-sm font-medium text-gray-900 dark:text-white text-right">
      {value}
    </span>
  </div>
);

export default PatientProfile;
