import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, Beaker, Award, CheckCircle, Target, Calendar, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api, ProgramItem } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

export default function Programs() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [programsError, setProgramsError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const loadPrograms = useCallback(async () => {
    setIsLoadingPrograms(true);
    try {
      const { items } = await api.programs.list("active");
      if (!isMountedRef.current) return;
      setPrograms(items);
      setProgramsError(null);
    } catch (err) {
      if (!isMountedRef.current) return;
      const message =
        err instanceof ApiError
          ? err.message
          : "Unable to load programs right now. Please try again later.";
      setProgramsError(message);
      toast.error(message);
    } finally {
      if (!isMountedRef.current) return;
      setIsLoadingPrograms(false);
    }
  }, []);

  useEffect(() => {
    loadPrograms();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadPrograms]);

  const formatDate = (value?: string) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateRange = (start?: string, end?: string) => {
    const formattedStart = formatDate(start);
    const formattedEnd = formatDate(end);

    if (formattedStart && formattedEnd) {
      return `${formattedStart} – ${formattedEnd}`;
    }

    return formattedStart || formattedEnd || "Date to be announced";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Academic Excellence Award Scheme
              </h1>
              <p className="text-lg text-muted-foreground">
                Celebrating outstanding academic achievement across the Teberebie Electoral Area
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Program Overview</h2>
              <p className="text-muted-foreground text-lg">
                The Academic Excellence Award Scheme is our flagship program designed to recognize and reward outstanding academic performance among Junior High School students in the Teberebie Electoral Area. By focusing on three core subjects—English, Mathematics, and Integrated Science—we aim to motivate students, foster healthy competition, and elevate educational standards across all participating schools.
              </p>
            </div>
          </div>
        </section>

        {/* Active Programs */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Active Programs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Latest initiatives sourced directly from our backend, ensuring the information
                you see is always accurate and up to date.
              </p>
            </div>

            {isLoadingPrograms ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <div className="h-5 w-24 rounded bg-muted" />
                      <div className="h-6 w-3/4 rounded bg-muted mt-4" />
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="h-3 w-full rounded bg-muted" />
                      <div className="h-3 w-5/6 rounded bg-muted" />
                      <div className="h-3 w-2/3 rounded bg-muted" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : programsError ? (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive text-xl">Unable to load programs</CardTitle>
                  <CardDescription>{programsError}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={loadPrograms}>
                    Retry
                  </Button>
                </CardContent>
              </Card>
            ) : programs.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">No active programs at the moment</CardTitle>
                  <CardDescription>
                    Our team is preparing the next phase of initiatives. Check back soon for new opportunities.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <Card key={program._id} className="border-2 hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="uppercase tracking-wide text-xs">
                          {program.status}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-2 h-4 w-4" />
                          {formatDateRange(program.startDate, program.endDate)}
                        </div>
                      </div>
                      <CardTitle className="mt-4 text-xl">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-muted-foreground">
                        {program.description}
                      </CardDescription>
                      {program.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-2 h-4 w-4" />
                          {program.location}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Objectives */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Program Objectives
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border-2">
                <CardHeader>
                  <Target className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Motivate Students</CardTitle>
                  <CardDescription>
                    Inspire JHS students to pursue academic excellence through recognition and rewards, creating a culture of achievement that extends beyond the classroom.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Award className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle>Foster Competition</CardTitle>
                  <CardDescription>
                    Encourage healthy academic competition among schools and students, raising the overall standard of education in the electoral area.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CheckCircle className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Reward Excellence</CardTitle>
                  <CardDescription>
                    Recognize and celebrate students who demonstrate exceptional performance in key academic subjects that form the foundation of learning.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Subject Areas */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Award Categories
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Excellence is recognized across three fundamental subject areas
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <BookOpen className="h-16 w-16 text-primary mb-4" />
                  <CardTitle className="text-2xl">English Language</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Recognizing excellence in communication, reading comprehension, writing skills, and language proficiency.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Reading comprehension</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Written expression</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Oral communication</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <Calculator className="h-16 w-16 text-secondary mb-4" />
                  <CardTitle className="text-2xl">Mathematics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Celebrating proficiency in problem-solving, logical reasoning, and mathematical concepts.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Problem-solving skills</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Logical reasoning</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                      <span>Numerical analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <Beaker className="h-16 w-16 text-primary mb-4" />
                  <CardTitle className="text-2xl">Integrated Science</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Honoring achievement in scientific inquiry, experimentation, and understanding of natural phenomena.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Scientific method</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Critical thinking</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      <span>Practical application</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight mb-8">Selection Criteria</h2>
              
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">How Students Are Selected</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Academic Performance</h3>
                        <p className="text-sm text-muted-foreground">
                          Students must demonstrate consistently high academic performance in their respective subject areas throughout the academic year.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">School Nomination</h3>
                        <p className="text-sm text-muted-foreground">
                          Schools nominate their top-performing students in each subject category based on continuous assessment and examination results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Verification Process</h3>
                        <p className="text-sm text-muted-foreground">
                          The foundation reviews nominations and verifies academic records to ensure fairness and accuracy in the selection process.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Character Assessment</h3>
                        <p className="text-sm text-muted-foreground">
                          While academic excellence is paramount, students must also demonstrate good character and positive contribution to their school community.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Scope */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Program Scope</h2>
              <p className="text-muted-foreground text-lg">
                The Academic Excellence Award Scheme currently covers all Junior High Schools within the Teberebie Electoral Area, creating a comprehensive network of academic excellence and healthy competition across the community.
              </p>
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-primary">15+</div>
                      <div className="text-sm text-muted-foreground">Participating Schools</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-secondary">3</div>
                      <div className="text-sm text-muted-foreground">Subject Categories</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">JHS Coverage</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Support Our Mission
              </h2>
              <p className="text-lg text-muted-foreground">
                Help us expand our programs and reach more students across the community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">Make a Donation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
