"use client";

import { invitation, invitationDateParts } from "@/config/invitation";
import { CardImage } from "@/components/ui/card-image";

export function CoverSection() {
  return (
    <section className="cover-page" aria-labelledby="cover-title" aria-label="Trang 1: Bìa thiệp">
      <div className="cover-copy">
        <div className="cover-header">
          <p className="cover-label">THIỆP MỜI TỐT NGHIỆP</p>
          <div className="cover-uit"><CardImage src={invitation.universityLogoPath} alt="UIT — University of Information Technology" sizes="90px" eager /></div>
        </div>
        <div className="cover-main">
          <div className="cover-banner"><CardImage src={invitation.bannerImagePath} alt="You're invited to my Graduation Ceremony!" sizes="(max-width: 399px) 90vw, 360px" eager /></div>
          <div className="cover-person">
            <h1 id="cover-title">{invitation.fullName}</h1>
            <p className="cover-small-label">Thân mời bạn đến chung vui.</p>
          </div>
        </div>
        <div className="cover-details">
          <p className="cover-date-label">Ngày làm lễ</p>
          <time className="cover-date" dateTime={invitation.date}>{invitationDateParts.compact}</time>
          <p className="cover-university">{invitation.university}</p>
        </div>
      </div>
    </section>
  );
}

