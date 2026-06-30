'use client';

import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Undo, Redo, RemoveFormatting } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write something...',
  minHeight = '200px',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Sync internal HTML with external value on mount, or when it differs significantly
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html === '<br>' ? '' : html);
    }
  };

  const executeCommand = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If Enter key is pressed in an empty list/block, handle default styling
    if (e.key === 'Enter') {
      // Small timeout to allow browser to insert node, then check format
      setTimeout(handleInput, 10);
    }
  };

  const isEmpty = !value || value === '<p><br></p>' || value === '' || value === '<br>';

  return (
    <div className={`relative rounded-xl border transition-all duration-200 bg-white dark:bg-gray-800 ${
      isFocused
        ? 'border-blue-500 ring-2 ring-blue-500/20'
        : 'border-gray-250 dark:border-gray-700/80 hover:border-gray-350 dark:hover:border-gray-650'
    }`}>
      {/* Editor Toolbar */}
      <div className="flex flex-wrap gap-1 items-center p-2 border-b border-gray-200 dark:border-gray-700/80 bg-gray-50/50 dark:bg-gray-800/50 rounded-t-xl select-none">
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4 font-bold" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Underline (Ctrl+U)"
        >
          <Underline className="h-4 w-4" />
        </button>
        
        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand('undo')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => executeCommand('redo')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>

        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700 mx-1" />

        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-750 dark:text-gray-350 rounded-lg transition-colors"
          title="Clear Formatting"
        >
          <RemoveFormatting className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="relative p-4">
        {isEmpty && !isFocused && (
          <div className="absolute top-4 left-4 text-gray-400 dark:text-gray-500 pointer-events-none text-sm">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className="outline-none text-gray-900 dark:text-white text-sm prose dark:prose-invert max-w-none focus:outline-none min-h-[150px] overflow-y-auto"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
