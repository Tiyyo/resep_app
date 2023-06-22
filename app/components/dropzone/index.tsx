import { useEffect, useRef, useState } from "react";

// write the compenent to previsualize the image

export default function Dropzone({name} : {name : string}) {
  const [draggingOver, setDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);

  const preventDefaults = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefaults(e);

    if (e.dataTransfer.files && e.dataTransfer.files[0] && fileInputRef.current) {
      if(e.dataTransfer.files[0].type !== 'image/jpeg' && e.dataTransfer.files[0].type !== 'image/png' && e.dataTransfer.files[0].type !== 'image/webp') {     
        return;
      }

      fileInputRef.current.files = e.dataTransfer.files;
      setFile(e.dataTransfer.files[0])

      e.dataTransfer.clearData();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.currentTarget.files && event.currentTarget.files[0]) {
      let fileInputValue = event.currentTarget.files[0];
      setFile(fileInputValue);
    }
  };


  const [fileDataURL, setFileDataURL] = useState<string | ArrayBuffer | null>(
    null
  );


  useEffect(() => {
    let isCancel = false;
    let fileReader: FileReader;

    if (file) {
      fileReader = new FileReader();

      fileReader.onload = (e) => {
        const { result: fileString } = e.target as FileReader;

        if (fileString && !isCancel) {
          setFileDataURL(fileString);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div
      ref={dropRef}
      className="flex items-center justify-center w-full"
      onDragEnter={() => setDraggingOver(true)}
      onDragLeave={() => setDraggingOver(false)}
      onDrag={preventDefaults}
      onDragStart={preventDefaults}
      onDragEnd={preventDefaults}
      onDragOver={preventDefaults}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input id="dropzone-file" name={name} type="file" hidden onChange={handleChange} ref={fileInputRef}/>
      {fileDataURL && typeof fileDataURL === "string" ? (
        <label htmlFor="dropzone-file" className="aspect-square max-w-xs cursor-grabbing rounded overflow-hidden">
          <img src={fileDataURL} alt="preview" className="object-cover h-full" />
        </label>
      ) : (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center max-w-md w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer aspect-square bg-main-300 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (optional)
            </p>
          </div>
        </label>
      )}
    </div>
  );
}
