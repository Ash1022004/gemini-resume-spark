export interface ResumeTemplate {
  id: number;
  name: string;
  category: string;
  preview: string;
  description: string;
  tags: string[];
  color: string;
  downloads: number;
  structure: {
    layout: 'single-column' | 'two-column' | 'modern' | 'creative';
    sections: string[];
    fonts: {
      heading: string;
      body: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 1,
    name: "Harvard Business School",
    category: "business",
    preview: "/api/placeholder/300/400",
    description: "Classic Harvard-style resume with clean formatting, perfect for consulting and finance roles",
    tags: ["ATS-Friendly", "Executive", "Corporate", "Traditional"],
    color: "blue",
    downloads: 12450,
    structure: {
      layout: 'single-column',
      sections: ['Contact', 'Education', 'Experience', 'Skills', 'Activities'],
      fonts: {
        heading: 'Times New Roman',
        body: 'Times New Roman'
      },
      colors: {
        primary: '#000000',
        secondary: '#333333',
        accent: '#0066cc'
      }
    }
  },
  {
    id: 2,
    name: "Tech Lead Pro",
    category: "tech",
    preview: "/api/placeholder/300/400",
    description: "Modern tech-focused design with prominent skills section and project highlights",
    tags: ["Developer", "Modern", "Skills-Heavy", "GitHub Integration"],
    color: "green",
    downloads: 8920,
    structure: {
      layout: 'two-column',
      sections: ['Summary', 'Technical Skills', 'Experience', 'Projects', 'Education'],
      fonts: {
        heading: 'Inter',
        body: 'Roboto'
      },
      colors: {
        primary: '#2ecc71',
        secondary: '#27ae60',
        accent: '#1abc9c'
      }
    }
  },
  {
    id: 3,
    name: "Creative Portfolio",
    category: "creative",
    preview: "/api/placeholder/300/400",
    description: "Eye-catching design for designers, artists, and creative professionals",
    tags: ["Creative", "Portfolio", "Visual", "Modern"],
    color: "purple",
    downloads: 6580,
    structure: {
      layout: 'creative',
      sections: ['Profile', 'Portfolio', 'Experience', 'Skills', 'Education'],
      fonts: {
        heading: 'Playfair Display',
        body: 'Open Sans'
      },
      colors: {
        primary: '#9b59b6',
        secondary: '#8e44ad',
        accent: '#e74c3c'
      }
    }
  },
  {
    id: 4,
    name: "Academic Scholar CV",
    category: "academic",
    preview: "/api/placeholder/300/400",
    description: "Comprehensive CV format for researchers, professors, and PhD candidates",
    tags: ["Academic", "Research", "Publications", "Detailed"],
    color: "indigo",
    downloads: 4380,
    structure: {
      layout: 'single-column',
      sections: ['Education', 'Research Experience', 'Publications', 'Conferences', 'Teaching', 'Awards'],
      fonts: {
        heading: 'Garamond',
        body: 'Georgia'
      },
      colors: {
        primary: '#34495e',
        secondary: '#2c3e50',
        accent: '#3498db'
      }
    }
  },
  {
    id: 5,
    name: "Medical Professional",
    category: "healthcare",
    preview: "/api/placeholder/300/400",
    description: "Healthcare-optimized template with licensure and certification sections",
    tags: ["Healthcare", "Medical", "Clinical", "Certified"],
    color: "red",
    downloads: 7250,
    structure: {
      layout: 'single-column',
      sections: ['Education', 'Licensure', 'Clinical Experience', 'Skills', 'Certifications'],
      fonts: {
        heading: 'Arial',
        body: 'Calibri'
      },
      colors: {
        primary: '#e74c3c',
        secondary: '#c0392b',
        accent: '#16a085'
      }
    }
  },
  {
    id: 6,
    name: "Finance Executive",
    category: "finance",
    preview: "/api/placeholder/300/400",
    description: "Numbers-focused layout emphasizing achievements and financial impact",
    tags: ["Finance", "Analytics", "Data", "Executive"],
    color: "emerald",
    downloads: 5890,
    structure: {
      layout: 'single-column',
      sections: ['Professional Summary', 'Core Competencies', 'Professional Experience', 'Education', 'Certifications'],
      fonts: {
        heading: 'Helvetica',
        body: 'Arial'
      },
      colors: {
        primary: '#16a085',
        secondary: '#1abc9c',
        accent: '#2ecc71'
      }
    }
  },
  {
    id: 7,
    name: "Startup Founder",
    category: "business",
    preview: "/api/placeholder/300/400",
    description: "Entrepreneurial-focused template highlighting ventures, leadership, and growth metrics",
    tags: ["Startup", "Entrepreneur", "Leadership", "Growth"],
    color: "orange",
    downloads: 4920,
    structure: {
      layout: 'modern',
      sections: ['Summary', 'Ventures', 'Leadership Experience', 'Achievements', 'Skills'],
      fonts: {
        heading: 'Montserrat',
        body: 'Lato'
      },
      colors: {
        primary: '#e67e22',
        secondary: '#d35400',
        accent: '#f39c12'
      }
    }
  },
  {
    id: 8,
    name: "Product Manager Pro",
    category: "tech",
    preview: "/api/placeholder/300/400",
    description: "Product-focused template showcasing launches, metrics, and cross-functional leadership",
    tags: ["Product", "Agile", "Metrics", "Leadership"],
    color: "cyan",
    downloads: 6780,
    structure: {
      layout: 'two-column',
      sections: ['Summary', 'Product Experience', 'Key Launches', 'Skills', 'Education'],
      fonts: {
        heading: 'Source Sans Pro',
        body: 'Nunito'
      },
      colors: {
        primary: '#1abc9c',
        secondary: '#16a085',
        accent: '#3498db'
      }
    }
  },
  {
    id: 9,
    name: "Marketing Director",
    category: "business",
    preview: "/api/placeholder/300/400",
    description: "Campaign-focused design highlighting brand growth and ROI achievements",
    tags: ["Marketing", "Digital", "Brand", "ROI"],
    color: "pink",
    downloads: 5670,
    structure: {
      layout: 'modern',
      sections: ['Professional Summary', 'Campaign Highlights', 'Experience', 'Skills', 'Education'],
      fonts: {
        heading: 'Poppins',
        body: 'Open Sans'
      },
      colors: {
        primary: '#e91e63',
        secondary: '#c2185b',
        accent: '#ff5722'
      }
    }
  },
  {
    id: 10,
    name: "Data Scientist",
    category: "tech",
    preview: "/api/placeholder/300/400",
    description: "Analytics-heavy template with sections for projects, tools, and publications",
    tags: ["Data Science", "ML", "Python", "Research"],
    color: "violet",
    downloads: 7890,
    structure: {
      layout: 'two-column',
      sections: ['Summary', 'Technical Skills', 'Experience', 'Projects', 'Publications', 'Education'],
      fonts: {
        heading: 'Fira Sans',
        body: 'Roboto Mono'
      },
      colors: {
        primary: '#673ab7',
        secondary: '#512da8',
        accent: '#9c27b0'
      }
    }
  },
  {
    id: 11,
    name: "Legal Professional",
    category: "business",
    preview: "/api/placeholder/300/400",
    description: "Bar-certified template for attorneys and legal professionals",
    tags: ["Legal", "Attorney", "Bar Certified", "Professional"],
    color: "slate",
    downloads: 3980,
    structure: {
      layout: 'single-column',
      sections: ['Bar Admissions', 'Education', 'Experience', 'Publications', 'Skills'],
      fonts: {
        heading: 'Times New Roman',
        body: 'Georgia'
      },
      colors: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#7f8c8d'
      }
    }
  },
  {
    id: 12,
    name: "UX/UI Designer",
    category: "creative",
    preview: "/api/placeholder/300/400",
    description: "Portfolio-style template showcasing design projects and user impact",
    tags: ["UX", "UI", "Design", "Portfolio"],
    color: "amber",
    downloads: 8230,
    structure: {
      layout: 'creative',
      sections: ['About', 'Featured Projects', 'Experience', 'Tools & Skills', 'Education'],
      fonts: {
        heading: 'Space Grotesk',
        body: 'Inter'
      },
      colors: {
        primary: '#f39c12',
        secondary: '#e67e22',
        accent: '#3498db'
      }
    }
  }
];
