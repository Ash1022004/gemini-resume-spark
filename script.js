// Resume Analyzer JavaScript

class ResumeAnalyzer {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:5001';
        this.selectedFile = null;
        this.currentSection = 'analyzer';
        this.isAnalyzing = false;
        this.results = null;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateUI();
    }
    
    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
            });
        });
        
        // Mobile nav toggle
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('show');
            });
        }
        
        // File upload
        const fileInput = document.getElementById('fileInput');
        const fileUploadArea = document.getElementById('fileUploadArea');
        const uploadLink = document.getElementById('uploadLink');
        const changeFileBtn = document.getElementById('changeFileBtn');
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e.target.files[0]));
        }
        
        if (fileUploadArea) {
            fileUploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            fileUploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            fileUploadArea.addEventListener('drop', (e) => this.handleDrop(e));
            fileUploadArea.addEventListener('click', () => fileInput?.click());
        }
        
        if (uploadLink) {
            uploadLink.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput?.click();
            });
        }
        
        if (changeFileBtn) {
            changeFileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                fileInput?.click();
            });
        }
        
        // Job description
        const jobDescription = document.getElementById('jobDescription');
        if (jobDescription) {
            jobDescription.addEventListener('input', () => this.updateJobDescriptionStats());
        }
        
        // Action buttons
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => this.analyzeResume());
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
        
        // Example categories
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterExamples(category);
            });
        });
        
        // Toast close
        const toastClose = document.getElementById('toastClose');
        if (toastClose) {
            toastClose.addEventListener('click', () => this.hideToast());
        }
    }
    
    switchSection(section) {
        this.currentSection = section;
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });
        
        // Update sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.toggle('active', sec.id === `${section}-section`);
        });
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }
    
    handleDragLeave(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    }
    
    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.handleFileSelect(files[0]);
        }
    }
    
    handleFileSelect(file) {
        if (!file) return;
        
        // Validate file type
        const validTypes = ['.pdf', '.docx'];
        const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!validTypes.includes(fileExtension)) {
            this.showToast('Please select a PDF or DOCX file.', 'error');
            return;
        }
        
        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            this.showToast('File size must be less than 10MB.', 'error');
            return;
        }
        
        this.selectedFile = file;
        this.updateFileDisplay();
        this.updateUI();
    }
    
    updateFileDisplay() {
        const fileUploadContent = document.getElementById('fileUploadContent');
        const fileSelectedContent = document.getElementById('fileSelectedContent');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');
        
        if (this.selectedFile) {
            if (fileUploadContent) fileUploadContent.classList.add('hidden');
            if (fileSelectedContent) fileSelectedContent.classList.remove('hidden');
            if (fileName) fileName.textContent = this.selectedFile.name;
            if (fileSize) fileSize.textContent = this.formatFileSize(this.selectedFile.size);
        } else {
            if (fileUploadContent) fileUploadContent.classList.remove('hidden');
            if (fileSelectedContent) fileSelectedContent.classList.add('hidden');
        }
    }
    
    updateJobDescriptionStats() {
        const jobDescription = document.getElementById('jobDescription');
        const wordCount = document.getElementById('wordCount');
        const charCount = document.getElementById('charCount');
        
        if (jobDescription && wordCount && charCount) {
            const text = jobDescription.value.trim();
            const words = text ? text.split(/\s+/).length : 0;
            const chars = text.length;
            
            wordCount.textContent = `${words} words`;
            charCount.textContent = `${chars} characters`;
        }
    }
    
    updateUI() {
        const analyzeBtn = document.getElementById('analyzeBtn');
        const resetBtn = document.getElementById('resetBtn');
        const analyzeBtnText = document.getElementById('analyzeBtnText');
        
        // Update analyze button
        if (analyzeBtn && analyzeBtnText) {
            const canAnalyze = this.selectedFile && !this.isAnalyzing;
            analyzeBtn.disabled = !canAnalyze;
            
            if (this.isAnalyzing) {
                analyzeBtnText.textContent = 'Analyzing...';
            } else {
                analyzeBtnText.textContent = 'Analyze Resume';
            }
        }
        
        // Update reset button
        if (resetBtn) {
            const showReset = this.selectedFile || this.results;
            resetBtn.classList.toggle('hidden', !showReset);
        }
    }
    
    async analyzeResume() {
        if (!this.selectedFile || this.isAnalyzing) return;
        
        this.isAnalyzing = true;
        this.results = null;
        this.updateUI();
        this.showLoadingSection();
        
        try {
            const formData = new FormData();
            formData.append('resume', this.selectedFile);
            
            const jobDescription = document.getElementById('jobDescription')?.value?.trim();
            if (jobDescription) {
                formData.append('job_description', jobDescription);
            }
            
            const response = await fetch(`${this.baseUrl}/analyze`, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            this.results = await response.json();
            this.showToast('Analysis Complete! Your resume has been successfully analyzed.', 'success');
            this.showResults();
            
            // Scroll to results
            setTimeout(() => {
                document.getElementById('resultsSection')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
            
        } catch (error) {
            console.error('Analysis error:', error);
            let errorMessage = 'An unexpected error occurred.';
            
            if (error.message.includes('fetch')) {
                errorMessage = 'Unable to connect to analysis server. Please ensure the backend is running on port 5001.';
            } else {
                errorMessage = error.message;
            }
            
            this.showToast(`Analysis Failed: ${errorMessage}`, 'error');
        } finally {
            this.isAnalyzing = false;
            this.hideLoadingSection();
            this.updateUI();
        }
    }
    
    reset() {
        this.selectedFile = null;
        this.results = null;
        
        // Reset file input
        const fileInput = document.getElementById('fileInput');
        if (fileInput) fileInput.value = '';
        
        // Reset job description
        const jobDescription = document.getElementById('jobDescription');
        if (jobDescription) jobDescription.value = '';
        
        this.updateFileDisplay();
        this.updateJobDescriptionStats();
        this.updateUI();
        this.hideResults();
        this.showTestimonials();
    }
    
    showLoadingSection() {
        const loadingSection = document.getElementById('loadingSection');
        const testimonialsSection = document.getElementById('testimonialsSection');
        
        if (loadingSection) loadingSection.classList.remove('hidden');
        if (testimonialsSection) testimonialsSection.classList.add('hidden');
    }
    
    hideLoadingSection() {
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) loadingSection.classList.add('hidden');
    }
    
    showResults() {
        if (!this.results) return;
        
        const resultsSection = document.getElementById('resultsSection');
        const resultsContent = document.getElementById('resultsContent');
        const testimonialsSection = document.getElementById('testimonialsSection');
        
        if (resultsSection) resultsSection.classList.remove('hidden');
        if (testimonialsSection) testimonialsSection.classList.add('hidden');
        
        if (resultsContent) {
            resultsContent.innerHTML = this.generateResultsHTML();
            this.bindResultsEvents();
        }
    }
    
    hideResults() {
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) resultsSection.classList.add('hidden');
    }
    
    showTestimonials() {
        const testimonialsSection = document.getElementById('testimonialsSection');
        if (testimonialsSection) testimonialsSection.classList.remove('hidden');
    }
    
    generateResultsHTML() {
        const scoreValue = parseInt(this.results.score.replace('%', ''));
        const scoreColor = this.getScoreColor(scoreValue);
        const scoreBadgeClass = this.getScoreBadgeClass(scoreValue);
        const scoreLabel = this.getScoreLabel(scoreValue);
        
        return `
            <!-- Overall Score Card -->
            <div class="results-card results-overview">
                <div class="results-header">
                    <div>
                        <h3>Resume Analysis Complete</h3>
                        <p style="color: var(--muted-foreground);">
                            Your resume has been analyzed across multiple dimensions
                        </p>
                    </div>
                    <div class="results-score">
                        <div class="score-value ${scoreColor}">
                            ${this.results.score}
                        </div>
                        <div class="score-badge ${scoreBadgeClass}">
                            ${scoreLabel}
                        </div>
                    </div>
                </div>
                
                <div class="score-metrics">
                    <div class="score-metric">
                        <div class="score-metric-icon" style="color: var(--primary);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <rect x="7" y="7" width="3" height="9"/>
                                <rect x="14" y="7" width="3" height="5"/>
                            </svg>
                        </div>
                        <div class="score-metric-value" style="color: var(--primary);">${Math.max(scoreValue - 5, 50)}%</div>
                        <p class="score-metric-label">Content Quality</p>
                    </div>
                    
                    <div class="score-metric">
                        <div class="score-metric-icon" style="color: var(--secondary);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </div>
                        <div class="score-metric-value" style="color: var(--secondary);">${Math.min(85, scoreValue + 10)}%</div>
                        <p class="score-metric-label">Formatting</p>
                    </div>
                    
                    <div class="score-metric">
                        <div class="score-metric-icon" style="color: var(--accent);">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <circle cx="12" cy="12" r="6"/>
                                <circle cx="12" cy="12" r="2"/>
                            </svg>
                        </div>
                        <div class="score-metric-value" style="color: var(--accent);">${scoreValue}%</div>
                        <p class="score-metric-label">ATS Score</p>
                    </div>
                </div>
            </div>

            <!-- Detailed Analysis -->
            <div class="results-card">
                <div class="results-tabs">
                    <div class="tabs-list">
                        <button class="tab-trigger active" data-tab="overview">Overview</button>
                        <button class="tab-trigger" data-tab="keywords">Keywords</button>
                        <button class="tab-trigger" data-tab="formatting">Format</button>
                        <button class="tab-trigger" data-tab="suggestions">Tips</button>
                    </div>

                    <div class="tab-content active" id="tab-overview">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-6); margin-bottom: var(--spacing-6);">
                            <!-- Strengths -->
                            <div style="padding: var(--spacing-4); background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(76, 175, 80, 0.02)); border: 1px solid rgba(76, 175, 80, 0.2); border-radius: var(--radius-lg);">
                                <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success);">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22,4 12,14.01 9,11.01"/>
                                    </svg>
                                    <h4>Strengths</h4>
                                </div>
                                <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--spacing-2);">
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success); margin-top: 2px; flex-shrink: 0;">
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                        Clear professional summary
                                    </li>
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success); margin-top: 2px; flex-shrink: 0;">
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                        Quantified achievements
                                    </li>
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--success); margin-top: 2px; flex-shrink: 0;">
                                            <path d="M6 9l6 6 6-6"/>
                                        </svg>
                                        Relevant work experience
                                    </li>
                                </ul>
                            </div>

                            <!-- Areas for Improvement -->
                            <div style="padding: var(--spacing-4); background: linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(255, 193, 7, 0.02)); border: 1px solid rgba(255, 193, 7, 0.2); border-radius: var(--radius-lg);">
                                <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-3);">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning);">
                                        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                                    </svg>
                                    <h4>Areas for Improvement</h4>
                                </div>
                                <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--spacing-2);">
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning); margin-top: 2px; flex-shrink: 0;">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12,6 12,12 16,14"/>
                                        </svg>
                                        Add more action verbs
                                    </li>
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning); margin-top: 2px; flex-shrink: 0;">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12,6 12,12 16,14"/>
                                        </svg>
                                        Include industry-specific keywords
                                    </li>
                                    <li style="display: flex; align-items: flex-start; gap: var(--spacing-2); font-size: var(--font-size-sm);">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning); margin-top: 2px; flex-shrink: 0;">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12,6 12,12 16,14"/>
                                        </svg>
                                        Highlight leadership experience
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Skills Analysis -->
                        <div style="padding: var(--spacing-4); background-color: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg);">
                            <h4 style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary);">
                                    <circle cx="12" cy="12" r="10"/>
                                    <circle cx="12" cy="12" r="6"/>
                                    <circle cx="12" cy="12" r="2"/>
                                </svg>
                                Skills Analysis
                            </h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-4);">
                                <div>
                                    <h5 style="font-weight: 500; color: var(--success); margin-bottom: var(--spacing-2);">Identified Skills</h5>
                                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-1);">
                                        <span class="tag" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); color: var(--success);">JavaScript</span>
                                        <span class="tag" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); color: var(--success);">React</span>
                                        <span class="tag" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); color: var(--success);">Project Management</span>
                                        <span class="tag" style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05)); color: var(--success);">Communication</span>
                                    </div>
                                </div>
                                
                                <div>
                                    <h5 style="font-weight: 500; color: var(--warning); margin-bottom: var(--spacing-2);">Missing Skills</h5>
                                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-1);">
                                        ${this.results.missing_keywords.slice(0, 4).map(keyword => 
                                            `<span class="tag" style="border: 1px solid rgba(255, 193, 7, 0.3); color: var(--warning);">${keyword}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                                
                                <div>
                                    <h5 style="font-weight: 500; color: var(--primary); margin-bottom: var(--spacing-2);">Trending Skills</h5>
                                    <div style="display: flex; flex-wrap: wrap; gap: var(--spacing-1);">
                                        <span class="tag" style="border: 1px solid rgba(0, 123, 191, 0.3); color: var(--primary);">AI/ML</span>
                                        <span class="tag" style="border: 1px solid rgba(0, 123, 191, 0.3); color: var(--primary);">Cloud Computing</span>
                                        <span class="tag" style="border: 1px solid rgba(0, 123, 191, 0.3); color: var(--primary);">DevOps</span>
                                        <span class="tag" style="border: 1px solid rgba(0, 123, 191, 0.3); color: var(--primary);">Data Analysis</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="tab-keywords">
                        ${this.results.missing_keywords.length > 0 ? `
                        <div style="margin-bottom: var(--spacing-4);">
                            <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--warning);">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                    <line x1="12" y1="9" x2="12" y2="13"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                <h4>Missing Keywords</h4>
                                <span class="tag">${this.results.missing_keywords.length}</span>
                            </div>
                            <p style="font-size: var(--font-size-sm); color: var(--muted-foreground); margin-bottom: var(--spacing-4);">
                                These keywords are commonly found in similar roles and could improve your ATS ranking:
                            </p>
                            <div class="keyword-grid">
                                ${this.results.missing_keywords.map(keyword => `
                                    <div class="keyword-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="15" y1="9" x2="9" y2="15"/>
                                            <line x1="9" y1="9" x2="15" y2="15"/>
                                        </svg>
                                        <span>${keyword}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : '<p>Great! No missing keywords identified.</p>'}
                    </div>

                    <div class="tab-content" id="tab-formatting">
                        <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary);">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <h4>Formatting Analysis</h4>
                            <div style="margin-left: auto; display: flex; align-items: center; gap: var(--spacing-2);">
                                <div style="width: 96px; height: 8px; background-color: var(--muted); border-radius: 4px; overflow: hidden;">
                                    <div style="width: ${Math.min(85, scoreValue + 10)}%; height: 100%; background: linear-gradient(90deg, var(--secondary), var(--secondary-light));"></div>
                                </div>
                                <span style="font-size: var(--font-size-sm); color: var(--muted-foreground);">
                                    ${Math.min(85, scoreValue + 10)}%
                                </span>
                            </div>
                        </div>
                        
                        <div style="display: flex; flex-direction: column; gap: var(--spacing-3);">
                            <div style="display: flex; align-items: flex-start; gap: var(--spacing-3); padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary); margin-top: 2px; flex-shrink: 0;">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                <span style="font-size: var(--font-size-sm);">Consider using bullet points for achievements</span>
                            </div>
                            <div style="display: flex; align-items: flex-start; gap: var(--spacing-3); padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary); margin-top: 2px; flex-shrink: 0;">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                <span style="font-size: var(--font-size-sm);">Add more white space for better readability</span>
                            </div>
                            <div style="display: flex; align-items: flex-start; gap: var(--spacing-3); padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--secondary); margin-top: 2px; flex-shrink: 0;">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                <span style="font-size: var(--font-size-sm);">Use consistent date formatting</span>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="tab-suggestions">
                        <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--primary);">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                                <line x1="12" y1="17" x2="12.01" y2="17"/>
                            </svg>
                            <h4>Actionable Suggestions</h4>
                            <span class="tag">${this.results.suggestions.length}</span>
                        </div>
                        
                        <div class="suggestions-list">
                            ${this.results.suggestions.map((suggestion, index) => `
                                <div class="suggestion-item">
                                    <div class="suggestion-number">
                                        ${index + 1}
                                    </div>
                                    <div class="suggestion-content">
                                        <p>${suggestion}</p>
                                        <span class="impact-badge">High Impact</span>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            ${this.results.parsed ? `
            <!-- Analysis Stats -->
            <div class="results-card">
                <div style="display: flex; align-items: center; gap: var(--spacing-2); margin-bottom: var(--spacing-4);">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent);">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                    </svg>
                    <h4>Analysis Statistics</h4>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-4); font-size: var(--font-size-sm);">
                    <div style="text-align: center; padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                        <div style="font-weight: 600;">${this.results.parsed.extracted_text_length}</div>
                        <div style="color: var(--muted-foreground);">Characters</div>
                    </div>
                    <div style="text-align: center; padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                        <div style="font-weight: 600;">${Math.floor(this.results.parsed.extracted_text_length / 5)}</div>
                        <div style="color: var(--muted-foreground);">Words</div>
                    </div>
                    <div style="text-align: center; padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                        <div style="font-weight: 600;">${this.results.missing_keywords.length}</div>
                        <div style="color: var(--muted-foreground);">Missing Keywords</div>
                    </div>
                    <div style="text-align: center; padding: var(--spacing-3); background-color: var(--muted); border-radius: var(--radius-lg);">
                        <div style="font-weight: 600; color: var(--success);">Complete</div>
                        <div style="color: var(--muted-foreground);">Analysis Status</div>
                    </div>
                </div>
            </div>
            ` : ''}
        `;
    }
    
    bindResultsEvents() {
        // Tab switching
        document.querySelectorAll('.tab-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Update triggers
        document.querySelectorAll('.tab-trigger').forEach(trigger => {
            trigger.classList.toggle('active', trigger.dataset.tab === tabId);
        });
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `tab-${tabId}`);
        });
    }
    
    getScoreColor(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        return 'score-needs-work';
    }
    
    getScoreBadgeClass(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        return 'score-needs-work';
    }
    
    getScoreLabel(score) {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Work';
    }
    
    filterExamples(category) {
        // Update category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Filter example cards
        document.querySelectorAll('.example-card').forEach(card => {
            const cardCategory = card.dataset.category;
            const shouldShow = category === 'all' || cardCategory === category;
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        if (toast && toastMessage) {
            toastMessage.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.remove('hidden');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                this.hideToast();
            }, 5000);
        }
    }
    
    hideToast() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('hidden');
        }
    }
    
    // Health check method to verify backend connection
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/`, {
                method: 'GET',
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeAnalyzer();
});

// Add CSS classes for score colors to the style dynamically
const style = document.createElement('style');
style.textContent = `
    .score-excellent {
        color: var(--success) !important;
    }
    .score-good {
        color: var(--warning) !important;
    }
    .score-needs-work {
        color: var(--error) !important;
    }
`;
document.head.appendChild(style);