import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Briefcase, 
  Code, 
  GraduationCap, 
  Stethoscope,
  Calculator,
  Palette
} from "lucide-react";

const ResumeTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const templates = [
    {
      id: 1,
      name: "Professional Executive",
      category: "business",
      preview: "/api/placeholder/300/400",
      description: "Clean, professional layout perfect for executive positions",
      tags: ["ATS-Friendly", "Executive", "Corporate"],
      color: "blue",
      downloads: 1250
    },
    {
      id: 2,
      name: "Modern Developer",
      category: "tech",
      preview: "/api/placeholder/300/400",
      description: "Tech-focused design with skills showcase section",
      tags: ["Developer", "Modern", "Skills-Heavy"],
      color: "green",
      downloads: 890
    },
    {
      id: 3,
      name: "Creative Designer",
      category: "creative",
      preview: "/api/placeholder/300/400",
      description: "Visually appealing layout for creative professionals",
      tags: ["Creative", "Portfolio", "Visual"],
      color: "purple",
      downloads: 650
    },
    {
      id: 4,
      name: "Academic Scholar",
      category: "academic",
      preview: "/api/placeholder/300/400",
      description: "Research-focused format for academic positions",
      tags: ["Academic", "Research", "Publications"],
      color: "indigo",
      downloads: 430
    },
    {
      id: 5,
      name: "Healthcare Professional",
      category: "healthcare",
      preview: "/api/placeholder/300/400",
      description: "Medical field optimized template",
      tags: ["Healthcare", "Medical", "Clinical"],
      color: "red",
      downloads: 720
    },
    {
      id: 6,
      name: "Finance Analyst",
      category: "finance",
      preview: "/api/placeholder/300/400",
      description: "Numbers-focused layout for finance roles",
      tags: ["Finance", "Analytics", "Data"],
      color: "emerald",
      downloads: 580
    }
  ];

  const categories = [
    { id: "all", label: "All Templates", icon: FileText },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "tech", label: "Technology", icon: Code },
    { id: "creative", label: "Creative", icon: Palette },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "healthcare", label: "Healthcare", icon: Stethoscope },
    { id: "finance", label: "Finance", icon: Calculator },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Professional Resume Templates</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Choose from our collection of ATS-optimized, professionally designed resume templates. 
          Each template is crafted to help you stand out in your industry.
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="aspect-[3/4] bg-gradient-to-br from-muted/30 to-muted/50 relative overflow-hidden">
              {/* Template Preview Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-16 h-16 text-muted-foreground/50" />
              </div>
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button size="sm" variant="secondary">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm" variant="gradient">
                  <Download className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {template.downloads.toLocaleString()} downloads
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="gradient" size="sm" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Use Template
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or category filter to find more templates.
          </p>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-2xl font-bold mb-4">Need a Custom Template?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our AI-powered template generator can create a personalized resume template based on 
          your industry, role, and career level. Get started with a custom design today.
        </p>
        <Button variant="gradient" size="lg">
          Create Custom Template
        </Button>
      </Card>
    </div>
  );
};

export default ResumeTemplates;