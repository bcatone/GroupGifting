import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Picker from 'emoji-picker-react';

const EmojiPickerModule = (quill) => {
    const pickerButton = quill.getModule('toolbar').container.querySelector('.ql-emoji');
    if (pickerButton) {
      pickerButton.addEventListener('click', () => {
        // Toggle emoji picker
        console.log('Emoji button clicked');
      });
    }
  };

export default EmojiPickerModule;
