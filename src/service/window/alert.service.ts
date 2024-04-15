import {
  AfterViewInit,
  ComponentFactoryResolver,
  ElementRef,
  Injectable, Injector,
  Renderer2,
  ViewContainerRef
} from "@angular/core";
import {AlertComponent} from "../../app/component/window/alert/alert.component";


@Injectable({providedIn: 'root', useExisting: true})
export class AlertService implements AfterViewInit {
  alertContainer: any
  isPopupVisible = false;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    let alertContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(alertContainer, 'id', 'alertContainer');
    this.renderer.appendChild(this.elementRef.nativeElement, alertContainer);
    //alertContainer = this.elementRef.nativeElement
    console.log(alertContainer)

    const divElement: HTMLElement = this.elementRef.nativeElement.querySelector('#alertContainer');

    // @ts-ignore
    const viewContainerRef: ViewContainerRef = this.injector.get(ViewContainerRef, null, divElement);
    this.alertContainer = viewContainerRef;
    //this.alertContainer = this.renderer.selectRootElement("#alertContainer", true)

  }

  openPopup(data: any) {
    this.isPopupVisible = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.alertContainer.clear();
    const componentRef = this.alertContainer.createComponent(componentFactory);

    const popupInstance = componentRef.instance as AlertComponent;
    popupInstance.text = data
    popupInstance.onInit(this)

  }

  closePopup() {
    this.isPopupVisible = false;
    this.alertContainer.clear();
  }

}
