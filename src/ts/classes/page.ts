import path from "path";
import fs from "fs";

export class Page {
  private static instance: Page = new Page();
  protected indexPage: string = "Something went wrong";

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
    return this.indexPage.replace("{{}}", content);
  }
}

export default Page.getInstance();
