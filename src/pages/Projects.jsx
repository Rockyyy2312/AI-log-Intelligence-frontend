import ProjectList from "../dashboard/ProjectList";

export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Projects
        </h1>
        <p className="text-slate-500 mt-2">Manage and monitor your ML projects.</p>
      </div>

      <ProjectList />
    </div>
  );
}
