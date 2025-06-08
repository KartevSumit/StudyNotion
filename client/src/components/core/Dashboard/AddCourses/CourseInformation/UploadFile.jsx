import React, { useEffect, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';

const UploadFile = ({
  register,
  setValue,
  getValues,
  errors,
  name,
  required = true,
  file,
  disabled = false,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file && !selectedFile) {
      if (typeof file === 'string') {
        setPreviewUrl(file);
      } else if (file instanceof File) {
        setSelectedFile(file);
        setValue(name, file, { shouldValidate: true });
      }
    }
  }, [file, name, setValue, selectedFile]);

  useEffect(() => {
    register(name, {
      required: required && !disabled ? 'Please upload a file.' : false,
      validate: async (file) => {
        if (!file || disabled) return true;

        if (
          !file.type.startsWith('image/') &&
          !file.type.startsWith('video/')
        ) {
          return 'Only image and video files are allowed.';
        }

        const maxBytes = 6 * 1024 * 1024; // 6 MB
        if (file.type.startsWith('image/')) {
          if (file.size > maxBytes) {
            return 'Max file size is 6 MB.';
          }
          const objectUrl = URL.createObjectURL(file);
          const img = new Image();
          return new Promise((resolve) => {
            img.onload = () => {
              URL.revokeObjectURL(objectUrl);
              const ratio = img.width / img.height;
              const target = 16 / 9;
              const tolerance = 0.01;
              if (Math.abs(ratio - target) < tolerance) {
                resolve(true);
              } else {
                resolve('Image must be 16 : 9 aspect ratio.');
              }
            };
            img.onerror = () => {
              URL.revokeObjectURL(objectUrl);
              resolve('Cannot validate image dimensions.');
            };
            img.src = objectUrl;
          });
        } else if (file.type.startsWith('video/')) {
          if (file.size > 2 * maxBytes) {
            return 'Max file size is 12 MB.';
          }
        }
        return true;
      },
    });
  }, [register, name, required, disabled]);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (disabled) return;

      if (rejectedFiles.length > 0) {
        return;
      }

      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedFile(file);
      setValue(name, file, { shouldValidate: true });
    },
    [name, setValue, previewUrl, disabled]
  );

  useEffect(() => {
    if (!selectedFile) {
      if (!file && previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    if (errors[name]) {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, errors, name, file]);

  const handleCancelFile = () => {
    if (disabled) return;

    setValue(name, null, { shouldValidate: true });
    setSelectedFile(null);

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file && typeof file === 'string') {
      setPreviewUrl(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const isVideoUrl = (url) => {
    if (selectedFile) {
      return selectedFile.type.startsWith('video/');
    }
    if (typeof url === 'string') {
      const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv'];
      const lowerUrl = url.toLowerCase();
      return (
        videoExtensions.some((ext) => lowerUrl.includes(ext)) ||
        lowerUrl.includes('/video/') ||
        lowerUrl.includes('_video') ||
        lowerUrl.includes('video')
      );
    }
    return false;
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      disabled,
      accept: {
        'image/*': [],
        'video/*': [],
      },
    });

  return (
    <div className="w-full min-h-[10vh] lg:min-h-[30vh] ">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center h-full
          bg-richblack-700
          ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
          ${
            isDragReject
              ? 'border-pink-600 bg-pink-400'
              : 'border-richblack-500'
          }
        `}
      >
        {previewUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6">
            {isVideoUrl(previewUrl) ? (
              <video
                src={previewUrl}
                controls
                className="h-32 lg:h-60 rounded-md"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-32 object-cover rounded-md"
              />
            )}
            {!disabled && (
              <button
                type="button"
                onClick={handleCancelFile}
                className="border-2 px-3 py-1 border-richblack-600 text-richblack-200 text-lg font-semibold hover:bg-richblack-600 transition-colors"
              >
                {file && typeof file === 'string' && !selectedFile
                  ? 'Remove'
                  : 'Cancel'}
              </button>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-6 font-semibold">
            <input {...getInputProps()} disabled={disabled} />
            <div className="flex items-center justify-center w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-richblack-900">
              <FiUploadCloud className="text-lg lg:text-3xl text-yellow-50" />
            </div>
            {disabled ? (
              <p className="text-richblack-400 text-sm sm:text-lg">
                File upload disabled
              </p>
            ) : isDragActive ? (
              <p className="text-richblack-200 text-sm sm:text-lg">
                Drop the file here …
              </p>
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-6">
                <div className="w-full">
                  <p className="text-richblack-200 text-sm sm:text-lg">
                    Drag and drop an image or video, or{' '}
                    <span className="text-yellow-50">Browse</span>
                  </p>
                  <p className="text-richblack-200 text-sm sm:text-lg">
                    Max 6 MB each (12 MB for videos)
                  </p>
                </div>
                <ul className="flex list-disc list-inside flex-col sm:flex-row sm:w-[80%] items-center justify-between text-richblack-300 text-sm sm:text-lg">
                  <li>Aspect ratio 16:9</li>
                  <li>Recommended size 1920 x 1080</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {errors[name] && !disabled && (
        <span className="text-pink-200 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default UploadFile;
