import Link from "next/link";

export default function EnrollInCourseDialog({
  courseId,
}: {
  courseId: string;
}) {
  return (
    <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full">
      <img src="/enroll-course.png" className="w-[50%] max-w-[400px]" />
      <p className="mt-8 mb-2 text-4xl font-bold">
        Please enroll in this course
      </p>
      <p className="mb-8 text-lg">
        Enrolling in this course will give you access to all the materials.
      </p>
      <Link
        href={"/checkout?courseId=" + courseId}
        className="border-2 border-[var(--android-primary-color)] hover:bg-[var(--android-primary-color)] hover:text-white text-[var(--android-primary-color)] py-2 px-6 rounded-full font-medium"
      >
        Enroll Now
      </Link>
    </div>
  );
}
