import React from 'react'
import { Image as ImageIcon, Wand2, Sparkles, LayoutGrid } from 'lucide-react'

const ImageSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><ImageIcon size={18} /> Generation Quality</h3>
        <p className="setting-desc">Control output resolution and render passes.</p>
        <div className="segment-row">
          <button className="seg-btn active">Standard</button>
          <button className="seg-btn">HD (High)</button>
          <button className="seg-btn">Ultra (4K)</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Sparkles size={18} /> Default Synthesis Engine</h3>
        <select className="setting-select">
          <option>Flux v1.1 Pro (Recommended)</option>
          <option>Stable Diffusion 3.5 Large</option>
          <option>DALL-E 3 Turbo High-FID</option>
          <option>Custom Fine-tuned Model (LoRA)</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><LayoutGrid size={18} /> Rendering Format</h3>
        <div className="swatch-row">
          <button className="seg-btn active">PNG (Lossless)</button>
          <button className="seg-btn">JPG (Compressed)</button>
          <button className="seg-btn">WebP (NextGen)</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Wand2 size={18} /> Auto-Enhancement</h3>
        <div className="toggle-row">
          <span>Apply Face-Restoration</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Upscale to 4K automatically</span>
          <input type="checkbox" />
        </div>
      </section>
    </div>
  )
}

export default ImageSettings

