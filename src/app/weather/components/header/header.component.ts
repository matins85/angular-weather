import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable, map, startWith } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() public publicsidenavToggle = new EventEmitter();
  @ViewChild('fform') feedbackFormDirective: any;
  feedbackForm: any = FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private fb: FormBuilder, private httpService: HttpService) {
    this.createForm();
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      search: [''],
    });

    this.feedbackForm.valueChanges.subscribe((data: any) =>
      this.onValueChanged(this.feedbackForm.value.phone)
    );
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    console.log(data);
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.options.filter((option) => option.includes(filterValue));
  }

  ngOnInit(): void {
    this.options = ['bida', 'abuja', 'sokoto'];
    this.filteredOptions = this.feedbackForm.get('search').valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );
  }

  public onPublicHeaderToggleSidenav = () => {
    this.publicsidenavToggle.emit();
  };
}
