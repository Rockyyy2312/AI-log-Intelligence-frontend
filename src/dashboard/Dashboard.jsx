import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import MLAnalysis from "./MLAnalysis";

export default function Dashboard() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "24px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>AI Log Intelligence</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </header>

      {!project ? (
        <ProjectList onSelect={setProject} />
      ) : (
        <>
          <button onClick={() => setProject(null)}>← Change Project</button>
          <MLAnalysis project={project} />
        </>
      )}
    </div>
  );
}
