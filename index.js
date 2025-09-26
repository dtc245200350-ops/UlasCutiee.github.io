document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wordForm");
  const excelBtn = document.getElementById("excelBtn");
  const txtBtn = document.getElementById("txtBtn");

  // ================= FORM =================
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

  // ================= MODAL CHÀO MỪNG =================
  const welcomeModal = document.createElement("div");
  welcomeModal.classList.add("modal");
  welcomeModal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn">&times;</span>
      <h2>Chào mừng bạn!</h2>
      <p>Hãy xem các mục sự kiện, tin hot, thông báo, cập nhật bên dưới.</p>
    </div>
  `;
  document.body.appendChild(welcomeModal);

  const closeBtn = welcomeModal.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    welcomeModal.style.display = "none";
  });

  // Hiển thị modal khi vừa load trang
  setTimeout(() => {
    welcomeModal.style.display = "flex";
  }, 500); // delay 0.5s

  // ================= MODAL CHO TỪNG MỤC =================
  const eventItems = document.querySelectorAll(
    ".event-left li, .event-right li, .event-mid-left li, .event-mid-right li"
  );

  eventItems.forEach(item => {
    item.addEventListener("click", () => {
      const modal = document.createElement("div");
      modal.classList.add("modal");
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <h2>${item.textContent}</h2>
          <p>Nội dung chi tiết về "${item.textContent}" sẽ hiển thị ở đây.</p>
        </div>
      `;
      document.body.appendChild(modal);

      const closeBtn = modal.querySelector(".close-btn");
      closeBtn.addEventListener("click", () => {
        modal.remove();
      });

      modal.style.display = "flex";
    });
  });
});
