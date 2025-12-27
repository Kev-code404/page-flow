// HPI 1.6-V
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Lightbulb, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

// --- Canonical Data Sources ---
// Preserving original data structures while enhancing for the new layout
const BRANDS_DATA = ['Brand1', 'Brand2', 'Brand3'];

const FEATURES_DATA = [
  {
    id: 'feat-1',
    icon: Lightbulb,
    title: 'Intelligent Applications',
    description: 'Build smart, high-performing applications designed to scale your business. From interactive workflows, enhance productivity and streamline operations.',
    variant: 'default'
  },
  {
    id: 'feat-2',
    icon: Zap,
    title: 'Intelligent Applications',
    description: 'Build smart, high-performing applications designed to scale your business. From interactive workflows, enhance productivity and streamline operations.',
    variant: 'featured' // The middle blue card from the image
  },
  {
    id: 'feat-3',
    icon: Target,
    title: 'Intelligent Applications',
    description: 'Build smart, high-performing applications designed to scale your business. From interactive workflows, enhance productivity and streamline operations.',
    variant: 'default'
  }
];

const STATS_DATA = [
  { value: '500+', label: 'Projects Delivered', icon: CheckCircle2 },
  { value: '98%', label: 'Client Satisfaction', icon: Users },
  { value: '50+', label: 'Expert Team', icon: Globe },
  { value: '24/7', label: 'Support Available', icon: ShieldCheck },
];

// --- Utility Components ---

