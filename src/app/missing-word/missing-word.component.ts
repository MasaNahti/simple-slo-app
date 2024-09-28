import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl } from '@angular/forms';  // Import FormsModule
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
  selector: 'app-missing-word',
  templateUrl: './missing-word.component.html',
  styleUrls: ['./missing-word.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatFormField, MatLabel, MatButton, MatCard, MatCardContent],  // Add FormsModule here to use ngModel
})
export class MissingWordComponent implements OnInit {
  title = 'simple-slo-app';

  userInput = new FormControl('');

  translations: any[] = [];
  currentTranslation: any;
  sloveneWords: string[] = [];
  missingWord: string = '';
  hint: string = '';
  punctuation: string = '';

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
    const randomIndex = Math.floor(Math.random() * this.translations.length);
    this.currentTranslation = this.translations[randomIndex];

    let splitPunctuation, strippedTranslation, punctuation;
    splitPunctuation = this.splitPunctuation(this.currentTranslation.slovene);
    strippedTranslation = splitPunctuation["sentence"];
    this.punctuation = splitPunctuation["punctuation"];
    
    this.sloveneWords = strippedTranslation.split(' ');
    const randomWordIndex = Math.floor(Math.random() * this.sloveneWords.length);
    this.missingWord = this.sloveneWords[randomWordIndex];

    this.hint = this.currentTranslation.english;
    this.sloveneWords[randomWordIndex] = '____';  // Blank for the user to fill in
    this.userInput.patchValue('');
  }

  checkAnswer(): void {
    if (this.userInput.value && this.userInput.value.trim().toLowerCase() === this.missingWord.toLowerCase()) {
      alert('Correct!');
      this.loadNewSentence();
    } else {
      alert(`Incorrect. The correct word was: "${this.missingWord}"`);
    }
  }
}
