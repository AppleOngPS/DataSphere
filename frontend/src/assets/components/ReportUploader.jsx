// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const ReportUploader = () => {
  const [file, setFile] = useState(null); // For storing the selected CSV file
  const [reportData, setReportData] = useState(null); // Stores the generated report
  const [loading, setLoading] = useState(false); // Indicates when the report is being generated

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle CSV file upload and fetch report data
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/reports/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      setReportData(data); // Store the generated report data
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to generate report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload CSV for Revenue Analysis</h2>
      <form onSubmit={handleUpload}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Generating Report..." : "Upload"}
        </button>
      </form>

      {reportData && (
        <div>
          <h3>Report Summary</h3>
          <p><strong>Total Revenue:</strong> ${reportData.totalRevenue}</p>

          <h4>Monthly Insights</h4>
          <ul>
            {reportData.insights.map((insight, index) => (
              <li key={index}>
                <strong>{insight.month}:</strong> {insight.insight}
              </li>
            ))}
          </ul>

          <h4>Revenue Chart</h4>
          <img
            src={`data:image/png;base64,${reportData.chart}`}
            alt="Revenue Chart"
            style={{ width: "100%", maxWidth: "800px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ReportUploader;
