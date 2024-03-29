import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from 'src/app/services/global';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent {
  public article: Article;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.url = Global.url;
    this.article = { _id: '', title: '', content: '', image: '', date: null };
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe({
        next: response => {
          if (response.article) {
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },
        error: error => this._router.navigate(['/home'])
      });
    });

  }

  delete(id: any) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El artículo se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._articleService.delete(id).subscribe({
          next: response => {
            Swal.fire('Artículo borrado', 'El artículo ha sido borrado', 'success');
            this._router.navigate(['/blog']);
          },
          error: error => {
            console.log(error);
            //this._router.navigate(['/home'])
            this._router.navigate(['/blog']);
          }
        });
      } else {
        Swal.fire('Operación cancelada', 'El artículo no ha sido borrado');
      }
    });    
  }
}
