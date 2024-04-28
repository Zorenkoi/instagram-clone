import { useState, useEffect } from "react";
import "./EditProfilePage.css";
import { useDispatch } from "react-redux";

import AvatarCircle from "../../components/AvatarCircle/AvatarCircle";
import { updateUser } from "../../redux/slices/usersSlice";
import useMyData from "../../hooks/useMyData";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useMyData();

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
    if (userData) {
      const { avatarUrl, nickname, firstName, lastName, description, url } =
        userData;

      setValue("avatarUrl", avatarUrl ? avatarUrl : "");
      setValue("nickname", nickname ? nickname : "");
      setValue("firstName", firstName ? firstName : "");
      setValue("lastName", lastName ? lastName : "");
      setValue("description", description ? description : "");
      setValue("url", url ? url : "");
    }
  }, [userData]);

  const submit = (value) => {
    const updatedUser = { ...userData, ...value };

    dispatch(updateUser({ userId: userData.id, updatedUser }));

    navigate(`/${userData.id}`);
  };

  const nameSettings = {
    required: "Поле не може бути пустим",
    minLength: {
      value: 3,
      message: "Мінімум 3 символи",
    },
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

  const avatarUrl = watch("avatarUrl");

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="edit-profile-inputs-container"
    >
      <AvatarCircle avatarUrl={avatarUrl} />

      <Input
        name={"avatarUrl"}
        errors={errors}
        register={register}
        settings={urlSettings}
      />
      <Input
        name={"nickname"}
        errors={errors}
        register={register}
        settings={nameSettings}
      />
      <Input
        name={"firstName"}
        errors={errors}
        register={register}
        settings={nameSettings}
      />
      <Input
        name={"lastName"}
        errors={errors}
        register={register}
        settings={nameSettings}
      />
      <Input
        name={"description"}
        errors={errors}
        register={register}
        settings={descriptionSettings}
      />
      <Input
        name={"url"}
        errors={errors}
        register={register}
        settings={urlSettings}
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

export default EditProfilePage;
