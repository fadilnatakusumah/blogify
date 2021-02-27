import React, { createRef, useState } from "react";
import styled from "styled-components";
import Gravatar from "react-gravatar";
import renderHTML from "react-render-html";
import dayjs from "dayjs";

import { DownshiftCustom } from "../Downshift";
import { ReactQuillForm } from "../ReactQuill"
import { useAuthContextValue } from "../../contexts/authContext";

const CreateBlogStyled = styled.section`
 .header-tabs{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

    @media(max-width: 720px){
      padding-left: 8px; 
      padding-right: 8px; 
    }

    h2.title{
      display: inline-block;
      font-weight: 600;
    }

    div.tabs span {
      padding: 8px 10px;
      margin-left: 10px;
      cursor: pointer;

      &.active{
        border-bottom: 2px solid var(--accent-color);
      }
    }
 }
 
 .form-container{
  .form-content{
    padding: 30px;
    background-color: white;
    border: 1px solid #ccc;
    min-height: 400px;

    @media(max-width: 720px){
      padding-left: 8px; 
      padding-right: 8px; 
    }

    .feature-image-input{
      display: flex;
      align-items: center;
      @media (max-width: 768px) {
        flex-wrap: wrap;
      }

        &__button {
      border: 1px solid #aaa;
      color: black;
      background-color: white;
      padding: 8px 18px;
      font-size: 18px;
      border-radius: 5px;
      cursor: pointer;
      white-space: nowrap;
      
      &:hover{
          background-color: #eee;
        }
      }

      &__filename{
        margin: 0 15px;

        @media (max-width: 768px) {
          font-size: 14px;
          margin-top: 10px;
        }

        >.delete-feature-image{
          background: #f93e3e;
          border-radius: 50%;
          display: inline-block;
          font-size: 10px;
          color: white;
          text-align: center;
          font-weight: 600;
          padding: 2px 5px;
          cursor: pointer;
          margin: 0 10px;
          &:hover{
            background: #f06a6a;
          }
        }
      }

    }

    .title-input{
      margin-top: 40px;
      >input{
        border: none;
        font-size: 40px;
        font-weight: 600;
        color: #767676;
        width: 100%;

        @media (max-width: 768px) {
          font-size: 30px;
        }
      }
    }

    .tags-input{
      margin: 20px 0;
    }

    .content-input {
      margin-top: 20px;
      border-top: 1px solid #ccc;
    }

    .preview-feature-image{
      width: 100%;
      margin: 20px 0;

      >img{
        object-fit: cover;
        width: 100%;
        max-height: 500px;
      }
    }
  }

  .buttons-container{
    display: flex;
    gap: 10px;
    margin: 20px 0;

    @media(max-width: 720px){
      padding-left: 8px; 
      padding-right: 8px; 
    }

    >button {
      background-color: var(--accent-color);
      color: white;
      padding: 12px;
      font-size: 16px;
      border: none;
      cursor: pointer;
      max-width: 200px;
      display: inline-block;
      transition: .5s ease-out;
     
      &:hover{
        background-color: var(--light-accent-color);
      }

      &.outline{
        background-color: white;
        border: 1px solid var(--accent-color);
        color:var(--accent-color);

        &:hover{
          background-color: #ccc;
        }
      }
    }
  }
 }

 .preview-container{
    padding: 30px;
    background-color: white;
    border: 1px solid #ccc;
    min-height: 400px;

    .featured-image{
      >img {
        border-radius: 10px;
        max-height: 500px;
      }
    }

    >h1{
      font-size: 3em;
      text-align: center;
      margin: 12px 0;

      @media(max-width: 600px){
        font-size: 2em;
      }
    }

    .tags{
      >span{
        border: 1px solid purple;
        color: purple;
        padding: 3px 5px;
        margin-right: 5px;
        cursor: pointer;
        user-select: none;

        &:hover{
          background-color: #eee;
        }

        &:active{
          background-color: purple;
          color: white;
        }
      }
    }

    .profile{
      display: flex;
      align-items: center;
      gap: 10px;
      margin:20px 0;

      >img{
        height: 50px;
        width: auto;
        border-radius: 50%;
      }

      >div{
        h4{
          font-weight: 600;
        }
        >div{
          font-style: italic;
          color: #5e5e5e;
        }
      }
    }

    .ql-editor{
      padding-left: 0;
      padding-right: 0;
    }
 }
`

enum MODE_VIEW {
  EDIT, PREVIEW
}

