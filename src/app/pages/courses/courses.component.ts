import { Component, inject, input, Input, signal } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  // courses: Course[] = [];
  courses = signal<Course[]>([]);
  // @Input() isAdmin = false;
  isAdmin = input(false);
  // @Output() del = new EventEmitter();
  coursesSub!: Subscription;
  private courseService = inject(CourseService);

  // constructor(private courseService: CourseService) {

  //  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }
  ngOnInit() {
    // this.courses = this.courseService.getCourses();
    this.courses.set( this.courseService.getCourses());

    this.coursesSub = this.courseService.Courses.subscribe({
      next: (data) => {
        // this.courses = data;
        this.courses.set(data);
        console.log(data, 'data');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //     // this.courses[0] = {...this.courses[0], isActive: true};
  //   }
  // }

  ngOnDestroy() {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
  }
}
