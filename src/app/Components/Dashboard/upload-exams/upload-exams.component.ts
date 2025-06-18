import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Admin } from 'src/app/Core/interface/Admins/admin';
import { ApiChapterService } from 'src/app/Core/Services/Chapter/api-chapter.service';
import { ExamsForOneLessonService } from 'src/app/Core/Services/ExamsForOneLesson/exams-for-one-lesson.service';
import { ApiLessonService } from 'src/app/Core/Services/Lesson/api-lesson.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-exams',
  templateUrl: './upload-exams.component.html',
  styleUrls: ['./upload-exams.component.css']
})
export class UploadExamsComponent implements OnInit {

  showModal = false;
  chapterForm!: FormGroup;
  examForm!: FormGroup;
  showPassword : boolean = false;
  mode : boolean = false;
  selectId! : number
  hideInputpass = false ;
  Chapters : any ;

  lessonId : any

  trackBy(index: number, chapter: any): number {
    return chapter.id;
  }

  editingIndex: number | null = null;

  constructor(private fb: FormBuilder , private _UploadExam : ExamsForOneLessonService , private _lessonService : ApiLessonService ) {}

  ngOnInit(): void {
    this.chapterForm = this.fb.group({
      lessonId: ['', Validators.required],
      questions: this.fb.array([
        this.fb.group({
          question: ['', Validators.required],
          options: this.fb.array([
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control(''),
            this.fb.control('')
          ]),
          correctAnswer: ['', Validators.required],
          mark: ['', Validators.required]
        })
      ])
    });

    this.examForm = this.fb.group({
      lessonId: ['', Validators.required]
    });

    // Get All Admins
    this.getAllExames();

    // Get All Lesson
    this.getlessons();

  }


  addQuestion(): void {
  const questionsArray = this.chapterForm.get('questions') as FormArray;
    questionsArray.push(
      this.fb.group({
        question: ['', Validators.required],
        options: this.fb.array([
          this.fb.control(''),
          this.fb.control(''),
          this.fb.control(''),
          this.fb.control('')
        ]),
        correctAnswer: ['', Validators.required],
        mark: ['', Validators.required]
      })
    );
  }

  removeQuestion(index: number): void {
    const questionsArray = this.chapterForm.get('questions') as FormArray;
    questionsArray.removeAt(index);
  }

  get questions(): FormArray {
    return this.chapterForm.get('questions') as FormArray;
  }

  getOptions(i: number): FormArray {
    return this.questions.at(i).get('options') as FormArray;
  }


  // Get All Admins
  getAllExames() : void {
    // const id = 0
    // this._UploadExam.getExamsForOneLesson(id).subscribe({
    //   next : (res) => {
    //     console.log(res);

    //     this.Chapters = res.chapters;
    //   },
    //   error : (err) => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error!',
    //       text: err.error?.message,
    //       confirmButtonColor: '#d33',
    //       timer: 2000,
    //       timerProgressBar: true,
    //     });
    //   }
    // })
  }

  // Get All Lesson
  getlessons() : void {
    this._lessonService.getLessons().subscribe({
      next : (res) => {
        console.log(res);
        this.lessonId = res.lessons
        // this.Chapters = res.lessons;
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

  // Get Exam By Id For Lesson
  selectIdLesson : any ;

  onLessonChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectIdLesson = selectedValue;

  }
  getExamByIdForLesson() : void {

    this._UploadExam.getExamsForOneLesson(this.selectIdLesson).subscribe({
      next : (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);

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
      return
    }

    const adminData = this.chapterForm.value;
    if(!this.mode) {
      this._UploadExam.createExamsForOneLesson(adminData).subscribe({
        next : (res) => {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.message.message,
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.getAllExames();
            this.showPassword = false ;
            this.mode = false ;
          });
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error?.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Close',
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
    }else {
      this._UploadExam.updateExamsForOneLesson(this.selectId , adminData).subscribe({
        next : (res) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res.message,
            confirmButtonColor: '#28a745',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            this.getAllExames();
            this.showPassword = false ;
            this.mode = false ;
          });
        },
        error : (err) => {
          Swal.fire({
            icon: 'error',
            title: err.error?.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Close',
            timer: 2000,
            timerProgressBar: true,
          });
        }
      })
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
        this._UploadExam.deleteExamsForOneLesson(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: res.message,
              confirmButtonColor: '#28a745',
              timer: 2000,
              timerProgressBar: true,
            }).then(() => {
              this.getAllExames(); // تحديث القائمة بعد الحذف
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
