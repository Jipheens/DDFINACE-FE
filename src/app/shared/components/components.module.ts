import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { BaseComponent } from './base/base.component';
import { GlDetailsComponent } from "./gl-details/gl-details.component";

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, BaseComponent,GlDetailsComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent,GlDetailsComponent],
})
export class ComponentsModule {}
