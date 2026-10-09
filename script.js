/**
 * GRURU MUSEUM - Core Script
 * Dynamic interactions, Data Booming animations, and Knowledge Modal
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. Data Booming Logic
    const boomingViewport = document.getElementById('boomingViewport');
    const statusDisplay = document.getElementById('boomingStatus');
    const toggleBtn = document.getElementById('btnBoomToggle');
    let isBoomed = false;

    // Sub-node knowledge payload data
    const nodeDetails = {
        '01': {
            id: 'GRM-1872-ARC-001',
            title: 'สถาปัตยกรรม & สัดส่วนทองคำแสงเงา',
            category: 'วิทยาศาสตร์ & ดีไซน์',
            takeaway: 'การออกแบบช่องลมและชายคาแบบโบราณช่วยลดอุณหภูมิในอาคารได้ 3-4°C โดยไม่ต้องใช้พลังงานไฟฟ้า',
            source: 'จดหมายเหตุสถาปัตยกรรมสยาม ร.ศ. 91'
        },
        '02': {
            id: 'GRM-1905-MED-002',
            title: 'เภสัชกรรมสมุนไพรพื้นบ้าน',
            category: 'วิทยาศาสตร์ & ธรรมชาติ',
            takeaway: 'สารสกัดขมิ้นชันและพริกไทยดำช่วยต้านการอักเสบและเสริมภูมิคุ้มกันร่างกายสำหรับคนวัยทำงาน',
            source: 'คัมภีร์แพทย์ศาสตร์สงเคราะห์'
        },
        '03': {
            id: 'GRM-1920-HYD-003',
            title: 'ระบบชลประทานและโครงข่ายสายน้ำ',
            category: 'ประวัติศาสตร์ & เทคโนโลยี',
            takeaway: 'ระบบการกระจายน้ำแบบแก้มลิงโบราณสามารถนำมาผสานกับ IoT เพื่อสร้าง Smart Flood Alert ในเมือง',
            source: 'แผนผังชลประทานลุ่มน้ำเจ้าพระยา'
        },
        '04': {
            id: 'GRM-1945-TEX-004',
            title: 'เทคโนโลยีสิ่งทอเส้นใยธรรมชาติ',
            category: 'ภูมิปัญญา & วัฒนธรรม',
            takeaway: 'เส้นใยกล้วยและใยไผ่ระบายอากาศดีเยี่ยม ป้องกันแบคทีเรีย ย่อยสลายได้ 100% สอดคล้องเทรนด์ BCG',
            source: 'หอจดหมายเหตุสิ่งทอไทย'
        },
        '05': {
            id: 'GRM-1960-BIO-005',
            title: 'จุลินทรีย์ท้องถิ่นถนอมอาหาร',
            category: 'ธรรมชาติ & สุขภาพ',
            takeaway: 'การหมักผักพื้นบ้านสร้างสมดุล Gut Microbiome ช่วยให้อารมณ์แจ่มใสและลดภาวะเครียดสะสม',
            source: 'สถาบันวิจัยโภชนาการภูมิปัญญา'
        },
        '06': {
            id: 'GRM-1980-ART-006',
            title: 'เรขาคณิตลายกระหนกดิจิทัล',
            category: 'ศิลปะ & เทคโนโลยี',
            takeaway: 'สมการเวกเตอร์ลายไทยสามารถนำไปสร้าง Algorithmic UI Assets และ 3D CGI ในอุตสาหกรรมเกมระดับโลก',
            source: 'ตำราลายไทยร่วมสมัย'
        }
    };

    function triggerBooming(state) {
        isBoomed = (typeof state === 'boolean') ? state : !isBoomed;
        
        if (isBoomed) {
            boomingViewport.classList.add('booming-active');
            statusDisplay.innerHTML = `<span style="color: #FF5A1F; font-weight:700;">💥 DATA BOOMED!</span> กระจาย 6 โหนดลูกสมบูรณ์ใน 40ms (คลิกที่โหนดเพื่อดู Everyday Takeaway)`;
            if (toggleBtn) toggleBtn.innerText = 'RESET GRAPH';
        } else {
            boomingViewport.classList.remove('booming-active');
            statusDisplay.innerText = 'สถานะ: พร้อมขุดค้น (คลิกที่วงกลมใจกลางเพื่อกระจายความรู้)';
            if (toggleBtn) toggleBtn.innerText = 'BOOM GRAPH';
        }
    }

    if (boomingViewport) {
        boomingViewport.addEventListener('click', (e) => {
            if (e.target.closest('.node-branch')) {
                // Handled in node click
                return;
            }
            triggerBooming();
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => triggerBooming());
    }

    // Auto demo burst after brief delay
    setTimeout(() => {
        triggerBooming(true);
    }, 600);

    // 3. Node Detail Modal Interactive
    const modal = document.getElementById('knowledgeModal');
    const modalId = document.getElementById('modalId');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalTakeaway = document.getElementById('modalTakeaway');
    const modalSource = document.getElementById('modalSource');
    const btnCloseModal = document.getElementById('btnCloseModal');

    document.querySelectorAll('.node-branch').forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation();
            const code = node.getAttribute('data-node');
            const data = nodeDetails[code];
            if (data && modal) {
                modalId.innerText = data.id;
                modalTitle.innerText = data.title;
                modalCategory.innerText = data.category;
                modalTakeaway.innerText = data.takeaway;
                modalSource.innerText = data.source;
                modal.classList.add('active');
            }
        });
    });

    if (btnCloseModal) {
        btnCloseModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});
