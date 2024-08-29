import { Component, Input, OnInit, OnChanges, SimpleChanges, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-correct-ans',
  templateUrl: './correct-ans.component.html',
  styleUrls: ['./correct-ans.component.css']
})
export class CorrectAnsComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() question: string = '';
  @Input() responses: Array<string> = [];
  public sanitizedQuestion: string = '';

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['question']) {
      this.sanitizedQuestion = this.sanitizeAndConvertQuestion(this.question);
      setTimeout(() => this.initializeDragAndDrop(), 0); // Initialize drag-and-drop after view updates
    }
  }

  ngAfterViewInit() {
    console.log("clicked");
    
    this.initializeDragAndDrop();
  }

  private sanitizeAndConvertQuestion(question: string): string {
    return question.replace(/<span class="differentToken"/g, '<div class="differentToken" style="display: inline-block; min-width: 50px; min-height: 20px; border: 2px dashed #ccc; padding: 5px; margin: 5px;"')
                   .replace(/<\/span>/g, '</div>');
  }

  private initializeDragAndDrop() {
    const responseBoxes = this.el.nativeElement.querySelectorAll('.response-box');
    const dropZones = this.el.nativeElement.querySelectorAll('.differentToken');

    responseBoxes.forEach((box: HTMLElement) => {
      this.renderer.setAttribute(box, 'draggable', 'true');
      this.renderer.listen(box, 'dragstart', (event: DragEvent) => {
        event.dataTransfer?.setData('text/plain', box.querySelector('p')?.textContent || '');
      });
    });

    dropZones.forEach((zone: HTMLElement) => {
      this.renderer.listen(zone, 'dragover', (event: DragEvent) => {
        event.preventDefault();
        this.renderer.setStyle(zone, 'backgroundColor', '#e6e6e6');
      });

      this.renderer.listen(zone, 'dragleave', () => {
        this.renderer.removeStyle(zone, 'backgroundColor');
      });

      this.renderer.listen(zone, 'drop', (event: DragEvent) => {
        event.preventDefault();
        const data = event.dataTransfer?.getData('text/plain');
        if (data) {
          this.renderer.setProperty(zone, 'textContent', data);
          this.renderer.removeStyle(zone, 'backgroundColor');
        }
      });
    });
  }
}
