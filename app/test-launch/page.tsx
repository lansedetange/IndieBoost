"use client";

import { useState } from "react";
import { ProjectForm, ProjectFormData } from "@/components/dashboard/project-form";
import { Button } from "@/components/ui/button";

export default function TestLaunchPage() {
  const [formData, setFormData] = useState<ProjectFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    setError(null);
    setFormData(data);
    
    try {
      // Test the API endpoint
      const response = await fetch("/api/test-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate scripts");
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const resetTest = () => {
    setFormData(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">LaunchForge Test Page</h1>
        <p className="text-muted-foreground">Test the AI launch script generation functionality</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">Error: {error}</p>
        </div>
      )}

      {!formData ? (
        <ProjectForm onSubmit={handleFormSubmit} isLoading={isLoading} />
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="font-semibold text-green-800 mb-2">Form Data Submitted:</h3>
            <pre className="text-sm text-green-700 overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>

          {isLoading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800">Generating launch scripts... This may take 30-60 seconds.</p>
            </div>
          )}

          {result && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
              <h3 className="font-semibold text-purple-800 mb-2">Generated Result:</h3>
              <pre className="text-sm text-purple-700 overflow-x-auto max-h-96 overflow-y-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <Button onClick={resetTest} variant="outline">
            Test Again
          </Button>
        </div>
      )}
    </div>
  );
}