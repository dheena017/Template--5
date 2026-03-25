import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, Upload, Image as ImageIcon, User, Clapperboard, CheckCircle2 } from 'lucide-react'
import '../../styles/pages/studio/ProductPlacement.css'

const productSamples = [
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-1',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-2',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-3',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-4',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-5',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-item/sample-item-6'
]

const avatarSamples = [
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-2',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-6',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-11',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-13',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-12',
  'https://dynamic.heygen.ai/Shortcut/ProductPlacement/sample-avatar/sample-avatar-14'
]

const UploadBox = ({
  title,
  subtitle,
  selected,
  selectedName,
  onBrowse,
  onDropFile,
  icon
}) => (
  <div className="pp-block glass-card">
    <h2>{title}</h2>
    <div
      className={`pp-upload-zone ${selected ? 'has-image' : ''}`}
      onClick={onBrowse}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropFile}
    >
      {selected ? (
        <>
          <img src={selected} alt={title} className="pp-preview" />
          <div className="pp-selected-tag">
            <CheckCircle2 size={14} /> Selected
          </div>
        </>
      ) : (
        <>
          {icon}
          <p>Upload photo or drag and drop here</p>
          <span>{subtitle}</span>
        </>
      )}
    </div>
    {selectedName ? <div className="pp-file-name">{selectedName}</div> : null}
  </div>
)

const ProductPlacement = () => {
  const productInputRef = useRef(null)
  const avatarInputRef = useRef(null)

  const [productImage, setProductImage] = useState('')
  const [avatarImage, setAvatarImage] = useState('')
  const [productFileName, setProductFileName] = useState('')
  const [avatarFileName, setAvatarFileName] = useState('')

  useEffect(() => {
    return () => {
      if (productImage?.startsWith('blob:')) URL.revokeObjectURL(productImage)
      if (avatarImage?.startsWith('blob:')) URL.revokeObjectURL(avatarImage)
    }
  }, [productImage, avatarImage])

  const onFilePick = (file, type) => {
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    if (type === 'product') {
      if (productImage?.startsWith('blob:')) URL.revokeObjectURL(productImage)
      setProductImage(localUrl)
      setProductFileName(file.name)
      return
    }
    if (avatarImage?.startsWith('blob:')) URL.revokeObjectURL(avatarImage)
    setAvatarImage(localUrl)
    setAvatarFileName(file.name)
  }

  const onDrop = (event, type) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    onFilePick(file, type)
  }

  return (
    <div className="product-placement-page">
      <header className="pp-header premium-card">
        <div className="pp-title-row">
          <span className="pp-badge"><Sparkles size={14} /> Avatar IV & Veo 3.1</span>
          <h1>Product placement: Avatar IV & Veo 3.1</h1>
        </div>
        <p>
          Combine a product image, avatar, and script to create a high-quality video highlighting your product.
        </p>
      </header>

      <section className="pp-grid">
        <UploadBox
          title="Product image"
          subtitle="Choose a 720p+ photo with a product front and center."
          selected={productImage}
          selectedName={productFileName}
          onBrowse={() => productInputRef.current?.click()}
          onDropFile={(e) => onDrop(e, 'product')}
          icon={<ImageIcon size={28} />}
        />

        <div className="pp-samples glass-card">
          <h3>Try a sample photo</h3>
          <div className="pp-sample-grid">
            {productSamples.map((url, idx) => (
              <button
                key={url}
                className={`pp-sample ${productImage === url ? 'active' : ''}`}
                onClick={() => {
                  setProductImage(url)
                  setProductFileName(`sample-item-${idx + 1}`)
                }}
                title={url}
              >
                <img src={url} alt={`Product sample ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pp-grid">
        <UploadBox
          title="Avatar"
          subtitle="Choose a 720p+ photo with a clearly visible face."
          selected={avatarImage}
          selectedName={avatarFileName}
          onBrowse={() => avatarInputRef.current?.click()}
          onDropFile={(e) => onDrop(e, 'avatar')}
          icon={<User size={28} />}
        />

        <div className="pp-samples glass-card">
          <h3>Try a sample photo</h3>
          <div className="pp-sample-grid">
            {avatarSamples.map((url, idx) => (
              <button
                key={url}
                className={`pp-sample ${avatarImage === url ? 'active' : ''}`}
                onClick={() => {
                  setAvatarImage(url)
                  setAvatarFileName(`sample-avatar-${idx + 1}`)
                }}
                title={url}
              >
                <img src={url} alt={`Avatar sample ${idx + 1}`} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="pp-footer-note">
        <Clapperboard size={16} />
        <span>Next step: add script and generate your product highlight video.</span>
      </div>

      <input
        ref={productInputRef}
        type="file"
        accept="image/*"
        className="pp-hidden-input"
        onChange={(e) => onFilePick(e.target.files?.[0], 'product')}
      />
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="pp-hidden-input"
        onChange={(e) => onFilePick(e.target.files?.[0], 'avatar')}
      />
    </div>
  )
}

export default ProductPlacement




