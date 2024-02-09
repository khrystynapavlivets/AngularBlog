import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { AngularBlogComponent } from "./angular-blog/angular-blog.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, AngularBlogComponent]
})
export class AppComponent {
  title = 'angular-blog';
}
