import { Validators } from "@angular/forms";

/**
 * Over-arching Form Type
 */
export interface iEntityForms {
  /**
   * Path of Form
   */
  path: string;
  /**
   * Form Title
   */
  title: string;
  /**
   * Short hand reference for Form
   */
  abbreviation: string;
  /**
   * Base Endpoint for API
   */
  apiEndpoint: string;
  /**
   * Role based Claim required for people accessing Form
   */
  claim: string;
  /**
   * Unique Identifier for Form
   */
  id: string;
  /**
   * Questions associated to Form
   */
  questions: iFieldConfig[];
}

/**
 * Over-arching Validator Type
 */
export interface iValidator {
  /**
   * User friendly name of Validator
   */
  name: string;
  /**
   * Angular Validator Method
   */
  validator?: Validators;
  /**
   * Message displayed to user when validator triggered
   */
  message: string;
  /**
   * Validator Type
   */
  validatortype: string;
  /**
   * Validator Pattern
   */
  validatorpattern?: string;
}

/**
 * Complex Configuration Model
 */
export interface iFieldConfig {
  /**
   * Optional: Field Label
   */
  label?: string;
  /**
   * Optional: Field Name
   */
  name?: string;
  /**
   * Optional: HTML Input Type
   */
  inputType?: string;
  /**
   * Optional: HTML Input Style
   */
  inputStyle?: string;
  /**
   * Optional: Options Input Array
   */
  options?: iOptions[];
  /**
   * Optional: Collections
   */
  collections?: any;
  /**
   * Field Config Type
   */
  type: string;
  /**
   * Optional: Value of pre-saved Field Config
   */
  value?: any;
  /**
   * Optional: Value of Form Validator Array
   */
  validators?: iValidator[];
  /**
   * Optional: Javascript type of value type for Saved data
   */
  savedDataType?: string;
  /**
   * Optional: Order Number or Field Config for sorting
   */
  orderNumber?: number;
  /**
   * Optional: Configuration of Form Type
   */
  form?: iEntityForms;
  /**
   * Helper Text
   */
  helperText: string;
}

/**
 * Options / List Elements Type
 */
export interface iOptions {
  /**
   * Options Key
   */
  optionKey: string;
  /**
   * Options Value
   */
  optionValue: any;
  /**
   * Optional: Options Sorting value
   */
  ordernumber?: number;
}
