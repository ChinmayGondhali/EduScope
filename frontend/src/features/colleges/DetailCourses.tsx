"use client";

import { Course } from "@/types";
import { useState } from "react";
import { Loader2, Download, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface DetailCoursesProps {
  courses: Course[];
}

export function DetailCourses({ courses }: DetailCoursesProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const handleDownload = (id: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => [...prev, id]);
    }, 2000);
  };

  return (
    <section className="py-12 border-t">
      <h2 className="text-2xl font-bold mb-8">Available Courses</h2>
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="p-4 font-semibold text-sm">Course Name</th>
              <th className="p-4 font-semibold text-sm">Duration</th>
              <th className="p-4 font-semibold text-sm">Average Fees</th>
              <th className="p-4 font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="p-4 font-medium">{course.course_name}</td>
                <td className="p-4 text-muted-foreground">{course.duration}</td>
                <td className="p-4 font-bold text-primary">₹{course.fees.toLocaleString()}</td>
                <td className="p-4">
                  <button 
                    onClick={() => handleDownload(course.id)}
                    disabled={downloadingId === course.id || downloadedIds.includes(course.id)}
                    className="flex items-center text-primary text-sm font-semibold hover:underline disabled:no-underline disabled:text-muted-foreground"
                  >
                    {downloadingId === course.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : downloadedIds.includes(course.id) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        Downloaded
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download Syllabus
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
