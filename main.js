function layDiemUuTienKhuVuc(khuVuc) {
    switch (khuVuc) {
      case 'A': return 2;
      case 'B': return 1;
      case 'C': return 0.5;
      default: return 0;
    }
  }

  function layDiemUuTienDoiTuong(doiTuong) {
    switch (doiTuong) {
      case '1': return 2.5;
      case '2': return 1.5;
      case '3': return 1;
      default: return 0;
    }
  }

  function kiemTra() {
    const diemChuan = parseFloat(document.getElementById('diemChuan').value);
    const mon1 = parseFloat(document.getElementById('mon1').value);
    const mon2 = parseFloat(document.getElementById('mon2').value);
    const mon3 = parseFloat(document.getElementById('mon3').value);
    const khuVuc = document.getElementById('khuVuc').value;
    const doiTuong = document.getElementById('doiTuong').value;

    if ([mon1, mon2, mon3].some(d => isNaN(d) || d < 0 || d > 10)) {
      alert("Điểm các môn phải từ 0 đến 10.");
      return;
    }

    if (mon1 === 0 || mon2 === 0 || mon3 === 0) {
      document.getElementById('tongDiem').value = (mon1 + mon2 + mon3).toFixed(2);
      document.getElementById('ketQua').value = "Rớt (có môn 0 điểm)";
      return;
    }

    const diemUuTien = layDiemUuTienKhuVuc(khuVuc) + layDiemUuTienDoiTuong(doiTuong);
    const tongDiem = mon1 + mon2 + mon3 + diemUuTien;

    document.getElementById('tongDiem').value = tongDiem.toFixed(2);
    document.getElementById('ketQua').value = tongDiem >= diemChuan ? "Đậu" : "Rớt";
  }
  function tinhTienDien() {
    const ten = document.getElementById("ten").value.trim();
    const soKw = parseFloat(document.getElementById("soKw").value);
    let tien = 0;

    if (ten === "" || isNaN(soKw) || soKw < 0) {
      alert("Vui lòng nhập đầy đủ và hợp lệ.");
      return;
    }

    let kwConLai = soKw;

    if (kwConLai > 0) {
      const bac1 = Math.min(kwConLai, 50);
      tien += bac1 * 500;
      kwConLai -= bac1;
    }

    if (kwConLai > 0) {
      const bac2 = Math.min(kwConLai, 50);
      tien += bac2 * 650;
      kwConLai -= bac2;
    }

    if (kwConLai > 0) {
      const bac3 = Math.min(kwConLai, 100);
      tien += bac3 * 850;
      kwConLai -= bac3;
    }

    if (kwConLai > 0) {
      const bac4 = Math.min(kwConLai, 150);
      tien += bac4 * 1100;
      kwConLai -= bac4;
    }

    if (kwConLai > 0) {
      tien += kwConLai * 1300;
    }

    document.getElementById("ketQua2").value = `${ten} phải trả ${tien.toLocaleString()} đồng`;
  }
  function tinhThue() {
    const hoTen = document.getElementById("hoTen").value.trim();
    const thuNhap = parseFloat(document.getElementById("thuNhap").value);
    const phuThuoc = parseInt(document.getElementById("phuThuoc").value);
    if (!hoTen || isNaN(thuNhap) || isNaN(phuThuoc) || thuNhap < 0 || phuThuoc < 0) {
      alert("Vui lòng nhập đầy đủ và hợp lệ.");
      return;
    }

    const giamTru = 4 + phuThuoc * 1.6;
    let thuNhapChiuThue = thuNhap - giamTru;
    if (thuNhapChiuThue <= 0) {
      document.getElementById("ketQua").value = `${hoTen} không phải nộp thuế.`;
      return;
    }

    // Tính thuế theo biểu thuế lũy tiến từng phần
    const bacThue = [
      { muc: 60, tyLe: 0.05 },
      { muc: 120, tyLe: 0.10 },
      { muc: 210, tyLe: 0.15 },
      { muc: 384, tyLe: 0.20 },
      { muc: 624, tyLe: 0.25 },
      { muc: 960, tyLe: 0.30 },
      { muc: Infinity, tyLe: 0.35 }
    ];

    let thue = 0;
    let thuNhapConLai = thuNhapChiuThue;
    let mucTruoc = 0;

    for (let i = 0; i < bacThue.length; i++) {
      const mucHienTai = Math.min(thuNhapChiuThue, bacThue[i].muc);
      if (mucHienTai > mucTruoc) {
        const soTienBacNay = mucHienTai - mucTruoc;
        thue += soTienBacNay * bacThue[i].tyLe;
        mucTruoc = mucHienTai;
      } else {
        break;
      }
    }

    document.getElementById("ketQua3").value = `${hoTen} phải nộp thuế: ${thue.toFixed(2)} triệu đồng`;
  }

    function toggleKetNoi() {
      const loaiKH = document.getElementById("loaiKH").value;
      const ketNoi = document.getElementById("soKetNoi");
      const labelKetNoi = document.getElementById("labelKetNoi");

      if (loaiKH === "doanh") {
        ketNoi.disabled = false;
        labelKetNoi.style.display = "block";
      } else {
        ketNoi.disabled = true;
        ketNoi.value = "";
        labelKetNoi.style.display = "none";
      }
    }

    function tinhTienCap() {
      const maKH = document.getElementById("maKH").value.trim();
      const loaiKH = document.getElementById("loaiKH").value;
      const soKetNoi = parseInt(document.getElementById("soKetNoi").value) || 0;
      const soKenh = parseInt(document.getElementById("soKenh").value);
      const ketQua4 = document.getElementById("ketQua4");

      if (!maKH || !loaiKH || isNaN(soKenh) || soKenh < 0) {
        alert("Vui lòng nhập đầy đủ thông tin hợp lệ.");
        return;
      }

      let tongTien = 0;

      if (loaiKH === "dan") {
        tongTien = 4.5 + 20.5 + (7.5 * soKenh);
      } else if (loaiKH === "doanh") {
        let phiKetNoi = 75;
        if (soKetNoi > 10) {
          phiKetNoi += (soKetNoi - 10) * 5;
        }
        tongTien = 15 + phiKetNoi + (50 * soKenh);
      }

      ketQua4.value = `Mã KH ${maKH} - Tiền cáp: $${tongTien.toFixed(2)}`;
    }