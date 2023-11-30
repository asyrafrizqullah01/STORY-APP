import { LitElement, html, css } from 'lit';

class Dashboard extends LitElement {
    static styles = css`
    `;

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('add-story', this.handleAddStory.bind(this));
    }

    handleAddStory(event) {
        const newStory = event.detail;
        this.addStoryToDashboard(newStory);
    }

    addStoryToDashboard(story) {
        const dashboardContent = this.shadowRoot.getElementById('dashboard-content');

        const card = document.createElement('div');
        card.className = 'col-md-6 mb-4';
        card.innerHTML = `
            <div class="card">
                <img src="${story.photoUrl}" class="card-img-top" alt="${story.description}">
                <div class="card-body">
                    <h3 class="card-title">${story.name}</h3>
                    <p class="card-text">${story.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">Created on: ${story.createdAt}</small>
                        <button class="btn btn-sm btn-primary">Read More</button>
                    </div>
                </div>
            </div>
        `;

        dashboardContent.appendChild(card);
    }

    render() {
        return html`
            <div id="dashboard" class="dashboard">
                <h2 class="mb-4">Dashboard</h2>
                <div id="dashboard-content" class="row"></div>
            </div>
        `;
    }
}

customElements.define('dashboard-component', Dashboard);
