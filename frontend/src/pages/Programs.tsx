import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Calculator, Beaker, Award, CheckCircle, Target, Calendar, MapPin, ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { api, ProgramItem } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";
import DonationContactDialog from "@/components/DonationContactDialog";

export default function Programs() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);
  const [programsError, setProgramsError] = useState<string | null>(null);
  
  const [contactInfo, setContactInfo] = useState<{
    founderPhone?: string;
    whatsappNumber?: string;
    founderEmail?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"donation" | "partnership" | "volunteer">("donation");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
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

  const goToPrevious = () => {
    setCarouselIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCarouselIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  useEffect(() => {
    loadPrograms();
    let mounted = true;
    (async () => {
      try {
        const resp = await api.contactInfo.get();
        if (mounted) setContactInfo(resp.data);
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
      isMountedRef.current = false;
    };
  }, [loadPrograms]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && lightboxImageIndex > 0) setLightboxImageIndex(lightboxImageIndex - 1);
      if (e.key === "ArrowRight" && lightboxImageIndex < programs.length - 1) setLightboxImageIndex(lightboxImageIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxImageIndex, programs.length]);

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

        {/* Active Programs - Carousel View */}
        {programs.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/40">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Active Programs
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our latest initiatives. Click on any image to view the full flyer.
                </p>
              </div>

              {/* Carousel for multiple programs */}
              {programs.length > 1 && (
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    className="rounded-full"
                    aria-label="Previous program"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-2">
                    {programs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCarouselIndex(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === carouselIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to program ${index + 1}`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    className="rounded-full"
                    aria-label="Next program"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Main carousel card with animation */}
              <div id="program-featured" className="max-w-4xl mx-auto">
                {isLoadingPrograms ? (
                  <Card className="animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <CardHeader>
                      <div className="h-6 w-3/4 rounded bg-muted" />
                      <div className="h-4 w-1/2 rounded bg-muted mt-2" />
                    </CardHeader>
                  </Card>
                ) : programsError ? (
                  <Card className="border-destructive/50">
                    <CardHeader>
                      <CardTitle className="text-destructive">Unable to load programs</CardTitle>
                      <CardDescription>{programsError}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" onClick={loadPrograms}>
                        Retry
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    <Card className="border-2 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex md:items-stretch">
                        {programs[carouselIndex].coverImageUrl && (
                          <div
                            className="md:w-1/2 w-full h-56 md:h-72 relative group cursor-pointer overflow-hidden bg-muted"
                            onClick={() => openLightbox(carouselIndex)}
                          >
                            <img
                              src={programs[carouselIndex].coverImageUrl}
                              alt={programs[carouselIndex].title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect fill='%23ddd' width='200' height='120'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23666'%3EImage not found%3C/text%3E%3C/svg%3E";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        )}

                        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
                          <div>
                            <CardHeader className="p-0">
                              <div className="flex items-center justify-between mb-4">
                                <Badge variant="secondary" className="uppercase tracking-wide text-xs">
                                  {programs[carouselIndex].status}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {formatDateRange(programs[carouselIndex].startDate, programs[carouselIndex].endDate)}
                                </div>
                              </div>
                              <CardTitle className="text-2xl md:text-3xl">{programs[carouselIndex].title}</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-4 p-0 mt-3">
                              <CardDescription className="text-base text-muted-foreground">
                                {programs[carouselIndex].description}
                              </CardDescription>
                              {programs[carouselIndex].location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-2 h-4 w-4" />
                                  {programs[carouselIndex].location}
                                </div>
                              )}
                            </CardContent>
                          </div>

                          {programs[carouselIndex].coverImageUrl && (
                            <div className="mt-4">
                              <Button onClick={() => openLightbox(carouselIndex)} className="w-full" size="lg">
                                <Maximize2 className="mr-2 h-4 w-4" />
                                View Full Flyer
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>

              {/* Grid view for all programs */}
              {programs.length > 1 && (
                <div className="mt-16">
                  <h3 className="text-xl font-semibold mb-8">All Programs</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {programs.map((program, index) => (
                      <div
                        key={program._id}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Card
                          className={`border-2 overflow-hidden hover:border-primary transition-all cursor-pointer h-full flex flex-col hover:shadow-lg ${
                            index === carouselIndex ? "ring-2 ring-primary" : ""
                          }`}
                          onClick={() => setCarouselIndex(index)}
                        >
                          {program.coverImageUrl && (
                            <div
                              className="relative group overflow-hidden bg-muted"
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCarouselIndex(index);
                                // scroll featured into view
                                document.getElementById('program-featured')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setCarouselIndex(index);
                                  document.getElementById('program-featured')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }
                              }}
                            >
                              <img
                                src={program.coverImageUrl}
                                alt={program.title}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3C/svg%3E";
                                }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <Maximize2 className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          )}
                          <CardHeader className="flex-1">
                            <Badge variant="secondary" className="w-fit uppercase tracking-wide text-xs mb-2">
                              {program.status}
                            </Badge>
                            <CardTitle className="text-lg">{program.title}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-2 flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {formatDateRange(program.startDate, program.endDate)}
                            </p>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <CardDescription className="text-sm line-clamp-2">
                              {program.description}
                            </CardDescription>
                            {program.location && (
                              <div className="flex items-start text-xs text-muted-foreground gap-2">
                                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{program.location}</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoadingPrograms && programs.length === 0 && !programsError && (
          <section className="py-16 md:py-24 bg-muted/40">
            <div className="container">
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">No active programs at the moment</CardTitle>
                  <CardDescription className="text-base">
                    Our team is preparing the next phase of initiatives. Check back soon for new opportunities.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>
        )}

        {/* Error State */}
        {programsError && (
          <section className="py-16 md:py-24 bg-muted/40">
            <div className="container">
              <Card className="border-destructive/50 max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-destructive">Unable to load programs</CardTitle>
                  <CardDescription>{programsError}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" onClick={loadPrograms}>
                    Retry
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

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
                    <div className="w-full sm:w-auto">
                      <Button size="lg" onClick={() => { setDialogMode("donation"); setDialogOpen(true); }}>
                        Make a Donation
                      </Button>
                    </div>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/about">Learn More</Link>
                    </Button>
                  </div>
            </div>
          </div>
        </section>
          <DonationContactDialog open={dialogOpen} onOpenChange={setDialogOpen} mode={dialogMode} />
      </main>

      {/* Lightbox Modal */}
      {lightboxOpen && programs[lightboxImageIndex]?.coverImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              <img
                src={programs[lightboxImageIndex].coverImageUrl}
                alt={programs[lightboxImageIndex].title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Program info below image */}
            <div className="bg-background border-t p-6 mt-4">
              <div className="space-y-3">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {programs[lightboxImageIndex].status}
                  </Badge>
                  <h3 className="text-2xl font-bold">{programs[lightboxImageIndex].title}</h3>
                </div>
                <p className="text-muted-foreground">{programs[lightboxImageIndex].description}</p>
                {programs[lightboxImageIndex].location && (
                  <div className="flex items-center text-sm text-muted-foreground gap-2">
                    <MapPin className="h-4 w-4" />
                    {programs[lightboxImageIndex].location}
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDateRange(programs[lightboxImageIndex].startDate, programs[lightboxImageIndex].endDate)}
                </div>
              </div>
            </div>

            {/* Navigation */}
            {programs.length > 1 && (
              <div className="flex items-center justify-between p-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setLightboxImageIndex((prev) => (prev === 0 ? programs.length - 1 : prev - 1))}
                  disabled={programs.length <= 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  {lightboxImageIndex + 1} of {programs.length}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setLightboxImageIndex((prev) => (prev === programs.length - 1 ? 0 : prev + 1))}
                  disabled={programs.length <= 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Keyboard hint */}
            <div className="text-center text-xs text-muted-foreground mt-4">
              Press <kbd className="px-2 py-1 bg-muted rounded">ESC</kbd> to close, use arrow keys to navigate
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
