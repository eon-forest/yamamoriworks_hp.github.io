// ==========================================
// スクロールアニメーション管理
// ==========================================

class ScrollAnimations {
  constructor() {
    this.functionCards = document.querySelectorAll('.function-card');
    this.timelineItems = document.querySelectorAll('.timeline-item');
    this.scrollY = 0;
    this.init();
  }

  init() {
    // 初期チェック
    this.checkVisibility();
    
    // スクロールイベント（パフォーマンスのためthrottle）
    let ticking = false;
    window.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    // リサイズイベント
    window.addEventListener('resize', () => {
      this.checkVisibility();
    });
  }

  checkVisibility() {
    this.animateElements(this.functionCards);
    this.animateElements(this.timelineItems);
  }

  animateElements(elements) {
    elements.forEach((element) => {
      if (this.isInViewport(element)) {
        element.classList.add('visible');
      }
    });
  }

  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // 要素の上端が画面の80%位置に来たら表示
    return rect.top <= windowHeight * 0.8 && rect.bottom >= 0;
  }
}

// ==========================================
// スムーススクロール
// ==========================================

class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // スクロールインジケーターのクリック
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
          this.scrollTo(aboutSection);
        }
      });
    }

    // すべての内部リンクにスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          this.scrollTo(target);
        }
      });
    });
  }

  scrollTo(element) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // イージング関数（ease-in-out）
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
}

// ==========================================
// ページ読み込み時の処理
// ==========================================

class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    // ページ読み込み完了後に実行
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // DOMContentLoaded時点で軽いアニメーション開始
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.onDOMReady();
      });
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    // ヒーローセクションのアニメーション開始
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }
}

// ==========================================
// パララックス効果（軽微）
// ==========================================

class ParallaxEffect {
  constructor() {
    this.heroBackground = document.querySelector('.hero::before');
    this.init();
  }

  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  updateParallax() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.hero');
    
    if (hero && scrollY < window.innerHeight) {
      const opacity = 1 - (scrollY / window.innerHeight) * 0.5;
      hero.style.opacity = opacity;
    }
  }
}

// ==========================================
// アクティブセクション検出
// ==========================================

class ActiveSectionDetector {
  constructor() {
    this.sections = document.querySelectorAll('section');
    this.currentSection = 0;
    this.init();
  }

  init() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.detectActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  detectActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        if (this.currentSection !== index) {
          this.currentSection = index;
          this.onSectionChange(index);
        }
      }
    });
  }

  onSectionChange(index) {
    // セクション変更時の処理（必要に応じて追加）
    console.log('Active section:', index);
  }
}

// ==========================================
// 初期化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // すべての機能を初期化
  new ScrollAnimations();
  new SmoothScroll();
  new PageLoader();
  new ParallaxEffect();
  new ActiveSectionDetector();

  // デバッグ用
  console.log('山守ワークス - サイト初期化完了');
});

// ==========================================
// ユーティリティ関数
// ==========================================

// デバウンス関数
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

// スロットル関数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ビューポート判定
function isInViewport(element, threshold = 0.8) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= windowHeight * threshold && rect.bottom >= 0;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ScrollAnimations,
    SmoothScroll,
    PageLoader,
    ParallaxEffect,
    ActiveSectionDetector,
    debounce,
    throttle,
    isInViewport
  };
}
