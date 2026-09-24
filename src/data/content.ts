import { ServiceItem, GalleryItem, TestimonialItem } from '../types';

import heroImg from '../assets/images/hero_bridal_mehndi_1790145910062.jpg';
import bridalImg from '../assets/images/bridal_mehndi_art_1790145926067.jpg';
import trainingImg from '../assets/images/training_practice_1790145941933.jpg';
import arabicImg from '../assets/images/arabic_mehndi_1790145955399.jpg';
import feetImg from '../assets/images/feet_mehndi_1790145968454.jpg';
import traditionalImg from '../assets/images/traditional_mehndi_1790145987340.jpg';

export const BRAND = {
  name: 'Shivani Mehndi Artist',
  tagline: 'Mehndi Art & Training',
  location: 'Gadchiroli',
  phone: '7588018033',
  phoneDisplay: '+91 75880 18033',
  instagramHandle: '@shivani__mehandi__artist',
  instagramUrl: 'https://www.instagram.com/shivani__mehandi__artist/',
  mainCourseTitle: 'Basic to Advanced Mehndi Course',
};

export const IMAGES = {
  hero: heroImg,
  bridal: bridalImg,
  training: trainingImg,
  arabic: arabicImg,
  feet: feetImg,
  traditional: traditionalImg,
};

