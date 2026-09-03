"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * GAJO's HOUSE 3D Flipbook Catalogue Component for Next.js (App Router / Pages Router)
 * Uses StPageFlip for realistic 3D paper turning physics
 */
export default function FlipBookCatalogue() {
  const bookRef = useRef(null);
  const [pageFlipInstance, setPageFlipInstance] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(12);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Play realistic paper flip sound
  const playPageFlipSound = () => {
    if (!isSoundOn) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const bufferSize = ctx.sampleRate * 0.28;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.09));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.14);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.28);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      console.warn("Audio Context init error", e);
    }
  };

  useEffect(() => {
    let pageFlip = null;

    const initBook = async () => {
      const { PageFlip } = await import("page-flip");

      if (bookRef.current) {
        const isMobile = window.innerWidth <= 768;
        const bookWidth = isMobile ? Math.min(window.innerWidth - 30, 440) : 490;
        const bookHeight = isMobile ? Math.min(window.innerHeight * 0.76, 640) : 690;

        pageFlip = new PageFlip(bookRef.current, {
          width: bookWidth,
          height: bookHeight,
          size: "stretch",
          minWidth: 320,
          maxWidth: 580,
          minHeight: 480,
          maxHeight: 800,
          maxShadowOpacity: 0.5,
          showCover: true,
          usePortrait: true,
          drawShadow: true,
          flippingTime: 850,
        });

        const pages = bookRef.current.querySelectorAll(".page");
        pageFlip.loadFromHTML(pages);

        pageFlip.on("flip", () => {
          playPageFlipSound();
          setCurrentPage(pageFlip.getCurrentPageIndex());
        });

        pageFlip.on("init", () => {
          setTotalPages(pageFlip.getPageCount());
          setCurrentPage(pageFlip.getCurrentPageIndex());
        });

        setPageFlipInstance(pageFlip);
      }
    };

    initBook();

    return () => {
      if (pageFlip) {
        pageFlip.destroy();
      }
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at center, #262422 0%, #131211 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "15px 10px 85px",
      color: "#2C2A29",
      fontFamily: "'Montserrat', sans-serif"
    }}>
      {/* 3D Book Container */}
      <div style={{ perspective: "2500px", width: "100%", display: "flex", justifyContent: "center" }}>
        <div ref={bookRef} style={{ boxShadow: "0 30px 70px rgba(0,0,0,0.85)", borderRadius: "6px" }}>
          
          {/* Page 1: Hard Cover Front */}
          <div className="page page-cover page-cover-top" data-density="hard" style={{
            background: "#1E1B18",
            color: "#F7F5F0",
            padding: "45px 35px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <h1 style={{ fontFamily: "'Cinzel', serif", letterSpacing: "7px", color: "#DFC48A", fontSize: "2.5rem" }}>
              GAJO'S<br />HOUSE
            </h1>
            <p style={{ letterSpacing: "3.5px", textTransform: "uppercase", fontSize: "0.85rem", color: "#BBB4A8" }}>
              Boutique Homestay
            </p>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.2rem", color: "#E2DBD0", marginTop: "14px" }}>
              Stay simple, live slow.
            </p>
          </div>

          {/* Page 2: Welcome */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Lời Ngỏ</h2>
            <p style={{ fontStyle: "italic", fontSize: "0.86rem", margin: "14px 0", color: "#4A4845" }}>
              "Một không gian lưu trú boutique mới xây tĩnh lặng và sạch không tì vết để bạn tái tạo trọn vẹn nguồn năng lượng."
            </p>
            <img src="/assets/gajo-interior.jpg" alt="Interior" style={{ width: "100%", height: "235px", objectFit: "cover", borderRadius: "6px" }} />
          </div>

          {/* Page 3: Check-in / Wifi */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Nhận Phòng & WiFi</h2>
            <div style={{ background: "#242220", color: "#FFF", padding: "24px", borderRadius: "8px", marginTop: "16px", textAlign: "center" }}>
              <p>Mạng: <strong style={{ color: "#DFC48A" }}>GAJOS_HOUSE</strong></p>
              <p>Mật khẩu: <strong style={{ color: "#DFC48A" }}>gajohouse123</strong></p>
            </div>
          </div>

          {/* Page 4: Rooms */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Không Gian Lưu Trú</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>GA-AN (Giường đôi) &bull; GA-MỘ (Tiêu chuẩn) &bull; GA-ĐÌNH (Suite 2 giường lớn)</p>
          </div>

          {/* Page 5: Amenities */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Tiện Nghi Chu Đáo</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Chuẩn mực Spotless &bull; Điều hòa Inverter &bull; Nước nóng áp lực</p>
          </div>

          {/* Page 6: BBQ */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Tiệm Nướng Nhà Gạo</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Tiểu Đà Lạt giữa Hoài Nhơn &bull; Hotline 0902 286 300</p>
          </div>

          {/* Page 7: 8 Trải nghiệm */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>8 Trải Nghiệm Hoài Nhơn</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Gành Lộ Diêu, Đèo Lộ Diêu ĐT639, Mũi Gành Bình Minh, Rừng Dừa Tam Quan...</p>
          </div>

          {/* Page 8: Daytrip (ẢNH THỰC TẾ ĐÈO HOÀI HẢI - LỘ DIÊU) */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Đèo Hoài Hải – Lộ Diêu</h2>
            <img src="/assets/deo-hoaihai-lodieu.jpg" alt="Đèo Hoài Hải Lộ Diêu ĐT639" style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "6px", margin: "10px 0" }} />
            <p style={{ fontSize: "0.82rem", color: "#444" }}>Cung đường ven biển ĐT.639 dài 4.5km uốn lượn như dải lụa ôm trọn vách đá hùng vĩ và đại dương xanh thẳm.</p>
          </div>

          {/* Page 9: Tips */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Mẹo Lưu Trú</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Giữ yên tĩnh sau 22:00 &bull; Tiết kiệm điện năng</p>
          </div>

          {/* Page 10: Departure */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Trước Khi Rời Đi</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Kiểm tra tư trang &bull; Gửi lại chìa khóa</p>
          </div>

          {/* Page 11: Thank You */}
          <div className="page" data-density="soft" style={{ background: "#F7F5F0", padding: "38px 34px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem" }}>Cảm Ơn Bạn!</h2>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Quét mã QR để chia sẻ đánh giá 5 sao cho GAJO's HOUSE</p>
          </div>

          {/* Page 12: Back Hardcover */}
          <div className="page page-cover page-cover-bottom" data-density="hard" style={{
            background: "#1E1B18",
            color: "#F7F5F0",
            padding: "45px 35px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <h2 style={{ fontFamily: "'Cinzel', serif", color: "#DFC48A", fontSize: "2rem" }}>GAJO'S HOUSE</h2>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.5rem", color: "#C5A059" }}>live slow, feel home.</p>
          </div>

        </div>
      </div>

      {/* Bottom Floating Navigation */}
      <div style={{
        position: "fixed",
        bottom: "18px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(30, 27, 24, 0.94)",
        backdropFilter: "blur(12px)",
        padding: "8px 20px",
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        border: "1px solid rgba(197, 160, 89, 0.35)",
        color: "#E2DBD0",
        zIndex: 1000
      }}>
        <button onClick={() => pageFlipInstance?.flipPrev()} style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer", fontSize: "1rem" }}>◀</button>
        <span style={{ color: "#DFC48A", fontWeight: "600" }}>{String(currentPage + 1).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
        <button onClick={() => pageFlipInstance?.flipNext()} style={{ background: "none", border: "none", color: "#FFF", cursor: "pointer", fontSize: "1rem" }}>▶</button>
      </div>
    </div>
  );
}
