// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        // 返回顶部按钮显示/隐藏
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.remove('hidden');
        } else {
            backToTop.classList.add('hidden');
        }
    });
    
    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击导航链接后关闭移动端菜单
        const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
    
    // 返回顶部
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 技能条动画
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    bar.classList.add('active');
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // 项目筛选
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 更新按钮样式
                filterBtns.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white');
                    b.classList.add('bg-gray-200', 'text-gray-700');
                });
                this.classList.remove('bg-gray-200', 'text-gray-700');
                this.classList.add('bg-blue-600', 'text-white');
                
                // 筛选项目
                const filter = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // 表单提交
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // 这里可以添加实际的表单提交逻辑
            // 例如发送到服务器或使用第三方服务
            console.log('Form data submitted:', data);
            
            // 显示成功消息
            successMessage.classList.remove('hidden');
            
            // 重置表单
            contactForm.reset();
            
            // 5秒后隐藏成功消息
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 5000);
        });
    }
    
    // 滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate-fade-in-up');
            }
        });
    };
    
    // 初始检查
    animateOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', animateOnScroll);
    
    // 添加平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑固定导航栏的高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 项目卡片悬停效果增强
    const projectCardElements = document.querySelectorAll('.project-card');
    projectCardElements.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape' && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
    
    // 添加触摸滑动支持（可选）
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        // 向右滑动打开菜单（仅在小屏幕上）
        if (touchEndX - touchStartX > 50 && window.innerWidth < 768 && mobileMenu) {
            mobileMenu.classList.remove('hidden');
        }
        // 向左滑动关闭菜单
        if (touchStartX - touchEndX > 50 && mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    }
    
    // 添加懒加载图片（可选）
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // 添加主题切换功能（可选）
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
        
        // 检查本地存储的主题设置
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // 添加打印样式支持
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('print-mode');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('print-mode');
    });
    
    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 优化滚动事件
    const optimizedScroll = debounce(function() {
        // 滚动相关的优化代码
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll);
    
    // 添加错误处理
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // 可以添加错误报告逻辑
    });
    
    // 添加页面可见性API支持
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // 页面隐藏时的处理
            console.log('Page is hidden');
        } else {
            // 页面显示时的处理
            console.log('Page is visible');
        }
    });
    
    // 初始化工具提示（如果使用）
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;
            document.body.appendChild(tooltipElement);
            
            const rect = this.getBoundingClientRect();
            tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
            tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 10 + 'px';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });
    
    console.log('Portfolio website initialized successfully!');
});