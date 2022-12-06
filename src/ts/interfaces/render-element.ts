import { ToDo } from "./todo";

export interface RenderElement {
  renderEl(content: string | ToDo): string;
}
