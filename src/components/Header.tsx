import { FileText, Zap, Target } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-secondary py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-white/10 p-4 backdrop-blur-sm">
              <FileText size={48} className="text-white" />
            </div>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Resume Analyzer
            <span className="block text-xl font-normal opacity-90 mt-2">
              AI-Powered ATS Optimization
            </span>
          </h1>
          
          <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
            Get instant feedback on your resume with our advanced AI analysis. 
            Optimize for ATS systems and increase your chances of landing interviews.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Zap size={20} />
              <span>Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Target size={20} />
              <span>ATS Optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText size={20} />
              <span>PDF & DOCX Support</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;