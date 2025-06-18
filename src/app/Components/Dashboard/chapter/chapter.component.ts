import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/Core/interface/Admins/admin';
import { AdminService } from 'src/app/Core/Services/Admins/admin.service';
import { ApiChapterService } from 'src/app/Core/Services/Chapter/api-chapter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  showModal = false;
    chapterForm!: FormGroup;
    showPassword : boolean = false;
    mode : boolean = false;
    selectId! : number
    hideInputpass = false ;
    Chapters : any ;

    trackBy(index: number, chapter: any): number {
      return chapter.id;
    }

    editingIndex: number | null = null;

    constructor(private fb: FormBuilder , private _chapterService : ApiChapterService ) {}

    ngOnInit(): void {
      this.chapterForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(3)]]
      });

      // Get All Admins
      this.getAllChapters();

    }
    // Get All Admins
    getAllChapters() : void {
      this._chapterService.getChapters().subscribe({
        next : (res) => {
          console.log(res);

          this.Chapters = res.chapters;
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
        this._chapterService.createChapter(adminData).subscribe({
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
              this.getAllChapters();
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
        this._chapterService.updateChapter(this.selectId , adminData).subscribe({
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
              this.getAllChapters();
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
          this._chapterService.deleteChapter(id).subscribe({
            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: res.message,
                confirmButtonColor: '#28a745',
                timer: 2000,
                timerProgressBar: true,
              }).then(() => {
                this.getAllChapters(); // تحديث القائمة بعد الحذف
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
