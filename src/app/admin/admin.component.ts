// import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from "../courses/courses.component";
// import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
    FormsModule,
    // NgIf,
    // NgFor,
    CoursesComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  model: any = {};
  cover!: string | undefined;
  cover_file: any;
  showError = false;
  courses:any[] = [];

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        const dataUrl = reader.result?.toString();
        this.cover = dataUrl;
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  onSumbit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }
    if (this.cover) {
      console.log('form invalid');
      form.control.markAllAsTouched();
      return;
    }
    console.log(form.value);
  }
}
