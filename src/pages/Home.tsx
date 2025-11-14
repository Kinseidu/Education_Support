import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Award, Target, Users, TrendingUp, BookOpen, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Promoting Academic Excellence in
                <span className="text-primary"> Teberebie Electoral Area</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Supporting students, rewarding excellence, and building a brighter future through education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/programs">Learn About Our Programs</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Get Involved</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Objectives
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The Academic Excellence Award Scheme aims to transform education in our community
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Motivate Students</CardTitle>
                  <CardDescription>
                    Inspire students to excel academically and reach their full potential
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle>Foster Competition</CardTitle>
                  <CardDescription>
                    Create healthy academic competition that drives excellence across all schools
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Award className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Reward Excellence</CardTitle>
                  <CardDescription>
                    Recognize and celebrate outstanding academic achievements in core subjects
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Academic Excellence Award Section */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Academic Excellence Award Scheme
                </h2>
                <p className="text-muted-foreground text-lg">
                  Our flagship program recognizes outstanding students across all JHS schools in the Teberebie Electoral Area. We celebrate excellence in three core subjects that form the foundation of academic success.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">English Language</h3>
                      <p className="text-sm text-muted-foreground">Communication and literacy excellence</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-secondary mt-1" />
                    <div>
                      <h3 className="font-semibold">Mathematics</h3>
                      <p className="text-sm text-muted-foreground">Problem-solving and analytical thinking</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <BookOpen className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold">Integrated Science</h3>
                      <p className="text-sm text-muted-foreground">Scientific inquiry and discovery</p>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg">
                  <Link to="/programs">View Full Program Details</Link>
                </Button>
              </div>

              <div className="relative">
                <Card className="border-2">
                  <CardHeader>
                    <Trophy className="h-16 w-16 text-primary mb-4" />
                    <CardTitle className="text-2xl">Award Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="font-medium">English Excellence</span>
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="font-medium">Mathematics Excellence</span>
                      <Award className="h-5 w-5 text-secondary" />
                    </div>
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <span className="font-medium">Science Excellence</span>
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Get Involved
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join us in making a difference in the lives of students and the future of education
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Donate</CardTitle>
                  <CardDescription>
                    Support our programs with a financial contribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/contact">Donate Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <CardTitle>Volunteer</CardTitle>
                  <CardDescription>
                    Share your time and expertise with students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Join Us</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Partner</CardTitle>
                  <CardDescription>
                    Collaborate with us to expand our reach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">Partner With Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
