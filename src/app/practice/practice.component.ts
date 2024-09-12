// src/app/practice/practice.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
  standalone: true,
  imports: [FormsModule],  // Add FormsModule here to use ngModel
})
export class PracticeComponent implements OnInit {
  translations: any[] = [];
  currentTranslation: any;
  sloveneWords: string[] = [];
  missingWord: string = '';
  userInput: string = '';
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
    this.userInput = '';
  }

  checkAnswer(): void {
    if (this.userInput.trim().toLowerCase() === this.missingWord.toLowerCase()) {
      alert('Correct!');
      this.loadNewSentence();
    } else {
      alert(`Incorrect. The correct word was: "${this.missingWord}"`);
    }
  }
}
