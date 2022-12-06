import { RenderElement } from "../interfaces/render-element.js";
import { ToDo } from "../interfaces/todo.js";

export class RenderCardEl implements RenderElement {
  renderEl(content: ToDo): string {
    return `<div class="todo-list-item-name">${content.message}</div>
    <a href="" class="edit" ><span class="fas fa-edit" id=${content.id} data-value="${content.message}"></span></a>
	<a href="/delete/${content.id}" class="remove"><span class="fas fa-times"></span></a>`;
  }
}
