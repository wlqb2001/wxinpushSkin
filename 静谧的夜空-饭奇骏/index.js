<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cybertron Terminal</title>
    <style>
        :root {
            --neon-cyan: #00f3ff;
            --neon-pink: #ff00ff;
            --cyber-bg: rgba(5, 5, 15, 0.85);
            --border-glow: 0 0 15px rgba(0, 243, 255, 0.5);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Orbitron', 'Segoe UI', 'Microsoft YaHei', sans-serif;
        }
       
        body {
            /* 替换为变形金刚高清背景图，叠加渐变遮罩确保文字清晰 */
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                        url('https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=1920') no-repeat center center fixed;
            background-size: cover;
            color: #fff;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            overflow: hidden;
        }

        /* 赛博朋克扫描线效果 */
        body::after {
            content: " ";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                        linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            z-index: 10;
            background-size: 100% 4px, 3px 100%;
            pointer-events: none;
        }
       
        .container {
            max-width: 700px;
            width: 100%;
            background: var(--cyber-bg);
            backdrop-filter: blur(15px);
            border: 2px solid var(--neon-cyan);
            border-radius: 2px; /* 赛博风通常采用硬朗线条 */
            padding: 40px;
            position: relative;
            box-shadow: var(--border-glow), inset 0 0 20px rgba(0, 243, 255, 0.2);
            clip-path: polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%);
            z-index: 20;
        }

        /* 装饰性角标 */
        .container::before {
            content: "DECEPTICON_DETECTED";
            position: absolute;
            top: 5px;
            right: 20px;
            font-size: 0.6rem;
            color: var(--neon-cyan);
            letter-spacing: 2px;
        }
       
        .title {
            text-align: left;
            margin-bottom: 30px;
            font-size: 2.5rem;
            font-weight: 900;
            text-transform: uppercase;
            color: #fff;
            text-shadow: 3px 3px var(--neon-pink), -1px -1px var(--neon-cyan);
            letter-spacing: 4px;
            font-style: italic;
        }
       
        .info-card {
            background: rgba(255, 255, 255, 0.05);
            margin-bottom: 20px;
            padding: 20px;
            border-left: 5px solid var(--neon-pink);
            position: relative;
            transition: all 0.3s ease;
        }

        .info-card:hover {
            background: rgba(255, 255, 255, 0.1);
            border-left-color: var(--neon-cyan);
            transform: skewX(-2deg);
        }
       
        .info-label {
            font-size: 0.8rem;
            color: var(--neon-pink);
            text-transform: uppercase;
            margin-bottom: 8px;
            letter-spacing: 2px;
            display: block;
        }
       
        .info-content {
            font-size: 1.2rem;
            color: #fff;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            line-height: 1.4;
        }

        /* Glitch 动画 */
        .glitch-anim {
            animation: glitch 3s infinite;
        }

        @keyframes glitch {
            0% { text-shadow: 2px 2px var(--neon-pink), -2px -2px var(--neon-cyan); }
            2% { text-shadow: -3px -3px var(--neon-pink), 3px 3px var(--neon-cyan); }
            4% { text-shadow: 2px -2px var(--neon-pink), -2px 2px var(--neon-cyan); }
            100% { text-shadow: 2px 2px var(--neon-pink), -2px -2px var(--neon-cyan); }
        }

        #date {
            font-family: 'Courier New', monospace;
            color: var(--neon-cyan);
        }

        /* 响应式调整 */
        @media (max-width: 480px) {
            .container { padding: 20px; clip-path: none; }
            .title { font-size: 1.8rem; }
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&display=swap" rel="stylesheet">
</head>
<body>
   
    <div class="container">
        <div class="title glitch-anim" id="title">SYSTEM ALERT</div>
       
        <div class="info-card">
            <span class="info-label">Transmission Header</span>
            <div class="info-content" id="message">Loading signal...</div>
        </div>
       
        <div class="info-card">
            <span class="info-label">Timestamp</span>
            <div class="info-content" id="date">00:00:00.000</div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
    <script>
        function getUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                title: urlParams.get('title') || 'CYBERTRON_MSG',
                message: urlParams.get('message') || 'STANDBY FOR DATA TRANSMISSION...',
                date: urlParams.get('date') || new Date().toISOString()
            };
        }

        function renderMarkdown() {
            const messageEl = document.getElementById('message');
            if (messageEl && typeof marked !== 'undefined' && messageEl.textContent !== 'Loading signal...') {
                const markdownText = messageEl.textContent;
                messageEl.innerHTML = marked.parse(markdownText);
            }
        }

        function fillContent() {
            const params = getUrlParams();
            document.getElementById('title').textContent = params.title;
            document.getElementById('message').textContent = params.message;
            document.getElementById('date').textContent = params.date;
            renderMarkdown();
        }

        window.onload = fillContent;
    </script>
</body>
</html>
