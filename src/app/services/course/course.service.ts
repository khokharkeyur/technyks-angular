import { Injectable } from '@angular/core';
import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses$ = new BehaviorSubject<Course[]>([]);

  get Courses() {
    return this.courses$.asObservable(); // when values change then observ the changes values
  }

  constructor() {}

  getCourses(): Course[] {
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    if (data) {
      const courses = JSON.parse(data);
      this.updateCourses(courses);
      return courses;
    }
    return [];
  }
  addCourse(data: Course) {
    const courses = this.courses$.value;
    const newCourses = [...courses, { ...data, id: courses.length + 1 }];
    this.updateCourses(newCourses);
    this.setItem(newCourses);
    return newCourses;
  }

  deleteCourse(data: Course) {
    const courses = this.courses$.value;
    const newCourses = courses.filter((course) => course.id !== data.id);
    this.updateCourses(newCourses);
    this.setItem(newCourses);
    return newCourses;

  }

  updateCourses(data: Course[]) {
    this.courses$.next(data); // update the observable values
  }
  setItem(data: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }
}
