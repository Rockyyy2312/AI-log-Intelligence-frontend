import { useParams } from "react-router-dom";
import MLAnalysis from "../dashboard/MLAnalysis";

export default function ProjectAnalytics() {
  const { projectId } = useParams();

  return <MLAnalysis projectId={projectId} />;
}
