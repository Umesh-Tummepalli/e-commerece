import React,{useState} from "react";
import { ImageUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const AddItems = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  async function handleFormSubmit(data) {
    // Convert sizes to array if not already
    if (data.sizes && !Array.isArray(data.sizes)) {
      data.sizes = [data.sizes];
    }
    setSubmitLoading(true);
    console.log(data);
    data.bestSeller = false;
    const formData = new FormData();

    // Append all text fields
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("bestSeller", false); // or "false"

    // ✅ Sizes array needs to be stringified
    formData.append("sizes", JSON.stringify(data.sizes));

    // ✅ Append image files properly
    formData.append("image1", data.image1[0]);
    formData.append("image2", data.image2[0]);
    formData.append("image3", data.image3[0]);
    formData.append("image4", data.image4[0]);

    formData.set("sizes", JSON.stringify(data.sizes));
    try {
      const res = await axios.post(
        "http://localhost:4000/product/add",
        formData,
        {
          headers: {
            token: localStorage.getItem("adminToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success("Product Added Successfully");
        reset();
      }
      console.log(res);
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem("adminToken");
        toast.error("Unauthorized");
        return navigate("/admin/login");
      }
      toast.error(err.response.data.message);
      console.log(err);
    }
    finally{
      setSubmitLoading(false);
    }
  }

  return (
    <div className="p-4">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <p className="text-xl font-bold my-5">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {/* Image 1 */}
          <label htmlFor="image1" className="overflow-hidden">
            <div className="border-1 border-dashed w-[150px] h-[150px] flex justify-center items-center rounded-xl overflow-hidden">
              {watch("image1")?.[0] ? (
                <img
                  src={URL.createObjectURL(watch("image1")[0])}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageUp />
              )}
            </div>
            <input
              type="file"
              id="image1"
              name="image1"
              className="hidden"
              accept="image/*"
              {...register("image1", { required: true })}
            />
            {errors.image1 && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
          {/* Image 2 */}
          <label htmlFor="image2" className="overflow-hidden">
            <div className="border-1 border-dashed w-[150px] h-[150px] flex justify-center items-center rounded-xl overflow-hidden">
              {watch("image2")?.[0] ? (
                <img
                  src={URL.createObjectURL(watch("image2")[0])}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageUp />
              )}
            </div>

            <input
              type="file"
              id="image2"
              name="image2"
              className="hidden"
              accept="image/*"
              {...register("image2", { required: true })}
            />

            {errors.image2 && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
          {/* Image 3 */}
          <label htmlFor="image3" className="overflow-hidden">
            <div className="border-1 border-dashed w-[150px] h-[150px] flex justify-center items-center rounded-xl overflow-hidden">
              {watch("image3")?.[0] ? (
                <img
                  src={URL.createObjectURL(watch("image3")[0])}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageUp />
              )}
            </div>
            <input
              type="file"
              id="image3"
              name="image3"
              className="hidden"
              accept="image/*"
              {...register("image3", { required: true })}
            />
            {errors.image3 && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
          {/* Image 4 */}
          <label htmlFor="image4" className="overflow-hidden">
            <div className="border-1 border-dashed w-[150px] h-[150px] flex justify-center items-center rounded-xl overflow-hidden">
              {watch("image4")?.[0] ? (
                <img
                  src={URL.createObjectURL(watch("image4")[0])}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageUp />
              )}
            </div>
            <input
              type="file"
              id="image4"
              name="image4"
              className="hidden"
              accept="image/*"
              {...register("image4", { required: true })}
            />
            {errors.image4 && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Product Name */}
          <label htmlFor="name" className="md:w-1/2 flex flex-col">
            <span className="text-xl">Product Name</span>
            <input
              type="text"
              id="name"
              placeholder="Item Name"
              className="p-3 rounded-md px-4 border-1 border-black/40 w-full"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
          {/* Price */}
          <label htmlFor="price" className="md:w-1/2 flex flex-col">
            <span className="text-xl">Price</span>
            <input
              type="number"
              id="price"
              placeholder="Price"
              className="p-3 rounded-md px-4 border-1 border-black/40 w-full"
              min="0"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Dropdown */}
          <label htmlFor="category" className="md:w-1/2 flex flex-col">
            <span className="text-xl">Category</span>
            <select
              id="category"
              className="p-3 rounded-md px-4 border-1 border-black/40 w-full"
              defaultValue=""
              {...register("category", { required: true })}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
            {errors.category && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
          {/* Sub Category Dropdown */}
          <label htmlFor="subCategory" className="md:w-1/2 flex flex-col">
            <span className="text-xl">Sub Category</span>
            <select
              id="subCategory"
              className="p-3 rounded-md px-4 border-1 border-black/40 w-full"
              defaultValue=""
              {...register("subCategory", { required: true })}
            >
              <option value="" disabled>
                Select Sub Category
              </option>
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottom Wear</option>
              <option value="winterwear">Winter Wear</option>
            </select>
            {errors.subCategory && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </label>
        </div>

        {/* Sizes Multi-select */}
        <div className="flex flex-col gap-2">
          <span className="text-xl">Available Sizes</span>
          <div className="flex flex-wrap gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={size}
                  {...register("sizes", { required: true })}
                  className="accent-black"
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
          {errors.sizes && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </div>

        {/* Product Description */}
        <label htmlFor="description" className="flex flex-col">
          <span className="text-xl">Product Description</span>
          <textarea
            name="description"
            id="description"
            placeholder="Item Description"
            className="p-3 rounded-md px-4 border-1 border-black/40 w-full"
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
        </label>
        <button
          type="submit"
          className={`border-1 duration-500 w-fit px-10 py-2 rounded-sm m-auto bg-black text-white hover:invert ${submitLoading&&'pointer-events-none cursor-not-allowed opacity-50'}`}
        >
          {
            submitLoading?'Uploading Data......':'Submit'
          }
        </button>
      </form>
    </div>
  );
};

export default AddItems;
