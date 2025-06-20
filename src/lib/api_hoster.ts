import allCoursesData from '@/data/all-courses.json';

import composeCourse from "@/data/android-basics-with-compose.json";
import webCourse from "@/data/full-stack-basics.json";
import firebaseCourse from "@/data/firebase_get_cloud_ready.json";
import genkitCourse from "@/data/machine-learning-genai.json";
import flutterCourse from "@/data/flutter-basics-with-dart.json";

class MockApiProvider {
    static courses = [composeCourse, webCourse, firebaseCourse, genkitCourse, flutterCourse];
    static async fetchAllCourses() {
        return allCoursesData;
    }
    static async fetchCourseById(courseId: string) {
        if (this.courses.filter((course) => course.courseId === courseId).length > 0) {
            return this.courses.filter((course) => course.courseId === courseId)[0];
        }
        throw new Error(`Course with ID ${courseId} not found`);
    }
    static async fetchWeekById(courseId: string, weekId: string) {
        const course = this.courses.find((course) => course.courseId === courseId);
        if (!course) {
            throw new Error(`Course with ID ${courseId} not found`);
        }
        const week = course.courseOutline.find((week: any) => week.unitId === weekId);
        if (!week) {
            throw new Error(`Week with ID ${weekId} not found in course ${courseId}`);
        }
        return { courseName: course.courseName, ...week };
    }
}

export default MockApiProvider;