import React, { useEffect, useState } from "react";
// import "filepond/dist/filepond.min.css";
// import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// import "filepond-plugin-image-edit/dist/filepond-plugin-image-edit.min.css";
import { Title } from "../components/Title";
import { SubHeading } from "../components/SubHeading";
import { PrimaryButton } from "../components/PrimaryButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { FilePondFile } from "filepond";
import { createNewPost, uploadImage } from "../services";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { Paragraph } from "../components/Paragraph";
import { useNavigate } from "react-router-dom";
import * as FilePond from "filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageTransform from "filepond-plugin-image-transform";
import { CircularProgress } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { SecondaryButton } from "../components/SecondaryButton";

FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEdit,
  FilePondPluginFileValidateType,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform
);

export const CreatePost: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  //eslint-disable-next-line
  const [imageMessage, setImageMessage] = useState<string>("");
  const [imageErrorMessage, setImageErrorMessage] = useState<string>("");
  //FilePond Image Uploader
  const [files, setFiles] = useState<FilePondFile[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState<{
    title: string;
    imgsrc: string;
    content: string;
  }>({
    title: "",
    imgsrc: "",
    content: "",
  });
  const [imgSrc, setImgSrc] = useState<string>("");

  useEffect(() => {
    const fileInput = document.getElementById("filepond") as Element | null;
    if (fileInput) {
      const pond = FilePond.create(fileInput, {
        dropOnPage: true,
        files: files.map((fileItems: FilePondFile) => fileItems.file),
        allowMultiple: false,
        required: true,
        name: "image",
        className: "filepond",
        labelIdle: `<span class='z-40 inter font-bold text-primary-text'>Drag and Drop your image or </span> <span class='z-40 cursor-pointer hover:bg-blue-500 text-white bg-blue-700 mx-2 rounded-lg font-bold border-border py-1 xl:py-2 my-3 px-8 block md:inline'>Browse from Files</span>`,
        styleLoadIndicatorPosition: "center bottom",
        styleProgressIndicatorPosition: "right bottom",
        styleButtonRemoveItemPosition: "left bottom",
        styleButtonProcessItemPosition: "right bottom",
        imageCropAspectRatio: "auto",
        acceptedFileTypes: [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/webp",
        ],
        onupdatefiles: setFiles,
      });
      return () => {
        pond.destroy();
      };
    } else {
      console.log("FilePond element with the id 'filepond' not found!");
    }
  }, []);

  const uploadSelectedImage = () => {
    try {
      if (files.length === 0) {
        setImageErrorMessage("Please select an Image!");
        return;
      }
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("image", files[0].file);

      uploadImage(formData)
        .then((res) => {
          console.log(res?.data);
          setImgSrc(res?.data?.imgsrc);
        })
        .then(() => {
          setUploadLoading(false);
          setImageMessage("Image Uploaded Successfully!");
        });
    } catch (error) {
      console.log(error);
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    setNewPost({
      ...newPost,
      imgsrc: imgSrc,
    });
  }, [imgSrc]);

  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPost.imgsrc) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 200);
      console.log("Please Upload an Image First");
      setErrorMessage("Please Upload an Image First!");
      return;
    }
    try {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);
      console.log(newPost);
      if (newPost.imgsrc && newPost.title && newPost.content) {
        const response = await createNewPost(newPost);
        if (response?.data?.status === 400) {
          setErrorMessage(response?.data?.message);
        } else if (response?.data?.status === 200) {
          setSuccessMessage(response?.data?.message);
          navigate(response?.data?.redirect);
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Title pre="Create New " postblue="Posts!" />
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg px-3 xl:px-6 py-10">
        <SubHeading pre="Create your Post by these simple steps:" />
        <Paragraph padding="1px 10px" text="1. Upload your Featured Image" />
        <Paragraph padding="1px 10px" text="3. Input your Title" />
        <Paragraph padding="1px 10px" text="2. Write your Content" />
        <Paragraph padding="1px 10px" text="3. Publish your Post" />
        {/* {loading && (
          <div className="fixed top-0 z-20 right-0 bottom-0 left-0 bg-black/75">
            <div className="relative top-50 left-50">
              <CircularProgress />
            </div>
          </div>
        )} */}
        {errorMessage && <ErrorMessage padding="8px 0px" text={errorMessage} />}
        {successMessage && (
          <SuccessMessage padding="8px 0px" text={successMessage} />
        )}
        <form onSubmit={createPost}>
          <br />
          <label htmlFor="image">
            <SubHeading pre="Upload your Featured Image: " />
          </label>
          <input
            type="file"
            id="filepond"
            name="image"
            data-max-file-size="5MB"
          />
          <div className="text-center flex flex-col items-center gap-2">
            {imageMessage ? (
              <SuccessMessage text={imageMessage} padding="8px 0px" />
            ) : (
              imageErrorMessage && (
                <ErrorMessage text={imageErrorMessage} padding="8px 0px" />
              )
            )}
            <SecondaryButton
              onClick={uploadSelectedImage}
              preIcon={
                uploadLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <BackupIcon />
                )
              }
              text="Upload Image"
              padding="5px 20px"
              type="button"
            />
          </div>
          <br />
          <label htmlFor="title">
            <SubHeading pre="Title: " />
          </label>
          <input
            onChange={(e) =>
              setNewPost({
                ...newPost,
                title: e.target.value,
              })
            }
            required
            className="border-[1px] border-border bg-background text-primary-text w-full rounded-lg my-1 py-3 text-xl px-5"
            type="text"
            value={newPost.title}
            name="title"
            placeholder="Title"
          />
          <br />
          <br />
          <label htmlFor="content">
            <SubHeading pre="Content: " />
          </label>
          <textarea
            onChange={(e) =>
              setNewPost({
                ...newPost,
                content: e.target.value,
              })
            }
            required
            className="border-[1px] border-border bg-background text-primary-text w-full rounded-lg my-1 text-xl py-4 px-5"
            rows={20}
            name="content"
            value={newPost.content}
            placeholder="You can write your content here..."
          />
          <PrimaryButton
            type="submit"
            padding="6px 50px"
            margin="10px 0px"
            preIcon={<CreateRoundedIcon />}
            text="Publish Post"
          />
        </form>
      </div>
    </div>
  );
};
