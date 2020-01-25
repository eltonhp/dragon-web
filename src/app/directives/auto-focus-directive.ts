import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * @author Elton H. Paula
 *
 * insere o focus no elemento DOM (document object model), https://developer.mozilla.org/pt-PT/docs/DOM/DOM_Reference
 *
 * Declara a propriedade 'appAutofocus' para fazer o focus. Use esta propriedade nos componentes html para receber o foco.
 *
 * exemplo:
 *
 * <input appAutofocus text="12.00"/>
 */
@Directive({
    selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

    @Input() public appAutoFocus: boolean;

    public constructor(private el: ElementRef) {

    }

    public ngAfterContentInit() {
        setTimeout(() => {
            this.select();
            this.focus();
        }, 300);

    }

    /**
     * faz o select the um input element
     */
    private select() {
        if (this.el.nativeElement instanceof  HTMLInputElement) {
            (this.el.nativeElement as HTMLInputElement).select();
        }
    }

    /**
     * faz o focus de qualquer elemento DOM
     */
    private focus() {
        this.el.nativeElement.focus();
    }
}
