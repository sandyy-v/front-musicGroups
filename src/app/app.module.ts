import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';


// ////////////////////
// // PROTOCOLE HTTP //
// ////////////////////
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './HttpRequestInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/////////////////
// FORMULAIRES //
/////////////////
import { FormsModule } from '@angular/forms';

////////////////'
// APPLICATION //
/////////////////
import { AppComponent } from './app.component';
import { MusicGroupsComponent } from './music-groups/music-groups.component';
import { MusicGroupDefComponent } from './music-group-def/music-group-def.component';

/*
@NgModule({
  declarations: [
    AppComponent,
    MusicGroupsComponent,
    MusicGroupDefComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  bootstrap: [ AppComponent ]
})*/

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/music-groups', pathMatch: 'full' }
//   { path: 'music-groups', component: MusicGroupsComponent },
//   { path: 'music-group-definition/:id', component: MusicGroupDefComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    MusicGroupsComponent,
    MusicGroupDefComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
//     RouterModule.forRoot(
//       appRoutes,
//       { useHash: true, initialNavigation: false }
//     )
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
