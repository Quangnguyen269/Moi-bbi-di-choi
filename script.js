// --- 1. XỬ LÝ KHI TRANG VỪA TẢI XONG ---
window.onload = function() {
    // Đặt ảnh nền intro
    document.body.style.backgroundImage = "url('intro-bg.jpg')";
    document.body.style.backgroundSize = "cover";

    // --- LOGIC MỚI: ĐỢI 5 GIÂY THÌ HIỆN NÚT "BẮT ĐẦU" ---
    setTimeout(function() {
        const startBtn = document.getElementById('start-btn-container');
        if (startBtn) {
            startBtn.classList.add('show'); // Hiện nút lên
        }
    }, 5000); // 5000ms = 5 giây
};

// --- 2. HÀM KHI BẤM NÚT "CHẠM ĐỂ BẮT ĐẦU" ---
function startJourney() {
    // a. Phát nhạc ngay lập tức (Vì đây là sự kiện Click nên trình duyệt cho phép)
    var audio = document.getElementById('bgMusic');
    if (audio) {
        audio.play().catch(e => console.log("Lỗi phát nhạc: " + e));
    }
    
    // b. Chơi video (nếu trình duyệt chặn autoplay trước đó)
    var video = document.getElementById('mainVideo');
    if(video) {
        video.play().catch(e => console.log("Lỗi video"));
    }

    // c. Chuyển sang màn hình Video
    nextScreen('screen-video');
}

// --- 3. HÀM CHUYỂN MÀN HÌNH CHUNG ---
function nextScreen(screenId) {
    // Ẩn tất cả màn hình
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    // Hiện màn hình mong muốn
    document.getElementById(screenId).classList.add('active');

    // Xử lý background
    if (screenId === 'screen-intro') {
        document.body.style.backgroundImage = "url('intro-bg.jpg')";
        document.body.style.backgroundSize = "cover";
    } else {
        // Background nền mèo cho các trang sau
        document.body.style.backgroundImage = "url('background.jpg')"; 
        document.body.style.backgroundRepeat = "repeat";
        document.body.style.backgroundSize = "300px";
    }
}

// --- 4. XỬ LÝ NÚT CHẠY TRỐN (NO BUTTON) ---
const noBtn = document.getElementById('noBtn');
if(noBtn) {
    const moveBtn = () => {
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        noBtn.style.position = 'absolute';
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
    };
    noBtn.addEventListener('mouseover', moveBtn);
    noBtn.addEventListener('touchstart', moveBtn);
}

// --- 5. LOGIC CHỌN MÓN ĂN ---
let selectedFood = "";
function selectFood(element, name) {
    document.querySelectorAll('#screen-food .food-item').forEach(item => {
        item.classList.remove('selected'); 
        item.style.borderColor = "#ffe6ee"; 
        item.style.backgroundColor = "white"; 
    });
    
    element.classList.add('selected');
    element.style.borderColor = "#ff527b";
    element.style.backgroundColor = "#fff0f5";
    selectedFood = name;
}

function checkFood() {
    if (selectedFood === "") {
        alert("Chọn một món đi mà 🥺");
    } else {
        nextScreen('screen-place');
    }
}

// --- 6. LOGIC CHỌN ĐỊA ĐIỂM ---
let selectedPlace = "";
function selectPlace(element, name) {
    document.querySelectorAll('#screen-place .place-item').forEach(item => {
        item.classList.remove('selected');
        item.style.borderColor = "#ffe6ee";
        item.style.backgroundColor = "white";
    });
    
    element.classList.add('selected');
    element.style.borderColor = "#ff527b";
    element.style.backgroundColor = "#fff0f5";
    selectedPlace = name;
}

// --- SỬA LẠI HÀM checkPlace (GỬI EMAIL TỰ ĐỘNG) ---
function checkPlace() {
    if (selectedPlace === "") {
        alert("Chọn một chỗ đi mà bé ơii 🥺");
    } else {
        // 1. Cập nhật chữ cho trang cảm ơn
        const summary = document.getElementById('summaryText');
        if (summary) {
            summary.innerHTML = `Chốt đơn: Ăn <b>${selectedFood}</b> <br> xong rồi đi <b>${selectedPlace}</b> ✨`;
        }
        
        // 2. Chuyển sang trang cảm ơn & Mưa tim ngay lập tức (không để bạn nữ chờ)
        nextScreen('screen-thanks');
        startRainHearts();

        // 3. --- GỬI EMAIL NGẦM VỀ CHO BẠN ---
        // Đã điền sẵn email của bạn
        const yourEmail = "quangnguyen2692005@gmail.com"; 
        
        const dataToSend = {
            Tieu_de: "HÚ HÚ CÓ KÈO MỚI NÈ!",
            Mon_An: selectedFood,
            Dia_Diem: selectedPlace,
            Loi_nhan: "Chuẩn bị lên đồ đi chơi thôi! (Web tự động gửi)"
        };

        // Gửi ngầm (AJAX) không tải lại trang
        fetch(`https://formsubmit.co/ajax/${yourEmail}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => console.log("Đã gửi mail về quangnguyen2692005@gmail.com thành công!"))
        .catch(error => console.log("Lỗi gửi mail:", error));
    }
}

// --- 7. HIỆU ỨNG MƯA ICON ---
function startRainHearts() {
    setInterval(function() {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart'); 
        
        const icons = ['❤️', '😻', '😽', '❄️', '☃️', '✨'];
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px'; 
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
        
        // Thêm CSS animation nếu chưa có
        if (!document.getElementById('animStyle')) {
            const style = document.createElement('style');
            style.id = 'animStyle';
            style.innerHTML = `@keyframes fall { to { transform: translateY(110vh) rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}
