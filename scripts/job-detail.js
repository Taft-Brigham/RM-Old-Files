document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('job-detail-container');
    const params = new URLSearchParams(window.location.search);
    const jobId = params.get('id');

    if (!jobId) {
        container.innerHTML = '<p>No job specified. <a href="jobs.html">Go back</a></p>';
        return;
    }

    try {
        const response = await fetch('./data/jobs.json');
        const jobs = await response.json();
        const job = jobs.find(j => j.id == jobId);

        if (!job) {
            container.innerHTML = '<p>Job not found.</p>';
            return;
        }

        // Simulating detailed content since our JSON is simple
        const description = `We are looking for a talented ${job.title} to join our team at ${job.company}. This is a fully ${job.location} role where you will have the opportunity to work on cutting-edge projects.`;
        
        container.innerHTML = `
            <div class="detail-header">
                <img src="${job.logo}" alt="${job.company}" class="detail-logo">
                <div class="detail-info">
                    <h1>${job.title}</h1>
                    <div class="detail-meta">${job.company} &bull; ${job.type} &bull; Posted ${job.postedAt}</div>
                </div>
                <div style="margin-left: auto;">
                    <button onclick="alert('Application Feature: In a real app, this opens an application form!')" class="btn btn-primary">Apply Now</button>
                </div>
            </div>

            <div class="detail-grid">
                <div class="content-box">
                    <h2>Job Description</h2>
                    <p>${description}</p>
                    <p>You will be responsible for contributing to our core products, collaborating with cross-functional teams, and ensuring high performance and responsiveness of applications.</p>
                    
                    <h2>Key Responsibilities</h2>
                    <ul>
                        <li>Develop and maintain clean, efficient code.</li>
                        <li>Collaborate with designers and product managers.</li>
                        <li>Participate in code reviews and team meetings.</li>
                        <li>Troubleshoot and debug issues.</li>
                    </ul>

                    <h2>Requirements</h2>
                    <ul>
                        <li>Proven experience in ${job.category}.</li>
                        <li>Strong communication skills in English.</li>
                        <li>Ability to work independently in a remote environment.</li>
                        <li>Experience with ${job.tags ? job.tags.join(', ') : 'modern tools'}.</li>
                    </ul>
                </div>

                <div class="sidebar-box">
                    <div class="sidebar-item">
                        <span class="sidebar-label">Salary</span>
                        <span class="sidebar-value">${job.salary}</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="sidebar-label">Location</span>
                        <span class="sidebar-value">${job.location}</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="sidebar-label">Job Type</span>
                        <span class="sidebar-value">${job.type}</span>
                    </div>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #E2E8F0;">
                    <div class="sidebar-item">
                        <span class="sidebar-label">About the Company</span>
                        <p style="font-size: 0.9rem; margin-top: 5px;">${job.company} is a leading innovator in the ${job.category} space, committed to remote-first work culture.</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error loading details.</p>';
    }
});