import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  FileText, 
  Target,
  Lightbulb
} from "lucide-react";

interface AnalysisResultsProps {
  results: {
    score: string;
    missing_keywords: string[];
    suggestions: string[];
    parsed?: {
      extracted_text_length: number;
    };
  };
}

const AnalysisResults = ({ results }: AnalysisResultsProps) => {
  const scoreValue = parseInt(results.score.replace('%', ''));
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-destructive/10 border-destructive/20';
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Overall Score */}
      <Card className={`p-6 border-2 ${getScoreBackground(scoreValue)}`}>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">ATS Compatibility Score</h3>
            </div>
            <div className={`text-4xl font-bold ${getScoreColor(scoreValue)}`}>
              {results.score}
            </div>
          </div>
          <div className="text-right">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColor(scoreValue)}`}>
                  {results.score}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Progress value={scoreValue} className="h-2" />
          <p className="text-sm text-muted-foreground">
            {scoreValue >= 80 
              ? "Excellent! Your resume is well-optimized for ATS systems." 
              : scoreValue >= 60 
                ? "Good progress, but there's room for improvement." 
                : "Your resume needs significant optimization for ATS compatibility."
            }
          </p>
        </div>
      </Card>

      {/* Missing Keywords */}
      {results.missing_keywords.length > 0 && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <h3 className="text-lg font-semibold">Missing Keywords</h3>
              <Badge variant="outline">{results.missing_keywords.length}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Important keywords that could improve your resume's ATS performance:
            </p>
            <div className="flex flex-wrap gap-2">
              {results.missing_keywords.map((keyword, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="bg-warning/10 text-warning-foreground border-warning/20"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Suggestions */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
            <Badge variant="outline">{results.suggestions.length}</Badge>
          </div>
          <div className="space-y-3">
            {results.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Analysis Stats */}
      {results.parsed && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Analysis Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Text Length:</span>
                <span className="font-medium">{results.parsed.extracted_text_length} characters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Analysis:</span>
                <span className="font-medium text-success">Complete</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnalysisResults;