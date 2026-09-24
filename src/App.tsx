import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { Courses } from './components/Courses';
import { Services } from './components/Services';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TestimonialSlider } from './components/TestimonialSlider';
import { FAQ } from './components/FAQ';
import { BookingSection } from './components/BookingSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminBookingsModal } from './components/AdminBookingsModal';
import { MobileQuickBar } from './components/MobileQuickBar';
import { FadeInSection } from './components/FadeInSection';
import { ThemeProvider } from './context/ThemeContext';
import { ServiceType, BookingRequest } from './types';
import { getStoredBookings } from './services/bookingStorage';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedService, setPreselectedService] = useState<ServiceType | string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);

  // Load bookings for admin panel
  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  // Scroll spy to highlight active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'services', 'about', 'gallery', 'testimonials', 'faq', 'book', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler for booking
  const handleOpenBooking = (service?: ServiceType | string) => {
    if (service) {
      setPreselectedService(service);
    }
    const bookEl = document.getElementById('book');
    if (bookEl) {
      bookEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCourses = () => {
    const courseEl = document.getElementById('courses');
    if (courseEl) {
      courseEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireCourse = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1D1E] flex flex-col font-sans selection:bg-[#6D182B] selection:text-[#FFFDFB]">
      {/* Navigation Header */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreCourses={handleExploreCourses}
        />

        {/* 2. Premium Introduction */}
        <FadeInSection>
          <Introduction
            onOpenBooking={() => handleOpenBooking()}
            onExploreCourses={handleExploreCourses}
          />
        </FadeInSection>

        {/* 3. Courses Section: Basic to Advanced Mehndi Course */}
        <FadeInSection>
          <Courses onInquireCourse={handleInquireCourse} />
        </FadeInSection>

        {/* 4. Services Section (internal intersection observer cards) */}
        <Services onBookService={(st) => handleOpenBooking(st)} />

        {/* 5. About Us: The Art of Mehndi (internal intersection observer columns) */}
        <About />

        {/* 6. Editorial Gallery with Lightbox */}
        <FadeInSection>
          <Gallery onSelectForBooking={(st) => handleOpenBooking(st)} />
        </FadeInSection>

        {/* 7. Why Choose Us */}
        <FadeInSection>
          <WhyChooseUs />
        </FadeInSection>

        {/* 8. Testimonial Slider: Client Reviews & Star Ratings */}
        <FadeInSection>
          <TestimonialSlider />
        </FadeInSection>

        {/* 9. FAQ Section: Courses, Booking Policies & Bridal Packages */}
        <FadeInSection>
          <FAQ onOpenBooking={(st) => handleOpenBooking(st)} />
        </FadeInSection>

        {/* 10. Online Booking System */}
        <FadeInSection>
          <BookingSection
            preselectedService={preselectedService}
            onBookingSubmitted={refreshBookings}
            onOpenAdmin={() => {
              refreshBookings();
              setIsAdminOpen(true);
            }}
          />
        </FadeInSection>

        {/* 10. Contact Section */}
        <FadeInSection>
          <Contact onOpenBooking={() => handleOpenBooking()} />
        </FadeInSection>
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => {
          refreshBookings();
          setIsAdminOpen(true);
        }}
      />

      {/* Sticky Mobile Quick Action Bar */}
      <MobileQuickBar onOpenBooking={() => handleOpenBooking()} />

      {/* Admin Dashboard for Booking Requests */}
      <AdminBookingsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        bookings={bookings}
        onRefresh={refreshBookings}
      />
    </div>
  );
}
