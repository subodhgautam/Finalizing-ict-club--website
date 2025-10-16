// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const gallery = {
        container: document.querySelector('.gallery-grid'),
        items: document.querySelectorAll('.gallery-item'),
        filters: document.querySelectorAll('.filter-btn'),
        lightbox: document.getElementById('lightbox'),
        lightboxImg: document.querySelector('.lightbox-content img'),
        currentIndex: 0,

        init() {
            this.bindEvents();
            this.initLightbox();
        },

        bindEvents() {
            // Filtering
            this.filters.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    this.filterItems(filter);
                    this.updateActiveFilter(e.target);
                });
            });

            // Download all button
            document.getElementById('downloadAll')?.addEventListener('click', () => {
                this.downloadAllImages();
            });
        },

        filterItems(filter) {
            this.items.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || category === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        },

        updateActiveFilter(clickedBtn) {
            this.filters.forEach(btn => btn.classList.remove('active'));
            clickedBtn.classList.add('active');
        },

        initLightbox() {
            const viewBtns = document.querySelectorAll('.view-btn');
            const downloadBtns = document.querySelectorAll('.download-btn');
            const closeBtn = document.querySelector('.lightbox-close');
            const prevBtn = document.querySelector('.lightbox-prev');
            const nextBtn = document.querySelector('.lightbox-next');

            // View buttons
            viewBtns.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    this.currentIndex = index;
                    this.openLightbox(btn.dataset.full);
                });
            });

            // Download buttons
            downloadBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.downloadImage(btn.dataset.src);
                });
            });

            // Lightbox controls
            closeBtn.addEventListener('click', () => this.closeLightbox());
            prevBtn.addEventListener('click', () => this.navigate('prev'));
            nextBtn.addEventListener('click', () => this.navigate('next'));

            // Close on background click
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('active')) return;
                
                switch(e.key) {
                    case 'Escape':
                        this.closeLightbox();
                        break;
                    case 'ArrowLeft':
                        this.navigate('prev');
                        break;
                    case 'ArrowRight':
                        this.navigate('next');
                        break;
                }
            });
        },

        openLightbox(imgSrc) {
            this.lightboxImg.src = imgSrc;
            this.lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        },

        closeLightbox() {
            this.lightbox.classList.remove('active');
            document.body.style.overflow = '';
        },

        navigate(direction) {
            const viewBtns = [...document.querySelectorAll('.view-btn')];
            if (direction === 'prev') {
                this.currentIndex = (this.currentIndex - 1 + viewBtns.length) % viewBtns.length;
            } else {
                this.currentIndex = (this.currentIndex + 1) % viewBtns.length;
            }
            this.lightboxImg.src = viewBtns[this.currentIndex].dataset.full;
        },

        async downloadImage(url) {
            try {
                const response = await fetch(url);
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'ict-club-photo.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Download failed:', error);
            }
        },

        async downloadAllImages() {
            const downloadBtns = document.querySelectorAll('.download-btn');
            downloadBtns.forEach(btn => {
                this.downloadImage(btn.dataset.src);
            });
        }
    };

    gallery.init();
});