export const COURSE_DETAILS = {
  title: 'Basic to Advanced Mehndi Course',
  eyebrow: 'Comprehensive Training',
  supportingText: 'Develop your mehndi skills through structured practice, creative designs and hands-on learning.',
  highlights: [
    {
      title: 'Professional Training',
      description: 'Systematic learning covering essential techniques, consistency, and professional finishing.',
    },
    {
      title: 'Hands-on Practice',
      description: 'Practical exercises to master cone control, precision pressure, speed, and delicate detailing.',
    },
    {
      title: 'Creative Mehndi Designs',
      description: 'Explore artistic layouts, balancing negative space, and crafting original compositions.',
    },
  ],
  topics: [
    'Cone Making',
    'Arabic Mehndi Design',
    'Traditional Mehndi Design',
    'Bridal Mehndi Design',
    'Engagement Mehndi Design',
    'Baby Shower Mehndi Design',
    'Foot Mehndi Design',
    'Bride & Groom Figures',
    'Peacock, Elephant, Cow & Swan Designs',
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'bridal-mehndi',
    title: 'Bridal Mehndi',
    description: 'Elaborate, bespoke bridal henna artistry on hands, arms, and feet, crafted with deep symbolism and refined intricacy for the bride.',
    image: bridalImg,
    features: ['Custom bridal patterns', 'Intricate wrist & arm work', 'Rich traditional motifs'],
  },
  {
    id: 'wedding-mehndi',
    title: 'Wedding Mehndi',
    description: 'Comprehensive festive henna services for the bride, bridal party, family members, and guests during wedding celebrations.',
    image: traditionalImg,
    features: ['Festive wedding styles', 'Coordinated family henna', 'Graceful aesthetic'],
  },
  {
    id: 'engagement-mehndi',
    title: 'Engagement Mehndi',
    description: 'Delicate, sophisticated designs crafted specifically for the engagement ceremony, balancing elegance and contemporary charm.',
    image: arabicImg,
    features: ['Subtle & romantic motifs', 'Modern negative space', 'Comfortable application'],
  },
  {
    id: 'baby-shower-mehndi',
    title: 'Baby Shower Mehndi',
    description: 'Auspicious, heart-warming motifs and traditional patterns celebrating motherhood, new beginnings, and family blessings.',
    image: traditionalImg,
    features: ['Celebratory motifs', 'Gentle application', 'Custom thematic accents'],
  },
  {
    id: 'special-occasion-mehndi',
    title: 'Special Occasion Mehndi',
    description: 'Artistic mehndi creations for festivals, anniversaries, and personal milestones tailored to your desired style.',
    image: feetImg,
    features: ['Festival & party designs', 'Quick intricate layouts', 'Personalized styling'],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Intricate Bridal Arms & Palms',
    category: 'Bridal',
    image: bridalImg,
    description: 'Detailed bridal henna incorporating traditional peacock and floral meshwork.',
  },
  {
    id: 'gal-2',
    title: 'Floral Flow Arabic Style',
    category: 'Arabic',
    image: arabicImg,
    description: 'Flowing diagonal trail with delicate shaded petals and balanced negative space.',
  },
  {
    id: 'gal-3',
    title: 'Training & Cone Precision Practice',
    category: 'Training & Practice',
    image: trainingImg,
    description: 'Hands-on practice session mastering cone pressure, strokes, and clean line consistency.',
  },
  {
    id: 'gal-4',
    title: 'Traditional Mandala & Jaal Art',
    category: 'Traditional',
    image: traditionalImg,
    description: 'Classic central mandala surrounded by geometric jaali netting and cuff detailing.',
  },
  {
    id: 'gal-5',
    title: 'Bridal Foot Henna Artistry',
    category: 'Bridal',
    image: feetImg,
    description: 'Symmetrical bridal feet adornment with floral borders and payal anklet motifs.',
  },
  {
    id: 'gal-6',
    title: 'Wedding Celebration Henna',
    category: 'Special Occasions',
    image: heroImg,
    description: 'Celebratory mehndi adorned with fine jewelry and rich natural stain.',
  },
  {
    id: 'gal-7',
    title: 'Traditional Figure & Animal Elements',
    category: 'Traditional',
    image: bridalImg,
    description: 'Handcrafted figure detailing featuring peacocks, royal arches, and auspicious figures.',
  },
  {
    id: 'gal-8',
    title: 'Course Motif Exploration',
    category: 'Training & Practice',
    image: trainingImg,
    description: 'Step-by-step drafting of basic to advanced curves, fillers, and border patterns.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Hands-on Practice',
    description: 'Dedicated focus on practical execution, cone handling, and steady muscle memory from the very first session.',
    icon: 'Sparkles',
  },
  {
    title: 'Basic to Advanced Learning',
    description: 'A structured step-by-step curriculum that gently guides learners from foundational lines to complex bridal figures.',
    icon: 'GraduationCap',
  },
  {
    title: 'Creative Mehndi Designs',
    description: 'Thoughtfully composed original layouts combining traditional Indian heritage with contemporary aesthetic balance.',
    icon: 'Palette',
  },
  {
    title: 'Wedding & Special Occasion Services',
    description: 'Professional, reliable, and punctual henna application crafted with love for life’s most cherished celebrations.',
    icon: 'HeartHandshake',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Pooja Deshmukh',
    role: 'Bridal Mehndi Client',
    location: 'Gadchiroli',
    rating: 5,
    highlight: 'Darkest henna stain & intricate peacock figures',
    review: 'Shivani did my wedding bridal mehndi and the precision was unbelievable! From the delicate dhol-tasha & bridal figures to the symmetrical jaali on my feet, everyone in my family was stunned. The natural henna cone gave an intensely rich dark stain that lasted over two weeks. Truly the best artist in Gadchiroli!',
    date: 'November 2024',
    verified: true,
  },
  {
    id: 'test-2',
    name: 'Snehal Patil',
    role: 'Basic to Advanced Course Student',
    location: 'Gadchiroli',
    rating: 5,
    highlight: 'Hands-on cone control & exceptional patience',
    review: "Enrolling in Shivani's Basic to Advanced Mehndi Course was the best decision for my creative journey. She pays individual attention to cone pressure, fine line consistency, and modern Arabic shading. Now I am taking bridal orders with full confidence!",
    date: 'January 2025',
    verified: true,
  },
  {
    id: 'test-3',
    name: 'Ananya Meshram',
    role: 'Engagement Mehndi',
    location: 'Chamorshi Road, Gadchiroli',
    rating: 5,
    highlight: 'Modern negative space & elegant finish',
    review: 'I wanted a contemporary Arabic floral design with clean negative space for my engagement ceremony. Shivani understood my vision immediately. She worked with so much patience and neatness. Got countless compliments on Instagram!',
    date: 'December 2024',
    verified: true,
  },
  {
    id: 'test-4',
    name: 'Kalyani Warjurkar',
    role: 'Baby Shower Mehndi',
    location: 'Gadchiroli',
    rating: 5,
    highlight: 'Gentle natural henna & auspicious motifs',
    review: 'Shivani created auspicious baby shower motifs with cradle and blooming lotus patterns on my hands. Her 100% organic henna smelled wonderful and was completely safe and cooling on my skin. Highly recommend her for family functions!',
    date: 'February 2025',
    verified: true,
  },
  {
    id: 'test-5',
    name: 'Roshni Zade',
    role: 'Wedding Family & Sangeet Package',
    location: 'Armori, Gadchiroli',
    rating: 5,
    highlight: 'Punctual, fast, and exquisite artistry',
    review: 'Shivani and her team handled our complete sangeet ceremony henna for over 25 relatives. She was punctual, exceptionally polite, and every single design was unique and detailed. Booking her made our wedding week completely stress-free.',
    date: 'October 2024',
    verified: true,
  },
  {
    id: 'test-6',
    name: 'Divya Borkar',
    role: 'Professional Course Graduate',
    location: 'Gadchiroli',
    rating: 5,
    highlight: 'Mastered bridal portraits & animal motifs',
    review: 'The step-by-step guidance on traditional figure work—especially peacocks, elephants, and bride-groom portraits—gave me skills I could never learn from online videos alone. Shivani is an extraordinary mentor and artist.',
    date: 'December 2024',
    verified: true,
  },
];
