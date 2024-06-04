import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';

import { TabMenuModule } from 'primeng/tabmenu';

import { AppRoutingModule } from './app-routing.module';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { FileUploadModule } from 'primeng/fileupload';
import { RadioButtonModule } from 'primeng/radiobutton';

import { AnexoService, PastaService } from './app.service';
import { Validate_Service } from 'src/services/Validate_Service';
import { TelaComponent } from './tela/tela.component';
import { DocumentosComponent } from './tela/documentos/documentos.component';
import { AssinantesComponent } from './tela/assinantes/assinantes.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ScrollPanelModule } from 'primeng/scrollpanel';
export const HttpLoaderFactory = (httpClient: HttpClient) =>
  new TranslateHttpLoader(httpClient, 'assets/i18n/');

@NgModule({
  declarations: [
    AppComponent,
    TelaComponent,
    DocumentosComponent,
    AssinantesComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    MessageModule,
    MessagesModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    DialogModule,
    TableModule,
    CheckboxModule,
    PanelModule,
    InputSwitchModule,
    MenuModule,
    TabMenuModule,
    AppRoutingModule,
    ProgressSpinnerModule,
    FileUploadModule,
    RadioButtonModule,
    CardModule,
    TabViewModule,
    AvatarModule,
    ToastModule,
    ScrollPanelModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [PastaService, Validate_Service, AnexoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
