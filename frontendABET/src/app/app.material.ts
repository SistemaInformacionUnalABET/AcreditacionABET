import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {
        // Form  Controls
         MatCheckboxModule,
         MatDatepickerModule,
         MatInputModule,
         MatRadioModule,
         MatSelectModule,
         MatSliderModule,
         MatSlideToggleModule,
        // Navigation
         MatSidenavModule,
         MatToolbarModule,
        // Layout
         MatListModule,
         MatGridListModule,
         MatCardModule,
         MatTabsModule,
         MatExpansionModule,
         // Button & Indicators
         MatButtonModule,
         MatButtonToggleModule,
         MatChipsModule,
         MatIconModule,
         MatProgressSpinnerModule,
         MatProgressBarModule,
         // Popups & Modals
         MatDialogModule,
         MatTooltipModule,
         MatSnackBarModule,
         // Data Table
         MatTableModule,
         MatSortModule,
         MatPaginatorModule


       } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  imports: [
          BrowserModule,
          // Form  Controls
          MatAutocompleteModule,
          MatCheckboxModule,
          MatDatepickerModule,
          MatInputModule,
          MatRadioModule,
          MatSelectModule,
          MatSliderModule,
          MatSlideToggleModule,
         // Navigation
          MatMenuModule,
          MatSidenavModule,
          MatToolbarModule,
         // Layout
          MatListModule,
          MatGridListModule,
          MatCardModule,
          MatStepperModule,
          MatTabsModule,
          MatExpansionModule,
          // Button & Indicators
          MatButtonModule,
          MatButtonToggleModule,
          MatChipsModule,
          MatIconModule,
          MatProgressSpinnerModule,
          MatProgressBarModule,
          // Popups & Modals
          MatDialogModule,
          MatTooltipModule,
          MatSnackBarModule,
          // Data Table
          MatTableModule,
          MatSortModule,
          MatPaginatorModule,
          

  ],
  exports: [
           // Form  Controls
           MatAutocompleteModule,
           MatCheckboxModule,
           MatDatepickerModule,
           MatInputModule,
           MatRadioModule,
           MatSelectModule,
           MatSliderModule,
           MatSlideToggleModule,
          // Navigation
           MatMenuModule,
           MatSidenavModule,
           MatToolbarModule,
          // Layout
           MatListModule,
           MatGridListModule,
           MatCardModule,
           MatStepperModule,
           MatTabsModule,
           MatExpansionModule,
           // Button & Indicators
           MatButtonModule,
           MatButtonToggleModule,
           MatChipsModule,
           MatIconModule,
           MatProgressSpinnerModule,
           MatProgressBarModule,
           // Popups & Modals
           MatDialogModule,
           MatTooltipModule,
           MatSnackBarModule,
           // Data Table
           MatTableModule,
           MatSortModule,
           MatPaginatorModule

  ],
})
export class MaterialModule { }
