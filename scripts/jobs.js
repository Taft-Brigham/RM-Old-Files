document.addEventListener('DOMContentLoaded', () => {
    const jobsContainer = document.getElementById('all-jobs-container');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');
    const typeSelect = document.getElementById('type-select');

    let allJobs = [];

    // 1. Fetch Data
    async function fetchJobs() {
        try {
            const response = await fetch('./data/jobs.json');
            allJobs = await response.json();
            renderJobs(allJobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            jobsContainer.innerHTML = '<p>Error loading jobs.</p>';
        }
    }

    // 2. Render Jobs to HTML
    function renderJobs(jobs) {
        if (jobs.length === 0) {
            jobsContainer.innerHTML = '<div class="no-results">No jobs found matching your criteria.</div>';
            return;
        }

        const html = jobs.map(job => `
            <article class="job-card">
                <div class="job-header">
                    <img src="${job.logo}" alt="${job.company}">
                    <div class="job-info">
                        <h3>${job.title}</h3>
                        <p>${job.company}</p>
                    </div>
                </div>
                <div class="job-tags">
                    <span class="tag">${job.type}</span>
                    <span class="tag">${job.category}</span>
                    <span class="tag">${job.location}</span>
                </div>
                <div class="job-footer">
                    <span class="salary">${job.salary}</span>
                    <a href="job-detail.html?id=${job.id}" class="btn btn-secondary" style="padding: 8px 16px; font-size: 0.9rem;">View Job</a>
                </div>
            </article>
        `).join('');

        jobsContainer.innerHTML = html;
    }

    // 3. Filter Logic
    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categorySelect.value;
        const typeValue = typeSelect.value;

        const filtered = allJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm) || 
                                  job.company.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryValue === "" || job.category === categoryValue;
            const matchesType = typeValue === "" || job.type === typeValue;

            return matchesSearch && matchesCategory && matchesType;
        });

        renderJobs(filtered);
    }

    // 4. Event Listeners
    searchInput.addEventListener('input', filterJobs);
    categorySelect.addEventListener('change', filterJobs);
    typeSelect.addEventListener('change', filterJobs);

    // Initial Load
    fetchJobs();
});