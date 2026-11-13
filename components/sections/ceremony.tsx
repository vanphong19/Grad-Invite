"use client";

import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { invitation, invitationDateParts } from "@/config/invitation";
import { revealVariants, sectionVariants } from "@/lib/animations";

export function CeremonySection() {
  return (
    <motion.section
      className="ceremony-section section-content"
      aria-labelledby="ceremony-title"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.p className="section-eyebrow" variants={revealVariants}>
        A day to remember. A place to meet.
      </motion.p>
      <motion.h2 id="ceremony-title" className="section-heading ceremony-heading" variants={revealVariants}>
        THE CEREMONY<span className="title-period">.</span>
      </motion.h2>

      <div className="ceremony-layout">
        <motion.div className="ceremony-date" variants={revealVariants}>
          <span className="micro-label">{invitationDateParts.weekday}</span>
          <time dateTime={invitation.date}>
            <span className="ceremony-day">{invitationDateParts.day}</span>
            <span className="ceremony-month">
              {invitationDateParts.month}
              <span className="ceremony-year">{invitationDateParts.year}</span>
            </span>
          </time>
          <span className="ceremony-date-caption">Đánh dấu một cột mốc. Mở ra một hành trình.</span>
        </motion.div>

        <motion.div className="ceremony-details" variants={revealVariants}>
          <div className="ceremony-detail ceremony-time-detail">
            <Clock3 size={19} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <span className="micro-label">Thời gian</span>
              <p className="ceremony-time">
                <time dateTime={invitation.time}>{invitation.time}</time>
                <span>Bắt đầu buổi lễ</span>
              </p>
            </div>
          </div>

          <div className="ceremony-detail ceremony-location-detail">
            <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <span className="micro-label">Địa điểm</span>
              <p className="ceremony-university">{invitation.university}</p>
              {invitation.location && <p className="ceremony-location">{invitation.location}</p>}
              {invitation.address && <p className="ceremony-address">{invitation.address}</p>}
            </div>
          </div>

          <a
            className="invitation-button button-light ceremony-map"
            href={invitation.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Location — mở Google Maps trong tab mới"
          >
            View Location
            <ArrowUpRight size={19} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
