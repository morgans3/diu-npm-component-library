import { FocusMonitor } from '@angular/cdk/a11y';
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Component, ElementRef, Inject, Input, OnDestroy, Optional, Self, Output, EventEmitter } from '@angular/core';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
    selector: 'input-chiplist',
    templateUrl: 'input-chiplist.component.html',
    providers: [{ provide: MatFormFieldControl, useExisting: InputChipList }],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[id]': 'id',
    }
})
export class InputChipList implements ControlValueAccessor, MatFormFieldControl<Array<string>>, OnDestroy {

    static nextId = 0;
    controlType = 'input-chiplist';
    id = `input-chiplist-${InputChipList.nextId++}`;

    focused = false;
    touched = false;
    formControl: FormControl = new FormControl([]);
    separatorKeysCodes = [ENTER, COMMA];
    stateChanges = new Subject<void>();
    
    onChange = (_: any) => { };
    onTouched = () => { };

    get empty() {
        return !this.formControl.value.length;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    private _placeholder: string;

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    private _required = false;

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.formControl.disable() : this.formControl.enable();
        this.stateChanges.next();
    }
    private _disabled = false;

    @Input()
    get value(): Array<string> | null {
        return this.formControl.valid ? this.formControl.value : null;
    }
    set value(values: Array<string> | null) {
        this.formControl.setValue(values);
        this.stateChanges.next();
    }

    get errorState(): boolean {
        return this.formControl.invalid && this.touched;
    }

    @Output('selected') selected = new EventEmitter();

    constructor(
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
        @Optional() @Self() public ngControl: NgControl
    ) {
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    setDescribedByIds(ids: string[]) {
        const controlElement = this._elementRef.nativeElement.querySelector('.mat-form-field-type-input-chiplist')!;
        controlElement.setAttribute('aria-describedby', ids.join(' '));
    }

    onContainerClick() {}

    writeValue(values: Array<string> | null): void {
        this.value = values;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    addItem(event) {
        //Get mdt and value
        let items = this.formControl.value;
        let item = (event.value || "").trim();

        //Add to array
        if (item) {
            items.push(item);
            this.formControl.setValue(items);
            this.selected.emit(items);
        }

        //Clear the input value
        event.input.value = "";
    }

    removeItem(mdt) {
        //Get mdt and find index
        let items = this.formControl.value;
        let index = items.indexOf(mdt);

        //Remove from array
        if (index >= 0) {
            items.splice(index, 1);
            this.formControl.setValue(items);
            this.selected.emit(items);
        }
    }

    static ngAcceptInputType_disabled: BooleanInput;
    static ngAcceptInputType_required: BooleanInput;
}