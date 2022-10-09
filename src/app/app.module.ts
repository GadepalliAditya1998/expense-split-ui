import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/components/login.component';
import { LoginService } from './login/services/login.service';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ExpensesComponent } from './groups/expenses/expenses.component';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupService } from './groups/services/groups.service';
import { AddGroupComponent } from './groups/add-group';
import { GroupBalancesComponent } from './groups/balances';
import { GroupMembersComponent } from './groups/members/members.component';
import { GroupDetailsComponent } from './groups/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ExpensesComponent,
    GroupsComponent,
    FriendsComponent,
    AddGroupComponent,
    GroupDetailsComponent,
    GroupBalancesComponent,
    GroupMembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers:[
    LoginService,
    GroupService,
  ],
  entryComponents:[
    AddGroupComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
