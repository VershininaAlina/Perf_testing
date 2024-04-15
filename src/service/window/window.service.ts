import {
  AfterViewInit,
  ComponentFactoryResolver,
  ElementRef, Injectable,
  Injector,
  Renderer2, Type,
  ViewContainerRef
} from "@angular/core";

import {Component, ComponentRef} from '@angular/core';

@Injectable({providedIn: "root", useExisting: true})
export class WindowService implements AfterViewInit {
  popupContainer: any
  isPopupVisible = false;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.ngAfterViewInit()
  }

  ngAfterViewInit() {
    let popupContainer = this.renderer.createElement('div');
    this.renderer.setAttribute(popupContainer, 'id', 'popupContainer');
    this.renderer.appendChild(this.elementRef.nativeElement, popupContainer);
    //popupContainer = this.elementRef.nativeElement


    const divElement: HTMLElement = this.elementRef.nativeElement.querySelector('#popupContainer');

    // @ts-ignore
    const viewContainerRef: ViewContainerRef = this.injector.get(ViewContainerRef, null, divElement);
    this.popupContainer = viewContainerRef;
    //this.popupContainer = this.renderer.selectRootElement("#popupContainer", true)
  }

  // @ts-ignore
  openPopup(component: Type<T>) {
    this.isPopupVisible = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.popupContainer.clear();
    const componentRef = this.popupContainer.createComponent(componentFactory);

    const popupInstance = componentRef.instance;
    popupInstance.onInit(this)

  }


  // @ts-ignore
  addWindow(component: Type<T>): any {
    this.isPopupVisible = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.popupContainer.clear();
    const componentRef = this.popupContainer.createComponent(componentFactory);

    const popupInstance = componentRef.instance;
    //  popupInstance.onInit(this)
    return popupInstance;

  }

  // @ts-ignore
  openPopup2(component: Type<T>, componentArg: any) {
    this.isPopupVisible = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.popupContainer.clear();
    const componentRef = this.popupContainer.createComponent(componentFactory);


    const popupInstance = componentRef.instance;
    popupInstance.component = componentArg
    popupInstance.onInit(this)


  }

  closePopup() {
    this.isPopupVisible = false;
    this.popupContainer.clear();
  }

}
