import { RenderElement } from "../interfaces/render-element.js";

export class RenderListEl implements RenderElement {
  renderEl(content: string): string {
    return `<ul class="todo-list" id="toDos">
        ${
          typeof content === "string"
            ? content
            : "<li>No content was provided</li>"
        }
        </ul>`;
  }
}
