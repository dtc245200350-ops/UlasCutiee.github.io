document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wordForm");
  const excelBtn = document.getElementById("excelBtn");
  const txtBtn = document.getElementById("txtBtn");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([
      { "Tài khoản": name, "Mật khẩu": password, "Đăng nhập bằng": subject, "Skin": message }
    ]);

    XLSX.utils.book_append_sheet(wb, ws, "FormData");
    XLSX.writeFile(wb, "form_data.xlsx");
  });

  txtBtn.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    let content = 
      `Tài khoản: ${name}\n` +
      `Mật khẩu: ${password}\n` +
      `Đăng nhập bằng: ${subject}\n` +
      `Skin muốn nhận: ${message}\n`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form_data.txt";
    link.click();
  });
});
