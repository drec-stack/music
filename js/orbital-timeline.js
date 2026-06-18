// Radial Orbital Timeline - Music Platform Version
class OrbitalTimeline {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        this.expandedItems = {};
        this.rotationAngle = 0;
        this.autoRotate = true;
        this.pulseEffect = {};
        this.centerOffset = { x: 0, y: 0 };
        this.activeNodeId = null;
        this.nodeRefs = {};
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.render();
        this.startAutoRotate();
        this.addEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="orbital-timeline-container">
                <div class="orbit-container">
                    <div class="center-node">
                        <div class="center-pulse-1"></div>
                        <div class="center-pulse-2"></div>
                        <div class="center-core"></div>
                    </div>
                    <div class="orbit-ring"></div>
                    ${this.data.map((item, index) => this.renderNode(item, index)).join('')}
                </div>
            </div>
        `;
        
        this.nodeRefs = {};
        this.data.forEach((item, index) => {
            this.nodeRefs[item.id] = this.container.querySelector(`[data-node-id="${item.id}"]`);
        });
        
        this.updateNodePositions();
    }

    renderNode(item, index) {
        const iconClass = this.getIconClass(item.icon);
        return `
            <div class="orbit-node" data-node-id="${item.id}" data-index="${index}">
                <div class="node-glow"></div>
                <div class="node-circle">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="node-label">${item.title}</div>
                ${this.renderExpandedCard(item)}
            </div>
        `;
    }

    renderExpandedCard(item) {
        return `
            <div class="node-card" style="display: none;">
                <div class="card-connector"></div>
                <div class="card-header">
                    <div class="card-badge ${item.status}">${this.getStatusLabel(item.status)}</div>
                    <span class="card-date">${item.date}</span>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-content">${item.content}</div>
                <div class="card-energy">
                    <div class="energy-label">
                        <i class="fas fa-bolt"></i>
                        <span>Energy Level</span>
                        <span class="energy-value">${item.energy}%</span>
                    </div>
                    <div class="energy-bar">
                        <div class="energy-fill" style="width: ${item.energy}%"></div>
                    </div>
                </div>
                ${item.relatedIds.length > 0 ? this.renderRelatedNodes(item) : ''}
            </div>
        `;
    }

    renderRelatedNodes(item) {
        const relatedItems = item.relatedIds.map(id => this.data.find(d => d.id === id)).filter(Boolean);
        return `
            <div class="related-nodes">
                <div class="related-header">
                    <i class="fas fa-link"></i>
                    <span>Connected Nodes</span>
                </div>
                <div class="related-buttons">
                    ${relatedItems.map(related => `
                        <button class="related-btn" data-related-id="${related.id}">
                            ${related.title}
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getIconClass(iconName) {
        const iconMap = {
            'music': 'fa-music',
            'album': 'fa-compact-disc',
            'artist': 'fa-user',
            'playlist': 'fa-list',
            'radio': 'fa-broadcast-tower',
            'download': 'fa-download',
            'heart': 'fa-heart',
            'share': 'fa-share',
            'play': 'fa-play',
            'pause': 'fa-pause',
            'skip': 'fa-forward',
            'repeat': 'fa-redo',
            'shuffle': 'fa-random',
            'search': 'fa-search',
            'filter': 'fa-filter',
            'sort': 'fa-sort',
            'grid': 'fa-th',
            'list': 'fa-bars',
            'star': 'fa-star',
            'clock': 'fa-clock',
            'calendar': 'fa-calendar',
            'chart': 'fa-chart-line',
            'trending': 'fa-fire',
            'new': 'fa-sparkles',
            'popular': 'fa-fire-flame-curved',
            'featured': 'fa-crown'
        };
        return iconMap[iconName] || 'fa-music';
    }

    getStatusLabel(status) {
        const labels = {
            'completed': 'COMPLETE',
            'in-progress': 'IN PROGRESS',
            'pending': 'PENDING'
        };
        return labels[status] || status.toUpperCase();
    }

    calculateNodePosition(index, total) {
        const angle = ((index / total) * 360 + this.rotationAngle) % 360;
        const radius = 200;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + this.centerOffset.x;
        const y = radius * Math.sin(radian) + this.centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

        return { x, y, angle, zIndex, opacity };
    }

    updateNodePositions() {
        this.data.forEach((item, index) => {
            const node = this.nodeRefs[item.id];
            if (!node) return;

            const position = this.calculateNodePosition(index, this.data.length);
            const isExpanded = this.expandedItems[item.id];
            const isRelated = this.isRelatedToActive(item.id);
            const isPulsing = this.pulseEffect[item.id];

            node.style.transform = `translate(${position.x}px, ${position.y}px)`;
            node.style.zIndex = isExpanded ? 200 : position.zIndex;
            node.style.opacity = isExpanded ? 1 : position.opacity;

            const nodeCircle = node.querySelector('.node-circle');
            const nodeGlow = node.querySelector('.node-glow');
            const nodeLabel = node.querySelector('.node-label');

            if (isExpanded) {
                nodeCircle.classList.add('expanded');
                nodeLabel.classList.add('expanded');
            } else {
                nodeCircle.classList.remove('expanded');
                nodeLabel.classList.remove('expanded');
            }

            if (isRelated) {
                nodeCircle.classList.add('related');
                if (isPulsing) {
                    nodeGlow.classList.add('pulsing');
                }
            } else {
                nodeCircle.classList.remove('related');
                nodeGlow.classList.remove('pulsing');
            }

            const glowSize = item.energy * 0.5 + 40;
            nodeGlow.style.width = `${glowSize}px`;
            nodeGlow.style.height = `${glowSize}px`;
            nodeGlow.style.left = `-${(glowSize - 40) / 2}px`;
            nodeGlow.style.top = `-${(glowSize - 40) / 2}px`;
        });
    }

    toggleItem(id) {
        const wasExpanded = this.expandedItems[id];
        
        // Collapse all other items
        Object.keys(this.expandedItems).forEach(key => {
            if (parseInt(key) !== id) {
                this.expandedItems[parseInt(key)] = false;
            }
        });

        this.expandedItems[id] = !wasExpanded;

        if (!wasExpanded) {
            this.activeNodeId = id;
            this.autoRotate = false;
            
            const relatedItems = this.getRelatedItems(id);
            this.pulseEffect = {};
            relatedItems.forEach(relId => {
                this.pulseEffect[relId] = true;
            });

            this.centerViewOnNode(id);
        } else {
            this.activeNodeId = null;
            this.autoRotate = true;
            this.pulseEffect = {};
        }

        this.updateNodePositions();
        this.updateCardVisibility();
    }

    updateCardVisibility() {
        this.data.forEach(item => {
            const node = this.nodeRefs[item.id];
            if (!node) return;

            const card = node.querySelector('.node-card');
            if (this.expandedItems[item.id]) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    centerViewOnNode(nodeId) {
        const nodeIndex = this.data.findIndex(item => item.id === nodeId);
        const totalNodes = this.data.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        this.rotationAngle = 270 - targetAngle;
    }

    getRelatedItems(itemId) {
        const currentItem = this.data.find(item => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    }

    isRelatedToActive(itemId) {
        if (!this.activeNodeId) return false;
        const relatedItems = this.getRelatedItems(this.activeNodeId);
        return relatedItems.includes(itemId);
    }

    startAutoRotate() {
        const rotate = () => {
            if (this.autoRotate) {
                this.rotationAngle = (this.rotationAngle + 0.3) % 360;
                this.updateNodePositions();
            }
            this.animationId = requestAnimationFrame(rotate);
        };
        this.animationId = requestAnimationFrame(rotate);
    }

    addEventListeners() {
        this.container.addEventListener('click', (e) => {
            const node = e.target.closest('.orbit-node');
            if (node) {
                const nodeId = parseInt(node.dataset.nodeId);
                this.toggleItem(nodeId);
            } else if (e.target.closest('.related-btn')) {
                const relatedId = parseInt(e.target.closest('.related-btn').dataset.relatedId);
                this.toggleItem(relatedId);
            }
        });
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize orbital timeline with music platform data
document.addEventListener('DOMContentLoaded', () => {
    const musicTimelineData = [
        {
            id: 1,
            title: 'Новый релиз',
            date: '2024-01-15',
            content: 'Выпущен новый альбом от любимого артиста',
            category: 'release',
            icon: 'album',
            relatedIds: [2, 5],
            status: 'completed',
            energy: 95
        },
        {
            id: 2,
            title: 'Популярный трек',
            date: '2024-01-20',
            content: 'Трек набрал миллион прослушиваний за неделю',
            category: 'track',
            icon: 'music',
            relatedIds: [1, 3],
            status: 'completed',
            energy: 88
        },
        {
            id: 3,
            title: 'Плейлист дня',
            date: '2024-01-25',
            content: 'Создан персонализированный плейлист на основе предпочтений',
            category: 'playlist',
            icon: 'playlist',
            relatedIds: [2, 4],
            status: 'in-progress',
            energy: 72
        },
        {
            id: 4,
            title: 'Концерт',
            date: '2024-02-01',
            content: 'Билеты на концерт любимой группы уже в продаже',
            category: 'event',
            icon: 'star',
            relatedIds: [3, 5],
            status: 'pending',
            energy: 65
        },
        {
            id: 5,
            title: 'Подписка',
            date: '2024-02-10',
            content: 'Активирована премиум подписка с дополнительными функциями',
            category: 'subscription',
            icon: 'crown',
            relatedIds: [1, 4],
            status: 'completed',
            energy: 90
        },
        {
            id: 6,
            title: 'Рекомендации',
            date: '2024-02-15',
            content: 'Система рекомендаций предложила новые треки',
            category: 'recommendation',
            icon: 'trending',
            relatedIds: [2, 3],
            status: 'in-progress',
            energy: 78
        }
    ];

    // Initialize orbital timeline if container exists
    const timelineContainer = document.getElementById('orbital-timeline');
    if (timelineContainer) {
        window.orbitalTimeline = new OrbitalTimeline('orbital-timeline', musicTimelineData);
    }
});
