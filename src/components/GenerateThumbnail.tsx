import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { GenerateThumbnailProps } from "@/types";
import { Loader } from "lucide-react";
import { Input } from "./ui/input";
import Image from "next/image";
import { useToast } from "./ui/use-toast";

import axios from "axios";
const GenerateThumbnail = ({
  setImage,
  image,
  imagePrompt,
  setImagePrompt,
}: GenerateThumbnailProps) => {
  const [isAiThumbnail] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  //const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  let timer: any;


  async function poll(id: string) {
    const resulut = await axios.get("/api/images/get", {
      params: { task_id: id },
    });
    if (resulut.data.output.task_status === "SUCCEEDED") {
      if (timer) clearTimeout(timer);
      if (resulut.data.output.results.length > 0) {
        setImage(resulut.data.output.results[0].url);
      }
      setIsImageLoading(false);
      return;
    }
  }

  const setImages = () => {
    setIsImageLoading(false);
    setImage("");
  };

  const generateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsImageLoading(true);
    const data = {
      model: "wanx-v1",
      input: {
        prompt: imagePrompt
      },
      parameters: {
        style: "<auto>",
        size: "1024*1024",
        n: 1,
      },
    };

    axios
      .post("/api/images/generate", data)
      .then((data: any) => {
        const datas = data.data;
        if (datas && datas.output.task_id) {
          timer = window.setInterval(function () {
            poll(datas.output.task_id)
          }, 3000);
        }
      })
      .catch((err: any) => {
        setImages();
        toast({ title: "Error generating thumbnail", variant: "destructive" });
        console.log(err);
      });

    // try {
    //   const response = await handleGenerateThumbnail({ prompt: imagePrompt });
    //   const blob = new Blob([response as any], { type: 'image/png' });
    //   handleImage(blob, `thumbnail-${uuidv4()}`);
    // } catch (error) {
    //   console.log(error)
    //   toast({ title: 'Error generating thumbnail', variant: 'destructive' })
    // }
  };

  return (
    <>
      {/* <div className="generate_thumbnail">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAiThumbnail(true)}
          className={cn("", {
            "bg-black-6": isAiThumbnail,
          })}
        >
          Use AI to generate thumbnail
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsAiThumbnail(false)}
          className={cn("", {
            "bg-black-6": !isAiThumbnail,
          })}
        >
          Upload custom image
        </Button>
      </div> */}
      {isAiThumbnail ? (
        <div className="flex flex-col gap-5">
          <div className=" flex flex-col gap-2.5">
            <Label className="text-16 font-bold  ">
              AI Prompt to generate Thumbnail
            </Label>
            <Textarea
              className="input-class font-light focus-visible:ring-offset-orange-1"
              placeholder="Provide text to generate thumbnail"
              rows={5}
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
            />
          </div>
          <div className="w-full max-w-[200px]">
            <Button
              type="submit"
              onClick={generateImage}
            >
              {isImageLoading ? (
                <>
                  Generating
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="image_div" onClick={() => imageRef?.current?.click()}>
          <Input
            type="file"
            className="hidden"
            ref={imageRef}
          />
          {!isImageLoading ? (
            <Image
              src="/icons/upload-image.svg"
              width={40}
              height={40}
              alt="upload"
            />
          ) : (
            <div className="text-16 flex-center font-medium  ">
              Uploading
              <Loader size={20} className="animate-spin ml-2" />
            </div>
          )}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-12 font-bold text-orange-1">Click to upload</h2>
            <p className="text-12 font-normal text-gray-1">
              SVG, PNG, JPG, or GIF (max. 1080x1080px)
            </p>
          </div>
        </div>
      )}
      {image && (
        <div className="flex-center w-full">
          <Image
            src={image}
            width={200}
            height={200}
            className="mt-5"
            alt="thumbnail"
          />
        </div>
      )}
    </>
  );
};

export default GenerateThumbnail;
