/* ============================================================
   TopUzbekSites — Main JavaScript Module
   ============================================================
   Features:
   - Mobile navbar toggle
   - Sticky navbar scroll effect
   - Smooth scrolling
   - Scroll reveal (IntersectionObserver)
   - Counter animation
   - Live search & category filter (saytlar page)
   - Form validation + success animation (aloqa page)
   ============================================================ */

'use strict';

/* ==========================================================
   1. O'ZBEK SAYTLARI — MA'LUMOTLAR BAZASI
   ========================================================== */
const sitesData = [
    {
        name: 'Kun.uz',
        url: 'https://kun.uz',
        logo: 'https://www.google.com/s2/favicons?domain=kun.uz&sz=128',
        category: 'Yangiliklar',
        description: "O'zbekistonning eng mashhur yangiliklar portali. Tezkor va ishonchli axborot manbayi."
    },
    {
        name: 'Daryo.uz',
        url: 'https://daryo.uz',
        logo: 'https://www.google.com/s2/favicons?domain=daryo.uz&sz=128',
        category: 'Yangiliklar',
        description: "O'zbekiston va dunyo yangiliklari. Online gazeta va axborot portali."
    },
    {
        name: 'Uzum Tezkor',
        url: 'https://uzumtezkor.uz',
        logo: 'https://www.google.com/s2/favicons?domain=uzumtezkor.uz&sz=128',
        category: 'Xizmatlar',
        description: "Restoranlardan taomlar va do'konlardan oziq-ovqat yetkazib berish xizmati."
    },
    {
        name: 'Uzum Market',
        url: 'https://uzum.uz',
        logo: 'https://www.google.com/s2/favicons?domain=uzum.uz&sz=128',
        category: 'Onlayn savdo',
        description: "O'zbekistonning yetakchi marketplace platformasi. Millionlab mahsulotlar."
    },
    {
        name: 'My.gov.uz',
        url: 'https://my.gov.uz',
        logo: 'https://www.google.com/s2/favicons?domain=my.gov.uz&sz=128',
        category: 'Davlat',
        description: "Davlat xizmatlari portali. Onlayn ariza topshirish va hujjatlar."
    },
    {
        name: 'Lex.uz',
        url: 'https://lex.uz',
        logo: 'https://www.google.com/s2/favicons?domain=lex.uz&sz=128',
        category: 'Davlat',
        description: "O'zbekiston qonunchilik bazasi. Barcha normativ-huquqiy hujjatlar."
    },
    {
        name: 'IT Park',
        url: 'https://it-park.uz',
        logo: 'https://www.google.com/s2/favicons?domain=it-park.uz&sz=128',
        category: 'IT',
        description: "O'zbekiston IT Park — texnologik kompaniyalar uchun rezidentlik va qo'llab-quvvatlash."
    },
    {
        name: 'Najot Ta\'lim',
        url: 'https://najottalim.uz',
        logo: 'https://www.google.com/s2/favicons?domain=najottalim.uz&sz=128',
        category: "Ta'lim",
        description: "IT sohasida professional o'quv kurslari. Dasturlash va dizayn yo'nalishlari."
    },
    {
        name: 'PDP Academy',
        url: 'https://pdp.uz',
        logo: 'https://www.google.com/s2/favicons?domain=pdp.uz&sz=128',
        category: "Ta'lim",
        description: "Dasturlash akademiyasi. Frontend, backend va mobil dasturlash kurslari."
    },

    {
        name: 'Championat.asia',
        url: 'https://championat.asia',
        logo: 'https://www.google.com/s2/favicons?domain=championat.asia&sz=128',
        category: 'Sport',
        description: "Sport yangiliklari portali. Futbol, boks va boshqa sport turlari."
    },

    {
        name: 'Gazeta.uz',
        url: 'https://gazeta.uz',
        logo: 'https://www.google.com/s2/favicons?domain=gazeta.uz&sz=128',
        category: 'Yangiliklar',
        description: "O'zbekistonning ishonchli va yirik nashrlaridan biri. Asosiy xabarlar va tahlillar."
    },
    {
        name: 'Birbir.uz',
        url: 'https://birbir.uz',
        logo: 'https://www.google.com/s2/favicons?domain=birbir.uz&sz=128',
        category: 'Onlayn savdo',
        description: "O'zbekistonning mahalliy e'lonlar maydonchasi. Oldi-sotdi, xizmatlar va ijara."
    },
    {
        name: 'Click.uz',
        url: 'https://click.uz',
        logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://click.uz&size=128',
        category: 'Moliya',
        description: "O'zbekistondagi mashhur to'lov tizimi. Xizmatlar uchun onlayn to'lovlar va pul o'tkazmalari."
    },
    {
        name: 'Payme.uz',
        url: 'https://payme.uz',
        logo: 'https://www.google.com/s2/favicons?domain=payme.uz&sz=128',
        category: 'Moliya',
        description: "Mobil hamyon va to'lov xizmati. Qulay va xavfsiz moliyaviy operatsiyalar."
    },
    {
        name: 'Asaxiy.uz',
        url: 'https://asaxiy.uz',
        logo: 'https://www.google.com/s2/favicons?domain=asaxiy.uz&sz=128',
        category: 'Onlayn savdo',
        description: "Internet-do'kon va kitoblar savdosi. O'zbekiston bo'ylab tezkor yetkazib berish xizmati."
    },
    {
        name: 'Uza.uz',
        url: 'https://uza.uz',
        logo: 'https://www.google.com/s2/favicons?domain=uza.uz&sz=128',
        category: 'Yangiliklar',
        description: "O'zbekiston Milliy axborot agentligi. Rasmiy va ishonchli xabarlar."
    },
    {
        name: 'Sports.uz',
        url: 'https://sports.uz',
        logo: 'https://www.google.com/s2/favicons?domain=sports.uz&sz=128',
        category: 'Sport',
        description: "O'zbekistonning yetakchi sport yangiliklari va onlayn translyatsiya portali."
    },
    {
        name: 'Stadion.uz',
        url: 'https://stadion.uz',
        logo: 'https://www.google.com/s2/favicons?domain=stadion.uz&sz=128',
        category: 'Sport',
        description: "Futbol yangiliklari, maqolalar va o'yinlar natijalari bazasi."
    },
    {
        name: 'Apteka.uz',
        url: 'https://apteka.uz',
        logo: 'https://www.google.com/s2/favicons?domain=apteka.uz&sz=128',
        category: 'Tibbiyot',
        description: "O'zbekistondagi dorixonalar, dori vositalari narxlari va tibbiy ma'lumotnoma."
    },
    {
        name: 'Med24.uz',
        url: 'https://med24.uz',
        logo: 'https://www.google.com/s2/favicons?domain=med24.uz&sz=128',
        category: 'Tibbiyot',
        description: "Shifokorlar va klinikalarni izlash, tibbiyot yangiliklari."
    },

    {
        name: 'RizaNova.uz',
        url: 'https://rizanova.uz',
        logo: 'https://www.google.com/s2/favicons?domain=rizanova.uz&sz=128',
        category: "Ko'ngilochar",
        description: "O'zbek estradasining eng yangi kliplari, musiqalari va filmlari."
    },
    {
        name: 'Tarona.net',
        url: 'https://tarona.net',
        logo: 'https://www.google.com/s2/favicons?domain=tarona.net&sz=128',
        category: "Ko'ngilochar",
        description: "Eng yangi o'zbek musiqalari va qo'shiqlari portali."
    },

    {
        name: 'Afisha.uz',
        url: 'https://afisha.uz',
        logo: 'https://www.google.com/s2/favicons?domain=afisha.uz&sz=128',
        category: 'Afisha',
        description: "Toshkent shahridagi madaniy va ko'ngilochar tadbirlar jadvali."
    },
    {
        name: 'UzAirways',
        url: 'https://uzairways.com',
        logo: 'https://www.google.com/s2/favicons?domain=uzairways.com&sz=128',
        category: 'Transport',
        description: "O'zbekiston havo yo'llari. Aviachiptalar band qilish va xarid qilish."
    },
    {
        name: 'UzRailway',
        url: 'https://railway.uz',
        logo: 'https://www.google.com/s2/favicons?domain=railway.uz&sz=128',
        category: 'Transport',
        description: "O'zbekiston Temir Yo'llari. Poyezdlar jadvali va elektron chiptalar."
    },

    {
        name: 'Kundalik.com',
        url: 'https://kundalik.com',
        logo: 'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://kundalik.com&size=128',
        category: "Ta'lim",
        description: "Maktablar uchun yagona raqamli ta'lim platformasi va elektron jurnal."
    },
    {
        name: 'Yandex Go Uzbekistan',
        url: 'https://taxi.yandex.uz/',
        logo: 'https://www.google.com/s2/favicons?domain=taxi.yandex.uz&sz=128',
        category: 'Xizmatlar',
        description: "O'zbekistondagi eng ommabop taksi va yetkazib berish xizmati."
    },
    {
        name: 'Express24',
        url: 'https://express24.uz',
        logo: 'https://www.google.com/s2/favicons?domain=express24.uz&sz=128',
        category: 'Xizmatlar',
        description: "Oziq-ovqat va restoranlardan tezkorm yetkazib berish servisi."
    },

    {
        name: 'ZiyoNET',
        url: 'https://ziyonet.uz',
        logo: 'https://www.google.com/s2/favicons?domain=ziyonet.uz&sz=128',
        category: "Ta'lim",
        description: "Poydevor va o'quv-ta'lim tarmoqlari bo'yicha eng katta portal."
    },
    {
        name: 'Oliy Majlis',
        url: 'https://parliament.gov.uz',
        logo: 'https://www.google.com/s2/favicons?domain=parliament.gov.uz&sz=128',
        category: 'Davlat',
        description: "O'zbekiston Respublikasi Oliy Majlisi Qonunchilik palatasi rasmiy veb-sayti."
    },
    {
        name: 'Mening Fikrim',
        url: 'https://meningfikrim.uz',
        logo: 'https://www.google.com/s2/favicons?domain=meningfikrim.uz&sz=128',
        category: 'Davlat',
        description: "Jamoaviy murojaatlar portali. Xalq fikrini o'rganish platformasi."
    },
    {
        name: 'TopUzbekSites',
        url: 'index.html',
        logo: 'image/logo.png',
        category: 'IT',
        description: "O'zbekistonning eng yaxshi veb-saytlarini topish va kataloglash platformasi."
    }
];


