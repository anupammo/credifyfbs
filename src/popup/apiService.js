export class ApiService {
  constructor() {
    this.storageKey = 'credifyFormBuilderState';
  }

  saveForm(formState) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [this.storageKey]: formState }, () => {
        const error = chrome.runtime.lastError;
        if (error) {
          reject(error);
          return;
        }
        resolve(formState);
      });
    });
  }

  loadForm() {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([this.storageKey], (result) => {
        const error = chrome.runtime.lastError;
        if (error) {
          reject(error);
          return;
        }
        resolve(result[this.storageKey] || []);
      });
    });
  }

  exportJSON(formState) {
    return JSON.stringify({ createdAt: new Date().toISOString(), fields: formState }, null, 2);
  }

  async syncFormToBackend(formState) {
    // Future backend integration stub.
    // Replace endpoint with your Express/Next.js API URL once available.
    const endpoint = 'https://example.com/api/forms/sync';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields: formState })
      });

      if (!response.ok) {
        throw new Error(`Backend sync failed: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.warn('[ApiService] Backend sync skipped:', error.message);
      return null;
    }
  }
}
