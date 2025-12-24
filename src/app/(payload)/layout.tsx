/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next'

import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { ServerFunctionClient } from 'payload'
import React from 'react'

import { importMap } from './admin/importMap.js'
import '@payloadcms/next/css'
import './custom.scss'

export const metadata: Metadata = {
  title: 'Radio Antena 9 CMS',
  description: 'Sistema de gestión de contenidos para Radio Antena 9',
}

async function serverFunction(args: Parameters<ServerFunctionClient>[0]) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

import NoSsr from '@/components/NoSsr'

type Args = {
  children: React.ReactNode
}

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
    htmlProps={{ suppressHydrationWarning: true }}
  >
    <NoSsr>{children}</NoSsr>
  </RootLayout>
)

export default Layout
