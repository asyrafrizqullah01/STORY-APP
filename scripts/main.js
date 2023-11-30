document.addEventListener('DOMContentLoaded', function () {
    const fetchData = async () => {
        try {
            const response = await fetch('src/components/Data/Data.json');
            const data = await response.json();

            return data.listStory;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    const renderDashboard = (stories) => {
        const dashboardContent = document.getElementById('dashboard-content');

        stories.forEach(story => {
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
                            <button class="btn btn-sm btn-primary read-more-button" data-story-id="${story.id}">Read More</button>
                        </div>
                    </div>
                </div>
            `;
            dashboardContent.appendChild(card);
        });

        const readMoreButtons = document.querySelectorAll('.read-more-button');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const storyId = button.dataset.storyId;

                fetchDataById(storyId).then(storyDetails => {
                    const storyDetailsContainer = document.getElementById('storyDetails');
                    storyDetailsContainer.innerHTML = `
                <h3>${storyDetails.name}</h3>
                <p>${storyDetails.description}</p>
                <p>Created on: ${storyDetails.createdAt}</p>
                <!-- Add other details as needed -->
            `;

                    const storyModal = new bootstrap.Modal(document.getElementById('storyModal'));
                    storyModal.show();
                });
            });
        });

        async function fetchDataById(storyId) {
            try {
                const response = await fetch('src/components/Data/Data.json');
                const data = await response.json();

                const storyDetails = data.listStory.find(story => story.id === storyId);

                if (storyDetails) {
                    return storyDetails;
                } else {
                    console.error(`Story with ID ${storyId} not found.`);
                    return null;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        }

    };

    fetchData().then(renderDashboard);
});


