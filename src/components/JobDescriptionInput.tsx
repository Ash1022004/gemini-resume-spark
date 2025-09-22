import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Info } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isAnalyzing: boolean;
}

const JobDescriptionInput = ({ value, onChange, isAnalyzing }: JobDescriptionInputProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <Label htmlFor="job-description" className="text-base font-semibold">
              Job Description
            </Label>
            <Badge variant="secondary" className="text-xs">
              Optional
            </Badge>
          </div>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/20 rounded-md">
          <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Paste the job description for more targeted analysis and keyword optimization
          </p>
        </div>

        <Textarea
          id="job-description"
          placeholder="Paste the job description here for more accurate analysis..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[120px] resize-none"
          disabled={isAnalyzing}
        />
        
        {value.trim() && (
          <div className="text-xs text-muted-foreground">
            {value.trim().split(' ').length} words • Character count: {value.length}
          </div>
        )}
      </div>
    </Card>
  );
};

export default JobDescriptionInput;