import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl } from '@angular/forms';  // Import FormsModule
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common'; // Add this for structural directives

@Component({
  selector: 'app-missing-word',
  templateUrl: './missing-word.component.html',
  styleUrls: ['./missing-word.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatCard,
    MatCardContent,
    MatIcon,
    NgIf
  ],  // Add FormsModule here to use ngModel
})
export class MissingWordComponent implements OnInit {
  title = 'simple-slo-app';

  missingWordInput = new FormControl('');

  translations: any[] = [];
  currentTranslation: any;
  sloveneWords: string[] = [];
  missingWord: string = '';
  partOne: string = '';
  partTwo: string = '';
  hint: string = '';
  punctuation: string = '';
  correct: boolean | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/slovene-translations.json').subscribe(data => {
      this.translations = data;
      this.loadNewSentence();
    });
  }

  splitPunctuation(sentence: string) {
    // Check if the string ends with a period, question mark, or exclamation mark
    const punctuation = /[.!?]$/;
    
    // Extract the punctuation (if it exists) and store it in a variable
    const lastChar = punctuation.test(sentence) ? sentence.slice(-1) : '';
    
    // Remove the punctuation from the original string
    const strippedSentence = punctuation.test(sentence) ? sentence.slice(0, -1) : sentence;
    
    return { sentence: strippedSentence, punctuation: lastChar };
}


  loadNewSentence(): void {
    this.correct = null;
    const randomIndex = Math.floor(Math.random() * this.translations.length);
    this.currentTranslation = this.translations[randomIndex];

    let splitPunctuation, strippedTranslation;
    splitPunctuation = this.splitPunctuation(this.currentTranslation.slovene);
    strippedTranslation = splitPunctuation["sentence"];
    this.punctuation = splitPunctuation["punctuation"];
    
    let sloveneWords = strippedTranslation.split(' ');
    const randomWordIndex = Math.floor(Math.random() * sloveneWords.length);
    this.missingWord = sloveneWords[randomWordIndex];

    this.partOne = randomWordIndex > 0 ? sloveneWords.slice(0,randomWordIndex).join(' ')+' ' : ''
    this.partTwo = randomWordIndex < sloveneWords.length - 1 ? ' '+sloveneWords.slice(randomWordIndex+1).join(' ') : ''
    if (this.missingWord.endsWith(',')) {
      this.missingWord = this.missingWord.slice(0,-1);
      this.partTwo = ',' + this.partTwo;
    }

    console.log(this.partOne + this.missingWord + this.partTwo)
    this.hint = this.currentTranslation.english;
    //this.sloveneWords[randomWordIndex] = '____';  // Blank for the user to fill in
    this.missingWordInput.patchValue('');
  }
  onEnter() {
    if (this.correct == true) {
      this.loadNewSentence()
    }
    else {
      this.checkAnswer()
    }
  }

  checkAnswer(): void {
    if (this.missingWordInput.value && this.missingWordInput.value.trim().toLowerCase() === this.missingWord.toLowerCase()) {
      this.correct = true;
    } else {
      this.correct = false;
    }
  }

  showAnswer() {
    this.missingWordInput.patchValue(this.missingWord)
  }
}
