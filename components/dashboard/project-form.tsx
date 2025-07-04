"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Sparkles } from "lucide-react";

export interface ProjectFormData {
  projectName: string;
  tagline: string;
  features: string;
  targetUsers: string;
  platforms: string[];
  demoLink?: string;
  logo?: File;
  stylePreference: "professional" | "casual" | "minimal";
}

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  isLoading?: boolean;
}

const platforms = [
  { id: "product-hunt", label: "Product Hunt", description: "Perfect for tech products and startups" },
  { id: "reddit", label: "Reddit", description: "Great for community engagement" },
  { id: "hacker-news", label: "Hacker News", description: "Ideal for developer tools" },
  { id: "twitter", label: "X (Twitter)", description: "Social media buzz and updates" },
  { id: "discord", label: "Discord", description: "Community and networking" },
];

const styleOptions = [
  { id: "professional", label: "Professional", description: "Formal, business-focused tone" },
  { id: "casual", label: "Casual", description: "Friendly, approachable language" },
  { id: "minimal", label: "Minimal", description: "Clean, concise messaging" },
];

export function ProjectForm({ onSubmit, isLoading = false }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: "",
    tagline: "",
    features: "",
    targetUsers: "",
    platforms: [],
    demoLink: "",
    stylePreference: "professional",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.projectName && formData.tagline && formData.features && formData.targetUsers && formData.platforms.length > 0) {
      onSubmit(formData);
    }
  };

  const handlePlatformChange = (platformId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      platforms: checked 
        ? [...prev.platforms, platformId]
        : prev.platforms.filter(p => p !== platformId)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Project Information
        </CardTitle>
        <CardDescription>
          Tell us about your project so we can generate the perfect launch scripts for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                placeholder="e.g., TaskFlow, DevTools Pro"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoLink">Demo Link (Optional)</Label>
              <Input
                id="demoLink"
                placeholder="https://your-demo.com"
                value={formData.demoLink}
                onChange={(e) => setFormData(prev => ({ ...prev, demoLink: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">One-line Description *</Label>
            <Input
              id="tagline"
              placeholder="e.g., The fastest way to manage your daily tasks"
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Core Features *</Label>
            <Textarea
              id="features"
              placeholder="e.g., Real-time collaboration, Smart notifications, Cross-platform sync"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetUsers">Target Users *</Label>
            <Textarea
              id="targetUsers"
              placeholder="e.g., Busy professionals, Remote teams, Freelancers"
              value={formData.targetUsers}
              onChange={(e) => setFormData(prev => ({ ...prev, targetUsers: e.target.value }))}
              required
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label>Launch Platforms * (Select at least one)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {platforms.map((platform) => (
                <div key={platform.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    id={platform.id}
                    checked={formData.platforms.includes(platform.id)}
                    onCheckedChange={(checked) => handlePlatformChange(platform.id, checked as boolean)}
                  />
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={platform.id} className="text-sm font-medium cursor-pointer">
                      {platform.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{platform.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Writing Style</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {styleOptions.map((style) => (
                <div 
                  key={style.id} 
                  className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.stylePreference === style.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, stylePreference: style.id as any }))}
                >
                  <div className="flex-1 min-w-0">
                    <Label className="text-sm font-medium cursor-pointer">
                      {style.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">{style.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo (Optional)</Label>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="logo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, SVG (Max 2MB)</p>
                </div>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            {formData.logo && (
              <p className="text-sm text-muted-foreground">
                Selected: {formData.logo.name}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !formData.projectName || !formData.tagline || !formData.features || !formData.targetUsers || formData.platforms.length === 0}
          >
            {isLoading ? "Generating Scripts..." : "Generate Launch Scripts"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}