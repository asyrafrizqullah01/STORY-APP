import { LitElement, html, css } from 'lit';

class AddStory extends LitElement {
  constructor() {
    super();
    this.addEventListener('submit', this.handleSubmit.bind(this));
  }

  showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const newStory = {
      title: formData.get('name'), 
      body: formData.get('description'),
      userId: 1, 
    };

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST', // Gunakan metode POST untuk menambahkan data baru
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStory),
      });

      if (response.ok) {
        this.showNotification('Story added successfully', 'success');
        form.reset(); // Reset formulir setelah berhasil menambahkan
      } else {
        this.showNotification('Failed to add story', 'error');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      this.showNotification('Failed to add story', 'error');
    }
  }

  static styles = css`
  `;

  render() {
    return html`
      <div id="add-story-form" class="add-story">
        <h2 class="mb-4">Add Story</h2>
        <form>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" name="name" required>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <textarea class="form-control" id="description" name="description" rows="4" required></textarea>
          </div>

          <div class="mb-3">
            <label for="photo" class="form-label">Photo URL:</label>
            <input type="text" class="form-control" id="photo" name="photo" required>
          </div>

          <button type="submit" class="btn btn-primary">Add Story</button>
        </form>
      </div>
    `;
  }
}

customElements.define('add-story', AddStory);
