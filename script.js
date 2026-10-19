/* ============================================================
   VNWM-day  –  Vietnamese Women's Day Greeting App
   Main Script
   ============================================================ */

// ─── Song Registry ──────────────────────────────────────────
const ALL_SONGS = [
    { id: "buon-cu-khoc-di", title: "Buồn Của Anh x Khóc Đi", artist: "Unknown", frame: "assets/frame/buon-cu-khoc-di.html" },
    { id: "chung-ta-cua-hien-tai", title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng M-TP", frame: "assets/frame/chung-ta-cua-hien-tai.html" },
    { id: "co-hen-voi-thanh-xuan", title: "Có Hẹn Với Thanh Xuân", artist: "MONSTAR", frame: "assets/frame/co-hen-voi-thanh-xuan.html" },
    { id: "con-mua-ngang-qua", title: "Cơn Mưa Ngang Qua", artist: "Sơn Tùng M-TP", frame: "assets/frame/con-mua-ngang-qua.html" },
    { id: "couting-star", title: "Counting Stars", artist: "OneRepublic", frame: "assets/frame/couting-star.html" },
    { id: "dancing-with-your-ghost", title: "Dancing With Your Ghost", artist: "Sasha Alex Sloan", frame: "assets/frame/dancing-with-your-ghost.html" },
    { id: "dua-em-ve-nha", title: "Đưa Em Về Nhà", artist: "GREY D", frame: "assets/frame/dua-em-ve-nha.html" },
    { id: "em-la-hoang-hon", title: "Em Là Hoàng Hôn", artist: "Unknown", frame: "assets/frame/em-la-hoang-hon.html" },
    { id: "let-me-down-slowly", title: "Let Me Down Slowly", artist: "Alec Benjamin", frame: "assets/frame/let-me-down-slowly.html" },
    { id: "mat-moc", title: "Mặt Mộc", artist: "Unknown", frame: "assets/frame/mat-moc.html" },
    { id: "mood", title: "Mood", artist: "24kGoldn", frame: "assets/frame/mood.html" },
    { id: "past-life", title: "Past Life", artist: "Trevor Daniel", frame: "assets/frame/past-life.html" },
    { id: "rang-em-mai-o-ben", title: "Rằng Em Mãi Ở Bên", artist: "BÍCH PHƯƠNG", frame: "assets/frame/rang-em-mai-o-ben.html" },
    { id: "reality", title: "Reality", artist: "Lost Frequencies", frame: "assets/frame/reality.html" },
    { id: "super-best-friend", title: "Super Best Friend", artist: "Unknown", frame: "assets/frame/super-best-friend.html" },
    { id: "thap-roi-tu-do", title: "Tháp Rơi Tự Do", artist: "Unknown", frame: "assets/frame/thap-roi-tu-do.html" },
    { id: "tuy-am", title: "Túy Âm", artist: "Xesi x Masew", frame: "assets/frame/tuy-am.html" },
    { id: "we-dont-talk-any-more", title: "We Don't Talk Anymore", artist: "Charlie Puth", frame: "assets/frame/we-dont-talk-any-more.html" },
    { id: "wrong-time", title: "Wrong Times", artist: "Post Malone", frame: "assets/frame/wrong-time.html" },
    { id: "yeu-dung-so-dau", title: "Yêu Đừng Sợ Đau", artist: "NGUYÊN.", frame: "assets/frame/yeu-dung-so-dau.html" }
];

// ─── Background Rotation ────────────────────────────────────
const backgrounds = [
    "assets/img/bg1.jpg",
    "assets/img/bg2.jpg",
    "assets/img/bg3.jpg",
    "assets/img/bg4.jpg",
    "assets/img/bg5.jpg"
];
let bgIndex = 0;

function changeBackground() {
    document.body.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
    bgIndex = (bgIndex + 1) % backgrounds.length;
}

window.addEventListener("load", () => {
    changeBackground();
    setInterval(changeBackground, 10000);
});

// ─── Utility: Remove Vietnamese Diacritics ──────────────────
function removeVietnameseDiacritics(str) {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

// ─── Utility: Find Message For Name (from names.js) ─────────
function findMessageForName(inputName) {
    if (typeof specialGroups === "undefined") return null;
    const normalised = inputName.trim().toLowerCase();
    for (const group of specialGroups) {
        const match = group.names.some(
            (n) => n.toLowerCase() === normalised
        );
        if (match) return group;
    }
    return null;
}

// ─── Typewriter Effect ──────────────────────────────────────
function typeTextVertical(text, container, callback) {
    container.innerHTML = "";
    let i = 0;
    const chars = text.split("");
    const timer = setInterval(() => {
        const c = chars[i];
        if (c === "\n") container.innerHTML += "<br/>";
        else container.innerHTML += c;
        i++;
        container.scrollTop = container.scrollHeight;
        if (i >= chars.length) {
            clearInterval(timer);
            if (callback) callback();
        }
    }, 80);
}

// ─── State ──────────────────────────────────────────────────
let receiverConfig = null;   // loaded config from reciver/*.js
let currentLetters = [];     // array of letter objects
let filteredPlaylist = [];   // songs available after music config filter
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
let shuffledOrder = [];      // shuffled indices
let userName = "";

// ─── DOM Ready ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const btnSubmit     = document.getElementById("btnSubmit");
    const nameInput     = document.getElementById("nameInput");
    const inviteCode    = document.getElementById("inviteCode");
    const loginScreen   = document.getElementById("loginScreen");
    const appScreen     = document.getElementById("appScreen");
    const inboxView     = document.getElementById("inboxView");
    const letterView    = document.getElementById("letterView");
    const btnBack       = document.getElementById("btnBack");
    const mailList      = document.getElementById("mailList");

    // Music player elements
    const musicPlayerBar  = document.getElementById("musicPlayerBar");
    const btnPlayPause    = document.getElementById("btnPlayPause");
    const btnNext         = document.getElementById("btnNext");
    const btnPrev         = document.getElementById("btnPrev");
    const btnShuffle      = document.getElementById("btnShuffle");
    const btnRepeat       = document.getElementById("btnRepeat");
    const btnPlaylist     = document.getElementById("btnPlaylist");
    const btnClosePlaylist = document.getElementById("btnClosePlaylist");
    const playlistPopup   = document.getElementById("playlistPopup");
    const playlistItems   = document.getElementById("playlistItems");
    const spotifyEmbed    = document.getElementById("spotifyEmbed");
    const songTitle       = document.getElementById("songTitle");
    const songArtist      = document.getElementById("songArtist");
    const volumeSlider    = document.getElementById("volumeSlider");

    // ── Submit / Login ──────────────────────────────────────
    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => handleLogin());
    }

    // Allow Enter key on inputs
    if (nameInput) {
        nameInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleLogin();
        });
    }
    if (inviteCode) {
        inviteCode.addEventListener("keydown", (e) => {
            if (e.key === "Enter") handleLogin();
        });
    }

    async function handleLogin() {
        const name = (nameInput ? nameInput.value.trim() : "");
        const code = (inviteCode ? inviteCode.value.trim() : "");

        if (!name) {
            alert("Nhập tên trước nhé 💌");
            return;
        }

        userName = name;

        if (!code) {
            // Show custom popup asking about invite code
            showInviteCodePopup(
                async () => {
                    // Continue without code
                    await proceedLogin(name, "");
                },
                () => {
                    // Go back and enter code
                    if (inviteCode) inviteCode.focus();
                }
            );
            return;
        }

        await proceedLogin(name, code);
    }

    async function proceedLogin(name, code) {
        const baseName = removeVietnameseDiacritics(name)
            .toLowerCase()
            .replace(/\s+/g, "-");

        let config = null;

        // 1. If invite code provided, try name-code combo first
        if (code) {
            const filenameWithCode = `${baseName}-${code}`;
            config = await loadReceiverConfig(filenameWithCode);
        }

        // 2. If not found (or no code), try name-only
        if (!config) {
            config = await loadReceiverConfig(baseName);
        }

        // 3. If config found, use it
        if (config) {
            receiverConfig = config;
            currentLetters = config.letters || [];

            // If config has no letters array but has top-level sender/title/content
            if (currentLetters.length === 0 && config.sender) {
                currentLetters = [{
                    sender: config.sender,
                    title: config.title || "Thư chúc ngày 20/10",
                    content: config.content || "",
                    ending: config.ending || ""
                }];
            }
        } else {
            // 4. Fallback to names.js
            receiverConfig = null;
            const matched = findMessageForName(name);
            if (matched) {
                const content = matched.message || "";
                const ending = matched.ending || "";
                currentLetters = [{
                    sender: "Huy Tran",
                    title: "Thư chúc ngày 20/10",
                    content: content,
                    ending: ending,
                    displayName: matched.displayName || name
                }];
            } else {
                currentLetters = [{
                    sender: "Huy Tran",
                    title: "Thư chúc ngày 20/10",
                    content: `Chúc ${name} ngày Phụ Nữ Việt Nam 20/10 thật vui vẻ và hạnh phúc! 🌸`,
                    ending: ""
                }];
            }
        }

        // Build filtered playlist
        buildFilteredPlaylist();

        // Transition screens
        if (loginScreen) loginScreen.style.display = "none";
        if (appScreen) appScreen.style.display = "flex";

        // Build inbox
        buildInbox();

        // Setup music player
        setupMusicPlayer();
    }

    // ── Load Receiver Config via <script> tag ───────────────
    function loadReceiverConfig(filename) {
        return new Promise((resolve) => {
            // Clean up any previous RECEIVER_CONFIG
            if (window.RECEIVER_CONFIG) {
                delete window.RECEIVER_CONFIG;
            }

            const script = document.createElement("script");
            script.src = `reciver/${filename}.js`;

            script.onload = () => {
                if (window.RECEIVER_CONFIG) {
                    const cfg = window.RECEIVER_CONFIG;
                    resolve(cfg);
                } else {
                    resolve(null);
                }
            };

            script.onerror = () => {
                // File not found / 404
                resolve(null);
            };

            document.head.appendChild(script);
        });
    }

    // ── Custom Invite Code Popup ────────────────────────────
    function showInviteCodePopup(onContinue, onGoBack) {
        // Remove existing popup if any
        const existing = document.getElementById("inviteCodePopup");
        if (existing) existing.remove();

        const overlay = document.createElement("div");
        overlay.id = "inviteCodePopup";
        overlay.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            display: flex; align-items: center; justify-content: center;
            background: rgba(0,0,0,0.55);
            backdrop-filter: blur(4px);
            animation: fadeIn 0.25s ease;
        `;

        const box = document.createElement("div");
        box.style.cssText = `
            background: rgba(255,255,255,0.12);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 18px;
            padding: 32px 28px 24px;
            max-width: 360px; width: 90%;
            text-align: center;
            color: #fff;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            animation: popIn 0.3s ease;
        `;

        const msg = document.createElement("p");
        msg.textContent = "quên chưa nhập invitecode kìa !";
        msg.style.cssText = `
            font-size: 1.05rem; margin: 0 0 24px;
            line-height: 1.5; font-weight: 500;
        `;

        const btnRow = document.createElement("div");
        btnRow.style.cssText = `
            display: flex; gap: 12px;
            justify-content: center; flex-wrap: wrap;
        `;

        const btnContinue = document.createElement("button");
        btnContinue.textContent = "Tiếp tục không cần code";
        btnContinue.style.cssText = `
            padding: 10px 18px; border: none; border-radius: 12px;
            background: linear-gradient(135deg, #ff6b9d, #c44dff);
            color: #fff; font-size: 0.9rem; cursor: pointer;
            font-weight: 600; transition: transform 0.2s, box-shadow 0.2s;
        `;
        btnContinue.addEventListener("mouseenter", () => {
            btnContinue.style.transform = "scale(1.05)";
            btnContinue.style.boxShadow = "0 4px 16px rgba(196,77,255,0.4)";
        });
        btnContinue.addEventListener("mouseleave", () => {
            btnContinue.style.transform = "scale(1)";
            btnContinue.style.boxShadow = "none";
        });

        const btnBack2 = document.createElement("button");
        btnBack2.textContent = "Để tui nhập đã";
        btnBack2.style.cssText = `
            padding: 10px 18px; border: 1px solid rgba(255,255,255,0.3);
            border-radius: 12px; background: rgba(255,255,255,0.1);
            color: #fff; font-size: 0.9rem; cursor: pointer;
            font-weight: 600; transition: transform 0.2s, background 0.2s;
        `;
        btnBack2.addEventListener("mouseenter", () => {
            btnBack2.style.transform = "scale(1.05)";
            btnBack2.style.background = "rgba(255,255,255,0.2)";
        });
        btnBack2.addEventListener("mouseleave", () => {
            btnBack2.style.transform = "scale(1)";
            btnBack2.style.background = "rgba(255,255,255,0.1)";
        });

        btnContinue.addEventListener("click", () => {
            overlay.remove();
            onContinue();
        });

        btnBack2.addEventListener("click", () => {
            overlay.remove();
            onGoBack();
        });

        btnRow.appendChild(btnContinue);
        btnRow.appendChild(btnBack2);
        box.appendChild(msg);
        box.appendChild(btnRow);
        overlay.appendChild(box);
        document.body.appendChild(overlay);

        // Close on overlay click (outside box)
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.remove();
                onGoBack();
            }
        });
    }

    // ── Build Inbox ─────────────────────────────────────────
    function buildInbox() {
        if (!mailList) return;
        mailList.innerHTML = "";

        if (currentLetters.length === 0) {
            mailList.innerHTML = `<p style="text-align:center;color:rgba(255,255,255,0.6);padding:24px;">Không có thư nào 📭</p>`;
            return;
        }

        currentLetters.forEach((letter, index) => {
            const card = document.createElement("div");
            card.className = "mail-card";
            card.setAttribute("data-index", index);

            card.innerHTML = `
                <div class="mail-icon">📩</div>
                <div class="mail-info">
                    <div class="mail-sender">${escapeHtml(letter.sender || "Ẩn danh")}</div>
                    <div class="mail-title">${escapeHtml(letter.title || "Thư chúc ngày 20/10")}</div>
                </div>
                <div class="mail-arrow"><i class="fas fa-chevron-right"></i></div>
            `;

            card.addEventListener("click", () => openLetter(index));
            mailList.appendChild(card);
        });

        // Show inbox, hide letter
        if (inboxView) inboxView.style.display = "block";
        if (letterView) letterView.style.display = "none";
    }

    // ── Open Letter ─────────────────────────────────────────
    function openLetter(index) {
        const letter = currentLetters[index];
        if (!letter) return;

        if (inboxView) inboxView.style.display = "none";
        if (letterView) letterView.style.display = "flex";

        const letterContent = document.getElementById("letterContent");
        const letterSender  = document.getElementById("letterSender");

        // Build full text: content + ending + sender signature
        let fullText = letter.content || "";
        if (letter.ending) {
            fullText += "\n\n" + letter.ending;
        }

        // Type the content with typewriter effect
        if (letterContent) {
            typeTextVertical(fullText, letterContent, () => {
                // After typing finishes, show sender signature
                if (letterSender) {
                    letterSender.textContent = `— ${letter.sender || "Ẩn danh"}`;
                    letterSender.style.opacity = "0";
                    letterSender.style.display = "block";
                    requestAnimationFrame(() => {
                        letterSender.style.transition = "opacity 0.8s ease";
                        letterSender.style.opacity = "1";
                    });
                }
            });
        }

        // Clear sender initially
        if (letterSender) {
            letterSender.style.display = "none";
            letterSender.textContent = "";
        }
    }

    // ── Back Button ─────────────────────────────────────────
    if (btnBack) {
        btnBack.addEventListener("click", () => {
            if (letterView) letterView.style.display = "none";
            if (inboxView) inboxView.style.display = "block";
        });
    }

    // ── Build Filtered Playlist ─────────────────────────────
    function buildFilteredPlaylist() {
        const music = receiverConfig ? receiverConfig.music : null;

        if (music && music.disable === true) {
            filteredPlaylist = [];
            return;
        }

        if (music && music.mode === "select" && Array.isArray(music.songs)) {
            filteredPlaylist = ALL_SONGS.filter((s) =>
                music.songs.includes(s.id)
            );
        } else if (music && music.mode === "all") {
            const except = Array.isArray(music.except) ? music.except : [];
            filteredPlaylist = ALL_SONGS.filter(
                (s) => !except.includes(s.id)
            );
        } else {
            // Default: all songs
            filteredPlaylist = [...ALL_SONGS];
        }

        // Reset state
        currentSongIndex = 0;
        isShuffled = false;
        shuffledOrder = [];
    }

    // ── Setup Music Player ──────────────────────────────────
    function setupMusicPlayer() {
        const music = receiverConfig ? receiverConfig.music : null;

        if (music && music.disable === true) {
            // Hide player entirely
            if (musicPlayerBar) musicPlayerBar.style.display = "none";
            document.body.classList.remove("has-player");
            return;
        }

        if (filteredPlaylist.length === 0) {
            if (musicPlayerBar) musicPlayerBar.style.display = "none";
            document.body.classList.remove("has-player");
            return;
        }

        // Show player
        if (musicPlayerBar) musicPlayerBar.style.display = "";
        document.body.classList.add("has-player");

        // Load first song
        loadSongEmbed(0);

        // Build playlist popup
        buildPlaylistPopup();
    }

    // ── Load Song Embed ─────────────────────────────────────
    async function loadSongEmbed(index) {
        if (filteredPlaylist.length === 0) return;

        // Wrap index
        if (index < 0) index = filteredPlaylist.length - 1;
        if (index >= filteredPlaylist.length) index = 0;

        currentSongIndex = index;
        const song = filteredPlaylist[index];

        // Update song info display
        if (songTitle) songTitle.textContent = song.title;
        if (songArtist) songArtist.textContent = song.artist;

        // Load the embed iframe from the frame HTML file
        if (spotifyEmbed) {
            try {
                const resp = await fetch(song.frame);
                if (resp.ok) {
                    const html = await resp.text();
                    spotifyEmbed.innerHTML = html;
                } else {
                    spotifyEmbed.innerHTML = `<p style="color:rgba(255,255,255,0.5);text-align:center;padding:12px;">Không tải được nhạc</p>`;
                }
            } catch (err) {
                spotifyEmbed.innerHTML = `<p style="color:rgba(255,255,255,0.5);text-align:center;padding:12px;">Không tải được nhạc</p>`;
            }
        }

        // Update play state visual
        isPlaying = true;
        updatePlayPauseIcon();

        // Update active item in playlist popup
        updatePlaylistActive();
    }

    // ── Play / Pause ────────────────────────────────────────
    if (btnPlayPause) {
        btnPlayPause.addEventListener("click", () => {
            isPlaying = !isPlaying;
            updatePlayPauseIcon();
        });
    }

    function updatePlayPauseIcon() {
        if (!btnPlayPause) return;
        const icon = btnPlayPause.querySelector("i");
        if (!icon) return;
        if (isPlaying) {
            icon.className = "fas fa-pause";
        } else {
            icon.className = "fas fa-play";
        }
    }

    // ── Next / Prev ─────────────────────────────────────────
    if (btnNext) {
        btnNext.addEventListener("click", () => {
            if (filteredPlaylist.length === 0) return;
            let nextIdx;
            if (isShuffled) {
                nextIdx = getShuffledNext();
            } else {
                nextIdx = currentSongIndex + 1;
                if (nextIdx >= filteredPlaylist.length) {
                    nextIdx = 0;
                }
            }
            loadSongEmbed(nextIdx);
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener("click", () => {
            if (filteredPlaylist.length === 0) return;
            let prevIdx;
            if (isShuffled) {
                prevIdx = getShuffledPrev();
            } else {
                prevIdx = currentSongIndex - 1;
                if (prevIdx < 0) {
                    prevIdx = filteredPlaylist.length - 1;
                }
            }
            loadSongEmbed(prevIdx);
        });
    }

    // ── Shuffle ─────────────────────────────────────────────
    if (btnShuffle) {
        btnShuffle.addEventListener("click", () => {
            isShuffled = !isShuffled;
            btnShuffle.classList.toggle("active", isShuffled);
            if (isShuffled) {
                generateShuffledOrder();
            }
        });
    }

    function generateShuffledOrder() {
        shuffledOrder = [];
        for (let i = 0; i < filteredPlaylist.length; i++) {
            shuffledOrder.push(i);
        }
        // Fisher-Yates shuffle
        for (let i = shuffledOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
        }
    }

    function getShuffledNext() {
        if (shuffledOrder.length === 0) generateShuffledOrder();
        const currentShufflePos = shuffledOrder.indexOf(currentSongIndex);
        const nextPos = (currentShufflePos + 1) % shuffledOrder.length;
        return shuffledOrder[nextPos];
    }

    function getShuffledPrev() {
        if (shuffledOrder.length === 0) generateShuffledOrder();
        const currentShufflePos = shuffledOrder.indexOf(currentSongIndex);
        const prevPos = (currentShufflePos - 1 + shuffledOrder.length) % shuffledOrder.length;
        return shuffledOrder[prevPos];
    }

    // ── Repeat ──────────────────────────────────────────────
    if (btnRepeat) {
        btnRepeat.addEventListener("click", () => {
            isRepeating = !isRepeating;
            btnRepeat.classList.toggle("active", isRepeating);
        });
    }

    // ── Volume Slider (visual only) ─────────────────────────
    if (volumeSlider) {
        volumeSlider.addEventListener("input", () => {
            // Visual feedback only – cannot control Spotify embed volume
            const val = volumeSlider.value;
            volumeSlider.style.setProperty("--volume-pct", `${val}%`);
        });
    }

    // ── Playlist Popup ──────────────────────────────────────
    if (btnPlaylist) {
        btnPlaylist.addEventListener("click", () => {
            if (playlistPopup) {
                const isVisible = playlistPopup.classList.contains("show");
                playlistPopup.classList.toggle("show", !isVisible);
            }
        });
    }

    if (btnClosePlaylist) {
        btnClosePlaylist.addEventListener("click", () => {
            if (playlistPopup) playlistPopup.classList.remove("show");
        });
    }

    function buildPlaylistPopup() {
        if (!playlistItems) return;
        playlistItems.innerHTML = "";

        filteredPlaylist.forEach((song, index) => {
            const item = document.createElement("div");
            item.className = "playlist-item";
            if (index === currentSongIndex) item.classList.add("active");
            item.setAttribute("data-index", index);

            item.innerHTML = `
                <div class="playlist-item-cover">
                    <i class="fas fa-music"></i>
                </div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${escapeHtml(song.title)}</div>
                    <div class="playlist-item-artist">${escapeHtml(song.artist)}</div>
                </div>
            `;

            item.addEventListener("click", () => {
                loadSongEmbed(index);
            });

            playlistItems.appendChild(item);
        });
    }

    function updatePlaylistActive() {
        if (!playlistItems) return;
        const items = playlistItems.querySelectorAll(".playlist-item");
        items.forEach((item) => {
            const idx = parseInt(item.getAttribute("data-index"), 10);
            item.classList.toggle("active", idx === currentSongIndex);
        });
    }

    // ── Escape HTML ─────────────────────────────────────────
    function escapeHtml(str) {
        if (!str) return "";
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
});
