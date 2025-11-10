import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1f3a 0%, #1f62ff 100%)",
          color: "#fff",
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.05em",
          borderRadius: 12,
        }}
      >
        EM
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}


