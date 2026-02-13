document.addEventListener('DOMContentLoaded', () => {
    const talentContainer = document.getElementById('talent-container');

    async function fetchTalents() {
        try {
            const response = await fetch('./data/talents.json');
            const talents = await response.json();
            renderTalents(talents);
        } catch (error) {
            console.error('Error fetching talents:', error);
            talentContainer.innerHTML = '<p>Error loading talent directory.</p>';
        }
    }

    function renderTalents(talents) {
        const html = talents.map(talent => `
            <div class="talent-card">
                <img src="${talent.avatar}" alt="${talent.name}" class="talent-avatar">
                <div class="verified-badge">✔ Verified Talent</div>
                <h3 class="talent-name">${talent.name}</h3>
                <p class="talent-title">${talent.title}</p>
                <span class="talent-rate">${talent.rate}</span>
                
                <div class="skill-pills">
                    ${talent.skills.map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
                </div>

                <!-- UPDATE IS HERE: Changed <button> to <a> tag with dynamic ID -->
                <a href="talent-detail.html?id=${talent.id}" class="btn btn-secondary" style="width: 100%; display: block; text-align: center; text-decoration: none;">
                    View Profile
                </a>
            </div>
        `).join('');

        talentContainer.innerHTML = html;
    }

    fetchTalents();
});