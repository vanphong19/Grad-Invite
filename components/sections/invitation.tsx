"use client";

import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { initials, invitation, invitationDateParts } from "@/config/invitation";
import { CardImage } from "@/components/ui/card-image";

export function InvitationSection({ onClose, busy = false }: { onClose?: () => void; busy?: boolean }) {
  return (
    <section id="invitation-content" className="invitation-page" aria-labelledby="invitation-title" aria-label="Trang 2: Nội dung thiệp mời" tabIndex={-1}>
      <figure className="portrait-column">
        <div className="portrait-slot">
          <CardImage
            src={invitation.portraitImagePath}
            alt={invitation.portraitImageAlt}
            sizes="(max-width: 359px) 104px, (max-width: 640px) 120px, 330px"
            fallback={initials}
            eager
          />
        </div>
        <figcaption className="portrait-caption"><span>{invitation.fullName}</span><span>CLASS OF {invitation.graduationYear}</span></figcaption>
      </figure>
      <div className="invitation-copy">
        <p className="invitation-eyebrow">TRÂN TRỌNG KÍNH MỜI</p>
        <h2 id="invitation-title">{invitation.fullName}</h2>
        <p className="invitation-message">{invitation.invitationMessage}</p>

        <div className="event-datetime">
          <time className="event-date" dateTime={invitation.date}>
            <span className="event-weekday">Ngày làm lễ</span>
            <span className="event-date-main"><span className="event-day">{invitationDateParts.day}</span><span className="event-month">{invitationDateParts.month}<span className="event-year">{invitationDateParts.year}</span></span></span>
          </time>
          <div className="event-time">
            <span className="event-time-label">{invitation.timeLabel}</span>
            <time dateTime={`${invitation.date}T${invitation.time}:00+07:00`}>{invitation.time}</time>
          </div>
        </div>

        <div className="event-venue"><span className="venue-label">ĐỊA ĐIỂM TỔ CHỨC</span><p>{invitation.university}</p>{invitation.location && <p className="venue-detail">{invitation.location}</p>}{invitation.address && <p className="venue-detail">{invitation.address}</p>}<p className="event-contact"><span>Liên hệ</span><a href={`tel:${invitation.contactPhone}`} aria-label={`Gọi ${invitation.fullName} theo số ${invitation.contactPhone}`}>{invitation.contactPhone}</a></p></div>
        <p className="invitation-thanks">{invitation.thankYouMessage}</p>
        <div className="invitation-actions">
          <a className="map-link" href={invitation.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Xem đường đi trên Google Maps trong tab mới">Xem bản đồ <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" /></a>
          <button type="button" className="return-to-cover" onClick={onClose} aria-label="Về bìa thiệp" aria-disabled={busy || undefined}><ArrowLeft size={14} strokeWidth={1.4} aria-hidden="true" />Về bìa thiệp</button>
        </div>
      </div>
    </section>
  );
}

