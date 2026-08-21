const { createApp, ref, computed, onMounted, watch } = Vue;

const app = createApp({
    setup() {
        const currentLang = ref('en');
        const isDarkMode = ref(false);
        const isEyeProtection = ref(false);
        const activeFilter = ref('all');

        // Image viewer state
        const imageViewerVisible = ref(false);
        const imageViewerSrc = ref('');

        const translations = {
            en: {
                nav: { home: 'Home', about: 'About', projects: 'Projects', certifications: 'Certifications', achievements: 'Achievements', contact: 'Contact' },
                toggle: { dark: 'Toggle Dark Mode', eye: 'Toggle Eye Protection' },
                hero: {
                    badge: 'Available for Opportunities',
                    greeting: 'Hi, I\'m',
                    name: 'Samia Akter Erin',
                    subtitle: 'CSE Undergraduate · Web Developer ',
                    contactBtn: 'Contact Me',
                    projectsBtn: 'View Projects'
                },
                about: {
                    title: 'About', titleHighlight: 'Me',
                    subtitle: 'Passionate CSE student with a drive for building impactful solutions.',
                    who: 'Who I Am',
                    bio: 'I\'m a <strong>CSE undergraduate</strong> at IUBAT with a strong passion for <strong>web development</strong>, problem-solving, and continuous learning. I love building web applications that make a difference. With experience in PHP, MySQL, HTML, and CSS, I create clean, responsive, and user-friendly digital experiences.',
                    education: 'Education:', educationDetail: 'BSc in CSE (IUBAT)',
                    location: 'Location:', locationDetail: 'Dhaka, Bangladesh',
                    skills: 'Technical Skills',
                    quickInfo: 'Quick Info',
                    name: 'Name', email: 'Email',
                    availability: 'Availability', available: 'Open to Opportunities'
                },
                projects: {
                    title: 'My', titleHighlight: 'Projects',
                    subtitle: 'Explore my recent work — each project reflects my passion for clean code and impactful design.',
                    filterAll: 'All', viewRepo: 'View Repository',
                    projects: [
                        { id: 'pharmacy', title: 'Pharmacy Management System', description: 'A full-stack web app for managing pharmacy inventory, sales, and prescriptions with role-based access.', tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'], icon: 'fas fa-hospital', emoji: '💊', link: 'https://github.com/samiaaktererin/PharmacyManagementSytem' },
                        { id: 'codetree', title: 'CodeTree Centralization System', description: 'A centralized management system for code repositories with version control and collaboration features.', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript','PHP','MySQL'], icon: 'fas fa-code-branch', emoji: '🌳', link: 'https://github.com/samiaaktererin/codetree_centralization_maagement_system-ipcms' },
                        { id: 'school', title: 'School Management System', description: 'Comprehensive school management platform with student, teacher, and admin modules, attendance, and grade tracking.', tech: ['Razor Views', 'HTML', 'CSS', 'Bootstrap', 'JavaScript','ASP.NET Core MVC','MySQL','Entity Framework Core 8'], icon: 'fas fa-school', emoji: '🏫', link: 'https://github.com/samiaaktererin/SchoolManagementSystem' }
                    ]
                },
                certs: {
                    title: 'Certifications &', titleHighlight: 'Achievements',
                    subtitle: 'Credentials that reflect my dedication to learning and growth.',
                    clickToView: 'Click to view certificate',
                    list: [
                        { title: 'Research Paper Presentation', org: 'ITTA 2026', date: '2026', icon: 'fas fa-file-alt', placeholderImage: 'Certificate/Paper/Certificate_ID_192.jpg' },
                        { title: 'C for Everyone: Programming Fundamentals', org: 'UC Santa Cruz', date: '2025', icon: 'fas fa-code', placeholderImage: 'Certificate/Fundamental Programming C/Coursera c for everyone.jpg' },
                        { title: 'Intro to Machine Learning', org: 'Kaggle', date: '2025', icon: 'fas fa-robot', placeholderImage: 'Certificate/Machine Learning/Samia Akter Erin - Intro to Machine Learning.png' },
                        { title: 'Business Analytics with Excel', org: 'Johns Hopkins University', date: '2025', icon: 'fas fa-chart-bar', placeholderImage: 'Certificate/Excel/Coursera ZJ2DFZNK4NBA_Business Analytics_page-0001.jpg' },
                        { title: 'Work Smarter with Microsoft Excel', org: 'Microsoft', date: '2025', icon: 'fas fa-file-excel', placeholderImage: 'Certificate/Excel/Coursera 4X2ETGMFVHVK_Microsoft Excel_page-0001.jpg' },
                        { title: '200-Hour Professional Outsourcing Training', org: 'Digital Marketing', date: '2025', icon: 'fas fa-bullhorn', placeholderImage: 'Certificate/Digital marketing/Samia-355348-DM-Certificate.jpg' }
                    ]
                },
                achievements: {
                    title: 'Honors &', titleHighlight: 'Activities',
                    subtitle: 'A glimpse into my journey beyond the code.',
                    academic: 'Academic Achievements',
                    competitions: 'Competitions & Innovation',
                    workshops: 'Workshops & Training',
                    activities: 'Activities',
                    academicList: [
                        { id: 1, title: 'Academic Excellence — Spring 2023', desc: 'Dean\'s List / Top Performer', icon: 'fa-solid fa-award', placeholderImage: 'Certificate/Academic Awards/Spring 2023.jpeg' },
                        { id: 2, title: 'Academic Excellence — Spring 2025', desc: 'Dean\'s List / Top Performer', icon: 'fa-solid fa-award', placeholderImage: 'Certificate/Academic Awards/Spring 2025.jpeg' }
                    ],
                    competitionList: [
                        { id: 1, title: 'Line Follower Robot', desc: 'IUBAT Innovation Competition 2024', icon: 'fa-solid fa-robot', placeholderImage: 'Certificate/IIEC/Line Follower Robot.jpeg' },
                        { id: 2, title: 'Poster Showcasing / Presentation', desc: 'IUBAT Innovation Competition 2024', icon: 'fa-solid fa-poster', placeholderImage: 'Certificate/IIEC/Poster Presentation.jpeg' }
                    ],
                    workshopList: [
                        { id: 1, title: 'Python Power-Up Session', desc: 'Hands-on Python workshop', icon: 'fa-solid fa-python', placeholderImage: 'Certificate/Workshop/Python.png' },
                        { id: 2, title: 'Prompt Engineering', desc: 'AI & prompt design training', icon: 'fa-solid fa-message', placeholderImage: 'Certificate/Workshop/certificate-prompt-engineering.jpg' },
                        { id: 3, title: 'ICT Robotics / Innovation Workshop', desc: 'Robotics & innovation', icon: 'fa-solid fa-microchip', placeholderImage: 'Certificate/Workshop/ICT Robotics Olympiad/ICT Robotics Olympiad.jpeg' }
                    ],
                    activityList: [
                        { id: 1, title: 'National Content Writing Olympiad', desc: 'Season 1 — National level', icon: 'fa-solid fa-pen-fancy', placeholderImage: 'Certificate/Workshop/Content Writing Olympiad/Samia Akter Erin Certificate.jpg' },
                        { id: 2, title: '200-Hour Professional Outsourcing Training', desc: 'Digital Marketing — Advanced', icon: 'fa-solid fa-bullhorn', placeholderImage: 'Certificate/Digital marketing/Samia-355348-DM-Certificate.jpg' }
                    ]
                },
                footer: {
                    rights: 'All rights reserved.',
                    madeWith: 'Made with Vue.js & Tailwind CSS',
                    desc: 'Web Developer passionate about building impactful web solutions.',
                    quickLinks: 'Quick Links',
                    contactInfo: 'Contact Info'
                }
            },
            bn: {
                nav: { home: 'হোম', about: 'পরিচয়', projects: 'প্রকল্প', certifications: 'সার্টিফিকেট', achievements: 'অর্জন', contact: 'যোগাযোগ' },
                toggle: { dark: 'ডার্ক মোড টগল', eye: 'আই প্রোটেকশন টগল' },
                hero: {
                    badge: 'সুযোগের জন্য উপলব্ধ',
                    greeting: 'হ্যালো, আমি',
                    name: 'ছামিয়া আক্তার ইরিন',
                    subtitle: 'সিএসই আন্ডারগ্র্যাজুয়েট · ওয়েব ডেভেলপার ',
                    contactBtn: 'যোগাযোগ করুন',
                    projectsBtn: 'প্রকল্প দেখুন'
                },
                about: {
                    title: 'আমার', titleHighlight: 'পরিচয়',
                    subtitle: 'প্রভাবশালী সমাধান তৈরির প্রতি আগ্রহী একজন সিএসই শিক্ষার্থী।',
                    who: 'আমি কে',
                    bio: 'আমি <strong>আইইউবিএটি</strong>-এর একজন <strong>সিএসই আন্ডারগ্র্যাজুয়েট</strong>। ওয়েব ডেভেলপমেন্ট, সমস্যা সমাধান এবং ক্রমাগত শেখার প্রতি আমার গভীর আগ্রহ। আমি ওয়েব অ্যাপ্লিকেশন তৈরি করতে ভালোবাসি যা পরিবর্তন আনে। PHP, MySQL, HTML, এবং CSS-এ দক্ষতা থাকায় আমি পরিষ্কার, প্রতিক্রিয়াশীল এবং ব্যবহারকারী-বান্ধব ডিজিটাল অভিজ্ঞতা তৈরি করি।',
                    education: 'শিক্ষা:', educationDetail: 'সিএসইতে বিএসসি (আইইউবিএটি)',
                    location: 'অবস্থান:', locationDetail: 'ঢাকা, বাংলাদেশ',
                    skills: 'প্রযুক্তিগত দক্ষতা',
                    quickInfo: 'দ্রুত তথ্য',
                    name: 'নাম', 
                    email: 'ইমেইল',
                    availability: 'প্রাপ্যতা', available: 'সুযোগের জন্য উন্মুক্ত'
                },
                projects: {
                    title: 'আমার', titleHighlight: 'প্রকল্প',
                    subtitle: 'আমার সাম্প্রতিক কাজগুলো অন্বেষণ করুন — প্রতিটি প্রকল্পই পরিষ্কার কোড এবং প্রভাবশালী ডিজাইনের প্রতি আমার আবেগকে প্রতিফলিত করে।',
                    filterAll: 'সব', viewRepo: 'রিপোজিটরি দেখুন',
                    projects: [
                        { id: 'pharmacy', title: 'ফার্মেসি ম্যানেজমেন্ট সিস্টেম', description: 'ফার্মেসি ইনভেন্টরি, বিক্রয় এবং প্রেসক্রিপশন পরিচালনার জন্য একটি ফুল-স্ট্যাক ওয়েব অ্যাপ।', tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'], icon: 'fas fa-hospital', emoji: '💊', link: 'https://github.com/samiaaktererin/PharmacyManagementSytem' },
                        { id: 'codetree', title: 'কোডট্রি সেন্ট্রালাইজেশন সিস্টেম', description: 'কোড রিপোজিটরি পরিচালনার জন্য একটি কেন্দ্রীভূত সিস্টেম।', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript','PHP','MySQL'], icon: 'fas fa-code-branch', emoji: '🌳', link: 'https://github.com/samiaaktererin/codetree_centralization_maagement_system-ipcms' },
                        { id: 'school', title: 'স্কুল ম্যানেজমেন্ট সিস্টেম', description: 'শিক্ষার্থী, শিক্ষক এবং প্রশাসন মডিউল সহ স্কুল পরিচালনার প্ল্যাটফর্ম।', tech: ['Razor Views', 'HTML', 'CSS', 'Bootstrap', 'JavaScript','ASP.NET Core MVC','MySQL','Entity Framework Core 8'], icon: 'fas fa-school', emoji: '🏫', link: 'https://github.com/samiaaktererin/SchoolManagementSystem' }
                    ]
                },
                certs: {
                    title: 'সার্টিফিকেট ও', titleHighlight: 'অর্জন',
                    subtitle: 'শেখার এবং উন্নতির প্রতি আমার নিষ্ঠার প্রতিফলন।',
                    clickToView: 'সার্টিফিকেট দেখতে ক্লিক করুন',
                    list: [
                        { title: 'গবেষণা পত্র উপস্থাপনা', org: 'আইটিটিএ ২০২৬', date: '২০২৬', icon: 'fas fa-file-alt', placeholderImage: 'Certificate/Paper/Certificate_ID_192.jpg' },
                        { title: 'সি ফর এভরিওয়ান: প্রোগ্রামিং ফান্ডামেন্টালস', org: 'ইউসি সান্তা ক্রুজ', date: '২০২৫', icon: 'fas fa-code', placeholderImage: 'Certificate/Fundamental Programming C/Coursera c for everyone.jpg' },
                        { title: 'ইন্ট্রো টু মেশিন লার্নিং', org: 'ক্যাগল', date: '২০২৫', icon: 'fas fa-robot', placeholderImage: 'Certificate/Machine Learning/Samia Akter Erin - Intro to Machine Learning.png' },
                        { title: 'বিজনেস অ্যানালিটিক্স উইথ এক্সেল', org: 'জনস হপকিন্স ইউনিভার্সিটি', date: '২০২৫', icon: 'fas fa-chart-bar', placeholderImage: 'Certificate/Excel/Coursera ZJ2DFZNK4NBA_Business Analytics_page-0001.jpg' },
                        { title: 'ওয়ার্ক স্মার্টার উইথ মাইক্রোসফট এক্সেল', org: 'মাইক্রোসফট', date: '২০২৫', icon: 'fas fa-file-excel', placeholderImage: 'Certificate/Excel/Coursera 4X2ETGMFVHVK_Microsoft Excel_page-0001.jpg' },
                        { title: '২০০-ঘন্টা প্রফেশনাল আউটসোর্সিং ট্রেনিং', org: 'ডিজিটাল মার্কেটিং', date: '২০২৫', icon: 'fas fa-bullhorn', placeholderImage: 'Certificate/Digital marketing/Samia-355348-DM-Certificate.jpg' }
                    ]
                },
                achievements: {
                    title: 'সম্মান ও', titleHighlight: 'কার্যক্রম',
                    subtitle: 'কোডের বাইরে আমার যাত্রার একটি ঝলক।',
                    academic: 'শিক্ষাগত অর্জন',
                    competitions: 'প্রতিযোগিতা ও উদ্ভাবন',
                    workshops: 'ওয়ার্কশপ ও প্রশিক্ষণ',
                    activities: 'কার্যক্রম',
                    academicList: [
                        { id: 1, title: 'শিক্ষাগত শ্রেষ্ঠত্ব — বসন্ত ২০২৩', desc: 'ডিনস লিস্ট / শীর্ষ পারফর্মার', icon: 'fa-solid fa-award', placeholderImage: 'Certificate/Academic Awards/Spring 2023.jpeg' },
                        { id: 2, title: 'শিক্ষাগত শ্রেষ্ঠত্ব — বসন্ত ২০২৫', desc: 'ডিনস লিস্ট / শীর্ষ পারফর্মার', icon: 'fa-solid fa-award', placeholderImage: 'Certificate/Academic Awards/Spring 2025.jpeg' }
                    ],
                    competitionList: [
                        { id: 1, title: 'লাইন ফলোয়ার রোবট', desc: 'আইইউবিএটি ইনোভেশন কম্পিটিশন ২০২৪', icon: 'fa-solid fa-robot', placeholderImage: 'Certificate/IIEC/Line Follower Robot.jpeg' },
                        { id: 2, title: 'পোস্টার শোকেসিং / উপস্থাপনা', desc: 'আইইউবিএটি ইনোভেশন কম্পিটিশন ২০২৪', icon: 'fa-solid fa-poster', placeholderImage: 'Certificate/IIEC/Poster Presentation.jpeg' }
                    ],
                    workshopList: [
                        { id: 1, title: 'পাইথন পাওয়ার-আপ সেশন', desc: 'হ্যান্ডস-অন পাইথন ওয়ার্কশপ', icon: 'fa-solid fa-python', placeholderImage: 'Certificate/Workshop/Python.png' },
                        { id: 2, title: 'প্রম্পট ইঞ্জিনিয়ারিং', desc: 'এআই ও প্রম্পট ডিজাইন প্রশিক্ষণ', icon: 'fa-solid fa-message', placeholderImage: 'Certificate/Workshop/certificate-prompt-engineering.jpg' },
                        { id: 3, title: 'আইসিটি রোবটিক্স / ইনোভেশন ওয়ার্কশপ', desc: 'রোবটিক্স ও উদ্ভাবন', icon: 'fa-solid fa-microchip', placeholderImage: 'Certificate/Workshop/ICT Robotics Olympiad/ICT Robotics Olympiad.jpeg' }
                    ],
                    activityList: [
                        { id: 1, title: 'জাতীয় কন্টেন্ট রাইটিং অলিম্পিয়াড', desc: 'সিজন ১ — জাতীয় পর্যায়', icon: 'fa-solid fa-pen-fancy', placeholderImage: 'Certificate/Workshop/Content Writing Olympiad/Samia Akter Erin Certificate.jpg' },
                        { id: 2, title: '২০০-ঘন্টা প্রফেশনাল আউটসোর্সিং ট্রেনিং', desc: 'ডিজিটাল মার্কেটিং — অ্যাডভান্সড', icon: 'fa-solid fa-bullhorn', placeholderImage: 'Certificate/Digital marketing/Samia-355348-DM-Certificate.jpg' }
                    ]
                },
                footer: {
                    rights: 'সর্বস্বত্ব সংরক্ষিত।',
                    // madeWith: 'Vue.js এবং Tailwind CSS দিয়ে তৈরি',
                    desc: 'ওয়েব ডেভেলপার প্রভাবশালী ওয়েব সমাধান তৈরিতে আবেগী।',
                    quickLinks: 'কুইক লিংক',
                    contactInfo: 'যোগাযোগের তথ্য'
                }
            }
        };

        const t = (key) => {
            const keys = key.split('.');
            let result = translations[currentLang.value];
            for (const k of keys) {
                if (result && result[k] !== undefined) result = result[k];
                else return key;
            }
            return result;
        };

        const getProjects = () => {
            const projData = translations[currentLang.value].projects.projects || [];
            return projData.map(p => ({ ...p, id: p.id || p.title.toLowerCase().replace(/\s/g, '') }));
        };

        const filteredProjects = computed(() => {
            const all = getProjects();
            if (activeFilter.value === 'all') return all;
            return all.filter(p => p.id === activeFilter.value);
        });

        const certifications = computed(() => translations[currentLang.value].certs.list || []);
        const academicAchievements = computed(() => translations[currentLang.value].achievements.academicList || []);
        const competitionAchievements = computed(() => translations[currentLang.value].achievements.competitionList || []);
        const workshopAchievements = computed(() => translations[currentLang.value].achievements.workshopList || []);
        const activityAchievements = computed(() => translations[currentLang.value].achievements.activityList || []);

        const toggleDarkMode = () => {
            isDarkMode.value = !isDarkMode.value;
            document.body.classList.toggle('dark-mode', isDarkMode.value);
            localStorage.setItem('darkMode', isDarkMode.value);
        };
        const toggleEyeProtection = () => {
            isEyeProtection.value = !isEyeProtection.value;
            document.body.classList.toggle('eye-protection', isEyeProtection.value);
            localStorage.setItem('eyeProtection', isEyeProtection.value);
        };
        const changeLang = () => {
            localStorage.setItem('lang', currentLang.value);
            setTimeout(() => AOS.refresh(), 100);
        };
        const closeNav = () => {
            const nav = document.getElementById('navMenu');
            if (nav && nav.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(nav);
                bsCollapse.hide();
            }
        };

        // ---- Image Viewer ----
        const openImageViewer = (src) => {
            imageViewerSrc.value = src;
            imageViewerVisible.value = true;
            document.body.style.overflow = 'hidden';
        };
        const closeImageViewer = () => {
            imageViewerVisible.value = false;
            document.body.style.overflow = '';
        };

        const scrollToTop = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

        onMounted(() => {
            const savedLang = localStorage.getItem('lang') || 'en';
            currentLang.value = savedLang;
            const savedDark = localStorage.getItem('darkMode') === 'true';
            isDarkMode.value = savedDark;
            if (savedDark) document.body.classList.add('dark-mode');
            const savedEye = localStorage.getItem('eyeProtection') === 'true';
            isEyeProtection.value = savedEye;
            if (savedEye) document.body.classList.add('eye-protection');
            AOS.init({ duration: 800, once: true, offset: 50, easing: 'ease-out-cubic' });
        });

        watch(currentLang, () => { setTimeout(() => AOS.refresh(), 200); });

        return {
            currentLang, isDarkMode, isEyeProtection, activeFilter,
            imageViewerVisible, imageViewerSrc,
            t, filteredProjects, certifications,
            academicAchievements, competitionAchievements, workshopAchievements, activityAchievements,
            toggleDarkMode, toggleEyeProtection, changeLang, closeNav,
            scrollToTop,
            openImageViewer, closeImageViewer
        };
    }
});

app.mount('#app');