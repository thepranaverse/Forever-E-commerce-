import React from "react";

const NewsSletterBox = () => {

    const onSubmitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
        obcaecati provident nihil esse odit porro, asperiores adipisci modi
        blanditiis totam suscipit, ut deleniti numquam tenetur voluptatum
        officiis voluptates nostrum cum.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border rounded overflow-hidden"
      >
        <input
          className="flex-1 outline-none px-4 py-3 text-gray-700 placeholder-gray-400"
          type="email"
          placeholder="Enter your Email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-3"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsSletterBox;
