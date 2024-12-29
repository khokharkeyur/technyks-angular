import { signal } from '@angular/core';
// import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';
// import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    // NgIf,
    // NgFor,
    CoursesComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  // model: any = {};
  // cover!: string | undefined | null;
  // cover_file: any;
  // showError = false;

  model = signal<any>({});
  showError = signal<boolean>(false);
  cover = signal<string | null | undefined>(null);
  cover_file = signal<any>(null);
  // courses: any[] = [];

  private courseService = inject(CourseService);

  // ngOnInit() {
  //   this.getCourses();
  // }
  // getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   // console.log('data', data);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // this.cover_file = file;
      this.cover_file.set(file);
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const dataUrl = reader.result?.toString();
        // this.cover = dataUrl;
        this.cover.set(dataUrl);
      };
      reader.readAsDataURL(file);
      // this.showError = false;
      this.showError.set(false);
    }
  }

  onSumbit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        // this.showError = true;
        this.showError.set(true);
      }
      return;
    }
    console.log(form.value);
    this.saveCourse(form.value);
    form.reset();
    // this.cover = 'null';
    // this.cover_file = null;
    this.cover.set(null);
  }
  saveCourse(formValue: any) {
    const data: Course = {
      ...formValue,
      image: this.cover(),
      // id: this.courses.length + 1,
    };
    this.courseService.addCourse(data);
    // this.courses = [...this.courses, data];
    // this.setItem(this.courses);
  }
  // deleteCourse(course: any) {
  //   console.log('course', course);
  //   this.courses = this.courses.filter((c: any) => c.id !== course.id);
  //   this.setItem(this.courses);
  // }

  setItem(data: any) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }
}
