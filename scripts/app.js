document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the homepage to load featured jobs
    const featuredContainer = document.getElementById('featured-jobs-container');
    
    if (featuredContainer) {
        loadJobs(featuredContainer);
    }
});

async function loadJobs(container) {
    try {
        const response = await fetch('./data/jobs.json');
        const jobs = await response.json();

        // Filter only featured jobs for the homepage
        const featuredJobs = jobs.filter(job => job.isFeatured);

        container.innerHTML = featuredJobs.map(job => createJobCard(job)).join('');
    } catch (error) {
        console.error('Error loading jobs:', error);
        container.innerHTML = '<p>Failed to load opportunities. Please try again later.</p>';
    }
}

function createJobCard(job) {
    return `
        <article class="job-card ${job.isFeatured ? 'featured' : ''}">
            <div class="job-header">
                <img src="${job.logo}" alt="${job.company} Logo">
                <div class="job-info">
                    <h3>${job.title}</h3>
                    <p>${job.company}</p>
                </div>
            </div>
            <div class="job-tags">
                <span class="tag">${job.type}</span>
                <span class="tag">${job.location}</span>
            </div>
            <div class="job-footer">
                <span class="salary">${job.salary}</span>
                <a href="job-detail.html?id=${job.id}" class="apply-link">View Details &rarr;</a>
            </div>
        </article>
    `;
}