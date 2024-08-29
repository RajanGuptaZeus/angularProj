import { ElementRef, Renderer2 } from "@angular/core";

export class DataService {
    // tokenArray: Array<string> = [];
    constructor() {}
    sanitizeContent(content: string): string {
        let renderer: Renderer2
        let el: ElementRef
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        
        doc.querySelectorAll('span').forEach(span => {
          const classAttr = span.getAttribute('class');
          if (classAttr === 'insertToken') {
            span.classList.remove("insertToken");
            span.classList.add("differentToken");
            // renderer.setStyle(span, 'background', '#e0e0e0');
            // renderer.setStyle(span, 'border', '2px dashed black');
          }
        });
    
        // Remove &nbsp; and replace with a single space
        const sanitized = doc.body.innerHTML
          .replace(/&nbsp;/g, ' ')
          .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
          .trim();
    
        return sanitized;
      }


    addTokenToArray (parent: HTMLElement | null , question : string , tokenArray : Array<string>) {
        if (parent) {
            const span = document.createElement('span');
            span.className = 'insertToken';
            span.setAttribute("contenteditable", "false");
            span.style.background = "#eeeeee";
            span.style.padding = "4px 15px";
            span.style.fontSize = "16px";
            span.style.marginRight = "8px";
            span.textContent = `Token${tokenArray.length}    `;
            tokenArray.push(span.textContent);
            parent.appendChild(span);
            
            // Update the question variable with the new sanitized content
            // this.question = this.sanitizeContent(parent.innerHTML);
            question = this.sanitizeContent(parent.innerHTML);
          }
    }


    handleQuestionServiceInput(event: Event , question : string) : string {
        const content = (event.target as HTMLElement).innerHTML;
        question = this.sanitizeContent(content);
        let res = question
        return res
    }
}