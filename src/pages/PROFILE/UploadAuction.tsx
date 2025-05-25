/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { cam } from "../../assets";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { FaTimes } from "react-icons/fa";
import { useCreateAuctionMutation } from "../../api/auction.api";
import { enqueueSnackbar } from "notistack";

export interface IAuction {
  productName: string;
  description: string;
  startDate: string;
  endDate: string;
  mainImage: any;
  images: any[];
  startingPrice: number;
}

export default function UploadAuction() {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    control,
    // formState: { isValid },
    // reset,
  } = useForm<IAuction>({
    defaultValues: {
      description: "",
      endDate: "",
      mainImage: "",
      images: [],
      startDate: "",
      startingPrice: 0,
    },
  });

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Sync with form values
  useEffect(() => {
    if (startDate) setValue("startDate", startDate.toISOString());
  }, [startDate]);

  useEffect(() => {
    if (endDate) setValue("endDate", endDate.toISOString());
  }, [endDate]);

  const mainPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [mainPhotoPreview, setMainPhotoPreview] = useState<string | null>(null);

  const handleMainPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("mainImage", file); // store the image in react-hook-form
    }
  };

  const otherPhotoInputRef = useRef<HTMLInputElement | null>(null);
  const [otherPhotos, setOtherPhotos] = useState<File[]>([]);

  console.log("otherPhotos", otherPhotos);

  const handleOtherPhotoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setOtherPhotos((prev) => [...prev, ...fileArray]);
      setValue("images", [...watch("images"), ...fileArray]); // append to form images
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setOtherPhotos((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const formVal = watch();

  console.log("formVal", formVal);

  const [uploadAuction, { isLoading, isSuccess }] = useCreateAuctionMutation();
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleCreateAuction = async (values: IAuction) => {
    try {
      // Upload main image
      setUploadingImage(true);
      const mainFormData = new FormData();
      mainFormData.append("file", formVal.mainImage);
      mainFormData.append("cloud_name", "osuji");
      mainFormData.append("upload_preset", "JHC-hospital");

      const mainImageUpload = fetch(
        "https://api.cloudinary.com/v1_1/osuji/image/upload",
        { method: "POST", body: mainFormData }
      );

      // Upload other images in parallel
      const otherUploadPromises = formVal.images.map((img) => {
        const fd = new FormData();
        fd.append("file", img);
        fd.append("cloud_name", "osuji");
        fd.append("upload_preset", "JHC-hospital");

        return fetch("https://api.cloudinary.com/v1_1/osuji/image/upload", {
          method: "POST",
          body: fd,
        }).then((res) => res.json());
      });

      // Wait for all uploads to finish
      const [mainResponse, ...otherResponses] = await Promise.all([
        mainImageUpload.then((res) => res.json()),
        ...otherUploadPromises,
      ]);

      const mainImage = mainResponse.url?.toString() || null;
      const images_ = otherResponses
        .filter((res) => res.url)
        .map((res) => res.url.toString());

      setUploadingImage(false);

      // Proceed to call the API
      await uploadAuction({
        ...values,
        startingPrice: Number(formVal.startingPrice),
        mainImage,
        images: images_,
      }).unwrap();

      enqueueSnackbar("Auction created successfully!", { variant: "success" });
    } catch (err: any) {
      if (Array.isArray(err?.data?.message)) {
        err.data.message.forEach((msg: string) =>
          enqueueSnackbar(msg, { variant: "error" })
        );
      } else {
        enqueueSnackbar(err?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div className="pb-24">
      <h1 className="font-bold text-3xl">
        {formVal.productName || "Upload your work"}
      </h1>
      <p className="w-[60%] mt-4">
        {formVal.description ||
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat nisi
        turpis leo sed in commodo purus velit. Massa ut dictumst praesent lacus,
        libero. Non placerat dictumst lacinia nisl at suscipit id porttitor
        purus. Magna diam purus egestas vel.`}
      </p>

      <div className="mt-24 w-full">
        <div>
          <p className="text-lg font-bold">Main Photo</p>
          <div
            className="w-[224px] relative h-[224px] border border-gray-300 cursor-pointer mt-8 bg-[#D9D9D9] flex flex-col justify-center items-center gap-3"
            onClick={() => mainPhotoInputRef.current?.click()}
          >
            <div className="relative z-10">
              <img src={cam} alt="" />
            </div>
            <p className="text-sm text-[#9D9D9D]">Click to upload</p>
            <div className="w-full  h-full absolute">
              <img
                src={mainPhotoPreview as string}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            ref={mainPhotoInputRef}
            onChange={handleMainPhotoUpload}
          />
        </div>

        <div className="w-full mt-12">
          <p className="text-lg font-bold">Other Photo</p>
          <div className="w-full flex justify-between items-center">
            <div
              className="w-[147px] relative h-[147px] border border-gray-300 mt-8 bg-[#D9D9D9] flex flex-col justify-center items-center gap-3 cursor-pointer"
              onClick={() => otherPhotoInputRef.current?.click()}
            >
              <div className="w-[30%] relative z-10 h-[30%]">
                <img
                  src={cam}
                  className="w-full h-full object-contain"
                  alt=""
                />
              </div>
              <p className="text-xs text-[#9D9D9D]">Click to upload</p>
            </div>
            <div className="w-[80%] mt-8 h-full hide-scrollbar overflow-x-scroll flex justify-start items-center gap-5 mt-4">
              {otherPhotos.map((img, index) => (
                <div
                  key={index}
                  className="min-w-[147px] relative h-[147px] border border-gray-300"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="w-6 h-6 rounded-full cursor-pointer primary-bg absolute hover:scale-105 transition-all top-2 flex justify-center items-center right-0"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <FaTimes className="" color="white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            ref={otherPhotoInputRef}
            onChange={handleOtherPhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="mt-16">
        <form action="" onSubmit={handleSubmit(handleCreateAuction)}>
          <div>
            <Input
              name={"productName"}
              label="Product Name"
              control={control}
            />
          </div>

          <div className="flex mt-8 justify-start gap-8 items-center">
            <div className="">
              <label className="font-semibold mb-1 block">
                Start Date & Time
              </label>
              <DateTimePicker
                onChange={setStartDate}
                value={startDate}
                className="w-[40%] h-12"
              />
            </div>
            <div className="">
              <label className="font-semibold mb-1 block">
                End Date & Time
              </label>
              <DateTimePicker
                onChange={setEndDate}
                value={endDate}
                className="w-[40%] h-12"
              />
            </div>
          </div>

          <div className="w-[30%] mt-6">
            <Input
              label="Starting Price"
              control={control}
              name={"startingPrice"}
              type="number"
            />
          </div>

          <div className=" mt-4">
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={6}
              className="w-full mt-2 p-4 border-2 focus:outline-none"
            ></textarea>
          </div>

          <div className="w-full mt-4 flex justify-end items-center">
            {" "}
            <button
              className="py-3 px-6 border-2 hover:bg-[#004663] hover:text-white transition-all cursor-pointer font-bold"
              type="submit"
            >
              {uploadingImage
                ? "Uploading Assets..."
                : isLoading
                ? "Creating Auction..."
                : "Create Auction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
