import React from 'react';
import { CheckCircle2, Award, Sparkles, BookOpen, PenTool } from 'lucide-react';
import { COURSE_DETAILS, IMAGES } from '../data/content';
import { OrnamentalDivider } from './MehndiMotifs';

interface CoursesProps {
  onInquireCourse: () => void;
}

export const Courses: React.FC<CoursesProps> = ({ onInquireCourse }) => {
  return (
    <section id="courses" className="py-20 lg:py-28 bg-[#FFFDFB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#6D182B] mb-2">
            ACADEMY & MENTORSHIP
          </p>
          {/* Exact Heading from Prompt */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#4A0E1B] leading-tight mb-4">
            {COURSE_DETAILS.title}
          </h2>
          {/* Exact Supporting Text from Prompt */}
          <p className="text-base sm:text-lg text-[#5A4543] leading-relaxed">
            {COURSE_DETAILS.supportingText}
          </p>
          <div className="mt-6">
            <OrnamentalDivider />
          </div>
        </div>

        {/* 3 Core Highlights (Required in Prompt) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {COURSE_DETAILS.highlights.map((h, i) => (
            <div
              key={h.title}
              className="bg-[#FAF7F2] p-6 sm:p-7 rounded-xl border border-[#EADBCE] shadow-xs relative overflow-hidden group hover:border-[#C59D5F] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[#F6ECE8] text-[#6D182B] flex items-center justify-center font-medium">
                  {i === 0 && <Award className="w-5 h-5 text-[#6D182B]" />}
                  {i === 1 && <PenTool className="w-5 h-5 text-[#6D182B]" />}
                  {i === 2 && <Sparkles className="w-5 h-5 text-[#6D182B]" />}
                </div>
                <h3 className="font-serif text-xl text-[#4A0E1B] font-medium">
                  {h.title}
                </h3>
              </div>
              <p className="text-sm text-[#5A4543] leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>

        {/* Course Topics Curriculum Display */}
        <div className="bg-[#FAF7F2] rounded-2xl border border-[#EADBCE] p-8 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Image & Studio Context */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden shadow-md border border-[#EADBCE] bg-[#FFFDFB]">
                <img
                  src={IMAGES.training}
                  alt="Mehndi training and cone practice session at Shivani Mehndi Artist"
                  className="w-full h-72 sm:h-80 object-cover object-center"
                />
                <div className="p-4 bg-[#FFFDFB] border-t border-[#EADBCE]">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#6D182B] mb-1">
                    Structured Practice Sessions
                  </p>
                  <p className="text-xs text-[#5A4543]">
                    Guided practical exercises focusing on line pressure, symmetry, and motif fluency.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Exactly Specified Topics */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-[#C59D5F]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6D182B]">
                  Curriculum & Hands-on Topics
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E1B] mb-3">
                Complete Topics Covered
              </h3>
              <p className="text-sm text-[#5A4543] mb-6">
                The course covers essential mehndi skills and designs from basic to advanced level through hands-on learning and creative practice.
              </p>

              {/* Grid of the Exact 9 Topics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {COURSE_DETAILS.topics.map((topic, index) => (
                  <div
                    key={topic}
                    className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FFFDFB] border border-[#EADBCE] hover:border-[#C59D5F]/80 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#6D182B] shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-[#3D2C2B]">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-[#EADBCE]">
                <button
                  onClick={onInquireCourse}
                  className="inline-flex items-center justify-center gap-2 bg-[#6D182B] hover:bg-[#50101E] active:scale-[0.98] text-[#FFFDFB] text-xs uppercase tracking-wider font-semibold px-6 py-3.5 rounded-full shadow-xs transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4 text-[#DFC493]" />
                  <span>Inquire About Course</span>
                </button>
                <p className="text-xs text-[#7A6461]">
                  Location: Gadchiroli · Personal attention for every learner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
