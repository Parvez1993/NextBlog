import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBlogStore } from "../../contextApi/Blog";
import { useRouter } from "next/router";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { toast, ToastContainer } from "react-toastify";
import { TagsInput } from "react-tag-input-component";
import { useAuthStore } from "../../contextApi/UserContext";
import draftToHtml from "draftjs-to-html";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const UpdateBlogs = () => {
  //my states//
  const { authState } = useAuthStore();

  const { user } = authState;

  //for the text input
  let [text, setText] = useState("");
  const [selected, setSelected] = useState(["frontend"]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [statusState, setStatus] = useState("incomplete");
  const [category, setCategory] = useState("frontend");
  const [upload, setUpload] = useState("");

  const [newUpload, setNewUpload] = useState("");
  const [imgData, setImgData] = useState("");
  const [imageId, setImageId] = useState("");

  const [ready, setReady] = useState(false);

  // /refresh

  const router = useRouter();
  const { id } = router.query;

  const { blogState, blogDispatch } = useBlogStore();

  const { blogs, error, loading, image, success } = blogState;

  //check if there is new uploaded image or not

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        blogDispatch({ type: "BLOG_LOADING" });
        let { data } = await axios.get(`/api/blogs/${id}`);
        blogDispatch({ type: "BLOG_SUCCESS", payload: data });

        if (data) {
          const { blog } = data;

          setText(blog.content);
          setSelected(blog.tags);
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(convertFromHTML(blog.content))
            )
          );
          setTitle(blog.title);
          setMeta(blog.metaDesc);
          setStatus(blog.status);
          setCategory(blog.category);
          setUpload(blog.cloudinary_result);
          setImageId(blog.cloudinary_id);
          setImgData(blog.cloudinary_result);
          setNewUpload("");
        }
      } catch (error) {
        blogDispatch({ type: "BLOG_ERROR", payload: error.message });
      }
    };

    if (id && user) {
      fetchProducts();
    }
  }, [id, user, ready]);

  let uploadImage = async () => {
    blogDispatch({ type: "BLOG_LOADING" });
    let newFile = newUpload;
    const formData = new FormData();
    formData.append("image", newFile);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `/api/blogs/admin/editPic/${id}`,
      formData,
      config
    );

    blogDispatch({ type: "BLOG_IMAGE", payload: data });
    setReady(true);
  };

  const submitPost = async () => {
    let { data } = await axios.put(
      `/api/blogs/admin/${id}`,
      {
        title: title,
        content: text,
        metaDesc: meta,
        tags: selected,
        status: statusState,
        cloudinary_id: image ? image.id : upload,
        cloudinary_result: image ? image.result : imgData,
        category_name: category,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    blogDispatch({ type: "BLOG_SUCCESS", payload: data });
    blogDispatch({
      type: "BLOG_RESET",
    });
  };

  useEffect(() => {
    if (ready) {
      setReady(false);
      submitPost();
    }
  }, [ready]);

  const uploadFileHandler = (e) => {
    setNewUpload(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newUpload) {
      try {
        blogDispatch({ type: "BLOG_LOADING" });
        uploadImage(newUpload);
      } catch (error) {
        blogDispatch({
          type: "ADMIN_ERROR",
          payload: error.msg,
        });
      }
    } else {
      try {
        let bearerToken = user.token;
        blogDispatch({ type: "BLOG_LOADING" });
        let { data } = await axios.put(
          `/api/blogs/admin/${id}`,
          {
            title: title,
            content: text,
            metaDesc: meta,
            tags: selected,
            status: statusState,
            category_name: category,
          },
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        blogDispatch({ type: "BLOG_SUCCESS", payload: data });
        blogDispatch({
          type: "BLOG_RESET",
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
        blogDispatch({
          type: "BLOG_ERROR",
          payload: error.msg,
        });
      }
    }
  };

  //get products

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <>
      <>
        {error
          ? toast.warn(error)
          : loading
          ? toast.success("Loading wait")
          : ""}

        {success ? toast.success("Ok Great Done") : ""}
        <ToastContainer />
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center my-32">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Remeber what you going to Fix !!!
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
                <option value="incomplete">incomplete</option>
                <option value="processing">processing</option>
                <option value="success">success</option>
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
              <Image alt="Vercel logo" src={imgData} width={200} height={200} />

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

        {blogs && (
          <>
            {" "}
            <div className="flex justify-center mx-10">
              <div className="container ">
                <Editor
                  editorState={editorState}
                  wrapperClassName="card"
                  editorClassName="card-body"
                  onEditorStateChange={(newState) => {
                    setEditorState(newState);
                    setText(
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex my-10">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-1/2 inline-block px-6 py-2 border-2 bg-green-500 text-black border-green-600 font-medium text-xs leading-normal uppercase rounded hover:bg-green-900 hover:text-white hover:bg-opacity- focus:outline-none focus:ring-0 transition duration-150 ease-in-out mx-10"
              >
                Ready to Post
              </button>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default UpdateBlogs;
