/* Home page scripts: Activity Log + small helpers */
(function () {
  const clearBtn = document.getElementById('clearLogBtn');
  const consoleBox = document.getElementById('activityConsole');
  if (clearBtn && consoleBox) {
    clearBtn.addEventListener('click', function () {
      consoleBox.innerHTML = '';
    });
  }

  // Optional: expose a lightweight API to append log lines later
  window.HomeActivityLog = {
    append(text, tone = 'default') {
      if (!consoleBox) return;
      const span = document.createElement('div');
      span.className = tone === 'ok' ? 'text-emerald-400' : tone === 'warn' ? 'text-amber-300' : tone === 'err' ? 'text-red-400' : 'text-gray-100';
      span.textContent = text;
      consoleBox.appendChild(span);
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  };
})();
