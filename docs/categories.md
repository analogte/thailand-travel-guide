# Categories System

หมวดหมู่สถานที่ท่องเที่ยวทั้งหมดในระบบ

---

## 📋 Official Categories (6 หมวดหมู่หลัก)

### 1. 🛕 Temples (วัด)
- **Category ID:** `temple`
- **Description:** วัด, ศาลเจ้า, สถานที่ทางศาสนา
- **Examples:** Wat Arun, Wat Phra Kaew, Erawan Shrine
- **Current Count:** 12 places

### 2. 🎨 Culture (วัฒนธรรม)
- **Category ID:** `culture`
- **Description:** พิพิธภัณฑ์, หอศิลป์, สถานที่ทางวัฒนธรรม
- **Examples:** Jim Thompson House, Museum Siam, BACC, MOCA
- **Current Count:** 5 places

### 3. 🍜 Food (อาหาร)
- **Category ID:** `food`
- **Description:** ร้านอาหาร, ร้านอาหารมิชลิน, ร้านอาหารชื่อดัง
- **Examples:** Raan Jay Fai, Thip Samai
- **Current Count:** 3 places

### 4. ☕ Cafes (คาเฟ่)
- **Category ID:** `cafe`
- **Description:** คาเฟ่, ร้านกาแฟ, ร้านขนมหวาน
- **Examples:** After You Dessert Cafe
- **Current Count:** 1 place

### 5. 🏞️ Nature (ธรรมชาติ)
- **Category ID:** `nature`
- **Description:** สวนสาธารณะ, ธรรมชาติ, ชายหาด, ภูเขา
- **Examples:** Lumpini Park, Benjakitti Forest Park
- **Current Count:** 1 place

### 6. 🛍️ Shopping (ช้อปปิ้ง) ✨ NEW
- **Category ID:** `shopping`
- **Description:** ห้างสรรพสินค้า, ตลาด, ชุมชนมอลล์
- **Examples:** ICONSIAM, Siam Paragon, CentralWorld, MBK, Terminal 21
- **Current Count:** 10 places

---

## 📊 Category Statistics

| Category | Count | Percentage |
|----------|-------|------------|
| Temple   | 12    | 37.5%      |
| Shopping | 10    | 31.3%      |
| Culture  | 5     | 15.6%      |
| Food     | 3     | 9.4%       |
| Cafe     | 1     | 3.1%       |
| Nature   | 1     | 3.1%       |
| **Total** | **32** | **100%** |

---

## 🎯 Future Categories (อนาคต)

### Potential New Categories:
- **Markets** (`market`) - ตลาดนัด, ตลาดกลางคืน
- **Viewpoints** (`viewpoint`) - จุดชมวิว, ดาดฟ้า, rooftop bars
- **Entertainment** (`entertainment`) - สวนสนุก, โรงภาพยนตร์
- **Nightlife** (`nightlife`) - บาร์, คลับ, ไนท์ไลฟ์
- **Wellness** (`wellness`) - สปา, นวดแผนไทย
- **Adventure** (`adventure`) - กิจกรรมผจญภัย, กีฬา

---

## 🔧 Implementation Notes

### For `places.json`:
```json
{
  "category": "shopping",  // Single string value
  ...
}
```

### For `destinations.json` (Legacy):
```json
{
  "category": ["shopping", "culture"],  // Array of strings
  ...
}
```

### Category Display Names:
- `temple` → "Temples" (วัด)
- `culture` → "Culture" (วัฒนธรรม)
- `food` → "Food" (อาหาร)
- `cafe` → "Cafes" (คาเฟ่)
- `nature` → "Nature" (ธรรมชาติ)
- `shopping` → "Shopping" (ช้อปปิ้ง)

---

## 📝 Usage Guidelines

1. **Consistency:** ใช้ category ID เดียวกันทุกจังหวัด
2. **Single Category:** แต่ละสถานที่ควรมี 1 category หลัก
3. **Clear Definition:** แต่ละ category ควรมีความหมายชัดเจน ไม่ซ้อนทับกัน
4. **Future-Proof:** เตรียมพร้อมสำหรับ categories ใหม่ในอนาคต

---

**Last Updated:** 2025-11-28
**Total Categories:** 6
**Total Places:** 32
