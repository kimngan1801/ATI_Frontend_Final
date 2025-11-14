// Load Word Cloud dynamically from mock-data.json
async function loadWordCloud() {
  try {
    // Fetch data from mock-data.json
    const response = await fetch('/mock-data.json');
    const chartData = await response.json();
    const keywordsData = chartData.keywords || [];

    if (keywordsData.length === 0) {
      console.warn('⚠️ No keywords data found');
      return;
    }

    console.log('✅ Loaded keywords data:', keywordsData);

    // MÀU ĐẸP + CỐ ĐỊNH
    const colors = [
      '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#14b8a6',
      '#f59e0b', '#f97316', '#ef4444', '#ec4899', '#d946ef',
      '#a855f7', '#6366f1', '#7c3aed', '#6d28d9', '#dc2626',
      '#f43f5e', '#fb7185', '#f472b6', '#e879f9', '#c084fc'
    ];
    
    const colorMap = {};
    keywordsData.forEach((item, i) => {
      colorMap[item[0]] = colors[i % colors.length];
    });

    // SIZE GAP ĐỒNG ĐỀU + RÕ RÀNG NHẤT (mỗi bậc cách 12–14px)
    function getSize(weight) {
      if (weight >= 90) return 96;   // Hạng 1
      if (weight >= 80) return 82;   // Hạng 2
      if (weight >= 70) return 70;   // Hạng 3
      if (weight >= 60) return 58;   // ...
      if (weight >= 50) return 48;
      if (weight >= 40) return 40;
      if (weight >= 30) return 34;
      if (weight >= 20) return 28;
      return 24; // Nhỏ nhất
    }

    const list = keywordsData.map(d => [d[0], d[1]]);

    // Check if WordCloud library is loaded
    if (typeof WordCloud === 'undefined') {
      console.error('❌ WordCloud library not loaded');
      return;
    }

    const wordcloudElement = document.getElementById('wordcloud');
    if (!wordcloudElement) {
      console.error('❌ Wordcloud element not found');
      return;
    }

    WordCloud(wordcloudElement, {
      list: list,
      
      // SIZE SIÊU RÕ RÀNG
      weightFactor: (weight) => getSize(weight),
      
      // KHÔNG ĐÈ CHỮ – KHOẢNG CÁCH SIÊU RỘNG
      gridSize: 24,           // TĂNG MẠNH → không bao giờ đè
      minSize: 24,
      
      // CHỈ 1 FONT + ĐẸP
      fontFamily: 'Inter',
      fontWeight: '900',
      
      // CÀI ĐẶT HOÀN HẢO
      color: (word) => colorMap[word],
      rotateRatio: 0,         // KHÔNG XOAY → dễ đọc nhất
      backgroundColor: 'transparent',
      shuffle: false,
      shape: 'square',
      ellipticity: 0.8,
      drawOutOfBound: false,
      shrinkToFit: true,
      wait: 60,
      abortThreshold: 10000,  // Đảm bảo 100% không đè

      // TOOLTIP MƯỢT MÀ - DI CHUYỂN NHẸ NHÀNG
      hover: function(item, dim, e) {
        const t = document.getElementById('tooltip');
        
        if (!item) { 
          t.style.opacity = 0;
          return; 
        }
        
        // Cập nhật nội dung
        const newContent = `
          <div class="flex items-center gap-3">
            <span style="color:${colorMap[item[0]]}">⚡</span>
            <div class="text-2xl font-black">${item[0]}</div>
          </div>
          <div class="text-sm mt-2 opacity-80">${item[1]} lần nhắc</div>
        `;
        
        // Chỉ cập nhật nội dung nếu khác keyword trước đó
        if (t.innerHTML !== newContent) {
          t.innerHTML = newContent;
        }
        
        // Tính toán vị trí (không cần setTimeout)
        const rect = t.getBoundingClientRect();
        const tooltipWidth = rect.width || 250; // Fallback nếu chưa render
        const tooltipHeight = rect.height || 100;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const offset = 20;
        
        let left = e.clientX + offset;
        let top = e.clientY - tooltipHeight / 2;
        
        // Kiểm tra bên phải màn hình
        if (left + tooltipWidth + 10 > windowWidth) {
          left = e.clientX - tooltipWidth - offset;
        }
        
        // Kiểm tra phía trên màn hình
        if (top < 10) {
          top = 10;
        }
        
        // Kiểm tra phía dưới màn hình
        if (top + tooltipHeight + 10 > windowHeight) {
          top = windowHeight - tooltipHeight - 10;
        }
        
        // Cập nhật vị trí với transition CSS mượt
        t.style.opacity = 1;
        t.style.left = left + 'px';
        t.style.top = top + 'px';
      }
    });

    console.log('✅ Word Cloud loaded successfully');
  } catch (error) {
    console.error('❌ Error loading word cloud:', error);
  }
}

// Load word cloud when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadWordCloud);
} else {
  loadWordCloud();
}

// Hide tooltip when scrolling
let scrollTimeout;
window.addEventListener('scroll', function() {
  const tooltip = document.getElementById('tooltip');
  if (tooltip && tooltip.style.opacity > 0) {
    tooltip.style.opacity = 0;
  }
  
  // Clear any existing timeout
  clearTimeout(scrollTimeout);
}, { passive: true });
