"use client";

import { ArrowUpRight } from "lucide-react";
import { invitation, invitationDateParts } from "@/config/invitation";
import { CardImage } from "@/components/ui/card-image";

export function CoverSection({ onNext, busy = false }: { onNext: () => void; busy?: boolean }) {
  return (
    <section className="cover-page" aria-labelledby="cover-title" aria-label="Trang 1: Bìa thiệp">
      <div className="cover-copy">
        <div className="cover-header">
          <p className="cover-label">THIỆP MỜI TỐT NGHIỆP</p>
          <div className="cover-uit"><CardImage src={invitation.universityLogoPath} alt="UIT — University of Information Technology" sizes="90px" eager /></div>
        </div>
        <div className="cover-banner"><CardImage src={invitation.bannerImagePath} alt="You're invited to my Graduation Ceremony!" sizes="(max-width: 640px) 90vw, 440px" eager /></div>
        <div className="cover-person">
          <span className="cover-small-label">THÂN MỜI BẠN ĐẾN CHUNG VUI CÙNG</span>
          <h1 id="cover-title">{invitation.fullName}</h1>
          <div className="cover-event"><time dateTime={invitation.date}>{invitationDateParts.compact}</time><span aria-hidden="true">/</span><span className="cover-photo-time">{invitation.timeLabel} <time dateTime={invitation.time}>{invitation.time}</time></span></div>
        </div>
        <button type="button" className="open-invitation" onClick={onNext} aria-disabled={busy || undefined}>
          Mở thiệp mời <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <div className="cover-photo">
        <div className="cover-still-life"><CardImage src={invitation.stillLifeImagePath} alt="Mũ tốt nghiệp và những cuốn sách Focus, Learn, Grow" sizes="(max-width: 640px) 0px, 360px" eager /></div>
        <span className="cover-class">CLASS OF {invitation.graduationYear}</span>
      </div>
    </section>
  );
}

