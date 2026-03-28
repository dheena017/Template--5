import React from 'react'
import SettingsLayout from './SettingsLayout'
import GeneralSettings from './GeneralSettings'
import ImageSettings from './ImageSettings'
import AvatarSettings from './AvatarSettings'
import SpeechSettings from './SpeechSettings'
import TextSettings from './TextSettings'
import StudioSettings from './StudioSettings'
import FileSettings from './FileSettings'
import PDFSettings from './PDFSettings'
import DevSettings from './DevSettings'
import SocialSettings from './SocialSettings'
import AboutSettings from './AboutSettings'

// Independent Page Wrappers for each Setting Section
export const GeneralSettingsPage = () => (
  <SettingsLayout currentTab="general">
    <GeneralSettings />
  </SettingsLayout>
)

export const ImageSettingsPage = () => (
  <SettingsLayout currentTab="image">
    <ImageSettings />
  </SettingsLayout>
)

export const AvatarSettingsPage = () => (
  <SettingsLayout currentTab="avatar">
    <AvatarSettings />
  </SettingsLayout>
)

export const SpeechSettingsPage = () => (
  <SettingsLayout currentTab="speech">
    <SpeechSettings />
  </SettingsLayout>
)

export const TextSettingsPage = () => (
  <SettingsLayout currentTab="text">
    <TextSettings />
  </SettingsLayout>
)

export const StudioSettingsPage = () => (
  <SettingsLayout currentTab="studio">
    <StudioSettings />
  </SettingsLayout>
)

export const FileSettingsPage = () => (
  <SettingsLayout currentTab="files">
    <FileSettings />
  </SettingsLayout>
)

export const PDFSettingsPage = () => (
  <SettingsLayout currentTab="pdf">
    <PDFSettings />
  </SettingsLayout>
)

export const DevSettingsPage = () => (
  <SettingsLayout currentTab="developers">
    <DevSettings />
  </SettingsLayout>
)

export const SocialSettingsPage = () => (
  <SettingsLayout currentTab="social">
    <SocialSettings />
  </SettingsLayout>
)

export const AboutSettingsPage = () => (
  <SettingsLayout currentTab="about">
    <AboutSettings />
  </SettingsLayout>
)
