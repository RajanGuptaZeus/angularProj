import { Component, OnInit, ElementRef, ViewChild, Renderer2} from "@angular/core";

@Component({
  selector: 'app-main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.css'],
})
export class MainComponent implements OnInit  {
  @ViewChild('input', { static: true }) input?: ElementRef;
  
  show: boolean = false;
  tokenNumber: number = 0;
  question: string = '';
  placeholder: string = "Text phrase*";
  tokenArray: Array<string> = [];
  responses: string[] = ['Response 1'];

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {}


  handleQuestionInput(event: Event) {
    const content = (event.target as HTMLElement).innerHTML;
    this.question = this.sanitizeContent(content);
  }

  sanitizeContent(content: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    doc.querySelectorAll('span').forEach(span => {
      const classAttr = span.getAttribute('class');
      if (classAttr === 'insertToken') {
        // const div = document.createElement("div");
        // div.style.height = "100px";
        // div.style.width = "50px";
        span.classList.remove("insertToken");
        span.classList.add("differentToken");
        this.renderer.setStyle(span, 'background', '#e0e0e0');
        this.renderer.setStyle(span, 'border', '2px dashed black');
      }
    });

    // Remove &nbsp; and replace with a single space
    const sanitized = doc.body.innerHTML
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim();

    return sanitized;
  }

  insertToken() {
    this.tokenNumber++;
    const parent = document.getElementById("input-parent");
    if (parent) {
      const span = document.createElement('span');
      span.className = 'insertToken';
      span.setAttribute("contenteditable", "false");
      span.style.background = "#eeeeee";
      span.style.padding = "4px 15px";
      span.style.fontSize = "16px";
      span.style.marginRight = "8px";
      span.textContent = `Token${this.tokenArray.length}    `;
      this.tokenArray.push(span.textContent);
      parent.appendChild(span);
      
      // Update the question variable with the new sanitized content
      // this.question = this.sanitizeContent(parent.innerHTML);
      this.question = this.sanitizeContent(parent.innerHTML);
      console.log(this.question);
    }
  }

  trackByFn(index: number) {
    return index;  
  }

  addResponse() {
    const newResponseNumber = this.responses.length + 1;
    this.responses.push(`Response ${newResponseNumber}`);
  }

  deleteResponse(index: number) {
    this.responses.splice(index, 1);
  }
}
