import ProjectList from "../dashboard/ProjectList";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <ProjectList
        onSelect={(project) => navigate(`/projects/${project._id}`)}
      />
    </div>
  );
}
