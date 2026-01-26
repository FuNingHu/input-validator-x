import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { MyPgNode } from './my-pg.node';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './my-pg.component.html',
    styleUrls: ['./my-pg.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class MyPgComponent implements OnChanges, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: MyPgNode;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }

    // Custom validator: limit decimal places to 2
    maxDecimalValidator = (control: AbstractControl) => {
        const value = control.value;
        if (value == null || value === '') {
            return null; // No validation error if empty
        }
        
        const strValue = String(value);
        const decimalPart = strValue.split('.')[1];
        
        if (decimalPart && decimalPart.length > 2) {
            return { maxDecimal: 'Maximum 2 decimal places allowed' };
        }
        
        return null;
    }

    // Custom validator: check if input text meets requirements
    checkInputDialogTextValidator = (value: string | number): string | null => {
        const strValue = String(value);
        
        // Validation: no digits allowed
        if (strValue && /\d/.test(strValue)) {
            return 'Input cannot contain digits';
        }
        
        // Validation: must start with uppercase letter
        if (strValue && strValue.length > 0 && !/^[A-Z]/.test(strValue)) {
            return 'Must start with an uppercase letter';
        }
        
        // Validation passed
        return null;
    }
    
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
    }
}
