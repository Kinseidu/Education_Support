import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Eye, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                About Adomako EduSupport Foundation
              </h1>
              <p className="text-lg text-muted-foreground">
                Building a brighter future through education and academic excellence
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
              <p className="text-muted-foreground text-lg">
                The Adomako EduSupport Foundation was born from a deep commitment to educational excellence and community development. Recognizing the transformative power of quality education, our founder envisioned a foundation that would not only celebrate academic achievement but also inspire and motivate students across the Teberebie Electoral Area to reach their full potential.
              </p>
              <p className="text-muted-foreground text-lg">
                Through the Academic Excellence Award Scheme, we have created a platform that recognizes outstanding performance in English, Mathematics, and Integrated Science. Our program has grown to encompass all JHS schools in the area, fostering healthy competition and driving academic excellence across the community.
              </p>
              <blockquote className="border-l-4 border-primary pl-6 italic text-lg my-8">
                "Education is the most powerful weapon which you can use to change the world. Through our awards and programs, we aim to unlock the potential within every student."
                <footer className="text-sm text-muted-foreground mt-2">- Founder's Vision</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2">
                <CardHeader>
                  <Heart className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To promote and celebrate academic excellence among Junior High School students in the Teberebie Electoral Area by providing recognition, motivation, and support that empowers them to achieve their educational goals and contribute positively to society.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Eye className="h-12 w-12 text-secondary mb-4" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A community where every student has the opportunity to excel academically, where educational achievement is celebrated, and where the pursuit of knowledge is supported by engaged families, schools, and community partners working together for student success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Excellence</CardTitle>
                  <CardDescription>
                    We celebrate and promote the highest standards of academic achievement
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Equity</CardTitle>
                  <CardDescription>
                    Every student deserves equal opportunities to succeed and be recognized
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Community</CardTitle>
                  <CardDescription>
                    We believe in the power of community support and collaboration
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <Eye className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Integrity</CardTitle>
                  <CardDescription>
                    We maintain transparency and fairness in all our programs and operations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Our Impact
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary">500+</div>
                <div className="text-muted-foreground">Students Awarded</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-secondary">15</div>
                <div className="text-muted-foreground">Schools Reached</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-primary">5</div>
                <div className="text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
