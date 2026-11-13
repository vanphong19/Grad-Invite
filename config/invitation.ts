/**
 * Edit this file to personalise the invitation.
 * Name, ceremony date, university and map were supplied by the invitation owner.
 * The three invitation images were supplied by the owner in assets/.
 * Optional hall and address are intentionally empty.
 * Use YYYY-MM-DD for ceremony date and 24-hour HH:mm for the photo session.
 */
export const invitation = {
  fullName: "Văn Phong",
  graduationYear: 2026,
  university: "Trường Đại học Công nghệ Thông tin",
  date: "2026-11-25",
  time: "15:30",
  timeLabel: "Chụp hình",
  contactPhone: "0984993503",
  location: "",
  address: "",
  googleMapsUrl: "https://maps.app.goo.gl/1yrgixfnLPWQzASEA",
  invitationMessage:
    "Mời bạn đến chung vui và cùng mình lưu giữ khoảnh khắc đáng nhớ trong ngày tốt nghiệp.",
  thankYouMessage:
    "Cảm ơn vì đã luôn đồng hành. Hẹn gặp bạn tại buổi lễ!",
  portraitImagePath: "/images/graduation-still-life.png",
  portraitImageAlt: "Ảnh minh họa mũ và sách tốt nghiệp tại vị trí dành cho ảnh chân dung",
  bannerImagePath: "/images/graduation-banner.png",
  stillLifeImagePath: "/images/graduation-still-life.png",
  universityLogoPath: "/images/uit-logo.png",
} as const;

export const initials = invitation.fullName
  .split(/\s+/)
  .filter(Boolean)
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export const invitationDate = new Date(`${invitation.date}T00:00:00.000Z`);

export const invitationDateParts = {
  day: new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    timeZone: "UTC",
  }).format(invitationDate),
  month: new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    timeZone: "UTC",
  }).format(invitationDate),
  year: new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    timeZone: "UTC",
  }).format(invitationDate),
  weekday: new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    timeZone: "UTC",
  }).format(invitationDate),
  compact: new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(invitationDate)
    .replaceAll("/", "."),
};