// Mandatory Intersection Observer Component for "Unfolding Narrative"
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(30px)';
        case 'left': return 'translateX(-30px)';
        case 'right': return 'translateX(30px)';
        default: return 'none';
      }
    }
    return 'translate(0)';
  };

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out will-change-transform`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Parallax Image Component
const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={1200}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---

export default function HomePage() {
  // Scroll progress for global effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-paragraph overflow-clip selection:bg-primary selection:text-white">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />

      <main className="flex flex-col w-full">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-light-blue/30 -skew-x-12 translate-x-1/4 -z-10 hidden lg:block" />
          
          <div className="max-w-[120rem] mx-auto px-6 lg:px-16 w-full h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center h-full">
              
              {/* Left Content */}
              <div className="flex flex-col justify-center space-y-8 z-10 py-12 lg:py-0">
                <AnimatedElement direction="left" delay={100}>
                  <div className="inline-flex items-center space-x-2 bg-light-blue px-4 py-2 rounded-full mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-sm font-medium tracking-wide uppercase">Future of IT</span>
                  </div>
                </AnimatedElement>

                <AnimatedElement direction="up" delay={200}>
                  <h1 className="font-heading text-5xl lg:text-7xl text-foreground leading-[1.1] tracking-tight">
                    Build A <span className="text-primary relative inline-block">
                      Future
                      <svg className="absolute w-full h-3 -bottom-1 left-0 text-light-blue -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                      </svg>
                    </span>
                    <br />
                    Powered By <span className="text-primary">Expertise</span>
                  </h1>
                </AnimatedElement>
                
                <AnimatedElement direction="up" delay={300}>
                  <p className="font-paragraph text-lg lg:text-xl text-secondary max-w-xl leading-relaxed">
                    Advance your journey with professional IT services and personalized career guidance that help you reach your fullest potential.
                  </p>
                </AnimatedElement>
                
                <AnimatedElement direction="up" delay={400}>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg font-medium shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40">
                      Start Your Project
                    </Button>
                    <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 rounded-full px-10 py-7 text-lg font-medium transition-all hover:scale-105">
                      Get Career Help
                    </Button>
                  </div>
                </AnimatedElement>

                <AnimatedElement direction="up" delay={500}>
                  <div className="flex items-center gap-4 pt-8 text-sm text-secondary">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                           <Image 
                             src={`https://static.wixstatic.com/media/c8ce01_473cbc6cce03408e8e30cbc6ad5cbcd0~mv2.png?id=avatar-${i}`}
                             alt="User avatar"
                             className="w-full h-full object-cover opacity-80"
                           />
                        </div>
                      ))}
                    </div>
                    <p>Trusted by <span className="font-bold text-foreground">2,000+</span> professionals</p>
                  </div>
                </AnimatedElement>
              </div>

              {/* Right Image - Hero */}
              <div className="relative h-full flex items-center justify-center lg:justify-end">
                <AnimatedElement direction="right" delay={300} className="relative w-full max-w-2xl aspect-[4/3] lg:aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] transform rotate-3 scale-105 blur-2xl" />
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                    <ParallaxImage 
                      src="https://static.wixstatic.com/media/c8ce01_473cbc6cce03408e8e30cbc6ad5cbcd0~mv2.png?id=hero-main"
                      alt="Team collaboration in modern office workspace"
                      className="w-full h-full"
                    />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50 max-w-xs hidden md:block">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <BarChart3 size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-secondary font-medium">Growth Rate</p>
                          <p className="text-lg font-bold text-foreground">+124%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </section>

        {/* --- BRANDS SECTION --- */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
            <AnimatedElement className="text-center mb-12">
              <h2 className="font-heading text-2xl lg:text-3xl text-foreground">
                Brands that Trust our <span className="text-primary">IT Solutions</span>
              </h2>
            </AnimatedElement>

            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {BRANDS_DATA.map((brand, index) => (
                <AnimatedElement key={brand} delay={index * 100} direction="up">
                  <div className="group cursor-pointer">
                    <span className="font-heading text-4xl lg:text-5xl text-gray-300 group-hover:text-primary transition-colors duration-300 italic font-black tracking-tighter">
                      {brand}
                    </span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION (Engineered for Growth) --- */}
        <section className="py-32 bg-background relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div className="absolute -left-64 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

          <div className="max-w-[120rem] mx-auto px-6 lg:px-16 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <AnimatedElement>
                <h2 className="font-heading text-4xl lg:text-6xl text-foreground leading-tight">
                  Engineered for
                  <br />
                  Business <span className="text-primary">Growth</span>
                </h2>
              </AnimatedElement>
              
              <AnimatedElement delay={200} className="lg:max-w-md">
                <p className="font-paragraph text-lg text-secondary">
                  Delivering reliable, scalable technology with speed and innovation so your business stays agile and ahead in a rapidly evolving digital landscape.
                </p>
              </AnimatedElement>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {FEATURES_DATA.map((feature, index) => (
                <AnimatedElement key={feature.id} delay={index * 150} direction="up">
                  <div 
                    className={`
                      group relative h-full p-8 lg:p-10 rounded-[2rem] transition-all duration-500
                      ${feature.variant === 'featured' 
                        ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                        : 'bg-white text-foreground hover:shadow-xl hover:-translate-y-2 border border-gray-100'
                      }
                    `}
                  >
                    {/* Icon */}
                    <div 
                      className={`
                        w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-2xl transition-transform duration-500 group-hover:scale-110
                        ${feature.variant === 'featured' 
                          ? 'bg-white/20 text-white' 
                          : 'bg-light-blue text-primary'
                        }
                      `}
                    >
                      <feature.icon size={32} strokeWidth={1.5} />
                    </div>

                    <h3 className={`font-heading text-2xl mb-4 ${feature.variant === 'featured' ? 'text-white' : 'text-foreground'}`}>
                      {feature.title}
                    </h3>
                    
                    <p className={`font-paragraph text-base mb-10 leading-relaxed ${feature.variant === 'featured' ? 'text-white/90' : 'text-secondary'}`}>
                      {feature.description}
                    </p>

                    <div className="mt-auto">
                      <Button 
                        variant={feature.variant === 'featured' ? 'secondary' : 'outline'}
                        className={`
                          rounded-full px-6 py-6 w-full justify-between group-hover:px-8 transition-all duration-300
                          ${feature.variant === 'featured' 
                            ? 'bg-white text-primary hover:bg-white/90' 
                            : 'border-primary text-primary hover:bg-primary/5'
                          }
                        `}
                      >
                        <span className="font-medium">Learn more</span>
                        <ArrowRight size={18} />
                      </Button>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS & IMPACT SECTION (Sticky Layout) --- */}
        <section className="py-32 bg-white relative">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Sticky Left Content */}
              <div className="relative">
                <div className="sticky top-32">
                  <AnimatedElement>
                    <div className="w-16 h-1 bg-primary mb-8" />
                    <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
                      Delivering smart technology with speed and outcomes.
                    </h2>
                    <p className="font-paragraph text-xl text-secondary mb-10 leading-relaxed">
                      Our team of experts combines cutting-edge technology with industry best practices to deliver solutions that drive real business results. We don't just build software; we build your future.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                      {['Agile Development', 'Cloud Native Solutions', 'Enterprise Security', '24/7 Maintenance'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                          <CheckCircle2 className="text-primary w-5 h-5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg font-medium shadow-lg shadow-primary/25">
                      Get Started Today
                    </Button>
                  </AnimatedElement>
                </div>
              </div>

              {/* Right Grid Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {STATS_DATA.map((stat, index) => (
                  <AnimatedElement key={index} delay={index * 100} direction="up">
                    <div className="bg-light-blue/30 p-8 rounded-[2rem] hover:bg-light-blue/60 transition-colors duration-300 h-full flex flex-col justify-center items-center text-center group border border-transparent hover:border-primary/10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-5xl lg:text-6xl text-primary mb-2 font-bold tracking-tight">
                        {stat.value}
                      </h3>
                      <p className="font-paragraph text-lg text-foreground font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </AnimatedElement>
                ))}
                
                {/* Additional Visual Block */}
                <AnimatedElement delay={400} className="sm:col-span-2 mt-6">
                  <div className="relative rounded-[2rem] overflow-hidden h-64 w-full group">
                    <div className="absolute inset-0 bg-primary/90 mix-blend-multiply z-10 transition-opacity duration-500 group-hover:opacity-80" />
                    <Image 
                      src="https://static.wixstatic.com/media/c8ce01_473cbc6cce03408e8e30cbc6ad5cbcd0~mv2.png?id=stats-bg"
                      alt="Office culture"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <p className="text-white font-heading text-2xl font-bold border-b-2 border-white pb-1">
                        Join Our Success Story
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
              </div>

            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 bg-background border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <AnimatedElement direction="up">
              <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
                Ready to transform your business?
              </h2>
              <p className="font-paragraph text-xl text-secondary mb-10 max-w-2xl mx-auto">
                Let's discuss how our intelligent applications can help you achieve your goals and drive sustainable growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-8 text-lg font-medium shadow-xl shadow-primary/20">
                  Schedule a Consultation
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-200 hover:border-primary text-foreground hover:text-primary bg-white hover:bg-primary/5 rounded-full px-12 py-8 text-lg font-medium">
                  View Case Studies
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}