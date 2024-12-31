import { Router, NavigationEnd } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { ROUTES } from "./sidebar-items";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { TokenCookieService } from "src/app/core/service/token-storage-cookies.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  level1Menu = "";
  level2Menu = "";
  level3Menu = "";
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  routerObj = null;

  currentUser: any;

  userName = "";
  userRole = "";

  // private myPrivileges = privileges;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    // private tokenStorageService: TokenStorageService,
    private tokenCookieService: TokenCookieService,
    private router: Router
  ) {
    const body = this.elementRef.nativeElement.closest("body");
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // logic for select active menu in dropdown
        const role = ["ROLE_ADMIN", "ROLE_CLERK"];
        const currenturl = event.url.split("?")[0];
        const firstString = currenturl.split("/").slice(1)[0];

        if (role.indexOf(firstString) !== -1) {
          this.level1Menu = event.url.split("/")[2];
          this.level2Menu = event.url.split("/")[3];
        } else {
          this.level1Menu = event.url.split("/")[1];
          this.level2Menu = event.url.split("/")[2];
        }

        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }
  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }
  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }
  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = "0";
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains("toggled");
    if (hasClass) {
      this.renderer.removeClass(event.target, "toggled");
    } else {
      this.renderer.addClass(event.target, "toggled");
    }
  }
  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = "0";
    } else {
      this.level2Menu = element;
    }
  }
  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = "0";
    } else {
      this.level3Menu = element;
    }
  }
  ngOnInit() {
    this.currentUser = this.tokenCookieService.getUser();
    // const role = this.currentUser.roles[0];
    console.log(this.currentUser);

    if (this.currentUser) {
      console.log("this.currentUser:::: ", this.currentUser);
      this.userName = this.currentUser.username;
      this.userRole = 'Supplier';
      // const userRole = this.currentUser.roles[0];
      this.userFullName = this.currentUser.username;
      this.userImg = "assets/images/user/profile_img.png";

      console.log("this.currentUser : ", this.currentUser);

      const userRole = 'Supplier';
      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf("All") !== -1
      );
      // if (userRole === Role.Admin) {
      //   this.userType = Role.Admin;
      // }
      // const userId = this.currentUser.id;
      // const module = JSON.parse(
      //   localStorage.getItem(`selectedModule_${userId}`) || "{}"
      // );

      // if (module) {
      //   console.log("this.module : ", module);
      //   const selectedModule = this.currentUser.role.clients.find(
      //     (client) => client.name === module
      //   );
      //   console.log("this.selectedModule : ", selectedModule);
      //   const modulePrivileges = selectedModule.privileges;

      //   if (selectedModule) {
      //     const moduleMapping = {
      //       // Module mapping here
      //       AdminModule: AdminModule,
      //     };

      //     if (module in moduleMapping) {
      //       // Rest of your code...
      //       this.sidebarItems = moduleMapping[module].filter((route) => {
      //         const isRouteVisible = route.privilege.some((privilege) =>
      //           modulePrivileges.includes(privilege)
      //         );
      //         if (!isRouteVisible) {
      //           return false;
      //         }
      //         if (route.submenu.length === 0) {
      //           return true;
      //         }
      //         route.submenu = route.submenu.filter((submenu) =>
      //           submenu.privilege.some((privilege) =>
      //             modulePrivileges.includes(privilege)
      //           )
      //         );
      //         return route.submenu.length > 0;
      //       });
      //     } else {
      //       this.notificationService.alertWarning(
      //         "No sidebar items available for this module...!!"
      //       );
      //     }
      //   } else {
      //     this.notificationService.alertWarning("Invalid module selected...!!");
      //   }
      // }
    }

    // this.sidebarItems = ROUTES.filter((sidebarItem) => sidebarItem);
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }
  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }
  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }
  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }
  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }
  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }
  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }
  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }

  logout(): void {


    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to Exit?',
      showCancelButton: true,
      confirmButtonText: 'Yes, exit!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        
          
        this.router.navigate(["/supplier-authentication/signin"]);

           
           (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error attempting to logOut',
              text: 'An error occurred while attempting to logOut.',
            });
          }
             }
    });
    
  }


}
