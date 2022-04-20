import { ComponentFactoryResolver, Directive, Input, OnChanges, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { componentMapper } from "../_mapping/componentMapping";

/**
 * Dynamic Component Directive Class
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "[dynamicComponent]",
})
export class DynamicComponentDirective implements OnInit {
  /*
   * Initialise Angular Configuration for Component
   */
  @Input() config: any;
  /**
   * Represents a component created by a ComponentFactory
   */
  componentRef: any;

  /**
   * Dynamic Component Directive Constructor
   */
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

  /**
   * Angular Life-cycle hook that is executed when the dynamic form component is initialized
   */
  ngOnInit() {
    //create field component
    if (this.config && this.config.type) {
      this.createComponent();
      //add handler config from passed data
      this.componentRef.instance.config = this.config;
      if (this.config) {
        Object.keys(this.config).forEach((key) => {
          switch (key) {
            case "type":
              //do nothing
              break;
            default:
              this.componentRef.instance[key] = this.config[key];
              break;
          }
        });
      }
    }
  }

  /**
   * Creates the component
   */
  createComponent() {
    //set a variable and potentially override it based on field config of type/ inputType
    const component = this.config.type;

    //uses the compnent variable to input the class of the component that will be created
    const factory = this.resolver.resolveComponentFactory(componentMapper[component]);
    //create the component by passing the factory.
    this.componentRef = this.container.createComponent(factory);
  }
}