/* ==========================================================
   2. DOM ELEMENTLARI — UMUMIY
   ========================================================== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');


/* ==========================================================
   3. STICKY NAVBAR — SCROLL EFFEKT
   ========================================================== */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// Sahifa yuklanganda ham tekshirish
handleNavbarScroll();


/* ==========================================================
   4. MOBILE NAVBAR TOGGLE
   ========================================================== */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Nav linkka bosilganda menyuni yopish
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Tashqi bosilganda yopish
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        }
    });
}


/* ==========================================================
   5. SMOOTH SCROLLING — ANCHOR LINKLAR
   ========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = navbar ? navbar.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});


/* ==========================================================
   6. SCROLL REVEAL — IntersectionObserver
   ========================================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Biroz kechikish bilan har bir elementni ko'rsatish
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

initScrollReveal();


/* ==========================================================
   7. COUNTER ANIMATSIYA — Raqamlarni sanash
   ========================================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000; // 2 soniya
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // EaseOutQuart — yumshoq tormozlash effekti
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        // Katta raqamlarni formatlash
        el.textContent = formatNumber(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            const suffix = el.dataset.suffix || '+';
            el.textContent = formatNumber(target) + suffix;
        }
    }

    requestAnimationFrame(update);
}

function formatNumber(num) {
    if (num >= 1000) {
        return num.toLocaleString('uz-UZ');
    }
    return num.toString();
}

initCounterAnimation();


/* ==========================================================
   8. SAYTLAR SAHIFASI — RENDER, QIDIRUV, FILTR
   ========================================================== */
const sitesGrid = document.getElementById('sitesGrid');
const searchInput = document.getElementById('searchInput');
const filterPills = document.getElementById('filterPills');

let activeCategory = 'all';

/**
 * Sayt kartasini HTML sifatida yaratish
 * Logo — haqiqiy sayt favicon rasm, yuklana olmasa birinchi harfni ko'rsatadi
 */
function createSiteCard(site) {
    const firstLetter = site.name.charAt(0).toUpperCase();
    return `
        <article class="glass-card site-card">
            <div class="site-card-header">
                <div class="site-logo">
                    <img src="${site.logo}" alt="${site.name} logotipi" 
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <span class="logo-placeholder" style="display:none;">${firstLetter}</span>
                </div>
                <div class="site-info">
                    <h3>${site.name}</h3>
                    <span class="site-category-badge">${site.category}</span>
                </div>
            </div>
            <p>${site.description}</p>
            <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm">
                🔗 Saytga o'tish
            </a>
        </article>
    `;
}

/**
 * Saytlarni filtrlab render qilish
 */
function renderSites() {
    if (!sitesGrid) return;

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = sitesData.filter(site => {
        // Kategoriya filtri
        const matchCategory = activeCategory === 'all' || site.category === activeCategory;

        // Qidiruv filtri
        const matchSearch = !searchTerm ||
            site.name.toLowerCase().includes(searchTerm) ||
            site.description.toLowerCase().includes(searchTerm) ||
            site.category.toLowerCase().includes(searchTerm);

        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        sitesGrid.innerHTML = `
            <div class="no-results">
                <div class="icon">🔍</div>
                <p>Hech qanday sayt topilmadi</p>
            </div>
        `;
    } else {
        sitesGrid.innerHTML = filtered.map(createSiteCard).join('');
    }
}

// Jonli qidiruv
if (searchInput) {
    searchInput.addEventListener('input', renderSites);
}

// Kategoriya filtri
if (filterPills) {
    filterPills.addEventListener('click', (e) => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;

        // Toggle button bosilganda
        if (pill.id === 'toggleCategoriesBtn') {
            const isShowing = filterPills.classList.contains('show-all');
            if (isShowing) {
                filterPills.classList.remove('show-all');
                pill.innerHTML = 'Davomini ko\'rish ▼';

                // Agar yashiringan kategoriya active bo'lsa va biz yashirsak, 'all' ni aktiv qilamiz
                const activeCategoryName = filterPills.querySelector('.filter-pill.active')?.dataset.category;
                const hiddenCategories = Array.from(filterPills.querySelectorAll('.hidden-category')).map(p => p.dataset.category);

                if (hiddenCategories.includes(activeCategoryName)) {
                    filterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
                    filterPills.querySelector('[data-category="all"]').classList.add('active');
                    activeCategory = 'all';
                    renderSites();
                }
            } else {
                filterPills.classList.add('show-all');
                pill.innerHTML = 'Yashirish ▲';
            }
            return;
        }

        // Active holatni yangilash
        filterPills.querySelectorAll('.filter-pill:not(#toggleCategoriesBtn)').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        activeCategory = pill.dataset.category;
        renderSites();
    });
}

