import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  model = { reason: '' }
  constructor() { }

  ngOnInit(): void {
  }

  success(): void {
    console.log('Log success.')
  }

  warning(): void {
    console.log('Log warning.', this.model)
  }

  error(): void {
    console.log('Log error.', this.model)
  }
}
