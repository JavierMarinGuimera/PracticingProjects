import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "TOXICS - Javier Marín";
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #07111f 0%, #14152d 55%, #2d1760 100%)",
          color: "white",
          padding: 72
        }}
      >
        <div style={{ fontSize: 28, color: "#5eead4" }}>
          {siteConfig.professionalName} | {siteConfig.role}
        </div>
        <div>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: 0 }}>
            TOXICS
          </div>
          <div style={{ marginTop: 24, maxWidth: 920, fontSize: 44, lineHeight: 1.14 }}>
            Soluciones digitales y tecnológicas para negocios y particulares
          </div>
        </div>
      </div>
    ),
    size
  );
}
