import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/constants";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#111827",
          color: "white",
          padding: "80px"
        }}
      >
        <div style={{ color: "#B9894B", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
          SEO · Marketing · Web Development
        </div>
        <div style={{ marginTop: 28, maxWidth: 900, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          Helping Brands Grow Through Digital Marketing & Web Development
        </div>
        <div style={{ marginTop: 36, fontSize: 30, color: "#D1D5DB" }}>{siteConfig.name}</div>
      </div>
    ),
    size
  );
}
