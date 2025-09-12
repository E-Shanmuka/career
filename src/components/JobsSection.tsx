import React, { useEffect, useState } from 'react';
import { MapPin, Briefcase, Building, Globe, Zap, Target } from 'lucide-react';
import { jobService } from '../services/jobService';

type BackendJob = {
  _id: string;
  title: string;
  company: string;
  location?: string;
  type?: string;
  applicationUrl?: string;
};

const features = [
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: 'AI-Powered Matching',
      description: 'Our smart algorithm connects you with roles that perfectly match your skills, experience, and career ambitions.',
    },
    {
      icon: <Globe className="h-8 w-8 text-white" />,
      title: 'Global Opportunities',
      description: 'Explore thousands of listings from top companies and innovative startups across the globe.',
    },
    {
      icon: <Target className="h-8 w-8 text-white" />,
      title: 'Simplified Applications',
      description: 'Apply to jobs with a single click and track your application status all in one place.',
    },
  ];

const JobsSection: React.FC = () => {
  const [jobs, setJobs] = useState<BackendJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await jobService.getJobs({ limit: 12 });
        if (mounted) setJobs(data as BackendJob[]);
      } catch (e) {
        console.error('Failed to load featured jobs', e);
        if (mounted) setError('Failed to load jobs');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative text-white text-center py-20 md:py-32 px-4 overflow-hidden">
        {/* Background image */}
        <img src="/jobs.jpg" alt="Jobs at Career Redefine" className="absolute inset-0 w-full h-full object-cover" />
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fadeInDown">Find Your Next Big Opportunity</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto animate-fadeInUp">
            Your dream job is closer than you think. Apply with confidence using our powerful tools.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Why Job Seekers Love Us</h2>
            <p className="mt-4 text-lg text-gray-600">We provide the tools you need to succeed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600 text-white mx-auto mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="mt-4 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Jobs Section */
      }
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Featured Job Openings</h2>
            <p className="mt-4 text-lg text-gray-600">Explore curated roles from leading companies worldwide.</p>
          </div>
          {loading && (
            <div className="text-center text-gray-500">Loading jobs...</div>
          )}
          {error && (
            <div className="text-center text-red-600">{error}</div>
          )}
          {!loading && !error && jobs.length === 0 && (
            <div className="text-center text-gray-500">No jobs found. Please check back later.</div>
          )}
          {!loading && !error && jobs.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="p-6 flex items-center gap-6">
                    {/* Left side - Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        <Briefcase className="h-10 w-10" />
                      </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          {/* Job Title */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>
                          
                          {/* Company Name */}
                          <div className="flex items-center mb-3 text-gray-600">
                            <Building className="h-4 w-4 mr-2" />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          
                          {/* Job Details */}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            {job.location && (
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{job.location}</span>
                              </div>
                            )}
                            {job.type && (
                              <div className="flex items-center">
                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">{job.type}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Apply Button */}
                        <div className="flex-shrink-0">
                          <a
                            href={job.applicationUrl || '#'}
                            target={job.applicationUrl ? '_blank' : undefined}
                            rel="noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                          >
                            View & Apply
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
              View All Jobs
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Create your profile today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsSection;
