import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './groups/expenses/expenses.component';
import { FriendsComponent } from './friends/friends.component';
import { GroupsComponent } from './groups/groups.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/components/login.component';
import { GroupBalancesComponent } from './groups/balances';
import { GroupMembersComponent } from './groups/members/members.component';
import { GroupDetailsComponent } from './groups/details/details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'groups',
        component: GroupsComponent,
        children: [
          {
            path: ':id',
            component: GroupDetailsComponent,
            children: [
              {
                path: 'expenses',
                component: ExpensesComponent,
              },
              {
                path: 'balances',
                component: GroupBalancesComponent,
              },
              {
                path: 'members',
                component: GroupMembersComponent,
              },
            ],
          },

          // { path: '', redirectTo: ':id/expenses', pathMatch: 'full' },
        ],
      },
      { path: 'friends', component: FriendsComponent },
      { path: '', redirectTo: 'groups', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
