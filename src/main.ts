import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js')
      }
    }
  ]
})

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
