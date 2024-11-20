
.popcontent {
  position: relative;
  /* max-width: 1100px; */
  width: 100%;
  margin: 0 auto;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  background-color: #fff5f5;
  box-shadow: 0px 5px 15px rgb(95, 95, 95);

}

.header-popular {
  margin: 20px 0;
  position: relative;
  display: inline-block;
}

.popular-card {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.popular-card img {
  width: 200px;
  height: 300px;
  text-align: center;
  border-radius: 10px;
}

.image-content {
  position: relative;
}

.number {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #000000;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
}

.header-popular image {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.header-popular h2 {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
}

h5,
h6 {
  text-align: start;
  margin: 2px 0;
}

/* Media Queries เพื่อย่อขนาดเมื่อหน้าจอเล็ก */
@media (max-width: 1200px) {
  .popular-card img {
    width: 180px;
    height: 270px;
  }

  .header-popular h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 992px) {
  .popular-card img {
    width: 150px;
    height: 225px;
  }

  .header-popular h2 {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {
  .popular-card img {
    width: 120px;
    height: 180px;
  }

  .header-popular h2 {
    font-size: 1.4rem;
  }
}

@media (max-width: 576px) {
  .popular-card img {
    width: 100px;
    height: 150px;
  }

  .header-popular h2 {
    font-size: 1.2rem;
  }
}

.recommend {
  background-color: #fff5f5;
  position: relative;
  /* max-width: 1100px; */
  width: 100%;
  border-radius: 10px;
  margin: 10px auto;
  /* box-shadow: 0px 5px 15px rgba(0, 0, 0, 1); */
  box-shadow: 0px 5px 15px rgb(95, 95, 95);
  padding: 0 10px;

}
.recommend h2 {
  display: inline-flex;
  align-items: center;
  color: #000000;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.recommend-re {
  display: flex;
  width:100%;
  padding: 10px;
  gap: 20px;
  overflow: auto;
  scrollbar-width: none;
  
}
.recommend-card {
  text-align: center;
}
.recommend-card img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}
.card-img-sub {
  font-size: 16px;
  margin: 10px 0 5px;
}

.arrow {
  display: flex;
  position: absolute;
  top: 50%;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  padding: 5px;
  color: #000;
  cursor: pointer;
  background-color: #88583D;
  border: 2px solid #000;
  border-radius: 50px;
 
}
.arrow-left {
  left: 0;
}
.arrow-right {
  right: 0;
}

h5,h6 {
  text-wrap: nowrap;
}
@media (max-width: 768px) {
  .recommend-re {
    display: flex; /* ใช้ flexbox แทน grid */
    flex-wrap: nowrap; /* ไม่ให้แถวเพิ่ม */
    overflow-x: auto; /* ให้เลื่อนแนวนอนเมื่อเกิน */
    gap: 20px; /* ระยะห่างระหว่างคอลัมน์ */
  }

  .recommend-card {
    flex: 0 0 20%; /* กำหนดความกว้างของแต่ละคอลัมน์ให้เป็น 20% */
  }
}



.novel-now {
  position: relative;
  /* max-width: 1100px; */
  width: 100%;
  border-radius: 10px;
  margin: 10px auto ;
  padding: 0 10px;
  box-shadow: 0px 5px 15px rgb(95, 95, 95);
  background-color: #fff5f5;
  .novel-header {
    display: flex;
    justify-content: space-between; /* จัดให้ "ดูทั้งหมด" ไปทางขวาสุด */
    align-items: center; /* จัดให้อยู่กลางในแนวแกนตั้ง */
    margin: 10px; /* เพิ่มพื้นที่ว่างระหว่างหัวข้อกับรายการ */
  }
}

.novel-now h2 {
  display: inline-flex;
  align-items: center;
  color: #000000;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}


.header-update {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* สร้าง 5 คอลัมน์ */
  grid-gap: 10px; /* ช่องว่างระหว่างคอลัมน์ */
  margin: 10px;
  
}
.novelpic {
  display: flex;
  justify-content: center;  
}


.card-img-sub {
  width: 150px; 
  text-align: left;
  margin: 10px 0 5px;
}
.novel-card img {
  width: 150px;
  height: 150px;
  border-radius: 5px;
}


.novel-header a {
  display: inline-flex;
  align-items: center;
  background-color: #88583D;
  color: #fff;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.novel-header a i {
  margin-left: 8px; /* เพิ่มช่องว่างระหว่างข้อความกับไอคอน */
  transition: transform 0.3s ease; /* ใช้ transition สำหรับการขยับ */
}

.novel-header a:hover {
  background-color: #68442e; /* เปลี่ยนสีเมื่อ hover */
  transform: translateY(-3px); /* ขยับขึ้นเล็กน้อยเมื่อ hover */
}

.novel-header a:hover i {
  transform: translateX(5px); /* ขยับไอคอนลูกศรไปทางขวาเมื่อ hover */
}

@media (max-width: 1024px) {
  .header-update {
    grid-template-columns: repeat(4, 1fr); /* เมื่อหน้าจอเล็กกว่า 1024px จะแสดงเป็น 3 คอลัมน์ */
  }
}

@media (max-width: 768px) {
  .header-update {
    grid-template-columns: repeat(2, 1fr); /* เมื่อหน้าจอเล็กกว่า 768px จะแสดงเป็น 2 คอลัมน์ */
  }
}