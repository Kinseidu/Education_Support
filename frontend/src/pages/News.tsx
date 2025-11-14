import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ArrowRight, AlertCircle } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api, NewsArticle } from "@/lib/api";
import { ApiError } from "@/lib/apiClient";

// Security: Email validation schema
const newsletterSchema = z.object({
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
});

export default function News() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const loadNews = useCallback(async () => {
    setIsLoadingNews(true);
    try {
      const { items } = await api.news.list("published");
      if (!isMountedRef.current) return;
      setNewsItems(items);
      setNewsError(null);
    } catch (fetchError) {
      if (!isMountedRef.current) return;
      const message =
        fetchError instanceof ApiError
          ? fetchError.message
          : "Unable to load news at the moment. Please try again later.";
      setNewsError(message);
      toast.error(message);
    } finally {
      if (!isMountedRef.current) return;
      setIsLoadingNews(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadNews]);

  const formatDate = (value?: string) => {
    if (!value) {
      return "Date to be announced";
    }
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

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Security: Validate and sanitize email
      const validatedData = newsletterSchema.parse({ email });

      await api.newsletter.subscribe(validatedData);

      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationMessage = err.errors[0]?.message ?? "Invalid email address.";
        setError(validationMessage);
        toast.error(validationMessage);
      } else if (err instanceof ApiError) {
        const apiMessage = err.message || "Subscription failed. Please try again.";
        const fieldErrors = err.errors ?? {};
        if (fieldErrors.email) {
          setError(Array.isArray(fieldErrors.email) ? fieldErrors.email.join(" ") : fieldErrors.email);
        }
        toast.error(apiMessage);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
                News & Updates
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay informed about our latest programs, events, and success stories
              </p>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 md:py-24">
          <div className="container">
            <Card className="border-2 border-primary mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-l-lg flex items-center justify-center p-12">
                  <div className="text-center space-y-4">
                    <div className="text-6xl font-bold text-primary">2024</div>
                    <div className="text-2xl font-semibold">Awards Ceremony</div>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>March 15, 2024</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">Featured</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    Annual Academic Excellence Awards Ceremony
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Join us for our most anticipated event of the year as we celebrate the remarkable achievements of students across all JHS schools in the Teberebie Electoral Area. This year's ceremony promises to be our biggest yet, with special guest speakers and expanded recognition categories.
                  </p>
                  <Button>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* News Grid */}
            {isLoadingNews ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="h-5 w-16 rounded-full bg-muted" />
                        <div className="h-3 w-24 rounded-full bg-muted" />
                      </div>
                      <div className="h-5 w-3/4 rounded bg-muted" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-muted" />
                        <div className="h-3 w-5/6 rounded bg-muted" />
                        <div className="h-3 w-2/3 rounded bg-muted" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : newsError ? (
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive text-xl">Unable to load news</CardTitle>
                  <CardDescription>{newsError}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={loadNews} variant="outline">
                    Retry
                  </Button>
                </CardContent>
              </Card>
            ) : newsItems.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">No news available yet</CardTitle>
                  <CardDescription>
                    Check back soon for the latest updates from the Academic Excellence Award Scheme.
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {newsItems.map((item) => (
                  <Card key={item._id} className="hover:border-primary transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                          {item.category || "Updates"}
                        </span>
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span className="text-xs">{formatDate(item.publishedAt || item.createdAt)}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4 text-muted-foreground">
                        {item.excerpt || item.content?.slice(0, 140) || "Read the latest from our team."}
                        {item.content && item.content.length > 140 ? "…" : ""}
                      </CardDescription>
                      <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <Card className="border-2">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Stay Updated</CardTitle>
                  <CardDescription>
                    Subscribe to our newsletter for the latest news, events, and success stories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          maxLength={255}
                          aria-invalid={!!error}
                          aria-describedby={error ? "email-error" : undefined}
                          required
                        />
                        {error && (
                          <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                          </p>
                        )}
                      </div>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
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
