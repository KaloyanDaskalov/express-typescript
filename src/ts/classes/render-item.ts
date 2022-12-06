import { RenderElement } from "../interfaces/render-element.js";

export class RenderListItemEl implements RenderElement {
  renderEl(content: string): string {
    return `
	<li class="todo-list-item">
       ${
         typeof content === "string"
           ? content
           : "<li>No content was provided</li>"
       }
    </li>`;
  }
}
