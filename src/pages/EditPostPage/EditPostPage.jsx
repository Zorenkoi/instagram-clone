import { useState, useEffect } from "react";
import "./EditPostPage.css";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../components/Button/Button";
import { updatePost } from "../../redux/slices/postsSlice";
import usePost from "../../hooks/usePost";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditPostPage = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = usePost({ postId });

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (post) {
      const { imgUrl, text } = post;

      setValue("imgUrl", imgUrl ? imgUrl : "");
      setValue("text", text ? text : "");
    }
  }, [post]);

  const submit = (value) => {
    const updatedPost = { ...post, ...value };

    dispatch(updatePost({ postId, updatedPost }));

    navigate(`/${post.author.id}`);
  };

  const descriptionSettings = {
    required: "Поле не може бути пустим",
    minLength: {
      value: 10,
      message: "Мінімум 10 символи",
    },
  };

  const urlSettings = {
    required: "Поле не може бути пустим",
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: "Введіть коректну URL",
    },
  };

  const imgUrl = watch("imgUrl");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="edit-profile-inputs-container"
    >
      <div className="container1">
        <div className="container2">
          <img src={imgUrl} alt="" />
        </div>
      </div>

      <Input
        name={"imgUrl"}
        errors={errors}
        register={register}
        settings={urlSettings}
      />
      <Input
        name={"text"}
        errors={errors}
        register={register}
        settings={descriptionSettings}
      />

      <button
        className="button"
        onClick={handleSubmit}
        type="submit"
        disabled={!isValid}
      >
        Зберегти
      </button>
    </form>
  );
};

const ErrorMessage = ({ errors, name }) => {
  if (!errors?.[name]?.message) return null;

  return <div className="error-message">{errors[name].message}</div>;
};

const Input = ({ errors, name, register, settings }) => {
  const isError = !!errors?.[name];

  return (
    <div className="input-container">
      <label htmlFor={name}>{name}:</label>
      <ErrorMessage errors={errors} name={name} />
      <input
        id={name}
        type="text"
        className={`input ${isError && "error"}`}
        {...register(name, settings)}
      />
    </div>
  );
};

export default EditPostPage;
