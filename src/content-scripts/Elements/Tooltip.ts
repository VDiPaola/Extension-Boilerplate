export class Tooltip{
    private element: HTMLSpanElement;

    constructor(text: string){
        this.element = document.createElement("span");
        this.element.innerHTML = text;
        this.element.className = "tooltiptext";
    }

    setPosToMouse(e: MouseEvent){
        let width = this.element.offsetWidth;
        let height = this.element.offsetHeight;
        this.element.style.left = (e.pageX - width/2) + 'px';
        this.element.style.top = (e.pageY - height) + 'px';
    }
}
