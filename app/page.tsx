"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Sparkles, Users, Calendar, ArrowRight, Star, Zap, MessageSquareHeart, ChevronDown } from "lucide-react"
import { Header } from "@/components/header"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pale-purple/30 via-mimi-pink/20 to-white"></div>
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-pale-purple/40 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-mimi-pink/30 blur-3xl"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-misty-rose/30 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Matchmaking Reimagined</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-outfit mb-6 leading-tight">
                Find Your <span className="text-primary">Vibe</span> and Make Meaningful Connections
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Create and join interactive matchmaking events that connect people through shared interests,
                questionnaires, and real-time activities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/host">
                  <Button
                    size="lg"
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6"
                  >
                    Host an Event
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/join">
                  <Button size="lg" variant="outline" className="gap-2 border-2 rounded-full px-6">
                    Join an Event
                    <Users className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 mt-10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-mimi-pink flex items-center justify-center"
                    >
                      <Users className="w-5 h-5 text-secondary-foreground" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">1,200+</span> successful matches this month
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 relative"
            >
              <div className="relative z-10">
                <div className="relative w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-pastel-horizontal rounded-3xl blur-xl opacity-70 -z-10 transform rotate-3"></div>
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-mimi-pink/30">
                    <div className="p-6 bg-gradient-pastel-horizontal">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Heart className="w-6 h-6 text-secondary-foreground" />
                          <h3 className="font-semibold text-lg">Summer Vibes Mixer</h3>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/80 text-xs font-medium">Live Now</div>
                      </div>

                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Today, 7:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>42 Participants</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Your Match is Ready!</h4>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-pale-purple flex items-center justify-center">
                            <Users className="w-8 h-8 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">Alex</div>
                            <div className="text-sm text-muted-foreground">Based on your questionnaire</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="rounded-full">
                          View Profile
                        </Button>
                        <Button
                          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          size="sm"
                        >
                          Express Interest
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 blob-shape bg-nyanza-light animate-float"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute -top-10 -left-10 w-32 h-32 blob-shape-alt bg-misty-rose animate-float"
                  style={{ animationDelay: "0.8s" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">How FYV Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to create and join matchmaking events that bring people together through
                shared interests and real-time activities.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-primary" />,
                title: "Create or Join Events",
                description:
                  "Hosts can create custom events while participants can easily join with a code or QR scan.",
                color: "bg-pale-purple",
                delay: 0,
              },
              {
                icon: <MessageSquareHeart className="w-10 h-10 text-primary" />,
                title: "Answer Questionnaires",
                description: "Participants answer fun questions that help our algorithm find their perfect match.",
                color: "bg-mimi-pink",
                delay: 0.2,
              },
              {
                icon: <Zap className="w-10 h-10 text-primary" />,
                title: "Real-time Matching",
                description: "Watch the countdown and discover your matches during the event.",
                color: "bg-misty-rose",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background to-pale-purple/20 rounded-3xl transform group-hover:scale-[1.03] transition-transform duration-300 -z-10"></div>
                <div className="bg-white rounded-3xl p-8 border border-muted shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-pale-purple/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Success Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from people who found their perfect match through our platform.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I met my partner at a FYV event last summer. The questionnaire really helped match us based on our shared interests!",
                name: "Jamie & Alex",
                role: "Met at Summer Mixer 2024",
                delay: 0,
              },
              {
                quote:
                  "As an event host, I've seen countless successful matches. The platform makes it so easy to bring people together.",
                name: "Taylor",
                role: "Event Host",
                delay: 0.2,
              },
              {
                quote:
                  "The outfit rating feature was so fun! It gave us something to talk about when we first met at the event.",
                name: "Jordan & Riley",
                role: "Met at Fashion Forward 2024",
                delay: 0.4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: testimonial.delay }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-muted relative"
              >
                <div className="absolute top-4 right-4 text-mimi-pink">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="mb-6 text-muted-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-mimi-pink flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-pastel-horizontal -z-10"></div>

            <div className="relative z-10 py-16 px-8 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6 text-slate-900">
                Ready to Find Your Vibe?
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto mb-8">
                Join thousands of others who have found meaningful connections through our platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/host">
                  <Button 
                    size="lg" 
                    className="gap-2 bg-primary text-white hover:bg-primary/90 rounded-full px-6"
                  >
                    Host an Event
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/join">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-2 border-primary text-primary hover:bg-primary/10 rounded-full px-6"
                  >
                    Join an Event
                    <Users className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="absolute -bottom-10 right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
              <div className="absolute -top-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold font-outfit">Find Your Vibe</span>
            </div>

            <div className="flex flex-wrap gap-8 justify-center">
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>

            <div className="mt-6 md:mt-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Find Your Vibe. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

