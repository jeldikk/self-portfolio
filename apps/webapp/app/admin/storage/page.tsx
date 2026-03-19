import AdminImageFileUploader from "@/components/file-uploaders/image-file-uploader.component";

export default function AdminStoragePage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold p-4">Upload files to your storage</h1>
      <AdminImageFileUploader
        path="public/images/"
        accessLevel="guest"
        maxFileCount={100}
        bucket="self-public-bucket"
      />
    </div>
  );
}
