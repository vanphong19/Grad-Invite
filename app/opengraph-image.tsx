import { ImageResponse } from "next/og";
import { invitation, invitationDateParts } from "@/config/invitation";

export const alt = `${invitation.fullName} — Graduation ${invitation.graduationYear}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#041B38",
          color: "#F5F0E7",
          padding: "55px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: "4px",
          }}
        >
          <span>THIỆP MỜI TỐT NGHIỆP</span>
          <span>CLASS OF {invitation.graduationYear}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: "-6px",
              lineHeight: 1.1,
            }}
          >
            GRADUATION
          </span>
          <span style={{ fontSize: 70, fontWeight: 400, color: "#C4A46B" }}>
            {invitation.fullName}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #75694F",
            paddingTop: 24,
            fontSize: 18,
            letterSpacing: "2px",
          }}
        >
          <span>{invitationDateParts.compact} · {invitation.timeLabel} {invitation.time}</span>
          <span>HẸN GẶP BẠN!</span>
        </div>
      </div>
    ),
    size,
  );
}
