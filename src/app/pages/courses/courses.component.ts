import { Component, inject, Input} from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses: Course[] = [];
  @Input() isAdmin = false;
  // @Output() del = new EventEmitter();
  private courseService = inject(CourseService);

  // constructor(private courseService: CourseService) {

  //  }

  deleteCourse(course:any) {  
    // this.del.emit(course);
  }
  ngOnInit() {
   this.courses = this.courseService.getCourses();
    
  }
  // getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //     // this.courses[0] = {...this.courses[0], isActive: true};
  //   }
  // }
}
