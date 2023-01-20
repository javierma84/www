import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent {
  public article: Article;
  public status!: string;
  public page_title: string;
  public is_edit: boolean;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 50,
    uploadAPI: {
      url: Global.url + 'upload-image',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', '', null);
    this.page_title = 'Crear artículo';
    this.is_edit = false;
    this.url = Global.url;
  }

  ngOnInit() { }

  onSubmit() {
    this._articleService.create(this.article).subscribe({
      next: response => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          //Alerta
          Swal.fire(
            'Articulo creado',
            'El articulo se ha creado correctamente',
            'success'
          );
          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }
      },
      error: error => this.status = 'error'
    });
  }

  imageUpload(data: any) {
    this.article.image = data.body.image;
  }
}
