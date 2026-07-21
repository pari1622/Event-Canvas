type Props = {
  progress: number;
};

const UploadProgress = ({ progress }: Props) => {
  if (progress === 0) return null;

  return (
    <div className="space-y-2">
      <div className="w-full h-3 rounded-full bg-[#181412] overflow-hidden">
        <div
          className="h-full bg-[#B89D82]"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="text-sm">Uploading... {progress}%</p>
    </div>
  );
};

export default UploadProgress;
