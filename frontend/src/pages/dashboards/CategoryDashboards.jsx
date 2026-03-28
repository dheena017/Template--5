import React from 'react'
import GenericDashboard from './GenericDashboard'

const DashboardWrapper = ({ category }) => {
  return <GenericDashboard category={category} />
}

export const VideoDashboard = () => <GenericDashboard type="video" />
export const ImageDashboard = () => <GenericDashboard type="image" />
export const AvatarDashboard = () => <GenericDashboard type="avatar" />
export const SpeechDashboard = () => <GenericDashboard type="speech" />
export const TextDashboard = () => <GenericDashboard type="text" />
export const SocialDashboard = () => <GenericDashboard type="social" />
export const DevDashboard = () => <GenericDashboard type="dev" />
export const PDFDashboard = () => <GenericDashboard type="pdf" />
export const TeamDashboard = () => <GenericDashboard type="team" />
