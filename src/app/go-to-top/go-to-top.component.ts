import { Component, Host, HostListener } from '@angular/core';

@Component({
  selector: 'app-go-to-top',
  standalone: true,
  imports: [],
  templateUrl: './go-to-top.component.html',
  styleUrl: './go-to-top.component.scss'
})
export class GoToTopComponent {

 // Initialize component properties
 active = false; // Initially set to false, will be true when scroll conditions are met
 items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);  // Example array of items
// OnInit lifecycle hook, called when component initializes
 ngOnInit() {
   this.checkScrollPosition();
 }
// HostListener to listen for scroll events on the window
 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.checkScrollPosition();
 }
// Function to check current scroll position and determine if the button should be active
 checkScrollPosition() {
   const scrollPosition = window.scrollY + window.innerHeight;
   const edge = document.documentElement.scrollHeight * 0.5;
   this.active = scrollPosition >= edge && window.scrollY >= 50;
 }
// Function to scroll to the top of the page when the button is clicked
 scrollToTop() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
 }




}
