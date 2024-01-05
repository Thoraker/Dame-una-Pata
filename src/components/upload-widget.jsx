import { useEffect, useRef } from "react";

function UploadWidget() {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
      },
      function (error, result) {
        if (error) {
          console.log("Algo salió mal: ", error);
          return;
        }
        if (!error && result && result.event === "success") {
          console.log("Listo, esta es la info de la imagen: ", result.info);
        }
      }
    );
  }, []);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => widgetRef.current.open()}
      >
        Subir foto
      </button>
    </>
  );
}

export default UploadWidget;
