import "./AddUserPage.css";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import AvatarCircle from "../../components/AvatarCircle/AvatarCircle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setMyId, addUser } from "../../redux/slices/usersSlice";
import uniqid from "uniqid";

const AddUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { users } = useSelector((data) => data.usersReducer);
  console.log(users);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({
    mode: "all",
  });

  const createUser = (value) => {
    return {
      id: uniqid(),
      subscribers: [],
      subscribed: [],
      ...value,
    };
  };

  const submit = (value) => {
    const newUser = createUser(value);
    console.log(newUser);
    const myId = newUser.id;

    dispatch(addUser({ newUser }));
    dispatch(setMyId({ myId }));

    navigate(`/${myId}`);
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

export default AddUserPage;
