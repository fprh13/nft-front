import axios from "axios";
import assert from "assert";
import { serverApi } from "../lib/config.ts";
import { Definer } from "../lib/Definer.ts";

class CommunityApiService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async uploadImageToServer(image: any): Promise<string> {
    try {
      let formData = new FormData();
      formData.append("community_image", image);

      console.log(image);
      const result = await axios(`${this.path}/community/image`, {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const image_name: string = result.data.data;
      return image_name;
    } catch (err: any) {
      console.log(`ERROR ::: uploadImageToServer ${err.message}`);
      throw err;
    }
  }

  public async createArticle(data: any): Promise<any> {
    try {
      data.account_address = data.account_id;
      const result = await axios.post(this.path + "/community/create", data);

      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const article = result.data.data;
      return article;
    } catch (err: any) {
      console.log(`ERROR ::: createArticle ${err.message}`);
      throw err;
    }
  }

  public async getArticles(): Promise<any[]> {
    try {
      let url = `/community/articles`;

      const result = await axios.get(this.path + url);
      assert.ok(result?.data, Definer.general_err1);
      assert.ok(result?.data?.state != "fail", result?.data?.message);
      console.log("state:", result.data.state);

      const articles = result.data.data;
      return articles;
    } catch (err: any) {
      console.log(`ERROR ::: getArticles ${err.message}`);
      throw err;
    }
  }
}

export default CommunityApiService;
