import React from 'react';
import { UserState } from '../types';
import { BookOpen, CheckCircle, Clock, Star, Play, ChevronRight, Award } from 'lucide-react';

interface MyCoursesViewProps {
  userState: UserState;
  onStartScenario: () => void;
}

export const MyCoursesView: React.FC<MyCoursesViewProps> = ({
  userState,
  onStartScenario,
}) => {
  const courses = [
    {
      id: 'fo-blr',
      title: 'Front Office Excellence - Sandalwood Grand BLR',
      category: 'Hospitality & Guest Operations',
      progress: 85,
      scenariosCount: 12,
      completedCount: 10,
      activeScenario: 'Wrong Charges at Checkout (Mr. Iyer)',
      badge: 'Active Focus',
    },
    {
      id: 'hk-deluxe',
      title: 'Luxury Suite Preparation & Turn Down Service',
      category: 'Housekeeping Standards',
      progress: 60,
      scenariosCount: 8,
      completedCount: 5,
      activeScenario: 'VIP Guest Special Requests',
    },
    {
      id: 'fb-concierge',
      title: 'Fine Dining & Banquet Revenue Management',
      category: 'Food & Beverage Operations',
      progress: 40,
      scenariosCount: 10,
      completedCount: 4,
      activeScenario: 'Handling Billing Disputes in Private Dining',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-200">
              Sandalwood Grand Training Academy
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl text-slate-900">
            My Courses & Modules
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Enterprise workplace curriculum synchronized with Magpie AI Coach
          </p>
        </div>

        <button
          onClick={onStartScenario}
          className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>RESUME ACTIVE SCENARIO</span>
        </button>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  {course.category}
                </span>
                {course.badge && (
                  <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                    {course.badge}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-slate-900 text-base mb-2 leading-snug">
                {course.title}
              </h3>

              <p className="text-xs text-slate-500 mb-4">
                Current Scenario: <strong className="text-slate-800">{course.activeScenario}</strong>
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Progress</span>
                  <span className="text-purple-700 font-bold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-purple-700 to-indigo-600 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                {course.completedCount} of {course.scenariosCount} completed
              </span>
              <button
                onClick={onStartScenario}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Practice</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
