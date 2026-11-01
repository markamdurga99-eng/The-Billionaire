declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

export interface PickedGoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  url: string;
  sizeBytes?: number;
  lastEditedUtc?: number;
  iconUrl?: string;
  description?: string;
}

// Ensure gapi script and picker API are loaded
export const loadGooglePickerScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('Window not available'));

    if (window.google?.picker) {
      return resolve();
    }

    if (window.gapi) {
      window.gapi.load('picker', {
        callback: () => {
          if (window.google?.picker) {
            resolve();
          } else {
            reject(new Error('Failed to load Google Picker module'));
          }
        },
        onerror: () => reject(new Error('Error loading Google Picker via gapi.load')),
      });
      return;
    }

    // If script not present, load it dynamically
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi.load('picker', {
        callback: () => {
          if (window.google?.picker) {
            resolve();
          } else {
            reject(new Error('Failed to load Google Picker module'));
          }
        },
        onerror: () => reject(new Error('Error loading Google Picker via gapi.load')),
      });
    };
    script.onerror = () => reject(new Error('Failed to load apis.google.com/js/api.js'));
    document.body.appendChild(script);
  });
};

// Launch the Google Picker dialog
export const openGooglePicker = async ({
  accessToken,
  onFilePicked,
  onCancel,
}: {
  accessToken: string;
  onFilePicked: (file: PickedGoogleDriveFile) => void;
  onCancel?: () => void;
}): Promise<void> => {
  await loadGooglePickerScript();

  if (!window.google?.picker) {
    throw new Error('Google Picker is not initialized.');
  }

  // Derive origin respecting iframe contexts
  const pickerOrigin =
    window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  const docsView = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS)
    .setIncludeFolders(true)
    .setSelectFolderEnabled(false);

  const uploadView = new window.google.picker.DocsUploadView();

  const picker = new window.google.picker.PickerBuilder()
    .addView(docsView)
    .addView(uploadView)
    .setOAuthToken(accessToken)
    .setOrigin(pickerOrigin)
    .setCallback((data: any) => {
      if (data.action === window.google.picker.Action.PICKED) {
        const doc = data.docs && data.docs[0];
        if (doc) {
          const pickedFile: PickedGoogleDriveFile = {
            id: doc.id,
            name: doc.name,
            mimeType: doc.mimeType,
            url: doc.url,
            sizeBytes: doc.sizeBytes,
            lastEditedUtc: doc.lastEditedUtc,
            iconUrl: doc.iconUrl,
            description: doc.description,
          };
          onFilePicked(pickedFile);
        }
      } else if (data.action === window.google.picker.Action.CANCEL) {
        if (onCancel) onCancel();
      }
    })
    .setTitle('Google Drive से बिज़नेस फ़ाइल या पुस्तक चुनें')
    .build();

  picker.setVisible(true);
};
