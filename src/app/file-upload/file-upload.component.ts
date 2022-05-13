import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadService} from 'src/app/_services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.html',
  styleUrls: ['./file-upload.css']
})
export class FileUploadComponent implements OnInit {

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  constructor(private uploadService: FileUploadService) {
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    const formData: FormData = new FormData();
    // @ts-ignore
    for (const file of event.target.files) {
      formData.append('file', file);
    }

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      // for (let i = 0; i < this.selectedFiles.length; i++) {
      //   this.upload(i, this.selectedFiles[i]);
      // }
      this.upload(this.selectedFiles);
    }
  }


  upload(files: FileList): void {
    // this.progressInfos[idx] = {value: 0, fileName: file.name};
    if (files) {
      const formData: FormData = new FormData();
      // @ts-ignore
      for (const file of files) {
        formData.append('file', file);
      }
      this.uploadService.upload(files).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' //+ file.name;
            this.message.push(msg);
            // this.imageInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          // this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' //+ file.name;
          this.message.push(msg);
        });
    }
  }

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }
}
