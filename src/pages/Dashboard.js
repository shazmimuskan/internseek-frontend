import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({});
  const [apps, setApps] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const [form, setForm] = useState({
    company: "",
    role: "",
    deadline: "",
    status: "Applied",
  });

  const loadData = async () => {
    try {
      const statsRes = await axios.get("http://localhost:5000/stats");
      const appsRes = await axios.get("http://localhost:5000/applications");

      setStats(statsRes.data);
      setApps(appsRes.data);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submit = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      return;
    }

    try {
      await axios.post("http://localhost:5000/add", form);

      setForm({
        company: "",
        role: "",
        deadline: "",
        status: "Applied",
      });

      await loadData();
    } catch (error) {
      console.error("Failed to add application:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/update/${id}`, {
        status,
      });

      await loadData();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteApp = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      await loadData();
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  };

  const filters = [
    {
      name: "All",
      count: apps.length,
    },
    {
      name: "Applied",
      count: stats.applied || 0,
    },
    {
      name: "Pending",
      count: stats.pending || 0,
    },
    {
      name: "Selected",
      count: stats.selected || 0,
    },
    {
      name: "Rejected",
      count: stats.rejected || 0,
    },
  ];

  const filteredApps = useMemo(() => {
    if (activeFilter === "All") {
      return apps;
    }

    return apps.filter(
      (app) => app.status?.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [apps, activeFilter]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "status-applied";

      case "pending":
        return "status-pending";

      case "selected":
        return "status-selected";

      case "rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  return (
    <main className="dashboard-page">

      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            Your internship journey
          </p>

          <h1 className="dashboard-title">
            InternSeek Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Keep track of every opportunity and stay organized throughout
            your internship search.
          </p>
        </div>
      </header>


      {/* STATS */}
      <section className="stats-grid">

        <button
          className={`stat-card ${
            activeFilter === "All" ? "stat-active" : ""
          }`}
          onClick={() => setActiveFilter("All")}
        >
          <span className="stat-label">
            Total Applications
          </span>

          <span className="stat-value">
            {stats.total || apps.length || 0}
          </span>

          <span className="stat-arrow">
            View all →
          </span>
        </button>


        <button
          className={`stat-card ${
            activeFilter === "Applied" ? "stat-active" : ""
          }`}
          onClick={() => setActiveFilter("Applied")}
        >
          <span className="stat-label">
            Applied
          </span>

          <span className="stat-value">
            {stats.applied || 0}
          </span>

          <span className="stat-arrow">
            View applied →
          </span>
        </button>


        <button
          className={`stat-card ${
            activeFilter === "Pending" ? "stat-active" : ""
          }`}
          onClick={() => setActiveFilter("Pending")}
        >
          <span className="stat-label">
            Pending
          </span>

          <span className="stat-value">
            {stats.pending || 0}
          </span>

          <span className="stat-arrow">
            View pending →
          </span>
        </button>


        <button
          className={`stat-card ${
            activeFilter === "Selected" ? "stat-active" : ""
          }`}
          onClick={() => setActiveFilter("Selected")}
        >
          <span className="stat-label">
            Selected
          </span>

          <span className="stat-value">
            {stats.selected || 0}
          </span>

          <span className="stat-arrow">
            View selected →
          </span>
        </button>

      </section>


      {/* ADD APPLICATION */}
      <section className="add-application">

        <div className="section-heading">
          <div>
            <p className="section-kicker">
              Track an opportunity
            </p>

            <h2 className="section-title">
              Add Application
            </h2>

            <p className="section-description">
              Save an internship you're applying to and keep its progress
              organized.
            </p>
          </div>
        </div>


        <div className="application-form">

          <input
            className="dashboard-input"
            type="text"
            placeholder="Company name"
            value={form.company}
            onChange={(e) =>
              setForm({
                ...form,
                company: e.target.value,
              })
            }
          />


          <input
            className="dashboard-input"
            type="text"
            placeholder="Role / Position"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          />


          <input
            className="dashboard-input"
            type="date"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value,
              })
            }
          />


          <button
            className="add-button"
            onClick={submit}
          >
            <span>+</span>
            Add Application
          </button>

        </div>

      </section>


      {/* APPLICATIONS */}
      <section className="applications-section">

        <div className="applications-heading">

          <div>
            <p className="section-kicker">
              Application tracker
            </p>

            <h2 className="section-title">
              Your Applications
            </h2>

            <p className="section-description">
              View and manage your internship applications by status.
            </p>
          </div>

          <span className="application-count">
            {filteredApps.length}
          </span>

        </div>


        {/* FILTER TABS */}
        <div className="filter-tabs">

          {filters.map((filter) => (
            <button
              key={filter.name}
              className={`filter-tab ${
                activeFilter === filter.name
                  ? "filter-tab-active"
                  : ""
              }`}
              onClick={() => setActiveFilter(filter.name)}
            >
              <span>{filter.name}</span>

              <span className="filter-count">
                {filter.count}
              </span>
            </button>
          ))}

        </div>


        {/* APPLICATION LIST */}

        {filteredApps.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              {activeFilter === "All" ? "📋" : "🔎"}
            </div>

            <h3 className="empty-title">
              {activeFilter === "All"
                ? "No applications yet"
                : `No ${activeFilter.toLowerCase()} applications`}
            </h3>

            <p className="empty-text">
              {activeFilter === "All"
                ? "Add your first internship application above to start tracking."
                : `You don't have any applications marked as ${activeFilter.toLowerCase()} yet.`}
            </p>

            {activeFilter !== "All" && (
              <button
                className="empty-reset"
                onClick={() => setActiveFilter("All")}
              >
                View all applications
              </button>
            )}

          </div>

        ) : (

          <div className="applications-list">

            {filteredApps.map((item) => (

              <article
                key={item._id}
                className="application-card"
              >

                <div className="application-main">

                  <div className="company-logo">
                    {item.company?.charAt(0)?.toUpperCase() || "I"}
                  </div>


                  <div className="application-info">

                    <div className="company-row">

                      <h3 className="company-name">
                        {item.company}
                      </h3>

                      <span
                        className={`current-status ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status || "Applied"}
                      </span>

                    </div>


                    <p className="application-role">
                      {item.role}
                    </p>


                    <p className="application-deadline">
                      <span>Deadline</span>

                      {item.deadline
                        ? item.deadline.slice(0, 10)
                        : "Not specified"}
                    </p>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="application-actions">

                  <select
                    className={`status-select ${getStatusClass(
                      item.status
                    )}`}
                    value={item.status || "Applied"}
                    onChange={(e) =>
                      updateStatus(item._id, e.target.value)
                    }
                  >
                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Selected">
                      Selected
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>


                  <button
                    className="delete-button"
                    onClick={() => deleteApp(item._id)}
                    title="Delete application"
                  >
                    Delete
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Dashboard;