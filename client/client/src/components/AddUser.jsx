import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";

const AddUser = ({ open, setOpen, userData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Add your submit logic here, e.g., API request to add or update user
      console.log(data);
      // Assuming success, set loading to false and close modal
      setIsLoading(false);
      setOpen(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Dialog.Title
              as="h2"
              className="text-base font-bold leading-6 text-gray-900 mb-4"
            >
              {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
            </Dialog.Title>

            <div className="mt-2 flex flex-col gap-6">
              <Textbox
                placeholder="Full name"
                type="text"
                name="name"
                label="Full Name"
                className="w-full rounded"
                register={register("name", {
                  required: "Full name is required!",
                })}
                error={errors.name ? errors.name.message : ""}
              />

              <Textbox
                placeholder="Title"
                type="text"
                name="title"
                label="Title"
                className="w-full rounded"
                register={register("title", {
                  required: "Title is required!",
                })}
                error={errors.title ? errors.title.message : ""}
              />

              <Textbox
                placeholder="Email Address"
                type="email"
                name="email"
                label="Email Address"
                className="w-full rounded"
                register={register("email", {
                  required: "Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
              />

              <Textbox
                placeholder="Password"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded"
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
              />

              <Textbox
                placeholder="Role"
                type="text"
                name="role"
                label="Role"
                className="w-full rounded"
                register={register("role", {
                  required: "User role is required!",
                })}
                error={errors.role ? errors.role.message : ""}
              />
            </div>

            {isLoading || isUpdating ? (
              <div className="py-5">
                <Loading />
              </div>
            ) : (
              <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold cursor-pointer text-white hover:bg-blue-700 sm:w-auto"
                  label="Submit"
                />
                <Button
                  type="button"
                  className="bg-white px-5 text-sm font-semibold text-gray-900 cursor-pointer sm:w-auto"
                  onClick={() => setOpen(false)}
                  label="Cancel"
                />
              </div>
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddUser;
