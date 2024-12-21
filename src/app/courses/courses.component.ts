import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  @Input() course: any;
  @Input() isDelete = false;
  @Output() del = new EventEmitter();

  deleteCourse(course:any) {  
    this.del.emit(this.course);
  }
}
