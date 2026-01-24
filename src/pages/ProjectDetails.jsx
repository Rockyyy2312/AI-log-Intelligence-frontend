import { useParams, useNavigate } from "react-router-dom";
import MLAnalysis from "../dashboard/MLAnalysis";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate("/projects")}
        className="text-indigo-600 underline"
      >
        ← Back to Projects
      </button>

      <MLAnalysis project={{ _id: projectId }} />
    </div>
  );
}
