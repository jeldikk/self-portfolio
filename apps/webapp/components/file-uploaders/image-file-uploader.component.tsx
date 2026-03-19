"use client";

import { FileUploader, FileUploaderProps } from "@aws-amplify/ui-react-storage";

interface Props extends Omit<FileUploaderProps, "path"> {
  path: NonNullable<FileUploaderProps["path"]>;
}

export default function AdminImageFileUploader(props: Props) {
  const { path, maxFileCount, bucket } = props;
  console.log({ path, maxFileCount, bucket });
  return (
    <FileUploader
      path={path}
      maxFileCount={maxFileCount}
      acceptedFileTypes={["image/*"]}
      bucket={bucket}
      onUploadError={(error, file) => {
        console.log({ error, file });
      }}
      autoUpload={false}
      showThumbnails={true}
    />
  );
}
