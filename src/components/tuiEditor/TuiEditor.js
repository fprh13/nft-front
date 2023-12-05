import { useRef, useState, useCallback } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useHistory } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import Button from "@mui/joy/Button";
import CommunityApiService from "../../apiServices/communityApiService.ts";
import { serverApi } from "../../lib/config.ts";
import assert from "assert";
import { Definer } from "../../lib/Definer.ts";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../lib/sweetAlert.ts";

export const TuiEditor = (props) => {
  /** INITIALIZATIONS */
  const history = useHistory();
  const editorRef = useRef();
  const [communityArticleData, setCommunityArticleData] = useState({
    art_subject: "",
    art_content: "",
    art_image: "",
    account_id: "",
  });
  const [image, setImage] = useState(null);

  /** HANDLERS */
  const uploadImage = async (image) => {
    try {
      const communityService = new CommunityApiService();
      const image_name = await communityService.uploadImageToServer(image);
      communityArticleData.art_image = image_name;
      console.log("uploadImage: ", communityArticleData);
      setImage(image_name);
      // setCommunityArticleData({ ...communityArticleData });
      const source = `${serverApi}/${image_name}`;
      return source;
    } catch (err) {
      console.log(`ERROR ::: uploadImage ${err}`);
    }
  };

  const handleRegisterButton = async () => {
    try {
      const editor = editorRef.current;
      const art_content = editor?.getInstance().getHTML();
      communityArticleData.art_content = art_content;
      communityArticleData.account_id = props.account;
      communityArticleData.art_image = image;
      assert.ok(
        communityArticleData.art_content !== "" &&
          communityArticleData.bo_id !== "" &&
          communityArticleData.art_subject !== "",
        communityArticleData.account_id !== "",
        Definer.input_err1
      );
      const communityService = new CommunityApiService();
      await communityService.createArticle(communityArticleData);
      await sweetTopSmallSuccessAlert("SuccessFully created!", 2000, false);

      props.setCreate(false);
    } catch (err) {
      console.log(`ERROR ::: handleRegisterButton ${err}`);
      await sweetErrorHandling(err.message);
    }
  };

  console.log("communityArticleData: ", communityArticleData);

  return (
    <div className="tuieditor">
      <div className="container">
        <div className="title_input">
          <FormControl marginBottom={4}>
            <FormLabel fontWeight={700} htmlFor="email">
              Title
            </FormLabel>
            <Input
              id="text"
              type="text"
              value={communityArticleData.art_subject}
              onChange={(e) => {
                setCommunityArticleData({
                  ...communityArticleData,
                  art_subject: e.target.value,
                });
              }}
            />
          </FormControl>
        </div>
        <div className="editor">
          {/*@ts-ignore*/}
          <Editor
            ref={editorRef}
            initialValue="Type here"
            placeholder="Type here"
            previewStyle="vertical"
            height="640px"
            initialEditType="WYSIWYG"
            toolbarItems={[
              ["heading", "bold", "italic", "strike"],
              ["image", "table", "link"],
              ["ul", "ol", "task"],
            ]}
            hooks={{
              addImageBlobHook: async (image, callback) => {
                const uploadImageURL = await uploadImage(image);
                console.log("uploadImageURL:", uploadImageURL);
                callback(uploadImageURL);
                return false;
              },
            }}
            events={{
              load: function (param) {},
            }}
          />
        </div>
        <div className="btn_wrap">
          <Button
            size="md"
            variant={"solid"}
            color="danger"
            onClick={() => props.setCreate(false)}
          >
            Cancel
          </Button>
          <Button
            size="md"
            variant={"outlined"}
            color="primary"
            onClick={handleRegisterButton}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
