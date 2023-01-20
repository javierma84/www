import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [ArticleService]
})
export class BlogComponent {

  public articles: Article[] = [];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    //console.log( this._articleService.pruebas());
    this._articleService.getArticles().subscribe({
      next: response => {
        if (response.articles) {
          this.articles = response.articles;
        }
      },
      error: error => console.log(error)
    });
  }
}
