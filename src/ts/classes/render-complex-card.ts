import { RenderCardEl } from "./render-card.js";
import { ToDo } from "../interfaces/todo.js";

export class RenderComplexCardEl extends RenderCardEl {
  private extendContent: string;

  public constructor(extendContent: string) {
    super();
    this.extendContent = extendContent;
  }

  renderEl(content: ToDo): string {
    const str = super.renderEl(content);
    const delimiter = str.indexOf("</a>") + 4;
    const startStr = str.slice(0, delimiter);
    const endStr = str.slice(delimiter);
    return `${startStr}${this.extendContent
      .replace("{}", `${content.status}/${content.id}`)
      .replace("{{}}", `${!!content.status ? "edit" : "remove"}`)}${endStr}`;
  }
}
