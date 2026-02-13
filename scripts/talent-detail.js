document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('talent-detail-container');
    const params = new URLSearchParams(window.location.search);
    const talentId = params.get('id');

    if (!talentId) {
        container.innerHTML = '<p>No profile specified. <a href="talents.html">Go back</a></p>';
        return;
    }

    try {
        const response = await fetch('./data/talents.json');
        const talents = await response.json();
        const talent = talents.find(t => t.id == talentId);

        if (!talent) {
            container.innerHTML = '<p>Talent not found.</p>';
            return;
        }

        container.innerHTML = `
            <div class="detail-grid" style="grid-template-columns: 1fr 2fr;">
                
                <!-- Left Sidebar: Profile Info -->
                <div class="sidebar-box profile-header">
                    <img src="${talent.avatar}" alt="${talent.name}" class="profile-avatar">
                    <div class="verified-badge">✔ Verified Talent</div>
                    <h1 style="font-size: 1.5rem; color: var(--primary);">${talent.name}</h1>
                    <p style="color: var(--text-light); margin-bottom: 20px;">${talent.title}</p>
                    
                    <div style="text-align: left; margin-top: 30px;">
                        <div class="sidebar-item">
                            <span class="sidebar-label">Hourly Rate</span>
                            <span class="sidebar-value">${talent.rate}</span>
                        </div>
                        <div class="sidebar-item">
                            <span class="sidebar-label">Location</span>
                            <span class="sidebar-value">${talent.location}</span>
                        </div>
                        <div class="sidebar-item">
                            <span class="sidebar-label">Member Since</span>
                            <span class="sidebar-value">Aug 2023</span>
                        </div>
                    </div>

                    <button onclick="alert('Employer Feature: This would open a messaging modal to contact ${talent.name}.')" class="btn btn-primary" style="width: 100%; margin-top: 20px;">Contact Talent</button>
                </div>

                <!-- Right Content: Bio & Portfolio -->
                <div class="content-box">
                    <h2>About Me</h2>
                    <p>I am a professional ${talent.title} based in ${talent.location}. I have extensive experience working with international teams and delivering high-quality results in ${talent.category}.</p>
                    <p>I am passionate about using my skills in ${talent.skills.join(', ')} to help businesses grow.</p>
                    
                    <h2 style="margin-top: 30px;">Skills & Expertise</h2>
                    <div class="skill-pills" style="justify-content: flex-start;">
                        ${talent.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                    </div>

                    <h2 style="margin-top: 30px;">Work History</h2>
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: var(--primary);">Senior ${talent.title}</h4>
                        <p style="font-size: 0.9rem; color: var(--text-light);">Remote Contract &bull; 2021 - Present</p>
                        <p>Delivered key projects for fintech clients in Europe and North America.</p>
                    </div>
                    <div>
                        <h4 style="color: var(--primary);">Freelance Specialist</h4>
                        <p style="font-size: 0.9rem; color: var(--text-light);">Upwork &bull; 2019 - 2021</p>
                        <p>Maintained a 100% job success score across 20+ projects.</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Error loading profile.</p>';
    }
});