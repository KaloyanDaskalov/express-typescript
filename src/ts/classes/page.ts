import path from "path";
import fs from "fs";

export class Page {
  private static instance: Page = new Page();
  protected indexPage: string = "Something went wrong";

  private form = `
          <div class="form-control">
            <label class="complex-label" for="todo">Add your task below</label>
            <input class="complex-input" type="text" id="todo" name="message" placeholder="Buy Egg">
          </div>
          <div class="form-control">
            <span>Status</span>
              <input type="checkbox" id="check1" class="toggle" name="status" />
                    <label for="check1"></label>
          </div>
          <button class="complex-btn" type="submit"><i class="fas fa-plus"></i> Add</button>
        `;

  private constructor() {
    if (Page.instance) {
      throw new Error(
        "Error: Instantiation failed: Use Page.getInstance() instead of new."
      );
    }
    try {
      const index: string = fs.readFileSync(
        path.join(path.resolve(), "public/index.html"),
        { encoding: "utf8", flag: "r" }
      );
      if (index) this.indexPage = index;
    } catch (error) {
      console.log("Error loading index page");
    }

    Page.instance = this;
  }

  public static getInstance(): Page {
    return Page.instance;
  }

  public render(content: string): string {
    return this.indexPage.replace("{}", this.form).replace("{{}}", content);
  }
}

export default Page.getInstance();
