import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * Project was created without Routing option
 * so Routing will be setup here (otherwise in app-routing.module.ts)
 * followed https://angular.io/start/start-routing
 * used structure from mit-ws-20-21-requests.pdf
 * so components needed are: Start, Navigation, Room Info, Int. Office, Login
 * difference to structure image: gave navigation higher prio than room info
 *
 */

// Components
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LoginComponent } from './login/login.component';
import { InternationalComponent } from './international/international.component';
import { AdminComponent } from './admin/admin.component';
import { EventComponent } from './event/event.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtGuard } from './jwt.guard';

// Modules
import { InternationalModule } from './international/international.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
// Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSidenavModule,
} from '@angular/material/sidenav';
import {
  MatListModule,
} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateLoader, TranslateModule, TranslateService } from
  '@ngx-translate/core';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { RegisterComponent } from './register/register.component';
import { AppointmentComponent } from './appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    NavigationComponent,
    RoomsComponent,
    LoginComponent,
    SelectLanguageComponent,
    AdminComponent,
    EventComponent,
    ProfileComponent,
    RegisterComponent,
    AppointmentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: StartComponent },
      { path: 'news', component: StartComponent },
      { path: 'navigation', component: NavigationComponent },
      { path: 'event', component: EventComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'international', component: InternationalComponent },
      { path: 'admin', component: AdminComponent, canActivate: [JwtGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment', component: AppointmentComponent }
    ]),
    InternationalModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    BrowserAnimationsModule,
    I18nModule],
  exports: [
    RouterModule,
  ],
  entryComponents: [LoginComponent],
  providers: [], // SocketioService
  bootstrap: [AppComponent]
})
export class AppModule { }
