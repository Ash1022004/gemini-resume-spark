import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import AnalysisResults from "@/components/AnalysisResults";
import { resumeAnalyzerService, AnalysisResult } from "@/services/resumeAnalyzer";
import { RefreshCw } from "lucide-react";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    try {
      const analysisResult = await resumeAnalyzerService.analyzeResume({
        file: selectedFile,
        jobDescription: jobDescription.trim() || undefined,
      });

      setResults(analysisResult);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been successfully analyzed.",
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setJobDescription("");
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* File Upload Section */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
              <p className="text-muted-foreground">
                Upload your resume in PDF or DOCX format for AI-powered analysis
              </p>
            </div>
            
            <FileUpload
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile}
              isAnalyzing={isAnalyzing}
            />
          </section>

          {/* Job Description Section */}
          <section className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Job Description</h2>
              <p className="text-muted-foreground">
                Add a job description for more targeted analysis (optional)
              </p>
            </div>
            
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              isAnalyzing={isAnalyzing}
            />
          </section>

          {/* Action Buttons */}
          <section className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              size="lg"
              variant="gradient"
              className="font-semibold px-8 py-3"
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
            </Button>
            
            {(selectedFile || results) && (
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                disabled={isAnalyzing}
                className="px-8 py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            )}
          </section>

          {/* Loading State */}
          {isAnalyzing && (
            <section>
              <LoadingSpinner message="Analyzing your resume with AI..." />
            </section>
          )}

          {/* Results Section */}
          {results && !isAnalyzing && (
            <section id="results" className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                <p className="text-muted-foreground">
                  Here's your detailed resume analysis and optimization suggestions
                </p>
              </div>
              
              <AnalysisResults results={results} />
            </section>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-muted/30 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by AI • Built for ATS Optimization
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;