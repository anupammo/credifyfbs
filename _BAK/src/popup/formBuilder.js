export class FormBuilder {
  constructor({ paletteEl, canvasEl, inspectorEl, statusEl, previewEl, api }) {
    this.paletteEl = paletteEl;
    this.canvasEl = canvasEl;
    this.inspectorEl = inspectorEl;
    this.statusEl = statusEl;
    this.previewEl = previewEl;
    this.api = api;
    this.fields = [];
    this.selectedFieldId = null;
    this.paletteItems = [
      { type: 'text', title: 'Text field', description: 'Single-line input for short text.' },
      { type: 'textarea', title: 'Paragraph', description: 'Multi-line input for longer text.' },
      { type: 'select', title: 'Dropdown', description: 'Choose one option from a list.' },
      { type: 'checkbox', title: 'Checkbox', description: 'Select one or more options.' },
      { type: 'radio', title: 'Radio group', description: 'Select one option only.' }
    ];
  }

  async init() {
    this.renderPalette();
    this.renderCanvas();
    this.renderInspector();
    await this.loadState();
  }

  setStatus(message) {
    if (this.statusEl) {
      this.statusEl.textContent = message;
    }
  }

  renderPalette() {
    this.paletteEl.innerHTML = '';

    this.paletteItems.forEach((item) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'field-card';
      card.innerHTML = `<strong>${item.title}</strong><span>${item.description}</span>`;
      card.addEventListener('click', () => this.addField(item.type));
      this.paletteEl.appendChild(card);
    });
  }

  renderCanvas() {
    this.canvasEl.innerHTML = '';

    if (this.fields.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Your form canvas is empty. Add a field to get started.';
      this.canvasEl.appendChild(empty);
      this.previewEl.classList.add('hidden');
      return;
    }

    this.previewEl.classList.remove('hidden');

    this.fields.forEach((field) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `canvas-item${field.id === this.selectedFieldId ? ' selected' : ''}`;
      item.dataset.fieldId = field.id;
      item.innerHTML = `
        <label>${field.label}</label>
        <small>${field.typeDescription}</small>
      `;
      item.addEventListener('click', () => this.selectField(field.id));
      this.canvasEl.appendChild(item);
    });

    this.renderPreview();
  }

  renderPreview() {
    this.previewEl.innerHTML = '';
    if (this.fields.length === 0) {
      return;
    }

    const previewTitle = document.createElement('div');
    previewTitle.className = 'preview-header';
    previewTitle.textContent = 'Preview';
    this.previewEl.appendChild(previewTitle);

    const form = document.createElement('form');
    form.className = 'preview-form';
    form.addEventListener('submit', (event) => event.preventDefault());

    this.fields.forEach((field) => {
      const fieldWrapper = document.createElement('div');
      const label = document.createElement('label');
      label.textContent = field.label;
      fieldWrapper.appendChild(label);

      let input;
      if (field.type === 'textarea') {
        input = document.createElement('textarea');
        input.rows = 4;
      } else if (field.type === 'select') {
        input = document.createElement('select');
        field.options.forEach((option) => {
          const optionEl = document.createElement('option');
          optionEl.textContent = option;
          optionEl.value = option;
          input.appendChild(optionEl);
        });
      } else if (field.type === 'checkbox' || field.type === 'radio') {
        input = document.createElement('div');
        input.style.display = 'grid';
        input.style.gap = '8px';
        field.options.forEach((option) => {
          const optionRow = document.createElement('label');
          optionRow.style.fontWeight = '400';
          const optionInput = document.createElement('input');
          optionInput.type = field.type;
          optionInput.name = field.name;
          optionInput.value = option;
          optionRow.appendChild(optionInput);
          optionRow.append(` ${option}`);
          input.appendChild(optionRow);
        });
      } else {
        input = document.createElement('input');
        input.type = 'text';
        input.value = field.placeholder;
      }

      if (field.required) {
        input.required = true;
      }

      fieldWrapper.appendChild(input);
      form.appendChild(fieldWrapper);
    });

    this.previewEl.appendChild(form);
  }

  renderInspector() {
    this.inspectorEl.innerHTML = '';

    if (!this.selectedFieldId) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'Select a field to configure label, name, and options.';
      this.inspectorEl.appendChild(empty);
      return;
    }

    const field = this.fields.find((item) => item.id === this.selectedFieldId);
    if (!field) {
      this.selectedFieldId = null;
      this.renderInspector();
      return;
    }

    const panel = document.createElement('div');
    panel.className = 'inspector-panel';

    panel.innerHTML = `
      <label for="fieldLabel">Field label</label>
      <input id="fieldLabel" type="text" value="${field.label}" />

      <label for="fieldName">Field name</label>
      <input id="fieldName" type="text" value="${field.name}" />

      <label for="fieldPlaceholder">Placeholder</label>
      <input id="fieldPlaceholder" type="text" value="${field.placeholder}" />

      <label for="fieldDescription">Description</label>
      <textarea id="fieldDescription">${field.description}</textarea>

      <label for="fieldRequired">
        <input id="fieldRequired" type="checkbox" ${field.required ? 'checked' : ''} /> Required field
      </label>
    `;

    this.inspectorEl.appendChild(panel);

    const labelInput = panel.querySelector('#fieldLabel');
    const nameInput = panel.querySelector('#fieldName');
    const placeholderInput = panel.querySelector('#fieldPlaceholder');
    const descriptionInput = panel.querySelector('#fieldDescription');
    const requiredInput = panel.querySelector('#fieldRequired');

    const updateField = () => {
      this.updateSelectedField({
        label: labelInput.value,
        name: nameInput.value,
        placeholder: placeholderInput.value,
        description: descriptionInput.value,
        required: requiredInput.checked
      });
    };

    labelInput.addEventListener('input', updateField);
    nameInput.addEventListener('input', updateField);
    placeholderInput.addEventListener('input', updateField);
    descriptionInput.addEventListener('input', updateField);
    requiredInput.addEventListener('change', updateField);
  }

  selectField(fieldId) {
    this.selectedFieldId = fieldId;
    this.renderCanvas();
    this.renderInspector();
    this.setStatus('Field selected. Update settings in the inspector.');
  }

  addField(type) {
    const template = this.getFieldTemplate(type);
    this.fields.push(template);
    this.selectField(template.id);
    this.renderCanvas();
    this.setStatus(`${template.label} added to canvas.`);
  }

  getFieldTemplate(type) {
    const timestamp = Date.now().toString(36);
    const base = {
      id: `field_${timestamp}`,
      type,
      label: 'Untitled field',
      name: `field_${timestamp}`,
      placeholder: 'Enter value…',
      description: '',
      required: false,
      options: ['Option 1', 'Option 2'],
      typeDescription: ''
    };

    switch (type) {
      case 'textarea':
        return { ...base, label: 'Paragraph', typeDescription: 'Multi-line text input.' };
      case 'select':
        return { ...base, label: 'Dropdown', typeDescription: 'Single choice from many options.' };
      case 'checkbox':
        return { ...base, label: 'Checkbox group', typeDescription: 'Multiple choice selection.' };
      case 'radio':
        return { ...base, label: 'Radio buttons', typeDescription: 'Single choice selection.' };
      default:
        return { ...base, label: 'Short answer', typeDescription: 'Single-line text input.' };
    }
  }

  updateSelectedField(updatedProperties) {
    this.fields = this.fields.map((field) => {
      if (field.id !== this.selectedFieldId) return field;
      return {
        ...field,
        label: updatedProperties.label,
        name: updatedProperties.name,
        placeholder: updatedProperties.placeholder,
        description: updatedProperties.description,
        required: updatedProperties.required
      };
    });

    this.renderCanvas();
    this.renderInspector();
    this.renderPreview();
  }

  async loadState() {
    try {
      const stored = await this.api.loadForm();
      if (stored.length) {
        this.fields = stored;
        this.selectedFieldId = this.fields[0]?.id || null;
        this.renderCanvas();
        this.renderInspector();
        this.setStatus('Form loaded from local storage.');
      }
    } catch (error) {
      console.error('[FormBuilder] loadState', error);
      this.setStatus('Unable to load saved form.');
    }
  }

  async saveState() {
    try {
      await this.api.saveForm(this.fields);
      this.setStatus('Form saved successfully.');
    } catch (error) {
      console.error('[FormBuilder] saveState', error);
      this.setStatus('Save failed. Check console for details.');
    }
  }

  async exportState() {
    const json = this.api.exportJSON(this.fields);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'credify-form-builder-export.json';
    anchor.click();
    URL.revokeObjectURL(url);
    this.setStatus('Exported form JSON successfully.');
  }

  resetForm() {
    this.fields = [];
    this.selectedFieldId = null;
    this.renderCanvas();
    this.renderInspector();
    this.setStatus('Canvas reset. Add new fields to continue.');
  }

  async addSampleFields() {
    this.fields = [
      this.getFieldTemplate('text'),
      this.getFieldTemplate('textarea'),
      this.getFieldTemplate('select')
    ];
    this.fields[0].label = 'Full name';
    this.fields[1].label = 'Tell us about your goal';
    this.fields[2].label = 'Select your plan';
    this.fields[2].options = ['Starter', 'Growth', 'Enterprise'];
    this.selectedFieldId = this.fields[0].id;
    this.renderCanvas();
    this.renderInspector();
    this.setStatus('Sample form fields added.');
  }
}
