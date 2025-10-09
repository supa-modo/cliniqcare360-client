import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TbSearch,
  TbPlus,
  TbUser,
  TbFilter,
  TbRefresh,
  TbUsers,
  TbUserCheck,
  TbUserOff,
  TbUserX,
  TbEye,
} from "react-icons/tb";
import { patientApi } from "../lib/patientApi";
import { Patient, PatientSearchQuery } from "../types/patient";
import { PatientListSkeleton } from "../components/LoadingSkeletons";
import NotificationModal from "../components/NotificationModal";
import { useNotification } from "../hooks/useNotification";
import DataTable from "../components/DataTable";

const PatientList = () => {
  const navigate = useNavigate();
  const {
    notification,
    closeNotification,
    success,
    error: showError,
  } = useNotification();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PatientSearchQuery>({
    page: 1,
    limit: 20,
  });
  const [tempFilters, setTempFilters] = useState<PatientSearchQuery>({
    page: 1,
    limit: 20,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [applyingFilters, setApplyingFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    deceased: 0,
  });

  // Fetch patients
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientApi.getPatients({
        ...filters,
        query: searchQuery || undefined,
      });
      setPatients(response.patients);
      setPagination({
        total: response.total,
        page: response.page,
        pages: response.pages,
      });
    } catch (err: any) {
      showError(
        "Failed to Load Patients",
        err.response?.data?.message ||
          "An error occurred while loading patients"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await patientApi.getPatientStatistics();
      setStats(response);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    fetchPatients();
    fetchStats();
  }, [filters]);

  // Sync tempFilters with current filters when they change from other sources
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev: PatientSearchQuery) => ({ ...prev, page: 1 }));
    setTempFilters((prev: PatientSearchQuery) => ({ ...prev, page: 1 }));
    fetchPatients();
  };

  const handleApplyFilters = async () => {
    const newFilters = { ...tempFilters, page: 1 };
    setFilters(newFilters);
    setShowFilters(false);

    // Fetch new data immediately with the applied filters
    try {
      setApplyingFilters(true);
      setTableLoading(true);
      const response = await patientApi.getPatients({
        ...newFilters,
        query: searchQuery || undefined,
      });
      setPatients(response.patients);
      setPagination({
        total: response.total,
        page: response.page,
        pages: response.pages,
      });
    } catch (err: any) {
      showError(
        "Failed to Apply Filters",
        err.response?.data?.message ||
          "An error occurred while applying filters"
      );
    } finally {
      setApplyingFilters(false);
      setTableLoading(false);
    }
  };

  const handleClearFilters = async () => {
    const clearedFilters = {
      page: 1,
      limit: 20,
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
    setShowFilters(false);

    // Fetch new data immediately with cleared filters
    try {
      setTableLoading(true);
      const response = await patientApi.getPatients({
        ...clearedFilters,
        query: searchQuery || undefined,
      });
      setPatients(response.patients);
      setPagination({
        total: response.total,
        page: response.page,
        pages: response.pages,
      });
    } catch (err: any) {
      showError(
        "Failed to Clear Filters",
        err.response?.data?.message ||
          "An error occurred while clearing filters"
      );
    } finally {
      setTableLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchPatients();
    fetchStats();
    success("Refreshed", "Patient list updated successfully");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Active:
        "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border border-green-300",
      Inactive:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border border-gray-300",
      Deceased:
        "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border border-red-300",
    };
    return styles[status as keyof typeof styles] || styles.Active;
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

  // DataTable column definitions
  const columns = [
    {
      id: "patient",
      header: "Patient",
      cell: (patient: Patient) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <TbUser
              size={20}
              className="text-primary-600 dark:text-primary-400"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {patient.first_name} {patient.last_name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {patient.national_id || "No ID"}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "mrn",
      header: "MRN",
      cell: (patient: Patient) => (
        <div className="text-sm font-mono text-gray-900 dark:text-white">
          {patient.mrn}
        </div>
      ),
    },
    {
      id: "age_gender",
      header: "Age/Gender",
      cell: (patient: Patient) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {calculateAge(patient.date_of_birth)} yrs
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {patient.gender}
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      header: "Contact",
      cell: (patient: Patient) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {patient.phone || "N/A"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {patient.email || "N/A"}
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: (patient: Patient) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
            patient.status
          )}`}
        >
          {patient.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (patient: Patient) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/patients/${patient.patient_id}`);
          }}
          className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1"
        >
          <TbEye size={16} />
          View Details
        </button>
      ),
    },
  ];

  // Row selection handlers
  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(patients.map((p) => p.patient_id));
      setSelectedRows(allIds);
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleToggleRow = (rowId: string, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(rowId);
    } else {
      newSelected.delete(rowId);
    }
    setSelectedRows(newSelected);
  };

  const isRowSelected = (patient: Patient) => {
    return selectedRows.has(patient.patient_id);
  };

  const getRowId = (patient: Patient) => patient.patient_id;

  if (loading) {
    return <PatientListSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="px-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-secondary-600 dark:text-white">
              All Registered Patients
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your hospital's patient records and information
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
            >
              <TbRefresh size={20} />
            </button>
            <button
              onClick={() => navigate("/patients/register")}
              className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-full hover:bg-primary-700 transition-colors duration-300 flex items-center gap-2"
            >
              <TbPlus size={20} />
              <span>Register Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-xl">
              <TbUsers
                size={28}
                className="text-primary-600 dark:text-primary-400"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Patients
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
              <TbUserCheck
                size={28}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Active
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.active}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-900/20 rounded-xl">
              <TbUserOff
                size={28}
                className="text-gray-600 dark:text-gray-400"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Inactive
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.inactive}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
              <TbUserX size={28} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Deceased
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.deceased}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl py-5 px-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1 relative">
            <TbSearch
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, MRN, National ID, or phone..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 pl-2 pr-4 py-2 bg-primary-600 text-white text-sm rounded-full hover:bg-primary-700 transition-colors font-medium"
            >
              <div className="flex items-center gap-2">
                <TbSearch size={20} className="" />
                <span>Search</span>
              </div>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border rounded-xl transition-colors flex items-center gap-2 font-medium ${
              filters.status ||
              filters.gender ||
              filters.age_min ||
              filters.age_max
                ? "bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-600 text-primary-700 dark:text-primary-300"
                : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
            }`}
          >
            <TbFilter size={20} />
            Filters
            {(filters.status ||
              filters.gender ||
              filters.age_min ||
              filters.age_max) && (
              <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
            )}
          </button>
        </form>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={tempFilters.status || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      status: e.target.value || undefined,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Deceased">Deceased</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={tempFilters.gender || ""}
                  onChange={(e) =>
                    setTempFilters({
                      ...tempFilters,
                      gender: e.target.value || undefined,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Min Age
                  </label>
                  <input
                    type="number"
                    value={tempFilters.age_min || ""}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        age_min: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Age
                  </label>
                  <input
                    type="number"
                    value={tempFilters.age_max || ""}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        age_max: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    placeholder="150"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* Filter Action Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Actions
                </label>
                <div className="flex gap-3 ">
                  <button
                    onClick={handleClearFilters}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 font-medium"
                  >
                    <TbFilter size={16} />
                    Clear Filters
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    disabled={applyingFilters}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {applyingFilters ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <TbSearch size={16} />
                        Apply Filters
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Patients Table */}
      <div className=" dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <DataTable
          columns={columns}
          rows={patients}
          totalItems={pagination.total}
          startIndex={(pagination.page - 1) * filters.limit! + 1}
          endIndex={Math.min(
            pagination.page * filters.limit!,
            pagination.total
          )}
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={(page) => setFilters({ ...filters, page })}
          isAllSelected={
            selectedRows.size === patients.length && patients.length > 0
          }
          onToggleAll={handleToggleAll}
          isRowSelected={isRowSelected}
          onToggleRow={handleToggleRow}
          getRowId={getRowId}
          onRowClick={(patient) => navigate(`/patients/${patient.patient_id}`)}
          tableLoading={tableLoading}
          hasSearched={
            !!searchQuery ||
            !!(
              filters.status ||
              filters.gender ||
              filters.age_min ||
              filters.age_max
            )
          }
          showCheckboxes={true}
        />
      </div>

      {/* Notification Modal */}
      <NotificationModal {...notification} onClose={closeNotification} />
    </div>
  );
};

export default PatientList;
