"use client";

import { useState } from "react";
import { LaunchPackage, LaunchScript } from "@/types/launch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Copy, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Rocket
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LaunchResultsProps {
  launchPackage: LaunchPackage;
  onExport: (format: "markdown" | "pdf" | "notion") => void;
  onNewProject: () => void;
}

const platformIcons = {
  "product-hunt": "🎯",
  "reddit": "📱", 
  "hacker-news": "🔥",
  "twitter": "🐦",
  "discord": "💬",
};

const platformNames = {
  "product-hunt": "Product Hunt",
  "reddit": "Reddit",
  "hacker-news": "Hacker News", 
  "twitter": "X (Twitter)",
  "discord": "Discord",
};

export function LaunchResults({ launchPackage, onExport, onNewProject }: LaunchResultsProps) {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (content: string, scriptId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedScript(scriptId);
      toast({
        title: "Copied to clipboard",
        description: "Launch script copied successfully!",
      });
      
      setTimeout(() => setCopiedScript(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatScriptContent = (script: LaunchScript) => {
    return script.content.split('\n').map((line, index) => {
      // Handle emojis and formatting
      if (line.startsWith('🎯') || line.startsWith('📝') || line.startsWith('📖') || 
          line.startsWith('🎙️') || line.startsWith('💬') || line.startsWith('📌') ||
          line.startsWith('📋') || line.startsWith('📄') || line.startsWith('📊') ||
          line.startsWith('🎯') || line.startsWith('💭') || line.startsWith('🚀') ||
          line.startsWith('⏰') || line.startsWith('🔥') || line.startsWith('🎤') ||
          line.startsWith('💬') || line.startsWith('🤝')) {
        return (
          <h4 key={index} className="font-semibold text-primary mt-4 mb-2">
            {line}
          </h4>
        );
      }
      
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return (
        <p key={index} className="mb-2 text-muted-foreground">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Launch Scripts Generated!
              </CardTitle>
              <CardDescription>
                Your professional launch scripts for {launchPackage.projectName} are ready
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={onNewProject} variant="outline">
                New Project
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-4">
            {launchPackage.scripts.map((script) => (
              <Badge key={script.id} variant="secondary" className="flex items-center gap-1">
                <span>{platformIcons[script.platform]}</span>
                {platformNames[script.platform]}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Options
          </CardTitle>
          <CardDescription>
            Download your launch scripts in different formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onExport("markdown")} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Download Markdown
            </Button>
            <Button onClick={() => onExport("pdf")} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Download PDF
            </Button>
            <Button onClick={() => onExport("notion")} variant="outline" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Export to Notion
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scripts Tabs */}
      <Tabs defaultValue={launchPackage.scripts[0]?.platform} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {launchPackage.scripts.map((script) => (
            <TabsTrigger key={script.platform} value={script.platform} className="text-xs">
              <span className="mr-1">{platformIcons[script.platform]}</span>
              {platformNames[script.platform]}
            </TabsTrigger>
          ))}
        </TabsList>

        {launchPackage.scripts.map((script) => (
          <TabsContent key={script.platform} value={script.platform}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <span>{platformIcons[script.platform]}</span>
                      {script.title}
                    </CardTitle>
                    <CardDescription>
                      Generated on {new Date(script.metadata?.generatedAt || Date.now()).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(script.content, script.id)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {copiedScript === script.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm">
                    {formatScriptContent(script)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}