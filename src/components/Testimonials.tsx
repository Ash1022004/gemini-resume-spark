import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, TrendingUp, Award } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Microsoft",
      image: "/api/placeholder/80/80",
      rating: 5,
      scoreBefore: "42%",
      scoreAfter: "89%",
      quote: "ResumeAI transformed my resume completely. I went from getting zero callbacks to landing 5 interviews in 2 weeks. The ATS optimization really works!",
      outcome: "Landed dream job at Microsoft",
      timeframe: "3 weeks"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Engineer",
      company: "Google",
      image: "/api/placeholder/80/80",
      rating: 5,
      scoreBefore: "38%",
      scoreAfter: "94%",
      quote: "The keyword analysis was a game-changer. I had no idea my resume was missing so many important technical terms. Now I'm at Google!",
      outcome: "Senior Engineer position",
      timeframe: "6 weeks"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Salesforce",
      image: "/api/placeholder/80/80", 
      rating: 5,
      scoreBefore: "51%",
      scoreAfter: "87%",
      quote: "The before-and-after comparison showed me exactly what recruiters look for. My interview rate increased by 300% after using ResumeAI.",
      outcome: "40% salary increase",
      timeframe: "4 weeks"
    },
    {
      id: 4,
      name: "David Park",
      role: "Data Scientist",
      company: "Netflix",
      image: "/api/placeholder/80/80",
      rating: 5,
      scoreBefore: "45%",
      scoreAfter: "91%",
      quote: "Finally, a tool that understands ATS systems. The suggestions were spot-on and helped me highlight my achievements better.",
      outcome: "Lead Data Scientist role",
      timeframe: "5 weeks"
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "UX Designer",
      company: "Adobe",
      image: "/api/placeholder/80/80",
      rating: 5,
      scoreBefore: "39%",
      scoreAfter: "86%",
      quote: "I was skeptical at first, but the results speak for themselves. The formatting tips alone made my resume look so much more professional.",
      outcome: "Senior UX Designer",
      timeframe: "2 weeks"
    },
    {
      id: 6,
      name: "Robert Thompson",
      role: "Finance Manager",
      company: "JP Morgan",
      image: "/api/placeholder/80/80",
      rating: 5,
      scoreBefore: "44%",
      scoreAfter: "88%",
      quote: "The industry-specific recommendations were incredibly valuable. ResumeAI knows what finance recruiters are looking for.",
      outcome: "VP Finance track",
      timeframe: "7 weeks"
    }
  ];

  const stats = [
    { value: "89%", label: "Average ATS Score Improvement" },
    { value: "4.2x", label: "Increase in Interview Rate" },
    { value: "15K+", label: "Successful Job Placements" },
    { value: "92%", label: "User Satisfaction Rate" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-warning fill-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Success Stories</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of professionals who've transformed their careers with AI-powered resume optimization
        </p>
      </div>

      {/* Stats */}
      <Card className="p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary font-semibold">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role} at {testimonial.company}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>

            {/* Score Improvement */}
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-destructive">{testimonial.scoreBefore}</div>
                <div className="text-xs text-muted-foreground">Before</div>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
              <div className="text-center">
                <div className="text-lg font-bold text-success">{testimonial.scoreAfter}</div>
                <div className="text-xs text-muted-foreground">After</div>
              </div>
            </div>

            {/* Quote */}
            <div className="space-y-3">
              <Quote className="w-6 h-6 text-primary/50" />
              <p className="text-sm italic text-muted-foreground leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Outcome */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">{testimonial.outcome}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Success in {testimonial.timeframe}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5">
        <h3 className="text-2xl font-bold mb-4">Ready to Join Them?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Start your resume transformation today and see results like these professionals. 
          Get your personalized ATS analysis in under 3 minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {renderStars(5)}
            <span>4.9/5 from 2,847 reviews</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Testimonials;