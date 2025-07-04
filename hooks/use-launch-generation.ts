"use client";

import { useState } from "react";
import { ProjectFormData } from "@/components/dashboard/project-form";
import { LaunchPackage } from "@/types/launch";

interface UseGenerationState {
  isLoading: boolean;
  error: string | null;
  launchPackage: LaunchPackage | null;
}

export function useLaunchGeneration() {
  const [state, setState] = useState<UseGenerationState>({
    isLoading: false,
    error: null,
    launchPackage: null,
  });

  const generateLaunchScripts = async (formData: ProjectFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch("/api/generate-launch-scripts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate launch scripts");
      }

      const result = await response.json();
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        launchPackage: result.data 
      }));

      return result.data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      throw error;
    }
  };

  const clearResults = () => {
    setState({
      isLoading: false,
      error: null,
      launchPackage: null,
    });
  };

  return {
    ...state,
    generateLaunchScripts,
    clearResults,
  };
}