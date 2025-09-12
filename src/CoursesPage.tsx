import AllCoursesSection from './components/AllCoursesSection';
import FeaturedCourseSection from './components/FeaturedCourseSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import OfferBanner from './components/OfferBanner';

const CoursesPage = () => {
  return (
    <>
      <FeaturedCourseSection />
      {/* Limited-time banner only on Courses page, above courses */}
      <OfferBanner />
      {/* Heading above courses */}
      <section className="container mx-auto px-4 mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">Explore our courses</h2>
      </section>
      <AllCoursesSection />
      {/* Intro + single CTA moved below the course cards */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <p className="text-lg text-gray-800">
            For working professionals & learners with strong academic foundations, ready to grow into AI-powered decision-makers.
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700 bg-white border rounded-full px-4 py-1 shadow-sm">
            Only 30 Seats | Interview-Based Shortlisting
          </p>
          <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">Book Your Free Interview Slot Today</h2>

          <div className="mt-5 flex justify-center">
            <a
              href="/support#booking"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:shadow-md"
            >
              Book Interview
            </a>
          </div>
        </div>
      </section>
      <WhyChooseUsSection />
      <TestimonialsSection />
    </>
  );
};

export default CoursesPage;
