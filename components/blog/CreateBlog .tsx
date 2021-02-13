import { ChangeEventHandler, createRef, useState } from "react";
import styled from "styled-components";
import { DownshiftCustom } from "../Downshift";

import { ReactQuillForm } from "../ReactQuill"

const CreateBlogStyled = styled.section`
 .header-tabs{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

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
    margin-top: 20px;
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

  /* form {
    >div{
      >label,>span{
        display: block;
      }

      >span{
        color: red;
      }

      input{
        padding: 10px 12px;
        border: 1px solid #ccc;
        width: 100%;
        outline: none;

        &:active,:focus{
         border-color: var(--accent-color);
        }
      }
      margin: 14px 0;

      button {
        width: 100%;
        background-color: var(--accent-color);
        color: white;
        padding: 12px;
        font-size: 16px;
        border: none;
        cursor: pointer;

        &:hover{
          background-color: var(--light-accent-color);
        }
      }
    }

    >div.buttons-container{
      display: flex;
      gap: 10px;
      >button {
        max-width: 200px;
        display: inline-block;
        transition: .5s ease-out;

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

  } */
`

enum MODE_VIEW {
  EDIT, PREVIEW
}

export type BlogPaylodTypes = {
  title: string,
  content: string,
  featureImage?: File | null | undefined,
}

export function CreateBlog() {
  const [mode, setMode] = useState(MODE_VIEW.EDIT);
  const [form, setForm] = useState<BlogPaylodTypes>({
    title: '',
    content: '',
    featureImage: null,
  });
  const [previewImage, setPreview] = useState('');
  const featureImageInput = createRef<HTMLInputElement>();

  const onChangeModeHandler = (mode: MODE_VIEW) => () => setMode(mode);

  const onChangeFormHandler = (name: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "featureImage") {
      setForm({
        ...form,
        [name]: evt.target.files![0] || null
      })
      setPreview(URL.createObjectURL(evt.target.files![0]))
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

  return (
    <CreateBlogStyled>
      <div className="header-tabs">
        <h2 className="title">Write new blog</h2>
        <div className="tabs">
          <span onClick={onChangeModeHandler(MODE_VIEW.EDIT)} className={mode === MODE_VIEW.EDIT && "active" || ""}>Edit</span>
          <span onClick={onChangeModeHandler(MODE_VIEW.PREVIEW)} className={mode === MODE_VIEW.PREVIEW && "active" || ""}>Preview</span>
        </div>
      </div>
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
          {previewImage &&
            <div className="preview-feature-image">
              <img src={previewImage} />
            </div>}
          <div className="title-input">
            <input placeholder="Type blog title here" type="text" name="title" />
          </div>

          {/* <div className="tags-input">
            <DownshiftCustom />
          </div> */}
          <div className="content-input">
            <ReactQuillForm placeholder="Type your blog content here" />
          </div>
        </div>
        <div className="buttons-container">
          <button className="primary">Submit</button>
          <button className="outline">Save as draft</button>
        </div>
      </div>
      {/* <form>
        <div>
          <h4>Title</h4>
          <input placeholder="Type name here" type="text" required name="title" />
        </div>
        <div>
          <h4>Tags</h4>
          <input placeholder="Type name here" type="text" required name="title" />
        </div>
        <div>
        </div>
        <div className="buttons-container">
          <button className="primary">Submit</button>
          <button className="outline">Save as draft</button>
        </div>
      </form> */}
    </CreateBlogStyled>
  )
}

export default CreateBlog
