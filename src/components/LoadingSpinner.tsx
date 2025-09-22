import { Loader2, Brain, FileSearch, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "Analyzing your resume..." }: LoadingSpinnerProps) => {
  return (
    <Card className="p-8 text-center animate-fade-in">
      <div className="space-y-6">
        {/* Animated Icons */}
        <div className="flex justify-center items-center gap-4">
          <div className="relative">
            <Brain className="w-8 h-8 text-primary animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full animate-ping"></div>
          </div>
          <div className="animate-bounce delay-100">
            <FileSearch className="w-8 h-8 text-accent" />
          </div>
          <div className="relative">
            <Zap className="w-8 h-8 text-warning animate-pulse delay-200" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping delay-300"></div>
          </div>
        </div>

        {/* Main Spinner */}
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>

        {/* Loading Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{message}</h3>
          <p className="text-sm text-muted-foreground">
            Our AI is analyzing your resume for ATS optimization...
          </p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Extracting text content</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-200"></div>
            <span>Analyzing keyword optimization</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse delay-400"></div>
            <span>Generating suggestions</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoadingSpinner;