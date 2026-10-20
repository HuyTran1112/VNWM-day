/* ============================================================
VNWM-day  –  Vietnamese Women's Day Greeting App
   ============================================================ */

const ALL_SONGS = [
    { id: "Photograph ", title: "Photograph ", artist: "Ed Sheeran", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1HNkqx9Ahdgi1Ixy2xkKkL?utm_source=generator&si=552b12ceb82c48c6" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "chung-ta-cua-hien-tai", title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng M-TP", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1J3SmWwlYAG68LGKr86MVH?utm_source=generator&amp;si=f86f9e8f36404658" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "laviem", title: "LAVIEM", artist: "Quang Hùng MasterD, Captian Boy, Cool Kid", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1IWEzoYndBj6ntPQ1nYiFP?utm_source=generator&si=6570c6374c494c32" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "cho-chut", title: "Chờ chút", artist: "CONGB", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/6flJE5kzGGFK30F7kBPPno?utm_source=generator&si=82ff4a7ca8704e74" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "buon-cu-khoc-di", title: "Buồn Của Anh x Khóc Đi", artist: "Nhiều nghệ sĩ", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/6iXGivPFpsqKmrINhIbPvx?utm_source=generator&amp;si=cbcff0bb0c7c4dc2" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "dancing-with-your-ghost", title: "Dancing With Your Ghost", artist: "Sasha Alex Sloan", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1TQXIltqoZ5XXyfCbAeSQQ?utm_source=generator&amp;si=899bec73927544c2" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "dua-em-ve-nha", title: "Đưa Em Về Nhà", artist: "GREY D", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/5LQpQ6SDeaz6SIkR0lvsoC?utm_source=generator&amp;si=a65b8b933a53461e" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "em-la-hoang-hon", title: "Em Là Hoàng Hôn", artist: "Nhiều nghệ sĩ", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/1WP88YSMSbnhabfoi4HjSz?utm_source=generator&amp;si=cf819bebda9b4214" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "mat-moc", title: "Mặt Mộc", artist: "Nhiều nghệ sĩ", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3dvkpe9FEekxxgaQtxOHQI?utm_source=generator&amp;si=ab9824cab9da47d3" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` },
    { id: "co-hen-voi-thanh-xuan", title: "Có Hẹn Với Thanh Xuân", artist: "MONSTAR", frame: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/3w47lCq1coETsiAMDDu6cc?utm_source=generator&amp;si=a68ab7d3abd04b3f" width="100%" height="80" frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>` }
    
];

const backgrounds = [
    "assets/img/bg1.jpg",
    "assets/img/bg2.jpg",
    "assets/img/bg3.jpg",
    "assets/img/bg4.jpg",
    "assets/img/background-20-10-017.jpg",
    "assets/img/bg-20-10-8.jpg",
    "assets/img/4.jpg",
    "assets/img/3.jpg",
    "assets/img/2.jpg",
    "assets/img/1.jpg",
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

function removeVietnameseDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
}

let receiverConfig = null;
let currentLetters = [];
let filteredPlaylist = [];
let userName = "";
let currentSongIndex = 0;
let typingTimer = null;

let isStep2 = false; 
let isPopupOpen = false; 

document.addEventListener("DOMContentLoaded", () => {
    const btnSubmit = document.getElementById("btnSubmit");
    const nameInput = document.getElementById("nameInput");
    const inviteCode = document.getElementById("inviteCode");
    const inputRow = document.getElementById("inputRow");
    const loginScreen = document.getElementById("loginScreen");
    const loginFormContainer = document.getElementById("loginFormContainer");
    const titleText = document.getElementById("titleText");
    const mainTitle = document.getElementById("mainTitle");
    const formContent = document.getElementById("formContent");
    const appScreen = document.getElementById("appScreen");
    const inboxView = document.getElementById("inboxView");
    const letterView = document.getElementById("letterView");
    const btnBack = document.getElementById("btnBack");
    const mailList = document.getElementById("mailList");
    
    const musicContainer = document.getElementById("musicContainer");
    const spotifyPlayerWidget = document.getElementById("spotifyPlayerWidget");
    const btnTogglePlaylist = document.getElementById("btnTogglePlaylist");
    const playlistPopup = document.getElementById("playlistPopup");
    const btnClosePlaylist = document.getElementById("btnClosePlaylist");
    const playlistItemsContainer = document.getElementById("playlistItems");

    async function playIntro() {
        const typeText = async (text, speed = 80) => {
            titleText.textContent = "";
            for (let i = 0; i < text.length; i++) {
                titleText.textContent += text[i];
                await new Promise(r => setTimeout(r, speed));
            }
        };

        const deleteText = async (speed = 40) => {
            let str = titleText.textContent;
            while (str.length > 0) {
                str = str.slice(0, -1);
                titleText.textContent = str;
                await new Promise(r => setTimeout(r, speed));
            }
        };

        await typeText("Happy Woman Day");
        await new Promise(r => setTimeout(r, 2000)); 

        await deleteText();
        await new Promise(r => setTimeout(r, 500)); 

        await typeText("Welcome");
        await new Promise(r => setTimeout(r, 800)); 

        mainTitle.classList.add("no-cursor");
        mainTitle.classList.remove("intro-mode"); 
        loginFormContainer.classList.add("show-bg");
        formContent.classList.add("show");
        mainTitle.classList.add("show-emoji");
    }

    playIntro();

    function proceedToNextStep() {
        if (isPopupOpen) return;

        if (!isStep2) {
            const name = nameInput.value.trim();
            if (!name) {
                alert("Bạn ơi nhập tên trước nhé 💌");
                return;
            }
            
            isStep2 = true;
            inputRow.classList.add("step2");
            btnSubmit.innerHTML = "🌸 Enter 🌹";
            
            setTimeout(() => { inviteCode.focus(); }, 300);
        } else {
            handleLogin();
        }
    }

    btnSubmit.addEventListener("click", () => proceedToNextStep());

    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proceedToNextStep();
        }
    });

    inviteCode.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            proceedToNextStep();
        }
    });

    async function handleLogin() {
        if (isPopupOpen) return;

        const name = nameInput.value.trim();
        const code = inviteCode.value.trim();

        userName = name;

        if (!code) {
            showInvitePopup(() => {
                proceedLogin(name, "");
            });
            return;
        }
        proceedLogin(name, code);
    }

    function showInvitePopup(onContinue) {
        isPopupOpen = true; 

        const overlay = document.createElement("div");
        overlay.className = "invite-popup-overlay";
        overlay.innerHTML = `
            <div class="invite-popup-box">
                <p>Quên chưa nhập invitecode kìa !</p>
                <small>không nhập mất quyền lợi đó nhá :></small>
                <div class="invite-btn-row">
                    <button class="btn-continue">Vẫn tiếp tục</button>
                    <button class="btn-back">Từ từ đã...</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        const closePopup = () => {
            isPopupOpen = false;
            document.removeEventListener("keydown", handlePopupEnter);
            overlay.remove();
        };

        const handlePopupEnter = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                closePopup();
                onContinue(); 
            }
        };

        setTimeout(() => {
            document.addEventListener("keydown", handlePopupEnter);
        }, 100);

        overlay.querySelector(".btn-continue").addEventListener("click", () => {
            closePopup();
            onContinue();
        });
        
        overlay.querySelector(".btn-back").addEventListener("click", () => {
            closePopup();
            inviteCode.focus();
        });
    }

    async function proceedLogin(name, code) {
        let config = null;
        
        // Quét dữ liệu trực tiếp trong window.RECEIVER_DATA
        if (window.RECEIVER_DATA) {
            const cleanCode = code.trim();
            const cleanName = removeVietnameseDiacritics(name).toLowerCase();
            const nameWords = cleanName.split(/\s+/);

            // Ưu tiên tìm bằng ID
            if (cleanCode) {
                config = window.RECEIVER_DATA.find(item => item.id && String(item.id) === cleanCode);
            }

            // Nếu không có ID, tìm bằng Tên
            if (!config && cleanName) {
                config = window.RECEIVER_DATA.find(item => {
                    const registryWords = removeVietnameseDiacritics(item.name).toLowerCase().split(/\s+/);
                    return nameWords.some(w => registryWords.includes(w));
                });
            }
        }
        
        if (config) {
            receiverConfig = config;
            currentLetters = [];

            // Quét tự động tất cả các lá thư (letters0, letters1...) trong Object được tìm thấy
            Object.keys(config).forEach(key => {
                if (key.startsWith("letters")) {
                    let letterData = config[key];
                    let letterList = Array.isArray(letterData) ? letterData : [letterData];
                    
                    letterList.forEach(letterObj => {
                        if (letterObj) {
                            currentLetters.push({
                                sender: letterObj.sender || "Người bạn giấu tên",
                                title: "Thư chúc 20/10",
                                content: letterObj.messages || "",
                                ending: letterObj.ending || "see yaa",
                                senderSign: letterObj.signature || "Huy Tran",
                                displayName: letterObj.reciver || name
                            });
                        }
                    });
                }
            });
        } else {
            // Mặc định nếu nhập sai tên/code và không tìm thấy ai
            currentLetters = [{
                sender: "Người bạn giấu tên",
                title: "Thư chúc 20/10",
                content: `Chúc ${name} một ngày 20/10 tràn ngập niềm vui và hạnh phúc nhé! 🌸`,
                ending: "see yaa",
                senderSign: "Huy Tran",
                displayName: name
            }];
            receiverConfig = { music: { disable: false, mode: "all" } };
        }

        buildFilteredPlaylist();
        loginScreen.style.display = "none";
        appScreen.style.display = "block";
        buildInbox();
        setupMusicPlayer();
    }

    function buildInbox() {
        mailList.innerHTML = "";
        currentLetters.forEach((letter, index) => {
            const card = document.createElement("div");
            card.className = "mail-card";
            card.style.animationDelay = `${index * 0.15}s`;
            
            // Đã xóa dòng <div class="mail-title">${letter.title}</div> ở đây
            card.innerHTML = `
                <div class="mail-icon"><i class="fas fa-envelope"></i></div>
                <div class="mail-info">
                    <div class="mail-sender">${letter.sender}</div>
                </div>
            `;
            
            card.addEventListener("click", function() {
                openLetter(index, this);
            });
            mailList.appendChild(card);
        });
        inboxView.style.display = "block";
        letterView.style.display = "none";
    }

    function openLetter(index, cardElement) {
        const letter = currentLetters[index];

        document.querySelectorAll('.mail-card').forEach(c => c.classList.remove('morph-active'));
        cardElement.classList.add('morph-active');

        const updateDOM = () => {
            inboxView.style.display = "none";
            letterView.style.display = "block";
            
            document.getElementById("letterDate").textContent = "20-10-2026";
            document.getElementById("letterTo").textContent = `To: ${letter.displayName || userName}`;
            document.getElementById("letterContent").innerHTML = "";
            document.getElementById("endingArea").innerHTML = "";
            document.getElementById("letterSender").innerHTML = "";
        };

        if (document.startViewTransition) {
            const transition = document.startViewTransition(updateDOM);
            transition.finished.then(() => startTypingEffect(letter));
        } else {
            updateDOM();
            startTypingEffect(letter);
        }
    }

    function startTypingEffect(letter) {
        clearInterval(typingTimer);
        
        const contentDiv = document.getElementById("letterContent");
        const endingDiv = document.getElementById("endingArea");
        const senderDiv = document.getElementById("letterSender");
        
        contentDiv.innerHTML = "";
        endingDiv.innerHTML = "";
        senderDiv.innerHTML = "";
        
        const contentChars = (letter.content || "").split("");
        const endingChars = (letter.ending || "").split("");
        const senderChars = (letter.senderSign || "").split("");
        
        let phase = 1;
        let i = 0;
        let currentChars = contentChars;
        let currentDiv = contentDiv;

        typingTimer = setInterval(() => {
            if (i < currentChars.length) {
                if (currentChars[i] === "\n") currentDiv.innerHTML += "<br>";
                else currentDiv.innerHTML += currentChars[i];
                i++;
            } else {
                if (phase === 1) {
                    phase = 2;
                    currentChars = endingChars;
                    currentDiv = endingDiv;
                    i = 0;
                } else if (phase === 2) {
                    phase = 3;
                    currentChars = senderChars;
                    currentDiv = senderDiv;
                    i = 0;
                } else {
                    clearInterval(typingTimer);
                }
            }
        }, 50); 
    }

    btnBack.addEventListener("click", () => {
        clearInterval(typingTimer);
        
        const updateDOM = () => {
            letterView.style.display = "none";
            inboxView.style.display = "block";
        };

        if (document.startViewTransition) {
            document.startViewTransition(updateDOM);
        } else {
            updateDOM();
        }
    });

    // ==========================================
    // LOGIC NHẠC
    // ==========================================
    function buildFilteredPlaylist() {
        const music = receiverConfig ? receiverConfig.music : null;
        
        if (music === false || (typeof music === "object" && music.disable)) {
            filteredPlaylist = [];
            return;
        }
        
        if (typeof music === "object" && music.mode === "select" && music.songs) {
            filteredPlaylist = ALL_SONGS.filter(s => music.songs.includes(s.id));
        } else if (typeof music === "object" && music.mode === "all" && music.except) {
            filteredPlaylist = ALL_SONGS.filter(s => !music.except.includes(s.id));
        } else {
            filteredPlaylist = [...ALL_SONGS];
        }
    }

    function setupMusicPlayer() {
        if (filteredPlaylist.length === 0) {
            musicContainer.style.display = "none";
            return;
        }
        musicContainer.style.display = "flex";
        loadSpecificSong(0);
    }

    function loadSpecificSong(index) {
        currentSongIndex = index;
        const songToPlay = filteredPlaylist[index];
        spotifyPlayerWidget.innerHTML = songToPlay.frame;
        renderPlaylistUI();
    }

    function renderPlaylistUI() {
        playlistItemsContainer.innerHTML = "";
        filteredPlaylist.forEach((song, index) => {
            const div = document.createElement("div");
            div.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
            div.innerHTML = `
                <div class="playlist-item-info">
                    <div class="playlist-item-title">${song.title}</div>
                    <div class="playlist-item-artist">${song.artist}</div>
                </div>
            `;
            div.addEventListener("click", () => {
                loadSpecificSong(index);
                playlistPopup.classList.remove("show"); 
            });
            playlistItemsContainer.appendChild(div);
        });
    }

    btnTogglePlaylist.addEventListener("click", () => {
        playlistPopup.classList.toggle("show");
    });

    btnClosePlaylist.addEventListener("click", () => {
        playlistPopup.classList.remove("show");
    });
});