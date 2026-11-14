"use client";

import { ArrowUpRight, Camera, Phone } from "lucide-react";
import { initials, invitation, invitationDateParts } from "@/config/invitation";
import { CardImage } from "@/components/ui/card-image";

export function InvitationSection() {
  return (
    <section
      id="invitation-content"
      className="invitation-page"
      aria-labelledby="invitation-title"
      aria-label="Trang 2: Nội dung thiệp mời"
      tabIndex={-1}
    >
      <div className="invitation-heading">
        <div className="invitation-intro">
          <p className="invitation-eyebrow">LỄ TỐT NGHIỆP</p>
          <h2 id="invitation-title">Thân mời bạn</h2>
        </div>
        <figure className="portrait-column">
          <div className="portrait-slot">
            <CardImage
              src={invitation.portraitImagePath}
              alt={invitation.portraitImageAlt}
              sizes="64px"
              fallback={initials}
            />
          </div>
        </figure>
      </div>
      <p className="invitation-message">{invitation.invitationMessage}</p>

      <div className="event-datetime">
        <time className="event-date" dateTime={invitation.date}>
          <span className="event-weekday">Ngày làm lễ</span>
          <span className="event-date-main">
            <span className="event-day">{invitationDateParts.day}</span>
            <span className="event-month">
              {invitationDateParts.month}
              <span className="event-year">{invitationDateParts.year}</span>
            </span>
          </span>
        </time>
        <div className="event-time">
          <span className="event-time-label">
            <Camera size={14} strokeWidth={1.5} aria-hidden="true" />
            {invitation.timeLabel}
          </span>
          <time dateTime={`${invitation.date}T${invitation.time}:00+07:00`}>
            {invitation.time}
          </time>
        </div>
      </div>

      <div className="event-venue">
        <span className="venue-label">ĐỊA ĐIỂM TỔ CHỨC</span>
        <p>{invitation.university}</p>
        {invitation.location && (
          <p className="venue-detail">{invitation.location}</p>
        )}
        {invitation.address && (
          <p className="venue-detail">{invitation.address}</p>
        )}
        <a
          className="map-link"
          href={invitation.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Xem đường đi trên Google Maps trong tab mới"
        >
          Xem bản đồ{" "}
          <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
      <div className="invitation-contact">
        <span className="contact-label">Liên hệ</span>
        <a
          className="contact-link"
          href={`tel:${invitation.contactPhone}`}
          aria-label={`Gọi ${invitation.fullName} theo số ${invitation.contactPhone}`}
        >
          <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
          {invitation.contactPhone}
        </a>
      </div>
      <div className="invitation-thanks">
        <p className="thanks-heading">Cảm ơn bạn.</p>
        <p className="thanks-message">{invitation.thankYouMessage}</p>
      </div>
    </section>
  );
}
