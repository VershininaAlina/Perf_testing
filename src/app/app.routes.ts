import {Routes} from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {AuthIndexComponent} from "./pages/authentication/auth-index/auth-index.component";
import {AuthSingInComponent} from "./pages/authentication/auth-sing-in/auth-sing-in.component";
import {AuthSingUpComponent} from "./pages/authentication/auth-sing-up/auth-sing-up.component";
import {VacancyIndexComponent} from "./pages/vacancy/vacancy-index/vacancy-index.component";
import {VacancyPreviewComponent} from "./component/vacancy/vacancy-preview/vacancy-preview.component";
import {VacancyViewComponent} from "./pages/vacancy/vacancy-view/vacancy-view.component";
import {NewsIndexComponent} from "./pages/news/news-index/news-index.component";
import {PersonalAreaIndexComponent} from "./pages/personal-area/personal-area-index/personal-area-index.component";
import {NewsViewComponent} from "./pages/news/news-view/news-view.component";
import {AlertComponent} from "./component/window/alert/alert.component";
import {LkIndexComponent} from "./pages/personal-area/lk-index/lk-index.component";
import {LkEditComponent} from "./pages/personal-area/lk-edit/lk-edit.component";
import {TestIndexComponent} from "./pages/test/test-index/test-index.component";
import {TestPreviewComponent} from "./pages/test/test-preview/test-preview.component";
import {TestPageComponent} from "./pages/test/test-page/test-page.component";
import {AdminIndexComponent} from "./pages/admin/admin-index/admin-index.component";
import {VacancyViewRespondComponent} from "./pages/admin/vacancy-view-respond/vacancy-view-respond.component";
import {VacancyCreateComponent} from "./pages/admin/vacancy-create/vacancy-create.component";
import {NewsCreateComponent} from "./pages/admin/news-create/news-create.component";
import {AuthGuard} from "../guard/auth.guard";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {AnswerCreateComponent} from "./pages/admin/test/answer-create/answer-create.component";
import {TestCreateComponent} from "./pages/admin/test/test-create/test-create.component";
import {ProfileComponent} from "./pages/personal-area/profile/profile.component";
import {SelectionStagesComponent} from "./pages/selection-stages/selection-stages.component";
import {HrUsersListComponent} from "./pages/admin/hr/hr-users-list/hr-users-list.component";

export const routes: Routes = [
  {
    path: "", component: IndexPageComponent, children: [
      {
        path: "", component: MainPageComponent
      },
      {
        path: "selection-stages", component: SelectionStagesComponent
      },
      {
        path: "vacancies", component: VacancyIndexComponent
      },
      {
        path: "vacancy/:id", component: VacancyViewComponent
      },
      {
        path: "news", component: NewsIndexComponent
      },
      {
        path: "news/view/:id", component: NewsViewComponent
      }
    ]
  },
  {
    path: "auth", component: AuthIndexComponent, children: [
      {
        path: "", component: AuthSingInComponent
      },
      {
        path: "signup", component: AuthSingUpComponent
      }
    ]
  },
  {
    path: "lk", component: PersonalAreaIndexComponent, children: [
      {
        path: "", component: LkIndexComponent
      },
      {
        path: "edit", component: LkEditComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: "alert", component: AlertComponent
  },
  {
    path: "test/:vacancyId/:testId", component: TestIndexComponent, children: [
      {
        path: "", component: TestPreviewComponent
      },
      {
        path: "page", component: TestPageComponent
      }
    ]
  },
  {
    path: "admin", component: PersonalAreaIndexComponent,
    children: [
      {
        path: "hr", component: HrUsersListComponent
      },
      {
        path: "profile/:id", component: ProfileComponent
      },
      {
        path: "", component: AdminIndexComponent
      },
      {
        path: "vacancy_create", component: VacancyCreateComponent
      },
      {
        path: "news_create", component: NewsCreateComponent
      },
      {
        path: "test_create/:vacancyId", component: TestCreateComponent
      },
      {
        path: "answer_create", component: AnswerCreateComponent
      },
      {
        path: "vacancy/:id", component: VacancyViewRespondComponent
      }
    ]
  }
];
