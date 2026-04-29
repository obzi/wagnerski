"use client";

import { useState, useRef } from "react";
import { Tag } from "@/components/ui/Tag";
import { CourseSignupForm } from "@/components/ui/CourseSignupForm";
import type { InstructorCourse } from "@/lib/supabase";
import texts from "@/data/texts.json";

interface CourseWithSignupProps {
  courses: InstructorCourse[];
  signupNote?: string;
}

export function CourseWithSignup({ courses, signupNote }: CourseWithSignupProps) {
  const [preselected, setPreselected] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  function handleCourseClick(courseId: string) {
    setPreselected(courseId);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }

  return (
    <>
      {/* Courses */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.courseWithSignup.eyebrow}
          </span>
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="group border border-line rounded-[3px] bg-cream p-6 flex flex-col hover:border-accent/40 transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-[0.14em] text-accent font-medium mb-2">
                    {c.hours}
                  </span>
                  <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-1">
                    {c.level}
                  </h3>
                  <p className="text-[12px] text-ink-muted mb-4">{c.subtitle}</p>
                  <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4 flex-1">
                    {c.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                  <div className="border-t border-line pt-4 mt-auto space-y-1.5">
                    <div className="flex justify-between text-[12px]">
                      <span className="text-ink-muted">{texts.courseWithSignup.termLabel}</span>
                      <span className="font-medium">{c.date}</span>
                    </div>
                    <div className="flex justify-between text-[12px]">
                      <span className="text-ink-muted">{texts.courseWithSignup.locationLabel}</span>
                      <span className="font-medium">{c.location}</span>
                    </div>
                  </div>
                  {(c.price_with_accommodation > 0 || c.price_without_accommodation > 0) && (
                    <div className="border-t border-line pt-3 mt-3 space-y-1.5">
                      {c.price_with_accommodation > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-ink-muted">{texts.courseWithSignup.priceWithAccommodation}</span>
                          <span className="font-medium text-accent">
                            {c.price_with_accommodation.toLocaleString("cs-CZ")} Kč
                          </span>
                        </div>
                      )}
                      {c.price_without_accommodation > 0 && (
                        <div className="flex justify-between text-[12px]">
                          <span className="text-ink-muted">{texts.courseWithSignup.priceWithoutAccommodation}</span>
                          <span className="font-medium">
                            {c.price_without_accommodation.toLocaleString("cs-CZ")} Kč
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => handleCourseClick(c.id)}
                    className="mt-4 w-full text-center bg-ink text-cream text-[10px] uppercase tracking-[0.14em] px-4 py-2.5 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {texts.courseWithSignup.signupButton}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[14px] text-ink-secondary">{texts.courseWithSignup.empty}</p>
          )}
        </div>
      </section>

      {/* Signup Form */}
      <section className="py-16 px-7 bg-surface" id="prihlaska">
        <div className="max-w-xl mx-auto" ref={formRef}>
          {signupNote && (
            <p className="text-[13px] text-ink-secondary text-center mb-6 leading-[1.6]">
              {signupNote}
            </p>
          )}
          <CourseSignupForm courses={courses} preselectedCourseId={preselected} />
        </div>
      </section>
    </>
  );
}
