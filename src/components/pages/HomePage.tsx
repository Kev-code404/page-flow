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

        {/* --- WHY CHOOSE US SECTION --- */}
        <section className="py-32 bg-white relative">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left Content */}
              <div>
                <AnimatedElement>
                  <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
                    Why <span className="text-primary">Choose Us</span>?
                  </h2>
                  <p className="font-paragraph text-lg text-secondary mb-12 leading-relaxed">
                    We help organizations move from digital ambition to execution. Our solutions are designed with precision, scalability, and proven results to accelerate your business transformation.
                  </p>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-heading text-xl text-foreground mb-4">Expertise</h3>
                      <ul className="space-y-3">
                        {['Cloud Solutions', 'AI Integration', '24/7 Automation'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-foreground font-paragraph">
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AnimatedElement>
              </div>

              {/* Right Illustration */}
              <AnimatedElement direction="right" delay={200} className="relative">
                <div className="relative h-96 lg:h-full min-h-96 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-[2rem]" />
                  <Image
                    src="https://static.wixstatic.com/media/c8ce01_a65a7736e42e4121a189002edfe383d3~mv2.png"
                    className="w-full h-full object-contain relative z-10"
                    width={600}
                    originWidth={2160}
                    originHeight={1916} />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* --- CONNECT WITH US SECTION --- */}
        <section className="py-32 bg-primary relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-y-1/2" />

          <div className="max-w-[120rem] mx-auto px-6 lg:px-16 relative z-10">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <AnimatedElement>
                <h2 className="font-heading text-4xl lg:text-5xl text-white mb-8">
                  Connect with us
                </h2>
                
                <div className="flex gap-3 bg-white rounded-full p-2 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 bg-transparent px-6 py-3 text-foreground placeholder-gray-400 outline-none font-paragraph"
                  />
                  <button className="bg-primary hover:bg-primary/90 text-white rounded-full p-3 transition-all hover:scale-105">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </AnimatedElement>
            </div>

            {/* Footer Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/20 pt-16">
              <AnimatedElement delay={100}>
                <div>
                  <h3 className="font-heading text-white text-lg mb-4">PRODUCTS</h3>
                  <ul className="space-y-2">
                    {['Solutions', 'Features', 'Pricing'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-white/70 hover:text-white transition-colors font-paragraph text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={150}>
                <div>
                  <h3 className="font-heading text-white text-lg mb-4">SERVICES</h3>
                  <ul className="space-y-2">
                    {['Consulting', 'Development', 'Support'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-white/70 hover:text-white transition-colors font-paragraph text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div>
                  <h3 className="font-heading text-white text-lg mb-4">LEGAL</h3>
                  <ul className="space-y-2">
                    {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-white/70 hover:text-white transition-colors font-paragraph text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={250}>
                <div>
                  <h3 className="font-heading text-white text-lg mb-4">TALK TO US</h3>
                  <ul className="space-y-2">
                    {['Contact Us', 'Support', 'Careers'].map((link) => (
                      <li key={link}>
                        <a href="#" className="text-white/70 hover:text-white transition-colors font-paragraph text-sm">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/20 mt-12 pt-8 text-center">
              <p className="text-white/60 font-paragraph text-sm">
                © 2024 name. All rights reserved.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}