export type BlogPayloadTypes = {
  title: string,
  content: string,
  featureImage?: File | null | undefined,
}

export function CreateBlog() {
  const { authState } = useAuthContextValue();

  const [mode, setMode] = useState(MODE_VIEW.EDIT);
  const [form, setForm] = useState<BlogPayloadTypes>({
    title: '',
    content: '',
    featureImage: null,
  });
  const [tags, setTags] = useState<{ text: string, value: string }[]>([]);
  const [featuredImage, setPreview] = useState('');
  const featureImageInput = createRef<HTMLInputElement>();

  const onChangeModeHandler = (mode: MODE_VIEW) => () => setMode(mode);

  const onChangeFormHandler = (name: string) => (evt: React.ChangeEvent<HTMLInputElement> | any) => {
    if (name === "featureImage") {
      setForm({
        ...form,
        [name]: evt.target.files![0] || null
      })
      setPreview(URL.createObjectURL(evt.target.files![0]))
    } else if (name === "content") {
      setForm({
        ...form,
        [name]: (evt as string),
      })
    } else {
      setForm({
        ...form,
        [name]: evt.target.value,
      })
    }
  }

  const clearFeatureImage = () => {
    setPreview('');
    setForm({
      ...form,
      featureImage: null,
    })
    featureImageInput.current!.value = '';
  }

  const onSubmitHandler = () => {
    if (!form.title) {
      return alert("You haven't type the title of the blog");
    }
    if (!form.content) {
      return alert("You haven't type the content of the blog");
    }

    console.log("FORM", form)
    console.log("TAGS", tags)
  }
  const onSaveDraftHandler = () => { }

  return (
    <CreateBlogStyled>
      <div className="header-tabs">
        <h2 className="title">Write new blog</h2>
        <div className="tabs">
          <span onClick={onChangeModeHandler(MODE_VIEW.EDIT)} className={mode === MODE_VIEW.EDIT && "active" || ""}>Edit</span>
          <span onClick={onChangeModeHandler(MODE_VIEW.PREVIEW)} className={mode === MODE_VIEW.PREVIEW && "active" || ""}>Preview</span>
        </div>
      </div>
      {mode === MODE_VIEW.EDIT
        ? (
          <div className="form-container">
            <div className="form-content">
              <div className="feature-image-input">
                <label className="feature-image-input__button">
                  {`${form.featureImage ? "Change" : "Add"} feature image`}
                  <input ref={featureImageInput} accept="image/*" hidden onChange={onChangeFormHandler("featureImage")} type="file" name="feature-image" />
                </label>
                {form.featureImage &&
                  <div className="feature-image-input__filename">
                    {form.featureImage.name}
                    <span onClick={clearFeatureImage} className="delete-feature-image">
                      &#10005;
                    </span>
                  </div>}
              </div>
              {featuredImage &&
                <div className="preview-feature-image">
                  <img src={featuredImage} />
                </div>}
              <div className="title-input">
                <input
                  value={form.title}
                  placeholder="Type blog title here"
                  type="text"
                  name="title"
                  onChange={onChangeFormHandler("title")}
                />
              </div>

              <div className="tags-input">
                <DownshiftCustom
                  placeholder={"tag 1, tag 2, tag 3"}
                  onChange={setTags}
                  values={tags}
                />
              </div>
              <div className="content-input">
                <ReactQuillForm
                  value={form.content}
                  placeholder="Type your blog content here"
                  onChange={onChangeFormHandler("content")}
                />
              </div>
            </div>
            <div className="buttons-container">
              <button onClick={onSubmitHandler} className="primary">Submit</button>
              <button onClick={onSaveDraftHandler} className="outline">Save as draft</button>
            </div>
          </div>
        )
        : (
          <div className="preview-container">
            <div className="featured-image">
              <img src={featuredImage} width="100%" height="100%" />
            </div>
            <h1>{form.title}</h1>
            <div className="tags">
              {tags.map((tag: any, idx: number) => (
                <span key={idx}>#{tag.text}</span>
              ))}
            </div>
            <div className="profile">
              <Gravatar
                email={authState?.user?.email}
                size={100}
                rating="pg"
                default="monsterid"
              />
              <div>
                <h4>{authState?.user?.name}</h4>
                <div>
                  {dayjs().format("DD MMMM, YYYY")}
                </div>
              </div>
            </div>
            <div className="ql-editor">
              {renderHTML(form.content)}
            </div>
          </div>
        )} </CreateBlogStyled>
  )
}

export default CreateBlog
