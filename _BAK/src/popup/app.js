import { ApiService } from './apiService.js';
import { FormBuilder } from './formBuilder.js';

const selectors = {
  fieldPalette: 'fieldPalette',
  formCanvas: 'formCanvas',
  inspectorArea: 'inspectorArea',
  statusText: 'statusText',
  previewPanel: 'previewPanel',
  saveButton: 'saveButton',
  exportButton: 'exportButton',
  clearButton: 'clearButton',
  togglePreviewButton: 'togglePreviewButton',
  addSampleButton: 'addSampleButton'
};

function $(id) {
  return document.getElementById(id);
}

async function init() {
  const service = new ApiService();
  const paletteEl = $(selectors.fieldPalette);
  const canvasEl = $(selectors.formCanvas);
  const inspectorEl = $(selectors.inspectorArea);
  const statusEl = $(selectors.statusText);
  const previewEl = $(selectors.previewPanel);

  if (!paletteEl || !canvasEl || !inspectorEl || !statusEl || !previewEl) {
    console.error('[Credify FBS] Missing required DOM elements for popup initialization');
    return;
  }

  const builder = new FormBuilder({
    paletteEl,
    canvasEl,
    inspectorEl,
    statusEl,
    previewEl,
    api: service
  });

  await builder.init();

  const saveButton = $(selectors.saveButton);
  const exportButton = $(selectors.exportButton);
  const clearButton = $(selectors.clearButton);
  const addSampleButton = $(selectors.addSampleButton);
  const togglePreviewButton = $(selectors.togglePreviewButton);

  if (saveButton) saveButton.addEventListener('click', () => builder.saveState());
  if (exportButton) exportButton.addEventListener('click', () => builder.exportState());
  if (clearButton) clearButton.addEventListener('click', () => builder.resetForm());
  if (addSampleButton) addSampleButton.addEventListener('click', () => builder.addSampleFields());
  if (togglePreviewButton) {
    togglePreviewButton.addEventListener('click', () => {
      previewEl.classList.toggle('hidden');
      builder.setStatus('Preview panel toggled.');
    });
  }

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Credify FBS] Unhandled rejection:', event.reason);
    builder.setStatus('Unexpected error occurred.');
  });
}

document.addEventListener('DOMContentLoaded', init);
