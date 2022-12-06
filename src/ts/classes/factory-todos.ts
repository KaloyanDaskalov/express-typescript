import { RenderElement } from "../interfaces/render-element.js";
import { RenderListEl } from "./render-list.js";
import { RenderListItemEl } from "./render-item.js";
import { RenderCardEl } from "./render-card.js";
import { RenderComplexCardEl } from "./render-complex-card.js";

class FactoryToDoSingleton {
  private static instance: FactoryToDoSingleton = new FactoryToDoSingleton();

  private constructor() {
    if (FactoryToDoSingleton.instance) {
      throw new Error(
        "Error: Instantiation failed: Use FactoryToDoSingleton.getInstance() instead of new."
      );
    }
    FactoryToDoSingleton.instance = this;
  }

  public static getInstance(): FactoryToDoSingleton {
    return FactoryToDoSingleton.instance;
  }

  public getRenderer(type: string): RenderElement {
    if (type === "li") return new RenderListItemEl();
    if (type === "todo") return new RenderCardEl();
    if (type === "cTodo")
      return new RenderComplexCardEl(
        '<a href="/status/{}" class="{{}}"><i class="far fa-check-circle"></i></i></a>'
      );
    return new RenderListEl();
  }
}

export default FactoryToDoSingleton.getInstance();
