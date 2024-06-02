import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

declare const Prism: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  HTMLSnippet!: string;
  customCode!: string;

  @ViewChild('customCodeHighlighter', { static: true })
  customCodeHighlighter!: ElementRef;
  @ViewChild('customCodeSnippet', { static: true })
  customCodeSnippet!: ElementRef;
  @ViewChild('javaCodeContent', { static: true })
  javaCodeContent!: ElementRef;
  @ViewChild('preCodeBlock', { static: true }) preCodeBlock!: ElementRef;

  code = `// Java Program to print an arraylist of an \n// user-defined collection\n\nimport java.util.*;\n\nclass GFG {\n\n\tString name;
    int rollNo;
 
    // constructor of class GFG
    GFG(String s, int n)
    {
        name = s;
        rollNo = n;
    }
 
    // over-riding the toString method
    // to print the collection
    public String toString()
    {
        return "Name : " + name + " | Roll No : " + rollNo;
    }
 
    // Driver Main Method
    public static void main(String[] args)
    {
        // creating an arraylist of user-defined collection
        ArrayList<GFG> arr = new ArrayList<GFG>();
 
        // creating objects of class GFG
        GFG t1 = new GFG("John", 101);
        GFG t2 = new GFG("Paul", 102);
        GFG t3 = new GFG("Jack", 103);
        GFG t4 = new GFG("Jose", 104);
 
        // adding objects to arraylist
        arr.add(t1);
        arr.add(t2);
        arr.add(t3);
        arr.add(t4);
 
        // printing the collection
        for (GFG c : arr)
            System.out.println(c);
    }
}
  `;

  ngOnInit(): void {
    this.HTMLSnippet = Prism.highlight(this.code, Prism.languages.java, 'java');
    this.javaCodeContent.nativeElement.innerHTML = this.HTMLSnippet;
    this.customCode = this.code;
  }

  onInput(): void {
    let code = this.customCode;
    if (code.endsWith('\n')) {
      code += ' ';
    }
    this.javaCodeContent.nativeElement.innerHTML = code;
    Prism.highlightElement(this.javaCodeContent.nativeElement);
  }

  syncScroll(): void {
    const elemContainer = this.customCodeHighlighter.nativeElement;
    const elemTextArea = this.customCodeSnippet.nativeElement;
    const preCodeBlock = this.preCodeBlock.nativeElement;
    window.setTimeout(() => {
      elemContainer.scrollTop = elemTextArea.scrollTop;
      preCodeBlock.scrollLeft = elemTextArea.scrollLeft;
    }, 1);
  }
}
