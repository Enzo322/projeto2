import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashComponent } from './dash/dash.component';
import { RoutesModule } from './routes.module';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalGroupComponent } from './modal-group/modal-group.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SubGrupoComponent } from './sub-grupo/sub-grupo.component';
import { ColectionComponent } from './colection/colection.component';
import { ClientComponent } from './client/client.component';
import { ModelSubComponent } from './model-sub/model-sub.component';
import { ModelClientComponent } from './model-client/model-client.component';
import { ModelColectionComponent } from './model-colection/model-colection.component';
import { ProdutoComponent } from './produto/produto.component';
import { ModelProdutoComponent } from './model-produto/model-produto.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { ModalUserPassComponent } from './modal-user-pass/modal-user-pass.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashComponent,
    GroupComponent,
    UserComponent,
    ModalGroupComponent,
    SubGrupoComponent,
    ColectionComponent,
    ClientComponent,
    ModelSubComponent,
    ModelClientComponent,
    ModelColectionComponent,
    ProdutoComponent,
    ModelProdutoComponent,
    DropdownComponent,
    ModalUserComponent,
    ModalUserPassComponent,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    Ng2SearchPipeModule
  ],
  exports : [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
