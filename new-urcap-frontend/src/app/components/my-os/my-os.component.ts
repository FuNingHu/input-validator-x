import {ChangeDetectionStrategy, ChangeDetectorRef, Component, input, InputSignal, OnChanges, SimpleChanges} from '@angular/core';
import {
  RobotSettings,
  OperatorScreen,
  OperatorScreenPresenter,
  OperatorScreenPresenterAPI
} from '@universal-robots/contribution-api';


@Component({
  templateUrl: './my-os.component.html',
  styleUrls: ['./my-os.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class MyOsComponent implements OperatorScreenPresenter {


}
