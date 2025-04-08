import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TestimonialsSection from '../components/TestimonialsSection';
import FeaturedCarousel from '../components/FeaturedCarousel';
import RotatingPoster from '../components/RotatingPoster';

const LandingPage = () => {
  const [posterTitles, setPosterTitles] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const posterListApi = 'https://localhost:5000/api/posters';
  const baseImageUrl =
    'https://mlworkspace1318558619.blob.core.windows.net/movieposters/Movie Posters/Movie Posters/';

  useEffect(() => {
    fetch(posterListApi)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const randomPosters = [...data].sort(() => 0.5 - Math.random()).slice(0, 12);
        setPosterTitles(randomPosters);
      })
      .catch((error) => {
        console.error('Error fetching posters:', error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black text-white font-sans">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 py-3 shadow-md' : 'bg-black/60 py-5'
        } backdrop-blur-md px-8 flex justify-between items-center`}
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          CineNiche
        </h1>
        <div className="space-x-3">
          <Link to="/login">
            <button className="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition">
              Join Now
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section
        className="h-screen flex flex-col items-center justify-center text-center px-4 bg-cover bg-center relative pt-32"
        style={{ backgroundImage: `url('/images/kanopy-style-hero.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            Discover Bold, Brilliant, & Hidden Films
          </h2>
          <p className="text-lg text-gray-300 max-w-md mx-auto">
            Stream award-winning documentaries, indie gems, and global cinema, anytime.
          </p>
        </div>
      </section>

      {/* Featured Films Carousel */}
      <FeaturedCarousel posters={posterTitles} baseUrl={baseImageUrl} />

      {/* Explore Our Collection – Rotating Poster */}
      <section className="bg-black py-20 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-10">Explore Our Collection</h3>
        <div className="flex justify-center items-center">
          {posterTitles.length > 0 && (
            <RotatingPoster poster={posterTitles} baseUrl={baseImageUrl} />
          )}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="py-8 bg-black text-center text-gray-400 text-sm">
        <p>&copy; 2025 CineNiche. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
