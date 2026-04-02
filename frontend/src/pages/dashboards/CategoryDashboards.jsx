import React from 'react'
import GenericDashboard from './GenericDashboard'
import OrganizePDFDashboard from '../pdf/dashboards/OrganizePDFDashboard'
import OptimizePDFDashboard from '../pdf/dashboards/OptimizePDFDashboard'
import ConvertToPDFDashboard from '../pdf/dashboards/ConvertToPDFDashboard'
import ConvertFromPDFDashboard from '../pdf/dashboards/ConvertFromPDFDashboard'
import EditPDFDashboard from '../pdf/dashboards/EditPDFDashboard'
import PDFSecurityDashboard from '../pdf/dashboards/PDFSecurityDashboard'
import PDFIntelligenceDashboard from '../pdf/dashboards/PDFIntelligenceDashboard'

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
export const StudioDashboard = () => <GenericDashboard type="studio" />
export const FilesDashboard = () => <GenericDashboard type="files" />
export const ResourcesDashboard = () => <GenericDashboard type="resources" />

// Synthesis Production Dashboards
export const TextToVideoDashboard = () => <GenericDashboard type="text-to-video" />
export const ImageToVideoDashboard = () => <GenericDashboard type="image-to-video" />

// Specialized PDF Dashboards
export const PDFOrganizeDashboard = OrganizePDFDashboard
export const PDFOptimizeDashboard = OptimizePDFDashboard
export const PDFConvertToDashboard = ConvertToPDFDashboard
export const PDFConvertFromDashboard = ConvertFromPDFDashboard
export const PDFEditDashboard = EditPDFDashboard
export const PDFSecurityDashboardMain = PDFSecurityDashboard
export const PDFIntelligenceDashboardMain = PDFIntelligenceDashboard