// Sahifa yuklanganda render qilish
renderSites();


/* ==========================================================
   9. FORMALAR — VALIDATSIYA VA MUVAFFAQIYAT ANIMATSIYA
   ========================================================== */

/**
 * Email formatini tekshirish
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * URL formatini tekshirish
 */
function isValidUrl(url) {
    return /^https?:\/\/.+\..+/.test(url);
}

/**
 * Form group xatolik holatini boshqarish
 */
function setFieldError(input, hasError) {
    const group = input.closest('.form-group');
    if (group) {
        if (hasError) {
            group.classList.add('error');
        } else {
            group.classList.remove('error');
        }
    }
}

/**
 * Input o'zgarganda xatolikni tozalash
 */
function attachClearError(input) {
    input.addEventListener('input', () => {
        setFieldError(input, false);
    });
}

/* ---- BIRLASHTIRILGAN FORMA — Netlify Forms bilan ---- */
const messageForm = document.getElementById('messageForm');
const messageSuccess = document.getElementById('messageSuccess');

if (messageForm) {
    const nameInput = document.getElementById('msgName');
    const emailInput = document.getElementById('msgEmail');
    const phoneInput = document.getElementById('msgPhone');
    const siteNameInput = document.getElementById('msgSiteName');
    const siteUrlInput = document.getElementById('msgSiteUrl');
    const siteCatInput = document.getElementById('msgSiteCategory');
    const messageInput = document.getElementById('msgMessage');

    [nameInput, emailInput].forEach(attachClearError);
    if (siteUrlInput) attachClearError(siteUrlInput);

    messageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;

        // Ism tekshirish (majburiy)
        if (!nameInput.value.trim()) {
            setFieldError(nameInput, true);
            isValid = false;
        }

        // Email tekshirish (majburiy)
        if (!isValidEmail(emailInput.value.trim())) {
            setFieldError(emailInput, true);
            isValid = false;
        }

        // Sayt URL — faqat kiritilgan bo'lsa tekshirish
        if (siteUrlInput && siteUrlInput.value.trim() && !isValidUrl(siteUrlInput.value.trim())) {
            setFieldError(siteUrlInput, true);
            isValid = false;
        }

        if (isValid) {
            const submitBtn = messageForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '⏳ Yuborilmoqda...';
            submitBtn.disabled = true;

            try {
                // Netlify Forms AJAX submission
                const formData = new FormData(messageForm);
                const response = await fetch(window.location.href, {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString(),
                });

                if (response.ok) {
                    messageSuccess.classList.add('show');
                    messageForm.reset();

                    setTimeout(() => {
                        messageSuccess.classList.add('hide');
                        setTimeout(() => {
                            messageSuccess.classList.remove('show', 'hide');
                        }, 500);
                    }, 3500);
                } else {
                    throw new Error('Netlify-ga yuborishda xatolik yuz berdi.');
                }
            } catch (err) {
                console.error('Submission error:', err);
                alert('❌ Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urunib ko\'ring.');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }
    });
}


/* ==========================================================
   10. SAHIFA YUKLANGANDAN KEYIN
   ========================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Barcha reveal elementlarini qayta tekshirish
    initScrollReveal();
    initCounterAnimation();

    // Sahifa yuklanganda yumshoq ko'rinish
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
