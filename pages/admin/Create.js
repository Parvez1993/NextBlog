import { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import { useCreateProductStore } from "../../contextApi/CreateProduct";
import { useAuthStore } from "../../contextApi/UserContext";
import { toast, ToastContainer } from "react-toastify";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const Create = () => {
  //for the text input
  let [text, setText] = useState("");
  const [selected, setSelected] = useState(["frontend"]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [statusState, setStatus] = useState("incomplete");
  const [category, setCategory] = useState("frontend");
  const [upload, setUpload] = useState("");

  const router = useRouter();

  let file;

  //from context api

  const { authState } = useAuthStore();

  const { user } = authState;

  const { createProductState, createProductDispatch } = useCreateProductStore();

  const { image: createImage, error, loading } = createProductState;

  const uploadFileHandler = (e) => {
    file = e.target.files[0];
    setUpload(file);
  };

  let uploadImage = async (file) => {
    createProductDispatch({ type: "ADMIN_LOADING" });
    let newFile = upload;
    const formData = new FormData();
    formData.append("image", newFile);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    createProductDispatch({ type: "ADMIN_LOADING" });

    const { data } = await axios.post(
      "/api/blogs/admin/upload",
      formData,
      config
    );
    imageData = data;

    createProductDispatch({ type: "ADMIN_IMAGE_SUCCESS", payload: data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage(upload);
    if (createImage) {
      try {
        let { data } = await axios.post(
          `/api/blogs/admin`,
          {
            title: title,
            content: text,
            metaDesc: meta,
            tags: selected,
            status: statusState,
            cloudinary_id: createImage.id,
            cloudinary_result: createImage.result,
            image: createImage,
            category_name: category,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        createProductDispatch({ type: "ADMIN_SUCCESS", payload: data });
        createProductDispatch({
          type: "ADMIN_RESET",
        });

        toast.success("well done !!! Created Blog");
        if (data) {
          setText("");
          setSelected(["frontend"]);
          setEditorState(EditorState.createEmpty());
          setTitle("");
          setMeta("");
          setStatus("incomplete");
          setCategory("frontend");
          setUpload("");
        }
      } catch (error) {
        createProductDispatch({
          type: "ADMIN_ERROR",
          payload: error.msg,
        });
      }
    }
  };

  return (
    <>
      {error ? toast.warn(error) : loading ? toast.success("Loading wait") : ""}
      <ToastContainer />
      <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center my-32">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
          Keep em Posting eh !!!
        </h1>
        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
          Knowledge is best used when shared with others. Give your best.
        </p>
      </div>
      <form className="p-10">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Title of my blog"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Meta Description
            </label>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              placeholder="Keep it short "
              required
              onChange={(e) => setMeta(e.target.value)}
              value={meta}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tags
            </label>

            <TagsInput
              value={selected}
              onChange={setSelected}
              name="tags"
              placeHolder="enter tags"
            />
          </div>
          <div>
            <label
              htmlFor="statusState"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              statusState
            </label>
            <select
              id="statusState"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option selected value="incompleted">
                Incomplete
              </option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="frontend" selected>
                Frontend
              </option>
              <option value="backend">Backend</option>
              <option value="tips">Tips and Tricks</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="upload"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              File Upload
            </label>
            <input
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 py-2"
              id="upload"
              type="file"
              accept="image/*"
              name="image"
              onChange={uploadFileHandler}
            />
          </div>
        </div>
      </form>

      <div className="flex justify-center mx-10">
        <div className="container ">
          <Editor
            editorState={editorState}
            wrapperClassName="card"
            editorClassName="card-body"
            onEditorStateChange={(newState) => {
              setEditorState(newState);
              setText(draftToHtml(convertToRaw(newState.getCurrentContent())));
            }}
          />
        </div>
      </div>
      <div className="flex my-10">
        <button
          type="submit"
          className="w-1/2 inline-block px-6 py-2 border-2 bg-green-500 text-black border-green-600 font-medium text-xs leading-normal uppercase rounded hover:bg-green-900 hover:text-white hover:bg-opacity- focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-10"
          onClick={handleSubmit}
        >
          Ready to Post
        </button>
      </div>
    </>
  );
};

export default Create;
