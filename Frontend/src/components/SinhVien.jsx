import { useEffect, useState } from "react";

function SinhVien() {
  const [sinhVien, setSinhVien] = useState([]);

  useEffect(() => {
    fetch("https://cafeshop-t0zr.onrender.com/api/users")
      .then(res => res.json())
      .then(data => {
        setSinhVien(data); 
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Danh sách sinh viên</h2>
      {sinhVien.map((sv) => (
        <p key={sv.id}>
          {sv.ten} - {sv.mssv} - {sv.lop}
        </p>
      ))}
    </div>
  );
}

export default SinhVien;