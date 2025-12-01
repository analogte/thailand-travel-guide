# 🎯 Affiliate Program Setup Guide

## คู่มือการสมัครและติดตั้ง Affiliate Programs สำหรับ Thailand Travel Guide

---

## 📋 สารบัญ
1. [Agoda Affiliate Program](#1-agoda-affiliate-program)
2. [Booking.com Partner Program](#2-bookingcom-partner-program)
3. [Klook Affiliate Program](#3-klook-affiliate-program)
4. [การติดตั้ง Widget และ Links](#4-การติดตั้ง-widget-และ-links)
5. [การติดตาม Performance](#5-การติดตาม-performance)
6. [Best Practices](#6-best-practices)

---

## 1. Agoda Affiliate Program

### ข้อมูลพื้นฐาน
- **Commission Rate:** 3-7% ต่อการจอง
- **Cookie Duration:** 30 วัน
- **Minimum Payout:** $100 USD
- **Payment Methods:** PayPal, Wire Transfer
- **Approval Time:** 1-2 สัปดาห์

### ขั้นตอนการสมัคร

#### Step 1: สมัครสมาชิก
1. ไปที่ [https://partners.agoda.com/](https://partners.agoda.com/)
2. คลิก "Join Now" หรือ "Sign Up"
3. กรอกข้อมูล:
   - ชื่อ-นามสกุล
   - อีเมล
   - เว็บไซต์: `https://yoursite.com`
   - ประเภทเว็บไซต์: Travel Guide / Blog
   - Traffic ต่อเดือน: (ระบุตามจริง)
   - ประเทศ: Thailand

#### Step 2: รอการอนุมัติ
- Agoda จะตรวจสอบเว็บไซต์ของคุณ
- ระยะเวลา: 1-2 สัปดาห์
- จะได้รับอีเมลแจ้งผลการอนุมัติ

#### Step 3: รับ Affiliate ID
เมื่อได้รับการอนุมัติ คุณจะได้รับ:
- **Affiliate ID** (เช่น `1234567`)
- **Tracking Links**
- **Widget Codes**

### วิธีใช้งาน

#### A. Deep Link (ลิงก์ไปยังโรงแรมเฉพาะ)
```html
<!-- Format -->
https://www.agoda.com/hotel-name/hotel/city-country.html?cid=YOUR_AFFILIATE_ID

<!-- ตัวอย่าง -->
https://www.agoda.com/the-siam-hotel/hotel/bangkok-th.html?cid=1234567
```

#### B. Search Widget (กล่องค้นหาโรงแรม)
```html
<!-- Agoda จะให้โค้ด Widget มา ตัวอย่าง: -->
<div id="agoda-search-box"></div>
<script src="https://partners.agoda.com/widget/search-box.js"></script>
<script>
  AgodaWidget.init({
    affiliateId: 'YOUR_AFFILIATE_ID',
    destination: 'Bangkok',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    adults: 2
  });
</script>
```

#### C. Banner Ads
```html
<!-- Agoda มี Banner สำเร็จรูปให้เลือก -->
<a href="https://www.agoda.com/?cid=YOUR_AFFILIATE_ID" target="_blank">
  <img src="https://partners.agoda.com/banners/300x250.jpg" alt="Agoda">
</a>
```

---

## 2. Booking.com Partner Program

### ข้อมูลพื้นฐาน
- **Commission Rate:** 25-40% ต่อการจอง (สูงกว่า Agoda!)
- **Cookie Duration:** 30 วัน
- **Minimum Payout:** $100 USD
- **Payment Methods:** Bank Transfer, PayPal
- **Approval Time:** ทันที (Instant Approval)

### ขั้นตอนการสมัคร

#### Step 1: สมัครสมาชิก
1. ไปที่ [https://www.booking.com/affiliate-program/](https://www.booking.com/affiliate-program/)
2. คลิก "Join Now"
3. กรอกข้อมูล:
   - ชื่อ-นามสกุล
   - อีเมล
   - เว็บไซต์ URL
   - ประเภทเว็บไซต์: Travel Content / Blog
   - ภาษาหลัก: English / Thai

#### Step 2: รับ Affiliate ID ทันที
- Booking.com อนุมัติทันที (Instant Approval)
- คุณจะได้รับ **Affiliate ID** (เช่น `aid=123456`)
- เข้าถึง Partner Dashboard ได้ทันที

### วิธีใช้งาน

#### A. Deep Link
```html
<!-- Format -->
https://www.booking.com/hotel/th/hotel-name.html?aid=YOUR_AFFILIATE_ID

<!-- ตัวอย่าง -->
https://www.booking.com/hotel/th/mandarin-oriental-bangkok.html?aid=123456
```

#### B. Search Box Widget
```html
<!-- Booking.com มี Widget Generator ใน Dashboard -->
<div id="booking-search-box"></div>
<script>
  (function(d, sc, u) {
    var s = d.createElement(sc), p = d.getElementsByTagName(sc)[0];
    s.type = 'text/javascript';
    s.async = true;
    s.src = u + '?aid=YOUR_AFFILIATE_ID';
    p.parentNode.insertBefore(s, p);
  })(document, 'script', 'https://www.booking.com/affiliate/searchbox');
</script>
```

#### C. Map Widget (แสดงโรงแรมบนแผนที่)
```html
<!-- Booking.com มี Map Widget ที่สวยมาก -->
<div id="booking-map"></div>
<script src="https://www.booking.com/affiliate/map.js?aid=YOUR_AFFILIATE_ID"></script>
```

---

## 3. Klook Affiliate Program

### ข้อมูลพื้นฐาน
- **Commission Rate:** 5-10% ต่อการจอง
- **Cookie Duration:** 30 วัน
- **Minimum Payout:** $50 USD
- **Payment Methods:** PayPal, Bank Transfer
- **เหมาะสำหรับ:** Activities, Tours, Attractions

### ขั้นตอนการสมัคร

#### Step 1: สมัครผ่าน Affiliate Network
Klook ใช้ Affiliate Networks เช่น:
- **Impact Radius**
- **CJ Affiliate**
- **Rakuten Advertising**

1. ไปที่ [https://affiliate.klook.com/](https://affiliate.klook.com/)
2. เลือก Network ที่ต้องการ
3. สมัครสมาชิก Network
4. ค้นหา "Klook" ใน Network
5. สมัครเป็น Affiliate ของ Klook

#### Step 2: รับ Tracking Links
- คุณจะได้รับ Affiliate Link Generator
- สามารถสร้าง Deep Link ไปยัง Activity เฉพาะได้

### วิธีใช้งาน

#### A. Deep Link
```html
<!-- Format -->
https://www.klook.com/activity/12345-activity-name/?aid=YOUR_AFFILIATE_ID

<!-- ตัวอย่าง -->
https://www.klook.com/activity/1234-grand-palace-tour-bangkok/?aid=12345
```

#### B. Widget
```html
<!-- Klook มี Widget สำหรับแสดง Popular Activities -->
<div id="klook-widget"></div>
<script src="https://affiliate.klook.com/widget.js?aid=YOUR_AFFILIATE_ID"></script>
```

---

## 4. การติดตั้ง Widget และ Links

### ขั้นตอนการติดตั้งในเว็บไซต์

#### Step 1: อัพเดทไฟล์ `js/hotels.js`

เปิดไฟล์ `/js/hotels.js` และแก้ไข:

```javascript
// เปลี่ยนจาก
agodaLink: "https://www.agoda.com/the-siam-hotel/hotel/bangkok-th.html?cid=YOUR_AFFILIATE_ID"

// เป็น (ใส่ Affiliate ID จริง)
agodaLink: "https://www.agoda.com/the-siam-hotel/hotel/bangkok-th.html?cid=1234567"
```

ทำแบบเดียวกันกับ `bookingLink`

#### Step 2: เพิ่ม Search Widget ใน `hotels.html`

หาส่วนนี้ในไฟล์ `hotels.html`:
```html
<div id="agoda-search-widget" class="mb-6">
    <!-- Placeholder for Agoda Widget -->
```

แทนที่ด้วยโค้ด Widget จริงที่ได้จาก Agoda Dashboard

#### Step 3: เพิ่ม Affiliate Disclosure

เพิ่มข้อความนี้ใน Footer ของทุกหน้า:

```html
<p class="text-gray-600 text-xs mt-2">
    <strong>Affiliate Disclosure:</strong> We earn commission from affiliate partners 
    when you book through our links. This helps us keep the site free and doesn't 
    affect your booking price.
</p>
```

---

## 5. การติดตาม Performance

### A. Agoda Partner Dashboard
1. เข้า [https://partners.agoda.com/](https://partners.agoda.com/)
2. Login ด้วย Account ของคุณ
3. ดูข้อมูล:
   - Clicks (จำนวนคลิก)
   - Bookings (จำนวนการจอง)
   - Commission (ค่าคอมมิชชั่น)
   - Conversion Rate (อัตราการแปลง)

### B. Booking.com Partner Dashboard
1. เข้า [https://admin.booking.com/](https://admin.booking.com/)
2. Login
3. ดูข้อมูล:
   - Clicks
   - Bookings
   - Revenue
   - Top Performing Links

### C. Google Analytics Integration

เพิ่มโค้ดนี้เพื่อติดตาม Affiliate Clicks:

```javascript
// ใน js/hotels.js
function trackAffiliateClick(platform, hotelName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'affiliate_click', {
            'event_category': 'Affiliate',
            'event_label': platform + ' - ' + hotelName,
            'value': 1
        });
    }
}

// เพิ่มใน Affiliate Links
<a href="${hotel.agodaLink}" 
   onclick="trackAffiliateClick('Agoda', '${hotel.name}')"
   target="_blank">
```

---

## 6. Best Practices

### A. การวาง Affiliate Links

#### ✅ DO (ควรทำ)
1. **วางในบริบทที่เหมาะสม**
   - ในบทความรีวิวโรงแรม
   - ในคำแนะนำที่พัก
   - ในหน้า Destination Guide

2. **ใช้ Call-to-Action ที่ชัดเจน**
   ```html
   <a href="..." class="btn-primary">
       Check Prices on Agoda →
   </a>
   ```

3. **เปรียบเทียบราคา**
   - แสดงลิงก์ทั้ง Agoda และ Booking.com
   - ให้ผู้ใช้เลือกเอง

#### ❌ DON'T (ไม่ควรทำ)
1. ❌ ซ่อน Affiliate Links
2. ❌ ใช้ Affiliate Links มากเกินไป (Spam)
3. ❌ โฆษณาเท็จหรือข้อมูลผิด
4. ❌ ลืมใส่ Affiliate Disclosure

### B. การเพิ่ม Conversion Rate

#### 1. เขียน Content ที่มีคุณภาพ
```markdown
# ตัวอย่าง Blog Post Structure

## Introduction
- ทำไมต้องเลือกโรงแรมนี้

## Location & Accessibility
- ที่ตั้ง
- การเดินทาง
- สถานที่ใกล้เคียง

## Rooms & Amenities
- ประเภทห้อง
- สิ่งอำนวยความสะดวก
- รูปภาพ

## Price & Booking
- ช่วงราคา
- โปรโมชั่น
- **[CTA: Check Latest Prices on Agoda]**

## Conclusion
- สรุปข้อดี-ข้อเสีย
- คำแนะนำ
```

#### 2. ใช้รูปภาพคุณภาพสูง
- รูปโรงแรมจริง
- รูปห้องพัก
- รูปสิ่งอำนวยความสะดวก

#### 3. เพิ่มความน่าเชื่อถือ
- รีวิวจากผู้เข้าพักจริง
- Rating และ Awards
- ข้อมูลที่ถูกต้องและอัพเดท

### C. SEO Optimization

#### Title Tags
```html
<!-- ดี -->
<title>Top 10 Luxury Hotels in Bangkok 2024 - Best Prices & Reviews</title>

<!-- ไม่ดี -->
<title>Hotels</title>
```

#### Meta Descriptions
```html
<meta name="description" content="Discover the best luxury hotels in Bangkok. 
Compare prices from Agoda and Booking.com. Read reviews, see photos, and book 
your perfect stay in Thailand's capital.">
```

#### Heading Structure
```html
<h1>Top 10 Luxury Hotels in Bangkok</h1>
<h2>1. The Siam Hotel</h2>
<h3>Location & Accessibility</h3>
<h3>Rooms & Amenities</h3>
<h3>Pricing & Booking</h3>
```

---

## 📊 Expected Performance

### Month 1-3 (Getting Started)
- **Traffic:** 5,000 visitors/month
- **Clicks:** 250 (5% CTR)
- **Bookings:** 5 (2% conversion)
- **Revenue:** $500-1,000

### Month 4-6 (Growing)
- **Traffic:** 15,000 visitors/month
- **Clicks:** 750 (5% CTR)
- **Bookings:** 15 (2% conversion)
- **Revenue:** $1,500-3,000

### Month 7-12 (Established)
- **Traffic:** 30,000 visitors/month
- **Clicks:** 1,500 (5% CTR)
- **Bookings:** 30 (2% conversion)
- **Revenue:** $3,000-6,000

---

## 🚨 Important Legal Requirements

### 1. Affiliate Disclosure (บังคับ!)
ต้องแจ้งให้ผู้ใช้ทราบว่าคุณได้รับค่าคอมมิชชั่น

```html
<!-- เพิ่มใน Footer -->
<div class="affiliate-disclosure">
    <p><strong>Affiliate Disclosure:</strong> Thailand Travel Guide is a participant 
    in affiliate programs including Agoda and Booking.com. We earn a commission when 
    you book through our links at no extra cost to you. This helps us maintain the 
    site and provide free content.</p>
</div>
```

### 2. Privacy Policy
ต้องมีหน้า Privacy Policy ที่ระบุ:
- การใช้ Cookies
- การติดตาม Affiliate Clicks
- การแชร์ข้อมูลกับ Partners

### 3. Terms of Service
ระบุเงื่อนไขการใช้งานเว็บไซต์

---

## 📞 Support & Resources

### Agoda Support
- Email: partners@agoda.com
- Help Center: https://partners.agoda.com/help

### Booking.com Support
- Email: affiliate@booking.com
- Help Center: https://admin.booking.com/help

### Klook Support
- Email: affiliate@klook.com

---

## ✅ Checklist การเริ่มต้น

### Week 1
- [ ] สมัคร Agoda Affiliate Program
- [ ] สมัคร Booking.com Partner Program
- [ ] รอการอนุมัติ (Agoda)
- [ ] ศึกษา Dashboard และ Tools

### Week 2
- [ ] รับ Affiliate IDs
- [ ] อัพเดท `hotels.js` ด้วย Affiliate IDs จริง
- [ ] ติดตั้ง Search Widgets
- [ ] เพิ่ม Affiliate Disclosure

### Week 3
- [ ] ทดสอบ Affiliate Links ทั้งหมด
- [ ] ตรวจสอบ Tracking ใน Dashboard
- [ ] เขียน Blog Post แรก (Hotel Review)
- [ ] แชร์บน Social Media

### Week 4
- [ ] วิเคราะห์ Performance
- [ ] ปรับปรุง Content
- [ ] เพิ่ม Hotel Recommendations
- [ ] วางแผน Content เดือนถัดไป

---

**Good Luck! 🚀**

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถถามได้เลยครับ!
