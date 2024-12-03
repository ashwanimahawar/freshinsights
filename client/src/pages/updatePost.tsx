import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { SubHeading } from "../components/SubHeading";
import { PrimaryButton } from "../components/PrimaryButton";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import { FilePondFile } from "filepond";
import { FilePond } from "react-filepond";
import { updatePost, uploadUpdatedImage } from "../services";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { Paragraph } from "../components/Paragraph";
import { CircularProgress } from "@mui/material";
import { AllPostProps } from "../interfaces/interfaces";
import { SecondaryButton } from "../components/SecondaryButton";
import BackupIcon from "@mui/icons-material/Backup";

export const UpdatePost: React.FC<AllPostProps> = ({ post, setIsEditing }) => {
  const [updatedPost, setUpdatedPost] = useState<{
    title: string | undefined;
    imgsrc: string;
    content: string;
  }>({
    title: "",
    imgsrc: "",
    content: "",
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  //FilePond Image Uploader
  const [updateFiles, setUpdateFiles] = useState<FilePondFile[]>([]);
  const [imageUpdateMessage, setImageUpdateMessage] = useState<string>("");
  const [imageUpdateErrorMessage, setImageUpdateErrorMessage] =
    useState<string>("");
  const [updateImageLoading, setUpdateImageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (post) {
      setUpdatedPost({
        title: post.title,
        imgsrc: post.imgsrc,
        content: post.content,
      });
    }
  }, []);

  const updateSelectedImage = () => {
    try {
      if (updateFiles.length === 0) {
        setImageUpdateErrorMessage("Please select an Image!");
        return;
      }
      setUpdateImageLoading(true);
      const formData = new FormData();
      formData.append("image", updateFiles[0].file);

      uploadUpdatedImage(formData)
        .then((res) => {
          console.log(res?.data);
          const img = res?.data?.imgsrc;
          setUpdatedPost((prevPost) => ({
            ...prevPost,
            imgsrc: img,
          }));
          console.log(img);
        })
        .then(() => {
          setUpdateImageLoading(false);
          setImageUpdateMessage("Image Uploaded Successfully!");
          console.log(updatedPost);
        });
    } catch (error) {
      console.log(error);
      setUpdateImageLoading(false);
    }
  };

  const updateThisPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateFiles([]);
    try {
      if (updatedPost.title && updatedPost.content) {
        console.log(updatedPost);
        const response = await updatePost(post?.id, updatedPost);
        if (response?.data?.status === 400) {
          setErrorMessage(response?.data?.message);
        } else if (response?.data?.status === 200) {
          window.scrollTo(0, 0);
          setSuccessMessage(response?.data?.message);
          setIsEditing && setIsEditing(response?.data?.isEditing);
          window.location.reload();
        }
        setUpdatedPost({
          title: "",
          imgsrc: "",
          content: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log("UpdatePost");
  return (
    <div className="m-5 text-primary-text border-[1px] border-border w-[95%] xl:w-[80%] mx-auto bg-secondary-background shadow rounded-lg px-3 xl:px-6 py-8 overflow-auto">
      <Title pre="Edit your " postblue="Post, " post="as you wish!" />
      {/* {loadings && (
        <div className="fixed top-0 z-20 right-0 bottom-0 left-0 bg-black/75">
          <div className="relative top-50 left-50">
            <CircularProgress />
          </div>
        </div>
      )} */}
      <SubHeading pre="Update your Post by these simple steps:" />
      <Paragraph
        padding="1px 10px"
        text="1. Upload your new Featured Image, if you wish to change"
      />
      <Paragraph padding="1px 10px" text="3. Update the title" />
      <Paragraph padding="1px 10px" text="2. Update your content" />
      <Paragraph padding="1px 10px" text="3. Publish the changes" />
      {errorMessage && <ErrorMessage text={errorMessage} />}
      {successMessage && <SuccessMessage text={successMessage} />}
      <form onSubmit={updateThisPost}>
        <br />
        <SubHeading pre="Upload A new Featured image, if you wish to change: " />
        <FilePond
          dropOnPage
          files={updateFiles.map((filePondFile: FilePondFile) => filePondFile.file)}
          allowMultiple={false}
          className="filepond"
          name="updatedImage"
          onupdatefiles={setUpdateFiles}
          allowBrowse
          labelIdle="<span class='inter font-bold text-primary-text'>Drag and Drop your image or </span> <span class='cursor-pointer hover:bg-blue-500 text-white bg-blue-700 mx-2 rounded-lg font-bold border-border py-1 xl:py-2 my-3 px-8 block md:inline'>Browse from Files</span>"
        />
        <div className="text-center flex flex-col items-center gap-2">
          {imageUpdateMessage ? (
            <SuccessMessage text={imageUpdateMessage} padding="8px 0px" />
          ) : (
            imageUpdateErrorMessage && (
              <ErrorMessage text={imageUpdateErrorMessage} padding="8px 0px" />
            )
          )}
          <SecondaryButton
            onClick={updateSelectedImage}
            preIcon={
              updateImageLoading ? (
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
          <SubHeading pre="Update Title: " />
        </label>
        <input
          value={updatedPost?.title}
          onChange={(e) =>
            setUpdatedPost({
              ...updatedPost,
              title: e.target.value,
            })
          }
          className="border-[1px] border-border bg-background text-primary-text w-full rounded-lg my-1 py-3 text-xl px-5"
          type="text"
          name="title"
          placeholder="Title"
        />
        <br />
        <br />
        <label htmlFor="content">
          <SubHeading pre="Update Content: " />
        </label>
        <textarea
          value={updatedPost?.content}
          onChange={(e) =>
            setUpdatedPost({
              ...updatedPost,
              content: e.target.value,
            })
          }
          className="border-[1px] border-border bg-background text-primary-text w-full rounded-lg my-1 text-xl py-4 px-5"
          rows={20}
          name="content"
          placeholder="You can write your content here..."
        />
        <PrimaryButton
          type="submit"
          padding="6px 50px"
          margin="10px 0px"
          preIcon={<CreateRoundedIcon />}
          text="Publish Changes"
        />
      </form>
    </div>
  );
};
