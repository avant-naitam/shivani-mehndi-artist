import React, { useState, useEffect, useRef } from 'react';
import { CalendarCheck, Clock, User, Phone, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles, ChevronDown, Check } from 'lucide-react';
import { ServiceType } from '../types';
import { saveBookingRequest } from '../services/bookingStorage';
import { BRAND } from '../data/content';
import { OrnamentalDivider } from './MehndiMotifs';

interface BookingSectionProps {
  preselectedService?: ServiceType | string | null;
  onBookingSubmitted?: () => void;
  onOpenAdmin: () => void;
}

const SERVICE_OPTIONS: string[] = [
  'Bridal Mehndi',
  'Wedding Mehndi',
  'Engagement Mehndi',
  'Baby Shower Mehndi',
  'Special Occasion Mehndi',
];

const EVENT_TYPE_OPTIONS = [
  'Wedding Ceremony',
  'Sangeet / Mehendi Night',
  'Engagement / Ring Ceremony',
  'Baby Shower (Dohale Jevan)',
  'Festival (Karwa Chauth / Diwali / Teej)',
  'Family Function / Other',
  'Other (Specify below)',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  onBookingSubmitted,
  onOpenAdmin,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [isEventDropdownOpen, setIsEventDropdownOpen] = useState(false);
  const eventDropdownRef = useRef<HTMLDivElement>(null);
  const [customEventType, setCustomEventType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (eventDropdownRef.current && !eventDropdownRef.current.contains(event.target as Node)) {
        setIsEventDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle preselected service when user selects a service from other sections
  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService as string)) {
      setSelectedServices((prev) =>
        prev.includes(preselectedService as string) ? prev : [...prev, preselectedService as string]
      );
    }
  }, [preselectedService]);

  const handleToggleService = (option: string) => {
    setSelectedServices((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleToggleEventType = (option: string) => {
    setSelectedEventTypes((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }
    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one service type.');
      return;
    }
    if (selectedEventTypes.length === 0) {
      setErrorMsg('Please select at least one event type.');
      return;
    }
    if (!preferredDate) {
      setErrorMsg('Please select your preferred date.');
      return;
    }
    if (!preferredTime) {
      setErrorMsg('Please select your preferred time slot.');
      return;
    }

    const finalEventTypes = selectedEventTypes
      .map((item) =>
        item === 'Other (Specify below)' && customEventType.trim()
          ? `Other (${customEventType.trim()})`
          : item
      )
      .join(', ');

    // Save with initial status "Pending" (strictly required)
    const newReq = saveBookingRequest({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      serviceType: selectedServices.join(', '),
      eventType: finalEventTypes,
      preferredDate,
      preferredTime,
      message: message.trim() || undefined,
    });

    setSubmittedId(newReq.id);
    setIsSubmitted(true);
    if (onBookingSubmitted) {
      onBookingSubmitted();
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhoneNumber('');
    setSelectedServices([]);
    setIsDropdownOpen(false);
    setSelectedEventTypes([]);
    setIsEventDropdownOpen(false);
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setCustomEventType('');
  };

  return (
    <section id="book" className="py-20 lg:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
            RESERVATIONS & INQUIRIES
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            Book a Mehndi Service
          </h2>
          <p className="text-base text-[#5A4543] leading-relaxed">
            Submit your booking request below. We review every request individually to ensure personalized attention for your special date in Gadchiroli.
          </p>
          <div className="mt-6">
            <OrnamentalDivider />
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-[#FFFDFB] rounded-2xl border border-[#EADBCE] shadow-[0_8px_30px_rgba(44,24,16,0.06)] overflow-hidden">
          {isSubmitted ? (
            /* Success View */
            <div className="p-8 sm:p-14 text-center max-w-xl mx-auto animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-[#F6ECE8] text-[#6D182B] rounded-full flex items-center justify-center mx-auto mb-6 border border-[#EADBCE]">
                <CheckCircle2 className="w-8 h-8 text-[#6D182B]" />
              </div>

              <span className="text-xs font-mono font-medium text-[#8C6D62] bg-[#FAF7F2] px-3 py-1 rounded-md border border-[#EADBCE]">
                Request Reference: {submittedId}
              </span>

              {/* Exact phrasing required by prompt */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E1B] mt-4 mb-3">
                Booking request submitted successfully. We'll contact you to confirm your booking.
              </h3>

              <p className="text-sm text-[#5A4543] mb-8 leading-relaxed">
                Your request has been registered under <span className="font-semibold text-[#6D182B]">Pending</span> status. Shivani will personally review the requested date and reach out to you at <span className="font-semibold text-[#2D1D1E]">{phoneNumber}</span> to confirm details.
              </p>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] text-xs text-[#7A6461] mb-8 space-y-1 text-left">
                <p><strong className="text-[#4A0E1B]">Service:</strong> {selectedServices.join(', ')}</p>
                <p><strong className="text-[#4A0E1B]">Event:</strong> {selectedEventTypes.join(', ')}</p>
                <p><strong className="text-[#4A0E1B]">Preferred Date:</strong> {preferredDate} ({preferredTime})</p>
                <p><strong className="text-[#4A0E1B]">Initial Status:</strong> <span className="text-amber-800 font-semibold">Pending Review</span></p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full bg-[#6D182B] text-[#FFFDFB] hover:bg-[#50101E] transition-all"
                >
                  Submit Another Request
                </button>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-full bg-[#FAF7F2] text-[#6D182B] border border-[#EADBCE] hover:bg-[#F2ECE3] transition-all"
                >
                  Call Directly: {BRAND.phoneDisplay}
                </a>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 lg:p-12 space-y-6">
              {errorMsg && (
                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Pooja Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C6D62] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="phoneNumber"
                      type="tel"
                      required
                      placeholder="e.g. 7588018033"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Type - Multi-select */}
                <div className="relative" ref={dropdownRef}>
                  <label htmlFor="serviceType" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Service Type <span className="text-rose-600">*</span>
                  </label>
                  <button
                    id="serviceType"
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all flex items-center justify-between text-left cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                  >
                    <span
                      className={`block truncate pr-2 ${
                        selectedServices.length === 0 ? 'text-[#8C6D62]' : 'text-[#2D1D1E] font-medium'
                      }`}
                      title={selectedServices.length === 0 ? 'Select' : selectedServices.join(', ')}
                    >
                      {selectedServices.length === 0 ? 'Select' : selectedServices.join(', ')}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C6D62] shrink-0 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[#6D182B]' : ''
                      }`}
                    />
                  </button>

                  {/* Multi-select Dropdown Menu */}
                  {isDropdownOpen && (
                    <div
                      className="absolute z-30 left-0 right-0 mt-1.5 bg-[#FFFDFB] border border-[#EADBCE] rounded-xl shadow-xl p-1.5 space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150"
                      role="listbox"
                      aria-multiselectable="true"
                    >
                      {SERVICE_OPTIONS.map((opt) => {
                        const isChecked = selectedServices.includes(opt);
                        return (
                          <div
                            key={opt}
                            role="option"
                            aria-selected={isChecked}
                            onClick={() => handleToggleService(opt)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer select-none ${
                              isChecked
                                ? 'bg-[#F6ECE8] text-[#4A0E1B] font-medium'
                                : 'text-[#2D1D1E] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-[#6D182B] border-[#6D182B] text-white'
                                  : 'border-[#C59D5F]/60 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="flex-1 text-xs sm:text-sm">{opt}</span>
                          </div>
                        );
                      })}

                      <div className="pt-2 mt-1 border-t border-[#F2ECE3] flex items-center justify-between px-2 pb-0.5">
                        <span className="text-[11px] text-[#8C6D62]">
                          {selectedServices.length === 0
                            ? 'None selected'
                            : `${selectedServices.length} selected`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-3 py-1 text-xs font-semibold text-[#6D182B] hover:text-[#50101E] hover:bg-[#F6ECE8] rounded-md transition-colors cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Event Type - Multi-select */}
                <div className="relative" ref={eventDropdownRef}>
                  <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Event Type <span className="text-rose-600">*</span>
                  </label>
                  <button
                    id="eventType"
                    type="button"
                    onClick={() => setIsEventDropdownOpen((prev) => !prev)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all flex items-center justify-between text-left cursor-pointer"
                    aria-haspopup="listbox"
                    aria-expanded={isEventDropdownOpen}
                  >
                    <span
                      className={`block truncate pr-2 ${
                        selectedEventTypes.length === 0 ? 'text-[#8C6D62]' : 'text-[#2D1D1E] font-medium'
                      }`}
                      title={selectedEventTypes.length === 0 ? 'Select' : selectedEventTypes.join(', ')}
                    >
                      {selectedEventTypes.length === 0 ? 'Select' : selectedEventTypes.join(', ')}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8C6D62] shrink-0 transition-transform duration-200 ${
                        isEventDropdownOpen ? 'rotate-180 text-[#6D182B]' : ''
                      }`}
                    />
                  </button>

                  {/* Multi-select Dropdown Menu */}
                  {isEventDropdownOpen && (
                    <div
                      className="absolute z-30 left-0 right-0 mt-1.5 bg-[#FFFDFB] border border-[#EADBCE] rounded-xl shadow-xl p-1.5 space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150 max-h-64 overflow-y-auto"
                      role="listbox"
                      aria-multiselectable="true"
                    >
                      {EVENT_TYPE_OPTIONS.map((opt) => {
                        const isChecked = selectedEventTypes.includes(opt);
                        return (
                          <div
                            key={opt}
                            role="option"
                            aria-selected={isChecked}
                            onClick={() => handleToggleEventType(opt)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer select-none ${
                              isChecked
                                ? 'bg-[#F6ECE8] text-[#4A0E1B] font-medium'
                                : 'text-[#2D1D1E] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-[#6D182B] border-[#6D182B] text-white'
                                  : 'border-[#C59D5F]/60 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="flex-1 text-xs sm:text-sm">{opt}</span>
                          </div>
                        );
                      })}

                      <div className="pt-2 mt-1 border-t border-[#F2ECE3] flex items-center justify-between px-2 pb-0.5 sticky bottom-0 bg-[#FFFDFB]">
                        <span className="text-[11px] text-[#8C6D62]">
                          {selectedEventTypes.length === 0
                            ? 'None selected'
                            : `${selectedEventTypes.length} selected`}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsEventDropdownOpen(false)}
                          className="px-3 py-1 text-xs font-semibold text-[#6D182B] hover:text-[#50101E] hover:bg-[#F6ECE8] rounded-md transition-colors cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedEventTypes.includes('Other (Specify below)') && (
                <div>
                  <label htmlFor="customEventType" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Describe Event Type <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="customEventType"
                    type="text"
                    required
                    placeholder="Describe your event or occasion"
                    value={customEventType}
                    onChange={(e) => setCustomEventType(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Preferred Date <span className="text-rose-600">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                    Preferred Time Slot <span className="text-rose-600">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    required
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className={`w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] transition-all cursor-pointer ${
                      !preferredTime ? 'text-[#8C6D62]' : 'text-[#2D1D1E]'
                    }`}
                  >
                    <option value="" disabled className="text-[#8C6D62]">
                      Select
                    </option>
                    <option value="Morning (09:00 AM - 12:00 PM)" className="text-[#2D1D1E]">
                      Morning (09:00 AM - 12:00 PM)
                    </option>
                    <option value="Afternoon (12:00 PM - 04:00 PM)" className="text-[#2D1D1E]">
                      Afternoon (12:00 PM - 04:00 PM)
                    </option>
                    <option value="Evening (04:00 PM - 08:00 PM)" className="text-[#2D1D1E]">
                      Evening (04:00 PM - 08:00 PM)
                    </option>
                    <option value="Flexible / Full Day Slot" className="text-[#2D1D1E]">
                      Flexible / Full Day Slot
                    </option>
                  </select>
                </div>
              </div>

              {/* Message / Special Requirements */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#4A0E1B] mb-2">
                  Message / Special Requirements
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Tell us about your design preferences (e.g. elbow-length bridal henna, specific figures like peacock/swans, or number of family members)."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-[#FAF7F2] border border-[#EADBCE] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6D182B]/20 focus:border-[#6D182B] text-[#2D1D1E] transition-all resize-none"
                />
              </div>

              {/* Request notice */}
              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EADBCE] text-xs text-[#7A6461] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C59D5F] shrink-0 mt-0.5" />
                <p>
                  <strong>Note:</strong> This is a booking <em>request</em>. All requests are initially logged as <strong>Pending</strong>. We will review availability for your date and reach out to you directly to confirm.
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-full shadow-[0_4px_16px_rgba(109,24,43,0.2)] transition-all duration-200 border border-[#8E253A]"
                >
                  <CalendarCheck className="w-4 h-4 text-[#DFC493]" />
                  <span>Submit Booking Request</span>
                </button>

                {/* Discrete Admin Link */}
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-xs text-[#8C6D62] hover:text-[#6D182B] underline transition-colors"
                >
                  Artist Portal / Review Requests
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
