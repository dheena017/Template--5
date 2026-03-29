import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
    Layers, Trash2, RotateCw, RotateCcw, Plus, Copy, Redo, Undo, 
    ChevronLeft, GripVertical, Settings2, Download, 
    Maximize2, Minimize2, CheckSquare, Square, MousePointer2,
    MoveRight, FlipHorizontal2, Star
} from 'lucide-react';
import Button from '../../../components/Button';
import './EditorStep.css';

const EditorStep = ({ 
    pages, setPages, undo, redo, canUndo, canRedo, 
    rotatePage, deletePage, duplicatePage, addBlankPage, 
    zoomLevel, setZoomLevel, handleExecute, isProcessing, activeTool, reset,
    rotateSelected, deleteSelected, duplicateSelected
}) => {
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [lastSelectedIdx, setLastSelectedIdx] = useState(null);
    const [moveToIndex, setMoveToIndex] = useState('');
    const [showMoveInput, setShowMoveInput] = useState(false);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKey = (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
                if (e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); }
                if (e.key === 'y') { e.preventDefault(); redo(); }
                if (e.key === 'a') { e.preventDefault(); setSelectedIds(new Set(pages.map(p => p.id))); }
            }
            if (e.key === 'Delete' && selectedIds.size > 0) {
                e.preventDefault();
                if (deleteSelected) deleteSelected([...selectedIds]);
                setSelectedIds(new Set());
            }
            if (e.key === 'Escape') setSelectedIds(new Set());
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [undo, redo, pages, selectedIds, deleteSelected]);

    const toggleSelect = useCallback((id, idx, e) => {
        const newSet = new Set(selectedIds);
        if (e.shiftKey && lastSelectedIdx !== null) {
            const start = Math.min(lastSelectedIdx, idx);
            const end = Math.max(lastSelectedIdx, idx);
            for (let i = start; i <= end; i++) newSet.add(pages[i].id);
        } else if (e.ctrlKey || e.metaKey) {
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
        } else {
            if (newSet.size === 1 && newSet.has(id)) newSet.clear();
            else { newSet.clear(); newSet.add(id); }
        }
        setSelectedIds(newSet);
        setLastSelectedIdx(idx);
    }, [selectedIds, lastSelectedIdx, pages]);

    const selectAll = () => setSelectedIds(new Set(pages.map(p => p.id)));
    const clearSelection = () => setSelectedIds(new Set());
    const selectEven = () => setSelectedIds(new Set(pages.filter((_, i) => (i + 1) % 2 === 0).map(p => p.id)));
    const selectOdd = () => setSelectedIds(new Set(pages.filter((_, i) => (i + 1) % 2 !== 0).map(p => p.id)));

    const handleMoveSelected = () => {
        const idx = parseInt(moveToIndex) - 1;
        if (isNaN(idx) || idx < 0 || idx >= pages.length) return;
        const selected = pages.filter(p => selectedIds.has(p.id));
        const rest = pages.filter(p => !selectedIds.has(p.id));
        const newPages = [...rest.slice(0, idx), ...selected, ...rest.slice(idx)];
        setPages(newPages);
        setMoveToIndex('');
        setShowMoveInput(false);
    };

    const handleBulkRotate = () => {
        if (rotateSelected) rotateSelected([...selectedIds]);
    };

    const handleBulkDelete = () => {
        if (deleteSelected) deleteSelected([...selectedIds]);
        setSelectedIds(new Set());
    };

    const handleBulkDuplicate = () => {
        if (duplicateSelected) duplicateSelected([...selectedIds]);
    };

    const handleSetAsCover = () => {
        const selected = pages.filter(p => selectedIds.has(p.id));
        const rest = pages.filter(p => !selectedIds.has(p.id));
        setPages([...selected, ...rest]);
        setSelectedIds(new Set());
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="editor-step-container w-full"
        >
            <div className="flex flex-col gap-6">
                {/* Premium Sticky Toolbar */}
                <div className="editor-toolbar">
                    <div className="toolbar-left">
                        <button onClick={reset} className="toolbar-btn" title="Back">
                            <ChevronLeft size={22} />
                        </button>
                        <div className="toolbar-divider" />
                        <div className="toolbar-btn-group">
                            <button onClick={undo} disabled={!canUndo} className="toolbar-btn" title="Undo (Ctrl+Z)">
                                <Undo size={18} />
                            </button>
                            <button onClick={redo} disabled={!canRedo} className="toolbar-btn" title="Redo (Ctrl+Y)">
                                <Redo size={18} />
                            </button>
                        </div>
                        <div className="toolbar-divider" />
                        {/* Selection controls */}
                        <div className="toolbar-btn-group">
                            <button onClick={selectAll} className="toolbar-btn label-btn" title="Select All (Ctrl+A)">
                                <CheckSquare size={16} /> All
                            </button>
                            <button onClick={selectEven} className="toolbar-btn label-btn" title="Select Even Pages">
                                Even
                            </button>
                            <button onClick={selectOdd} className="toolbar-btn label-btn" title="Select Odd Pages">
                                Odd
                            </button>
                            {selectedIds.size > 0 && (
                                <button onClick={clearSelection} className="toolbar-btn label-btn cancel" title="Clear Selection">
                                    <Square size={14} /> Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="toolbar-center">
                        <button onClick={addBlankPage} className="toolbar-btn label-btn accent" title="Add Blank Page">
                            <Plus size={16} /> Blank Page
                        </button>
                        <div className="zoom-control">
                            <Minimize2 size={14} className="text-slate-500" />
                            <input 
                                type="range" min="0.5" max="2" step="0.1" 
                                value={zoomLevel} 
                                onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                                className="zoom-slider"
                            />
                            <Maximize2 size={14} className="text-slate-500" />
                            <span className="zoom-value">{Math.round(zoomLevel * 100)}%</span>
                        </div>
                    </div>

                    <div className="toolbar-right">
                        <div className="page-count-badge">{pages.length} Pages</div>
                        <Button 
                            onClick={handleExecute} 
                            disabled={isProcessing || pages.length === 0}
                            className="assemble-btn"
                            style={{ backgroundColor: activeTool.color }}
                        >
                            {isProcessing ? <Settings2 className="animate-spin" size={20} /> : <Download size={20} />}
                            <span>Assemble Result</span>
                        </Button>
                    </div>
                </div>

                {/* Bulk Action Bar — shows only when pages selected */}
                <AnimatePresence>
                    {selectedIds.size > 0 && (
                        <motion.div 
                            className="bulk-action-bar"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                        >
                            <span className="bulk-count">{selectedIds.size} selected</span>
                            <div className="bulk-actions">
                                <button className="bulk-btn rotate" onClick={handleBulkRotate} title="Rotate Selected">
                                    <RotateCw size={15} /> Rotate
                                </button>
                                <button className="bulk-btn copy" onClick={handleBulkDuplicate} title="Duplicate Selected">
                                    <Copy size={15} /> Duplicate
                                </button>
                                <button className="bulk-btn cover" onClick={handleSetAsCover} title="Move to Front">
                                    <Star size={15} /> Set as Cover
                                </button>
                                <div className="bulk-move-group">
                                    <button className="bulk-btn move" onClick={() => setShowMoveInput(v => !v)} title="Move to position">
                                        <MoveRight size={15} /> Move to
                                    </button>
                                    {showMoveInput && (
                                        <motion.div className="move-input-group" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }}>
                                            <input 
                                                type="number" min="1" max={pages.length}
                                                placeholder={`1-${pages.length}`}
                                                value={moveToIndex}
                                                onChange={e => setMoveToIndex(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleMoveSelected()}
                                                className="move-input"
                                                autoFocus
                                            />
                                            <button onClick={handleMoveSelected} className="move-confirm-btn">→</button>
                                        </motion.div>
                                    )}
                                </div>
                                <button className="bulk-btn delete" onClick={handleBulkDelete} title="Delete Selected (Delete)">
                                    <Trash2 size={15} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Interactive Page Grid */}
                <div className="pages-workspace-wrapper">
                    <Reorder.Group 
                        axis="y" 
                        values={pages} 
                        onReorder={setPages} 
                        className="pages-grid"
                        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${Math.round(160 * zoomLevel)}px, 1fr))` }}
                    >
                        {pages.map((page, idx) => {
                            const isSelected = selectedIds.has(page.id);
                            return (
                                <Reorder.Item 
                                    key={page.id} 
                                    value={page}
                                    className={`reorder-page-item ${isSelected ? 'selected' : ''}`}
                                    whileHover={{ y: -6, scale: 1.03 }}
                                    whileDrag={{ scale: 1.08, zIndex: 100, boxShadow: '0 40px 80px rgba(0,0,0,0.6)' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                    onClick={(e) => toggleSelect(page.id, idx, e)}
                                >
                                    <div className={`page-surface ${isSelected ? 'is-selected' : ''}`}>
                                        {/* Checkbox indicator */}
                                        <div className={`page-checkbox ${isSelected ? 'visible' : ''}`}>
                                            {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                                        </div>

                                        {page.isBlank ? (
                                            <div className="blank-page-content">
                                                <Layers size={28} className="text-slate-400" />
                                                <span>Blank Page</span>
                                            </div>
                                        ) : (
                                            <img 
                                                src={page.thumbnail} 
                                                alt={`Page ${idx + 1}`}
                                                className="page-thumbnail"
                                                style={{ transform: `rotate(${page.rotation}deg)` }}
                                                loading="lazy"
                                            />
                                        )}
                                        
                                        {/* Rotation badge */}
                                        {page.rotation !== 0 && (
                                            <div className="rotation-badge">{page.rotation}°</div>
                                        )}

                                        {/* Hover Controls */}
                                        <div className="page-hover-controls">
                                            <div className="hover-controls-top">
                                                <div className="drag-handle"><GripVertical size={18} /></div>
                                                <div className="quick-actions">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); rotatePage(page.id); }} 
                                                        className="quick-action-btn blue"
                                                        title="Rotate 90° Clockwise"
                                                    ><RotateCw size={15} /></button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); duplicatePage(page.id); }} 
                                                        className="quick-action-btn green"
                                                        title="Duplicate"
                                                    ><Copy size={15} /></button>
                                                </div>
                                            </div>
                                            <div className="hover-controls-bottom">
                                                <div className="page-number-badge">P.{idx + 1}</div>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); deletePage(page.id); }} 
                                                    className="quick-action-btn red"
                                                    title="Delete Page"
                                                ><Trash2 size={15} /></button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Index label always visible */}
                                    <div className="page-index-label">{idx + 1}</div>
                                </Reorder.Item>
                            );
                        })}
                    </Reorder.Group>
                    
                    {pages.length === 0 && (
                        <div className="empty-workspace">
                            <Trash2 size={40} className="text-slate-600" />
                            <h4>Workspace Empty</h4>
                            <p>All pages removed. Add a blank page or reset to start over.</p>
                        </div>
                    )}
                </div>

                {/* Keyboard Shortcut Tips */}
                <div className="shortcut-tips">
                    <span><kbd>Ctrl+A</kbd> Select all</span>
                    <span><kbd>Shift+Click</kbd> Range select</span>
                    <span><kbd>Ctrl+Click</kbd> Multi-select</span>
                    <span><kbd>Del</kbd> Delete selected</span>
                    <span><kbd>Ctrl+Z</kbd> Undo</span>
                    <span><kbd>Esc</kbd> Clear selection</span>
                </div>
            </div>
        </motion.div>
    );
};

export default EditorStep;
