import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Admin } from 'src/app/Core/interface/Admins/admin';
import { ApiChapterService } from 'src/app/Core/Services/Chapter/api-chapter.service';
import { ApiLessonService } from 'src/app/Core/Services/Lesson/api-lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-videos',
  templateUrl: './upload-videos.component.html',
  styleUrls: ['./upload-videos.component.css']
})
export class UploadVideosComponent implements OnInit {

  showModal = false;
    chapterForm!: FormGroup;
    showPassword : boolean = false;
    mode : boolean = false;
    selectId! : number
    hideInputpass = false ;
    Chapters : any ;
    Lessons : any ;

    trackBy(index: number, chapter: any): number {
      return chapter.id;
    }

    editingIndex: number | null = null;

    constructor(private fb: FormBuilder , private _lessonService : ApiLessonService , private _chapterService : ApiChapterService ) {}

    ngOnInit(): void {
      this.chapterForm = this.fb.group({
        lessonId: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(3)]],
        document : ['', Validators.required],
        video : ['', Validators.required]
      });

      // Get All Admins
      this.getAllLessons();

      // Get All Chapter
      this.getChapters();

    }
    // Get All Chapters
    chapterId!  : number
    getAllLessons() : void {
      this._lessonService.getLessons().subscribe({
        next : (res) => {
          console.log(res);

          this.Lessons = res.lessons;
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: err.error?.message,
            confirmButtonColor: '#d33',
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
    }

    // Get All Chapter
      getChapters() : void {
        this._chapterService.getChapters().subscribe({
          next : (res) => {
            console.log("cahp"+  res);
            console.log(res);

            // this.chapterId = res.lessons
            this.Chapters = res.chapters;
            console.log( "sfdfsd" +this.Chapters);

          },
          error : (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: err.error?.message,
              confirmButtonColor: '#d33',
              timer: 2000,
              timerProgressBar: true,
            });
          }
        })
      }

      onFileChange(event: Event, controlName: 'document' | 'video') {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.chapterForm.get(controlName)?.setValue(file);
  }
}

    // Show password
    showIcon() {
      this.showPassword = !this.showPassword;
    }

    // Open the modal
    openAddModal() {
      this.chapterForm.enable();
      this.chapterForm.reset();
      this.editingIndex = null;
      this.showModal = true;
    }

    // Add or update an admin
    addOrUpdateChapter() {
  this.showModal = false;
  this.chapterForm.enable();

  if (!this.chapterForm.valid) {
    return;
  }

  // 1. إنشاء FormData
  const formData = new FormData();
  formData.append('lessonId', this.chapterForm.get('lessonId')?.value);
  formData.append('description', this.chapterForm.get('description')?.value);
  formData.append('document', this.chapterForm.get('document')?.value);
  formData.append('video', this.chapterForm.get('video')?.value);

  // 2. حفظ أو تعديل
  if (!this.mode) {
    this._lessonService.createLessonResource(formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message?.message || 'تمت الإضافة بنجاح',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.getAllLessons();
          this.showPassword = false;
          this.mode = false;
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error?.message || 'حدث خطأ',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close',
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  } else {
    this._lessonService.updateLesson(this.selectId, formData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.message || 'تم التعديل بنجاح',
          confirmButtonColor: '#28a745',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.getAllLessons();
          this.showPassword = false;
          this.mode = false;
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error?.message || 'حدث خطأ',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Close',
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }
}


    // Edit an admin
    editChapter(category: Admin) {
      this.hideInputpass = true;

      this.mode = true;
      this.showModal = false;
      this.chapterForm.enable();
      const fullname = category.username;

      this.chapterForm.patchValue({
        name: fullname
      });
      this.selectId = category.id;
      this.showModal = true;
    }

    // Show an admin
    show : boolean = false ;
    showChapter(category: Admin) {

      this.hideInputpass = true;
      this.show = true;
      this.chapterForm.disable();
      const fullname = category.username;

      this.chapterForm.patchValue({
        name: fullname
      });
      this.selectId = category.id;
      this.showModal = true;
    }

    // Delete an admin
    deleteChapter(id: number) {
      Swal.fire({
        title: 'Are you sure want to delete ?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this._lessonService.deleteLesson(id).subscribe({
            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: res.message,
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
              }).then(() => {
                this.getAllLessons(); // تحديث القائمة بعد الحذف
              });
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: err.error?.message,
                confirmButtonColor: '#d33',
                timer: 2000,
                timerProgressBar: true,
              });
            }
          });
        }
      });
    }

    // Close the modal
    closeModal() {
      this.showModal = false;
      this.chapterForm.reset();
      this.editingIndex = null;
      this.show = false;
      this.hideInputpass = false ;
    }

}
