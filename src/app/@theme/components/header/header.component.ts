import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslationService } from '../../../shared/services/translation.service';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../../../shared/services/storage.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  public currentUser: any;
  public uri: string = environment.uri;
  themes = [
    {
      value: 'default',
      name: this.translateService.getTranslate('title.light'),
    },
    {
      value: 'dark',
      name: this.translateService.getTranslate('title.dark'),
    },
    {
      value: 'cosmic',
      name: this.translateService.getTranslate('title.cosmic'),
    },
    {
      value: 'corporate',
      name: this.translateService.getTranslate('title.amappzing'),
    },
  ];

  currentTheme = environment.defaultTheme;

  userMenu = [
    { data: 1, title: this.translateService.getTranslate('title.logOut'), icon: 'corner-up-left-outline' }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private translateService: TranslationService,
    public storage: StorageService
  ) {
    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item);
      });
  }

  onContecxtItemSelection(event: any) {
    if (event.data === 1) {
      this.storage.logOut();
    }
  }

  ngOnInit() {
    this.currentUser = this.storage.getPersonalInfo();
    this.othersMenu();
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => themeName);

    if (this.currentUser && this.currentUser.setting && this.currentUser.setting.modeTheme) {
      this.currentTheme = this.currentUser.setting.modeTheme;
      this.changeTheme(this.currentTheme);
    } else {
      this.changeTheme(this.currentTheme);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  othersMenu() {
    const personalInfo = this.storage.getPersonalInfo();
    if (personalInfo && personalInfo.profile && personalInfo.profile.role) {
      if (personalInfo.profile.role === "ROLE_PROPERTY") {
        const businessMenu = { data: 4, title: this.translateService.getTranslate('title.business'), link: `${this.uri}/business-setting`, icon: 'grid-outline' };
        this.insertMenu(businessMenu, 2)
      }
    }
  }

  insertMenu(menu: { data: number, title: string, link: string, icon: string }, order: number) {
    if (this.userMenu.length > order && order >= 0) {
      this.userMenu.splice(order, 0, menu);
    }
  }
}
