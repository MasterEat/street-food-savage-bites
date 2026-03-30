import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star,
  ArrowRight,
  Utensils,
  Flame,
  Award
} from 'lucide-react';

// --- Components ---

const SEO = ({ title, description, path }: { title: string; description: string; path: string }) => {
  const fullTitle = `${title} | Savage Bites Athens`;
  const url = `https://ais-dev-f2ppvg3vdgxquafregdsum-192119356840.europe-west2.run.app${path}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Savage Bites",
    "image": "https://picsum.photos/seed/burger-hero/1200/630",
    "@id": url,
    "url": url,
    "telephone": "+302101234567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ermou 15",
      "addressLocality": "Athens",
      "postalCode": "10563",
      "addressCountry": "GR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.9755,
      "longitude": 23.7348
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "12:00",
      "closes": "02:00"
    },
    "menu": `${url}/menu`,
    "servesCuisine": "American, Burgers",
    "priceRange": "$$",
    "parentOrganization": {
      "@type": "Organization",
      "name": "Urban Crave"
    }
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="group">
          <div className="flex flex-col leading-none">
            <span className="text-2xl md:text-3xl font-display font-black tracking-tighter text-white group-hover:text-accent transition-colors">SAVAGE BITES</span>
            <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-accent/80 uppercase ml-1">by Urban Crave</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-white/70'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/menu" className="bg-accent text-primary px-6 py-2 rounded-full font-bold text-sm uppercase tracking-tighter hover:bg-white transition-all transform hover:scale-105">
            Order Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 py-8 px-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-display font-bold uppercase ${location.pathname === link.path ? 'text-accent' : 'text-white'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/menu" 
              onClick={() => setIsOpen(false)}
              className="bg-accent text-primary w-full py-4 text-center rounded-xl font-bold uppercase text-lg"
            >
              Order Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-dark pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="md:col-span-2">
        <div className="flex flex-col mb-6">
          <span className="text-3xl font-display font-black tracking-tighter text-white">SAVAGE BITES</span>
          <span className="text-xs font-sans tracking-[0.2em] text-accent uppercase">by Urban Crave</span>
        </div>
        <p className="text-white/50 max-w-md mb-8 leading-relaxed">
          The ultimate smashed burger experience in the heart of Athens. We don't just make burgers; we craft savage indulgences for the urban soul.
        </p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
            <Instagram size={20} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
            <Facebook size={20} />
          </a>
        </div>
      </div>
      
      <div>
        <h4 className="text-accent font-bold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
        <ul className="space-y-4 text-white/60 text-sm">
          <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
          <li><Link to="/menu" className="hover:text-white transition-colors">Menu</Link></li>
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-accent font-bold mb-6 uppercase tracking-widest text-sm">Visit Us</h4>
        <ul className="space-y-4 text-white/60 text-sm">
          <li className="flex gap-3"><MapPin size={16} className="text-accent shrink-0" /> Ermou 15, Athens 10563</li>
          <li className="flex gap-3"><Phone size={16} className="text-accent shrink-0" /> +30 210 123 4567</li>
          <li className="flex gap-3"><Clock size={16} className="text-accent shrink-0" /> Mon-Sun: 12:00 - 02:00</li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-white/30 text-xs uppercase tracking-widest">
        © 2026 Savage Bites. All Rights Reserved.
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-white/40 uppercase tracking-widest">A Concept by</span>
        <span className="text-sm font-display font-bold text-white/80">URBAN CRAVE</span>
      </div>
    </div>
  </footer>
);

const StickyCall = () => (
  <a 
    href="tel:+302101234567" 
    className="fixed bottom-6 right-6 z-40 bg-accent text-primary p-4 rounded-full shadow-2xl md:hidden animate-bounce"
  >
    <Phone size={24} />
  </a>
);

// --- Pages ---

const Home = () => {
  const featured = [
    { name: 'Smash Therapy', desc: 'Double dry-aged beef, secret sauce, triple cheese.', price: '9.50', img: 'https://picsum.photos/seed/burger1/600/600' },
    { name: 'Double Trouble', desc: 'Two patties, caramelized onions, bacon jam.', price: '11.00', img: 'https://picsum.photos/seed/burger2/600/600' },
    { name: 'The Beast', desc: 'Triple patty, jalapeños, spicy mayo, crispy onions.', price: '13.50', img: 'https://picsum.photos/seed/burger3/600/600' },
  ];

  return (
    <div className="overflow-hidden">
      <SEO 
        title="Home" 
        description="Savage Bites by Urban Crave: The best smashed burgers in Athens. Bold flavors, premium ingredients, urban street food vibes."
        path="/"
      />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/burger-hero/1920/1080" 
            alt="Cinematic Burger" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter mb-2 leading-none">
              SAVAGE <span className="text-stroke">BITES</span>
            </h1>
            <p className="text-accent font-sans text-sm md:text-xl uppercase tracking-[0.4em] mb-12">
              by Urban Crave
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Link to="/menu" className="bg-accent text-primary px-10 py-4 rounded-full font-black uppercase tracking-tighter text-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2">
                Feed Your Crave <ChevronRight size={20} />
              </Link>
              <Link to="/contact" className="border border-white/30 backdrop-blur-md px-10 py-4 rounded-full font-black uppercase tracking-tighter text-lg hover:bg-white/10 transition-all">
                Find Us
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">The Lineup</span>
              <h2 className="text-4xl md:text-6xl">Featured <span className="text-stroke">Cravings</span></h2>
            </div>
            <Link to="/menu" className="text-accent hover:text-white flex items-center gap-2 uppercase tracking-widest text-sm font-bold transition-colors">
              View Full Menu <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative overflow-hidden rounded-3xl glass-card p-4"
              >
                <div className="aspect-square overflow-hidden rounded-2xl mb-6">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl">{item.name}</h3>
                  <span className="text-accent font-display font-bold">€{item.price}</span>
                </div>
                <p className="text-white/50 text-sm mb-6">{item.desc}</p>
                <button className="w-full py-3 border border-white/10 rounded-xl uppercase text-xs font-bold tracking-widest group-hover:bg-accent group-hover:text-primary transition-all">
                  Add to Order
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-32 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://picsum.photos/seed/grill/800/1200" alt="Grill" className="w-full h-full object-cover grayscale" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">The Savage Way</span>
              <h2 className="text-4xl md:text-6xl mb-8 leading-tight">No Mercy. <br/>Just <span className="text-stroke">Flavor.</span></h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed">
                We believe in the art of the smash. High heat, heavy weight, and premium dry-aged beef create that legendary crust you crave. No fillers, no fluff—just savage street food perfected by Urban Crave's culinary standards.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Flame className="text-accent" />, title: 'High-Heat Smashed', desc: 'Perfect Maillard reaction for maximum crust.' },
                  { icon: <Utensils className="text-accent" />, title: 'Dry-Aged Beef', desc: '100% Greek beef, aged for deep umami flavor.' },
                  { icon: <Award className="text-accent" />, title: 'Urban Quality', desc: 'Premium ingredients sourced with integrity.' },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl mb-1">{feature.title}</h4>
                      <p className="text-white/40 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
                <img src="https://picsum.photos/seed/burger-close/800/1000" alt="Savage Burger" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-accent text-primary p-10 rounded-[40px] hidden md:block">
                <p className="text-4xl font-display font-black leading-none mb-2">100%</p>
                <p className="uppercase text-xs font-bold tracking-widest">Savage Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl mb-20">Street <span className="text-stroke">Talk</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex K.', text: 'Best smashed burger in Athens. Period. The crust is insane.', rating: 5 },
              { name: 'Maria P.', text: 'Urban Crave quality with a savage twist. The Smash Therapy is my go-to.', rating: 5 },
              { name: 'Dimitris S.', text: 'Aggressive flavors and great urban atmosphere. A must-visit.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="glass-card p-10 rounded-3xl text-left">
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className="text-white/70 italic mb-8">"{review.text}"</p>
                <p className="font-bold uppercase tracking-widest text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-primary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-2">READY TO GET SAVAGE?</h2>
            <p className="uppercase tracking-widest font-bold text-sm opacity-80">Order now for pickup or delivery.</p>
          </div>
          <Link to="/menu" className="bg-primary text-white px-12 py-5 rounded-full font-black uppercase text-xl hover:bg-black transition-all transform hover:scale-105">
            Order Now
          </Link>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-dark grayscale hover:grayscale-0 transition-all duration-1000">
        <div className="w-full h-full flex items-center justify-center bg-white/5">
          <div className="text-center">
            <MapPin size={48} className="text-accent mx-auto mb-4" />
            <p className="uppercase tracking-[0.3em] font-bold">Find us at Ermou 15, Athens</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const Menu = () => {
  const categories = ['Smashed Burgers', 'Sides', 'Drinks', 'Extras'];
  const [activeCat, setActiveCat] = useState('Smashed Burgers');

  const menuItems = {
    'Smashed Burgers': [
      { name: 'Smash Therapy', price: '9.50', desc: 'Double dry-aged beef, secret sauce, triple cheese, pickles.', best: true },
      { name: 'Double Trouble', price: '11.00', desc: 'Two patties, caramelized onions, bacon jam, cheddar.', best: false },
      { name: 'The Beast', price: '13.50', desc: 'Triple patty, jalapeños, spicy mayo, crispy onions, pepper jack.', best: true },
      { name: 'Classic Savage', price: '8.50', desc: 'Single patty, ketchup, mustard, onions, pickles, cheese.', best: false },
      { name: 'Truffle Urban', price: '12.50', desc: 'Double patty, truffle aioli, wild mushrooms, swiss cheese.', best: false },
    ],
    'Sides': [
      { name: 'Savage Fries', price: '4.50', desc: 'Hand-cut fries with savage seasoning.', best: true },
      { name: 'Cheese Loaded', price: '6.50', desc: 'Fries topped with melted cheese and bacon bits.', best: false },
      { name: 'Onion Rings', price: '5.00', desc: 'Beer-battered and extra crispy.', best: false },
    ],
    'Drinks': [
      { name: 'Craft Cola', price: '3.50', desc: 'Artisanal local cola.', best: false },
      { name: 'Urban Lemonade', price: '4.00', desc: 'Freshly squeezed with mint.', best: true },
      { name: 'Local Beer', price: '5.50', desc: 'Selection of Athens craft beers.', best: false },
    ],
    'Extras': [
      { name: 'Extra Patty', price: '3.00', desc: '', best: false },
      { name: 'Bacon Jam', price: '1.50', desc: '', best: false },
      { name: 'Savage Sauce', price: '1.00', desc: '', best: false },
    ]
  };

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Menu" 
        description="Explore the Savage Bites menu. From our signature Smash Therapy to the legendary Beast burger. Premium smashed burgers in Athens."
        path="/menu"
      />
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">The Menu</span>
          <h1 className="text-5xl md:text-7xl mb-6">Choose Your <span className="text-stroke">Weapon</span></h1>
          <p className="text-white/50 max-w-xl mx-auto">Every burger is made to order with our signature smash technique and premium dry-aged beef.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-8 py-3 rounded-full uppercase text-sm font-bold tracking-widest transition-all ${activeCat === cat ? 'bg-accent text-primary' : 'bg-white/5 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {menuItems[activeCat].map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl md:text-2xl group-hover:text-accent transition-colors">{item.name}</h3>
                  {item.best && <span className="bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-widest">Best Seller</span>}
                </div>
                <div className="flex-grow border-b border-white/10 mx-4 mb-2 border-dotted" />
                <span className="text-accent font-display font-bold">€{item.price}</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 glass-card p-12 rounded-[40px] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
          <h2 className="text-3xl mb-4 uppercase">Dietary Info?</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">We offer gluten-free buns and vegan patties upon request. Just ask your savage server.</p>
          <button className="text-accent border-b border-accent/30 pb-1 uppercase tracking-widest text-xs font-bold hover:text-white hover:border-white transition-all">
            Download PDF Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="pt-32 pb-20">
    <SEO 
      title="About Us" 
      description="Learn about the story behind Savage Bites and Urban Crave. Our mission to bring premium smashed burgers to the streets of Athens."
      path="/about"
    />
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
        <div className="order-2 md:order-1">
          <div className="aspect-square rounded-[40px] overflow-hidden">
            <img src="https://picsum.photos/seed/kitchen/800/800" alt="Kitchen" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">The Origin</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-none">Born in the <span className="text-stroke">Streets.</span></h1>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Savage Bites emerged from a simple desire: to strip away the pretension of gourmet dining and return to the raw, indulgent roots of street food. 
          </p>
          <p className="text-white/60 text-lg mb-12 leading-relaxed">
            We wanted a burger that was aggressive in flavor, bold in presentation, and unapologetic in its indulgence. Thus, the Savage was born.
          </p>
          <div className="flex items-center gap-4 p-6 border border-white/10 rounded-3xl bg-white/5">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shrink-0">
              <Award className="text-primary" size={32} />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm">Urban Crave Standard</h4>
              <p className="text-white/40 text-xs">Backed by the premium culinary expertise of the Urban Crave parent brand.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-32 border-y border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl mb-6">The <span className="text-stroke">Duo</span></h2>
          <p className="text-white/50 max-w-2xl mx-auto">A perfect balance between street aggression and urban sophistication.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card p-12 rounded-[40px]">
            <h3 className="text-4xl mb-6 text-accent">SAVAGE BITES</h3>
            <p className="text-white/60 leading-relaxed mb-8">
              The product. The experience. The bite. Savage Bites is the front line, the street-facing identity that delivers the boldest smashed burgers in Athens. It's edgy, it's loud, and it's delicious.
            </p>
            <ul className="space-y-4 text-sm uppercase tracking-widest font-bold text-white/40">
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-accent" /> Bold Flavors</li>
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-accent" /> Street Culture</li>
              <li className="flex items-center gap-3"><ChevronRight size={16} className="text-accent" /> Indulgent Quality</li>
            </ul>
          </div>
          
          <div className="glass-card p-12 rounded-[40px] border-accent/20">
            <h3 className="text-4xl mb-6">URBAN CRAVE</h3>
            <p className="text-white/60 leading-relaxed mb-8">
              The foundation. The parent brand. Urban Crave represents the professional, clean, and premium standards that ensure every Savage Bite is crafted with culinary integrity and operational excellence.
            </p>
            <ul className="space-y-4 text-sm uppercase tracking-widest font-bold text-white/40">
              <li className="flex items-center gap-3"><ChevronRight size={16} /> Culinary Mastery</li>
              <li className="flex items-center gap-3"><ChevronRight size={16} /> Premium Sourcing</li>
              <li className="flex items-center gap-3"><ChevronRight size={16} /> Professional Service</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-32 pb-20">
    <SEO 
      title="Contact" 
      description="Get in touch with Savage Bites Athens. Visit us at Ermou 15, call us for orders, or follow us on social media."
      path="/contact"
    />
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <span className="text-accent text-sm uppercase tracking-[0.3em] font-bold mb-4 block">Get In Touch</span>
        <h1 className="text-5xl md:text-7xl mb-6">Talk to the <span className="text-stroke">Pack</span></h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="space-y-12 mb-16">
            <div className="flex gap-8">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Location</h4>
                <p className="text-white/60">Ermou 15, Athens 10563, Greece</p>
                <a href="#" className="text-accent text-sm font-bold uppercase tracking-widest mt-2 block hover:text-white transition-colors">Get Directions</a>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Call Us</h4>
                <p className="text-white/60">+30 210 123 4567</p>
                <p className="text-white/30 text-xs mt-1">Available for orders 12:00 - 01:30</p>
              </div>
            </div>
            
            <div className="flex gap-8">
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                <Clock className="text-primary" size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold uppercase tracking-widest mb-2">Hours</h4>
                <p className="text-white/60">Monday — Sunday</p>
                <p className="text-white/60">12:00 PM — 02:00 AM</p>
              </div>
            </div>
          </div>
          
          <div className="p-10 rounded-[40px] bg-white/5 border border-white/10">
            <h4 className="text-xl font-bold uppercase tracking-widest mb-6">Follow the Savage</h4>
            <div className="flex gap-6">
              <a href="#" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                <Instagram size={24} /> <span className="font-bold uppercase tracking-widest text-xs">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors">
                <Facebook size={24} /> <span className="font-bold uppercase tracking-widest text-xs">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-12 rounded-[40px]">
          <h3 className="text-3xl mb-8 uppercase">Send a Message</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors" placeholder="Your Email" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Subject</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors appearance-none">
                <option className="bg-black">General Inquiry</option>
                <option className="bg-black">Feedback</option>
                <option className="bg-black">Events/Catering</option>
                <option className="bg-black">Careers</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 ml-2">Message</label>
              <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-accent outline-none transition-colors resize-none" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-accent text-primary py-5 rounded-2xl font-black uppercase text-lg hover:bg-white transition-all">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <StickyCall />
      </div>
    </Router>
  );
}
