import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { MyAppComponent } from './components/my-app/my-app.component';
import { MyPgComponent } from './components/my-pg/my-pg.component';
import { MySkComponent } from './components/my-sk/my-sk.component';
import { MyBarComponent } from './components/my-bar/my-bar.component';
import { MyOsComponent } from './components/my-os/my-os.component';

import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
      { prefix: PATH + '/assets/i18n/', suffix: '.json' },
      { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

@NgModule({

  declarations: [
      MyAppComponent,
      MyPgComponent,
      MySkComponent,
      MyBarComponent,
      MyOsComponent
],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      UIAngularComponentsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
        useDefaultLang: false,
      })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const myappComponent = createCustomElement(MyAppComponent, {injector: this.injector});
    customElements.define('funh-new-urcap-my-app', myappComponent);
    const mypgComponent = createCustomElement(MyPgComponent, {injector: this.injector});
    customElements.define('funh-new-urcap-my-pg', mypgComponent);
    const myskComponent = createCustomElement(MySkComponent, {injector: this.injector});
    customElements.define('funh-new-urcap-my-sk', myskComponent);
    const mybarComponent = createCustomElement(MyBarComponent, {injector: this.injector});
    customElements.define('funh-new-urcap-my-bar', mybarComponent);
    const myosComponent = createCustomElement(MyOsComponent, {injector: this.injector});
    customElements.define('funh-new-urcap-my-os', myosComponent);
  }

  // This function is never called, because we don't want to actually use the workers, just tell webpack about them
  registerWorkersWithWebPack() {
    new Worker(new URL('./components/my-app/my-app.behavior.worker.ts'
        /* webpackChunkName: "my-app.worker" */, import.meta.url), {
      name: 'my-app',
      type: 'module'
    });new Worker(new URL('./components/my-pg/my-pg.behavior.worker.ts'
        /* webpackChunkName: "my-pg.worker" */, import.meta.url), {
      name: 'my-pg',
      type: 'module'
    });new Worker(new URL('./components/my-sk/my-sk.behavior.worker.ts'
        /* webpackChunkName: "my-sk.worker" */, import.meta.url), {
      name: 'my-sk',
      type: 'module'
    });new Worker(new URL('./components/my-bar/my-bar.behavior.worker.ts'
        /* webpackChunkName: "my-bar.worker" */, import.meta.url), {
      name: 'my-bar',
      type: 'module'
    });new Worker(new URL('./components/my-os/my-os.behavior.worker.ts'
        /* webpackChunkName: "my-os.worker" */, import.meta.url), {
      name: 'my-os',
      type: 'module'
    });
  }
}

