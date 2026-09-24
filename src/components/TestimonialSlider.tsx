import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  MessageSquarePlus,
  X,
  Sparkles,
  Heart,
  Send,
} from 'lucide-react';
import { TESTIMONIALS, BRAND } from '../data/content';
import { TestimonialItem } from '../types';
import { OrnamentalDivider, MandalaPattern } from './MehndiMotifs';

const LOCAL_STORAGE_KEY = 'shivani_mehndi_testimonials';

export const TestimonialSlider: React.FC = () => {
  // Load testimonials from content with any user-submitted local additions
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge user-submitted ones first, followed by default ones without duplicate IDs
          const existingIds = new Set(parsed.map((t: TestimonialItem) => t.id));
          const defaults = TESTIMONIALS.filter((t) => !existingIds.has(t.id));
          return [...parsed, ...defaults];
        }
      }
    } catch {
      // ignore JSON parse errors
    }
    return TESTIMONIALS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Bridal' | 'Courses' | 'Occasions'>('All');

  // New review form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Bridal Mehndi Client');
  const [newLocation, setNewLocation] = useState('Gadchiroli');
  const [newRating, setNewRating] = useState(5);
  const [newHighlight, setNewHighlight] = useState('');
  const [newReview, setNewReview] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filtered testimonials
  const filteredTestimonials = testimonials.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Bridal') return item.role.toLowerCase().includes('bridal');
    if (activeFilter === 'Courses') return item.role.toLowerCase().includes('course') || item.role.toLowerCase().includes('student') || item.role.toLowerCase().includes('graduate');
    if (activeFilter === 'Occasions') return !item.role.toLowerCase().includes('bridal') && !item.role.toLowerCase().includes('course');
    return true;
  });

  // Keep index within bounds if filter changes
  useEffect(() => {
    if (currentIndex >= filteredTestimonials.length) {
      setCurrentIndex(0);
    }
  }, [filteredTestimonials.length, currentIndex]);

  const maxIndex = Math.max(0, filteredTestimonials.length - 1);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoPlaying || isReviewModalOpen || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isReviewModalOpen, filteredTestimonials.length, handleNext]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Handle new review submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newReview.trim()) return;

    const newTestimonialItem: TestimonialItem = {
      id: `user-${Date.now()}`,
      name: newName.trim(),
      role: newRole,
      location: newLocation.trim() || 'Gadchiroli',
      rating: newRating,
      highlight: newHighlight.trim() || 'Wonderful Mehndi Experience',
      review: newReview.trim(),
      date: 'Recent',
      verified: true,
    };

    const updated = [newTestimonialItem, ...testimonials];
    setTestimonials(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // storage unavailable
    }

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsReviewModalOpen(false);
      // Reset form
      setNewName('');
      setNewHighlight('');
      setNewReview('');
      setNewRating(5);
      setCurrentIndex(0);
    }, 1800);
  };

  // Calculate initials for avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-[#EADBCE]/70"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative Henna Watermark Mandalas in corners */}
      <div className="absolute -top-16 -right-16 text-[#C59D5F] pointer-events-none opacity-40">
        <MandalaPattern size={320} opacity={0.06} />
      </div>
      <div className="absolute -bottom-20 -left-20 text-[#6D182B] pointer-events-none opacity-40">
        <MandalaPattern size={360} opacity={0.05} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6ECE8] text-[#6D182B] text-xs font-semibold uppercase tracking-[0.2em] border border-[#EADBCE] mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C59D5F]" />
            <span>CLIENT REVIEWS & TESTIMONIALS</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Loved by Brides & Aspiring Artists
          </h2>

          <p className="text-base text-[#5A4543] leading-relaxed max-w-2xl mx-auto">
            Read genuine reflections from bridal clients, festive families, and students who have honed their craft under {BRAND.name}.
          </p>

          <div className="mt-5">
            <OrnamentalDivider />
          </div>

          {/* Social Proof Stats Banner */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#684C46]">
            <div className="flex items-center gap-1 text-[#C59D5F]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59D5F] text-[#C59D5F]" />
              ))}
            </div>
            <span className="font-semibold text-[#4A0E1B]">5.0 / 5.0 Star Rating</span>
            <span className="text-[#C59D5F]">•</span>
            <span>150+ Brides & Clients Adorned</span>
            <span className="text-[#C59D5F]">•</span>
            <span>100% Organic Henna Guarantee</span>
          </div>
        </div>

        {/* Filter Tabs & Share Review Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Bridal', 'Courses', 'Occasions'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#6D182B] text-[#FFFDFB] shadow-xs'
                    : 'bg-[#FFFDFB] text-[#5A4543] hover:text-[#6D182B] border border-[#EADBCE] hover:border-[#C59D5F]'
                }`}
              >
                {filter === 'All' && 'All Stories'}
                {filter === 'Bridal' && 'Bridal Clients'}
                {filter === 'Courses' && 'Course Students'}
                {filter === 'Occasions' && 'Occasions & Events'}
              </button>
            ))}
          </div>

          {/* Write a Review Action */}
          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDFB] hover:bg-[#F6ECE8] text-[#6D182B] text-xs font-semibold uppercase tracking-wider border border-[#EADBCE] hover:border-[#C59D5F] shadow-2xs hover:shadow-xs transition-all duration-200 cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C59D5F]" />
            <span>Share Your Experience</span>
          </button>
        </div>

        {/* Testimonial Carousel / Slider Container */}
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          {/* Slider Content */}
          {filteredTestimonials.length === 0 ? (
            <div className="bg-[#FFFDFB] rounded-2xl border border-[#EADBCE] p-12 text-center text-[#5A4543]">
              <p className="text-base">No reviews in this category yet.</p>
              <button
                onClick={() => setActiveFilter('All')}
                className="mt-3 text-xs font-semibold text-[#6D182B] underline cursor-pointer"
              >
                View all reviews
              </button>
            </div>
          ) : (
            <div className="overflow-hidden py-2">
              {/* Responsive Cards Grid / Sliding View */}
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {filteredTestimonials.map((item) => (
                  <div
                    key={item.id}
                    className="w-full shrink-0 px-2 sm:px-3"
                  >
                    <div className="bg-[#FFFDFB] rounded-3xl border border-[#EADBCE] p-7 sm:p-9 md:p-10 shadow-xs hover:border-[#C59D5F] transition-all duration-300 relative flex flex-col justify-between max-w-3xl mx-auto">
                      {/* Decorative Quote Icon Background */}
                      <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-16 h-16 sm:w-20 sm:h-20 text-[#C59D5F]/10 pointer-events-none" />

                      <div>
                        {/* Rating Stars & Verified Tag */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1 text-[#C59D5F]">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    i < item.rating
                                      ? 'fill-[#C59D5F] text-[#C59D5F]'
                                      : 'text-[#EADBCE]'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-semibold text-[#4A0E1B] ml-1">
                              {item.rating}.0 / 5.0
                            </span>
                          </div>

                          {item.verified && (
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F2FAF5] border border-[#A7E8BD]/50 text-[#15803D] text-[11px] font-medium">
                              <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                              <span>Verified Client</span>
                            </div>
                          )}
                        </div>

                        {/* Review Highlight / Headline */}
                        {item.highlight && (
                          <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-[#4A0E1B] font-medium leading-snug mb-3">
                            "{item.highlight}"
                          </h3>
                        )}

                        {/* Review Body */}
                        <p className="text-sm sm:text-base text-[#5A4543] leading-relaxed italic mb-8">
                          "{item.review}"
                        </p>
                      </div>

                      {/* Reviewer Information Footer */}
                      <div className="pt-5 border-t border-[#EADBCE]/80 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          {/* Avatar Initials Badge */}
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6D182B] to-[#4A0E1B] text-[#FFFDFB] flex items-center justify-center font-serif text-base font-semibold border-2 border-[#DFC493] shadow-2xs shrink-0">
                            {getInitials(item.name)}
                          </div>
                          <div>
                            <h4 className="font-serif text-base sm:text-lg text-[#4A0E1B] font-medium leading-tight">
                              {item.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#7A6461] mt-0.5">
                              <span className="font-medium text-[#6D182B]">{item.role}</span>
                              <span>•</span>
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right text-xs text-[#8C6D62] shrink-0 hidden sm:block">
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {filteredTestimonials.length > 1 && (
            <div className="flex items-center justify-between mt-8 max-w-3xl mx-auto px-2">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFFDFB] hover:bg-[#6D182B] text-[#6D182B] hover:text-[#FFFDFB] border border-[#EADBCE] hover:border-[#6D182B] shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2">
                {filteredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-[#6D182B]'
                        : 'w-2.5 bg-[#EADBCE] hover:bg-[#C59D5F]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FFFDFB] hover:bg-[#6D182B] text-[#6D182B] hover:text-[#FFFDFB] border border-[#EADBCE] hover:border-[#6D182B] shadow-2xs hover:shadow-xs flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Share Your Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FFFDFB] w-full max-w-lg rounded-3xl border border-[#EADBCE] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#EADBCE] flex items-center justify-between bg-[#FAF7F2]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#6D182B] text-[#FFFDFB] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-[#DFC493]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#4A0E1B] font-medium leading-tight">
                    Share Your Mehndi Story
                  </h3>
                  <p className="text-xs text-[#7A6461]">
                    Your review helps future brides and aspiring students in Gadchiroli.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8C6D62] hover:text-[#4A0E1B] hover:bg-[#EADBCE]/50 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            {submittedSuccess ? (
              <div className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#F2FAF5] text-[#16A34A] flex items-center justify-center mx-auto mb-4 border border-[#A7E8BD]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl text-[#4A0E1B] font-medium mb-2">
                  Thank You for Your Review!
                </h4>
                <p className="text-sm text-[#5A4543]">
                  Your review has been added to our testimonial slider. We appreciate your love and trust in {BRAND.name}!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
                {/* Full Name & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Shraddha Kale"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:outline-none text-sm text-[#2D1D1E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Gadchiroli"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:outline-none text-sm text-[#2D1D1E]"
                    />
                  </div>
                </div>

                {/* Service / Experience Category */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                    Service / Experience
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:outline-none text-sm text-[#2D1D1E]"
                  >
                    <option value="Bridal Mehndi Client">Bridal Mehndi</option>
                    <option value="Basic to Advanced Course Student">Course Student</option>
                    <option value="Engagement Mehndi Client">Engagement Mehndi</option>
                    <option value="Baby Shower Mehndi Client">Baby Shower Mehndi</option>
                    <option value="Wedding Family & Sangeet Client">Wedding Family Henna</option>
                    <option value="Special Occasion Mehndi">Festival / Party Mehndi</option>
                  </select>
                </div>

                {/* Star Rating Selector */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                    Star Rating: {newRating} / 5
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? 'fill-[#C59D5F] text-[#C59D5F]'
                              : 'text-[#EADBCE]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Highlight / Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                    One-line Highlight
                  </label>
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="e.g. Gorgeous bridal figures & darkest stain!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:outline-none text-sm text-[#2D1D1E]"
                  />
                </div>

                {/* Detailed Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-[#4A0E1B] uppercase tracking-wider mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your experience regarding design intricacy, stain quality, artist patience, or course guidance..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] focus:border-[#6D182B] focus:outline-none text-sm text-[#2D1D1E] resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#EADBCE] text-xs font-semibold text-[#5A4543] hover:bg-[#FAF7F2] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs font-semibold uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#DFC493]" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
