import { Component } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService]
})
export class HomeComponent {
  public title: string;
  public articles: Article[] = [];

  constructor(
    private _articleService: ArticleService
  ){
    this.title = 'Últimos artículos';
  }

  ngOnInit() {
    //console.log( this._articleService.pruebas());
    this._articleService.getArticles(true).subscribe({
      next: response => {
        if (response.articles) {
          this.articles = response.articles;
          console.log(this.articles);
        }
      },
      error: error => console.log(error)
    });
  }
}
