export default function VideoPlayer({ src }) {
  return (
    <div className="flex flex-col items-center">
      <video
        src={src}
        controls
        muted
        playsInline
        preload="metadata"
        autoPlay
        className="rounded-2xl shadow-lg bg-black w-full h-[70vh] object-contain"
      />
    </div>
  );
}