import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Globe, Clock, Users, Star, Award } from 'lucide-react';
import { courseService, Course } from '../services/courseService';
import QueryForm from './queries/QueryForm';

const CoursesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeQueryCourse, setActiveQueryCourse] = useState<Course | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await courseService.getCourses({ limit: 10 });
        if (mounted) setCourses(data);
      } catch (e) {
        console.error('Failed to load courses', e);
        if (mounted) setError('Failed to load courses');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);


  return (
    <section className="py-20 bg-white relative overflow-hidden" id="courses">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 -right-20 w-60 h-60 bg-purple-100 rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            <span>Popular Courses</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Transform Your Career with
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Industry-Leading Courses
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts with hands-on projects, personalized mentorship, 
            and job placement assistance in multiple languages.
          </p>
        </div>


        {loading && (
          <div className="text-center text-gray-500">Loading courses...</div>
        )}
        {error && (
          <div className="text-center text-red-600">{error}</div>
        )}
        {!loading && !error && (
        <div className="flex justify-center">
          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 max-w-7xl"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {courses.map((course, index) => (
              <div
                key={index}
                className="group relative flex-none w-80 h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gray-900"
              >
                {/* Background Image */}
                <img
                  src={(course as any).image || 'https://via.placeholder.com/800x450?text=Course'}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Lighter gradient overlay for brighter look */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.5)_100%)]"></div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{((course as any).averageRating && (course as any).averageRating > 0 ? (course as any).averageRating : 4.8)}</span>
                </div>

                {/* Content over the image */}
                <div className="relative z-10 h-full flex flex-col justify-center px-5">
                  <h3
                    className="text-2xl font-extrabold text-cyan-300 text-center drop-shadow"
                    style={{ textShadow: '0 0 18px rgba(34,211,238,0.9), 0 0 8px rgba(34,211,238,0.6)' }}
                  >
                    {course.title}
                  </h3>

                  {/* Meta Row */}
                  <div className="mt-6 flex items-center justify-center gap-4 text-gray-200/90 text-sm">
                    <span className="inline-flex items-center gap-1"><Globe className="w-4 h-4" />{(course as any).languages || 'English'}</span>
                    <span className="inline-flex items-center gap-1"><Clock className="w-4 h-4" />{(course as any).duration || 'Self-paced'}</span>
                    <span className="inline-flex items-center gap-1"><Award className="w-4 h-4" />{(course as any).level || 'All Levels'}</span>
                  </div>

                  {/* Bottom buttons separated */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <a
                      href={(course as any).pageLink || '#'}
                      target={((course as any).pageLink ? '_blank' : undefined) as any}
                      rel={((course as any).pageLink ? 'noopener noreferrer' : undefined) as any}
                      className="px-4 py-2 text-sm font-semibold rounded-full bg-white/90 text-gray-900 hover:bg-white transition-colors flex items-center shadow-sm"
                    >
                      View More <ExternalLink className="w-4 h-4 ml-1.5" />
                    </a>
                    <button
                      onClick={() => setActiveQueryCourse(course)}
                      className="px-4 py-2 text-sm font-semibold rounded-full bg-green-400 text-white hover:bg-green-500 transition-colors shadow-sm"
                    >
                      Query
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Query Modal */}
        {activeQueryCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
              <button
                onClick={() => setActiveQueryCourse(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4">Course Query</h3>
              <QueryForm
                courseId={activeQueryCourse._id}
                courseName={activeQueryCourse.title}
                defaultSubject={`Query about ${activeQueryCourse.title}`}
                onSuccess={() => setActiveQueryCourse(null)}
              />
            </div>
          </div>
        )}

        {/* View All Courses Button */}
        <div className="text-center mt-12">
          <Link to="/courses" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;