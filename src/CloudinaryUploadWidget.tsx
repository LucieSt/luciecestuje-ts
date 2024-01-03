import { Component } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

let cloudinary = window.cloudinary;

interface ErrorTypeStructure {
  message: string;
}

interface ResultTypeStructure {
  event: string;
  info: ImageInfoType;
}

interface ImageInfoType {
  secure_url: string;
}

interface CloudinaryUploadWidgetStructure {
  onImageUpload: (imageInfo: ImageInfoType) => void;
}

class CloudinaryUploadWidget extends Component<CloudinaryUploadWidgetStructure> {

  componentDidMount() {

    var myWidget = cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      },
      (error: ErrorTypeStructure | null, result: ResultTypeStructure) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          const imageInfo = result.info;
          this.props.onImageUpload(imageInfo);
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
  }

  render() {
    return (
      <button type="button" id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
