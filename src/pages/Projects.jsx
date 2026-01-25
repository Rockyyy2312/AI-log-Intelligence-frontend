import ProjectList from "../dashboard/ProjectList";

export default function Projects() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Projects
      </h1>

      <ProjectList />
    </div>
  );
}
