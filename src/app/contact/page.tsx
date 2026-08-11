import { Suspense } from "react";
import { Mail, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "./contact-form";
import { ThreeDWorld } from "@/components/three-d-world";

export const metadata = {
  title: "Contact — ActionMyService",
  description:
    "Have an idea? Let's build it. Tell us what you want to create and let's turn the idea into a digital experience.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen relative">
      <ThreeDWorld />
      <div className="relative z-10">
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container-site">
          <p className="text-sm font-medium text-muted-foreground mb-4">Contact</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">
            Have an Idea? Let's Build It.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            Tell us what you want to create and let's turn the idea into a
            digital experience.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Start a Project
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <p className="text-sm text-muted-foreground">
                      hello@actionmyservice.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Response Time</p>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24–48 hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">What to Include</p>
                    <p className="text-sm text-muted-foreground">
                      Share your project idea, goals, timeline and any references
                      you like.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Suspense fallback={<div className="rounded-2xl border border-border bg-card p-10">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}