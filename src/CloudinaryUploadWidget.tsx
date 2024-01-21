import { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext({ loaded: false });

interface UwConfigType {
  cloudName: string;
  uploadPreset: string;
}

interface ImageInfoStructure {
  secure_url: string;
}

interface CloudinaryUploadWidgetProps {
  uwConfig: UwConfigType;
  setPublicId: Dispatch<SetStateAction<string>>;
  selectedGroupIndex: number;
  onImageUpload?: (imageInfo: ImageInfoStructure, selectedGroupIndex: number) => void;
}

interface UploadResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string; // Add this if Cloudinary provides it in the upload result
  };
}

function CloudinaryUploadWidget({ uwConfig, setPublicId, selectedGroupIndex, onImageUpload }: CloudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);
  const [widgetCreated, setWidgetCreated] = useState(false);

  useEffect(() => {
    // Check if the script is already loaded
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        // If not loaded, create and load the script
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        // If already loaded, update the state
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded && !widgetCreated) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: Error | null, result: UploadResult | null) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);
            if(onImageUpload) {
              onImageUpload(result.info, selectedGroupIndex);
            }
          }
        }
      );  
      document.getElementById("upload_widget")?.addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
      setWidgetCreated(true);
      myWidget.open();      
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        type="button"
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };