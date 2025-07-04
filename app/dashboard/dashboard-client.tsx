"use client";

import { useState } from "react";
import { ProjectForm, ProjectFormData } from "@/components/dashboard/project-form";
import { LaunchResults } from "@/components/dashboard/launch-results";
import { useLaunchGeneration } from "@/hooks/use-launch-generation";
import { exportToMarkdown, exportToPDF, exportToNotion } from "@/utils/export";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";

interface DashboardClientProps {
  user: any;
  isDemo?: boolean;
}

export default function DashboardClient({ user, isDemo = false }: DashboardClientProps) {
  const { isLoading, error, launchPackage, generateLaunchScripts, clearResults } = useLaunchGeneration();
  const [showForm, setShowForm] = useState(true);

  const handleFormSubmit = async (formData: ProjectFormData) => {
    try {
      await generateLaunchScripts(formData);
      setShowForm(false);
    } catch (error) {
      // Error is handled by the hook
      console.error("Generation failed:", error);
    }
  };

  const handleExport = (format: "markdown" | "pdf" | "notion") => {
    if (!launchPackage) return;
    
    switch (format) {
      case "markdown":
        exportToMarkdown(launchPackage);
        break;
      case "pdf":
        exportToPDF(launchPackage);
        break;
      case "notion":
        exportToNotion(launchPackage);
        break;
    }
  };

  const handleNewProject = () => {
    clearResults();
    setShowForm(true);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8 px-4 sm:px-8 container">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border rounded-lg p-6 sm:p-8 mt-6 sm:mt-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          LaunchForge Dashboard
          {isDemo && <span className="text-base font-normal text-muted-foreground ml-2">(Demo Mode)</span>}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Generate professional launch scripts for Product Hunt, Reddit, Hacker News, and more.
          {user && <span className="block sm:inline sm:ml-2">Welcome back, {user.email}!</span>}
        </p>
      </div>

      {/* Demo Notice */}
      {isDemo && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            You're viewing the demo version. <a href="/sign-in" className="underline text-primary">Sign in</a> to save your generated scripts and access full features.
          </AlertDescription>
        </Alert>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="flex-1 mb-6">
        {showForm || !launchPackage ? (
          <ProjectForm 
            onSubmit={handleFormSubmit} 
            isLoading={isLoading}
          />
        ) : (
          <LaunchResults
            launchPackage={launchPackage}
            onExport={handleExport}
            onNewProject={handleNewProject}
          />
        )}
      </div>
    </div>
  );
}